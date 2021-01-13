import { Box, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';

type NodeDatum = d3.SimulationNodeDatum & { id: number, depth: number, label: string };
type LinkDatum = d3.SimulationLinkDatum<NodeDatum>;

const FamilyDiagram: React.FC = () => {
    const nodes = useMemo<NodeDatum[]>(() => [
        { id: 0, depth: 0, label: 'foo' },
        { id: 1, depth: 1, label: 'bar' },
        { id: 2, depth: 0, label: 'buz' },
        { id: 3, depth: 2, label: 'qux' },
        { id: 4, depth: 3, label: 'x' },
        { id: 5, depth: 3, label: 'y' },
        { id: 6, depth: 4, label: 'z' }
    ], []);

    const edges = useMemo<LinkDatum[]>(() => [
        { source: 0, target: 1 },
        { source: 1, target: 3 },
        { source: 2, target: 3 },
        { source: 3, target: 4 },
        { source: 3, target: 5 },
        { source: 4, target: 3 },
        { source: 4, target: 6 }
    ], []);

    const d3Container = useRef<SVGSVGElement>(null!);

    useEffect(() => {
        const d3Svg = d3.select(d3Container.current);
        const width = d3Container.current.width.animVal.value;
        const height = d3Container.current.height.animVal.value;

        // エッジ(linkと呼ぶらしい)の設定。
        const d3Links = d3Svg
            .selectAll("line")
            .data(edges)
            .enter()
            .append("line")
            .attr("stroke", "black");

        // ノード(点)の設定。
        const d3Nodes = d3Svg
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 10)
            .attr("fill", "#213964")
            .call(
                d3
                    .drag<SVGCircleElement, NodeDatum>()
                    .on("start", (event, d) => {
                        if (!event.active) simulation.alphaTarget(0.9).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on("drag", (event, d) => {
                        d.fx = event.x;
                        d.fy = event.y;
                    })
                    .on("end", (event, d) => {
                        if (!event.active) simulation.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    })
            );

        const select = (selector: (d: LinkDatum) => NodeDatum | string | number) => 
            (func: (s: NodeDatum) => string | number | undefined) => 
            (d: LinkDatum): string | number => {
                const selected = selector(d);
                return typeof selected === "object" ? func(selected) || 0 : selected;
            }

        // 描画とシミュレーションの設定。
        const simulation = d3
            .forceSimulation<NodeDatum>()
            .nodes(nodes)
            .on("tick", () => {
                d3Nodes.attr("cx", d => d.x || 0).attr("cy", d => d.y || 0);
                
                d3Links
                    .attr("x1", select(d => d.source)(s => s.x))
                    .attr("y1", select(d => d.source)(s => s.y))
                    .attr("x2", select(d => d.target)(s => s.x))
                    .attr("y2", select(d => d.target)(s => s.y));
            })
            .force("link", d3.forceLink(edges).distance(50))
            .force("charge", d3.forceManyBody().strength(-50))  // 斥力。負にすることで反発力が働く
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("x", d3.forceX())
            .force("y", d3.forceY());

        // 配置の初期設定。データのdepthに合わせてyを決める
        simulation.nodes().forEach(d => {
            d.fy = d.depth * 30 + height / 2;
        });
    }, [nodes, edges]);

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
}

export const Family: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4">系図</Typography>
            <Paper><FamilyDiagram /></Paper>
        </Box>
    );
}
