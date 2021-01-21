import * as React from "react";
import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import * as dagreD3 from "dagre-d3";
import * as graphlib from "graphlib";

import { HorseDef } from "../../horse-defs";

import "./FamilyDiagram.css";
import { Edge } from "dagre-d3";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const prepareGraph = (defs: HorseDef[]) => {
  const nodes = new Map<string, dagreD3.Label>();
  const edges: [Edge, dagreD3.Label][] = [];

  defs.forEach((def) => {
    if (!def.owned && !def.listed) {
      return;
    }
    // 定義された馬本体
    nodes.set(def.name, {
      label: def.name,
      class: `owned ${def.sex}`,
    });

    // 母親
    if (def.motherName) {
      // 未登録なら非所持馬として追加
      if (!nodes.has(def.motherName)) {
        nodes.set(def.motherName, {
          label: def.motherName,
          class: "anothers female",
        });
      } else {
        // TODO: 所持馬扱いに書き換える
      }
      edges.push([{ v: def.motherName, w: def.name }, { class: "mother" }]);
    }

    if (def.fatherName) {
      if (!nodes.has(def.fatherName)) {
        nodes.set(def.fatherName, {
          label: def.fatherName,
          class: "anothers male",
        });
      } else {
        // TODO: 所持馬扱いに書き換える
      }
      edges.push([{ v: def.fatherName, w: def.name }, { class: "father" }]);
    }
  });

  return { nodes: Array.from(nodes.entries()), edges };
};

export const FamilyDiagram: React.FC = () => {
  const d3Container = useRef<SVGSVGElement>(null!);

  const defs = useSelector((state: RootState) => state.horseDefs.list);
  const data = useMemo(() => prepareGraph(defs), [defs]);

  useEffect(() => {
    const svg = d3.select<SVGSVGElement, SVGSVGElement>(d3Container.current);
    svg.selectAll("g").remove();

    if (data.nodes.length === 0 && data.edges.length === 0) {
      return;
    }

    const g = new dagreD3.graphlib.Graph()
      .setGraph({
        rankdir: "LR",
      })
      .setDefaultEdgeLabel(() => ({}));

    // Here we're setting nodeclass, which is used by our custom drawNodes function
    // below.
    data.nodes.forEach((n) => {
      g.setNode(n[0], n[1]);
    });

    g.nodes().forEach(function (v) {
      var node = g.node(v);
      // Round the corners of the nodes
      node.rx = node.ry = 5;
    });

    // Set up edges, no special attributes.
    data.edges.forEach((e) => {
      g.setEdge(e[0], e[1]);
    });

    // Create the renderer
    var render = new dagreD3.render();
    const svgGroup = svg.append("g");

    // Set up zoom support
    const zoom = d3.zoom<SVGSVGElement, SVGSVGElement>().on("zoom", () => {
      svgGroup.attr("transform", d3.event.transform);
    });
    svg.call(zoom);

    // Run the renderer. This is what draws the final graph.
    render(d3.select("svg g"), (g as unknown) as graphlib.Graph);

    // Center the graph
    const xCenterOffset =
      (Number(svg.attr("width")) - (g.graph().width || 0)) / 2;
    svgGroup.attr(
      "transform",
      `translate(${Number.isNaN(xCenterOffset) ? 0 : xCenterOffset}, 20)`
    );
    // svg.attr("height", (g.graph().height || 0) + 40);
  }, [d3Container, data]);

  return (
    <React.Fragment>
      <svg
        className="d3-component mottv-derby-family"
        width="100%"
        height="70vh"
        ref={d3Container}
      />
    </React.Fragment>
  );
};
