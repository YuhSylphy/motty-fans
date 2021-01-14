import * as React from "react";
import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import * as dagreD3 from "dagre-d3";
import * as graphlib from "graphlib";

import "./FamilyDiagram.css";

export const FamilyDiagram: React.FC = () => {
  const d3Container = useRef<SVGSVGElement>(null!);

  useEffect(() => {
    const g = new dagreD3.graphlib.Graph()
      .setGraph({})
      .setDefaultEdgeLabel((v, w, name) => ({}));

    // Here we're setting nodeclass, which is used by our custom drawNodes function
    // below.
    g.setNode("0", { label: "TOP", class: "type-TOP" });
    g.setNode("1", { label: "S", class: "type-S" });
    g.setNode("2", { label: "NP", class: "type-NP" });
    g.setNode("3", { label: "DT", class: "type-DT" });
    g.setNode("4", { label: "This", class: "type-TK" });
    g.setNode("5", { label: "VP", class: "type-VP" });
    g.setNode("6", { label: "VBZ", class: "type-VBZ" });
    g.setNode("7", { label: "is", class: "type-TK" });
    g.setNode("8", { label: "NP", class: "type-NP" });
    g.setNode("9", { label: "DT", class: "type-DT" });
    g.setNode("10", { label: "an", class: "type-TK" });
    g.setNode("11", { label: "NN", class: "type-NN" });
    g.setNode("12", { label: "example", class: "type-TK" });
    g.setNode("13", { label: ".", class: "type-." });
    g.setNode("14", { label: "sentence", class: "type-TK" });

    g.nodes().forEach(function (v) {
      var node = g.node(v);
      // Round the corners of the nodes
      node.rx = node.ry = 5;
    });

    // Set up edges, no special attributes.
    g.setEdge({ v: "3", w: "4" });
    g.setEdge({ v: "2", w: "3" });
    g.setEdge({ v: "1", w: "2" });
    g.setEdge({ v: "6", w: "7" });
    g.setEdge({ v: "5", w: "6" });
    g.setEdge({ v: "9", w: "10" });
    g.setEdge({ v: "8", w: "9" });
    g.setEdge({ v: "11", w: "12" });
    g.setEdge({ v: "8", w: "11" });
    g.setEdge({ v: "5", w: "8" });
    g.setEdge({ v: "1", w: "5" });
    g.setEdge({ v: "13", w: "14" });
    g.setEdge({ v: "1", w: "13" });
    g.setEdge({ v: "0", w: "1" });

    // Create the renderer
    var render = new dagreD3.render();
    const svg = d3.select(d3Container.current);
    const svgGroup = svg.append("g");

    // Run the renderer. This is what draws the final graph.
    render(d3.select("svg g"), (g as unknown) as graphlib.Graph);

    // Center the graph
    var xCenterOffset =
      (Number(svg.attr("width")) - (g.graph().width || 0)) / 2;
    svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
    svg.attr("height", (g.graph().height || 0) + 40);
  }, [d3Container]);

  return (
    <React.Fragment>
      <svg
        className="d3-component"
        width="100%"
        height="75vh"
        ref={d3Container}
      />
    </React.Fragment>
  );
};
