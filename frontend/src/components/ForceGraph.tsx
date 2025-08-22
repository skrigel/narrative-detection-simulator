
// import React, { useEffect, useRef, useState } from "react";
// import {
//   select,
//   type Selection,
// } from "d3-selection";
// import {
//   forceSimulation,
//   forceManyBody,
//   forceLink,
//   forceCenter,
//   forceX,
//   forceY,
//   type ForceLink,
// } from "d3-force";
// import { drag, type D3DragEvent } from "d3-drag";
import type { SimulationStep, SocialNode, SocialEdge } from "../types/simulation";

// interface ForceGraphProps {
//   steps: SimulationStep[];
//   width?: number;
//   height?: number;
// }

interface VisualEdge extends Omit<SocialEdge, string> {
  source: SocialNode;
  target: SocialNode;
}

// const ForceGraph: React.FC<ForceGraphProps> = ({ steps, width = 900, height = 600 }) => {
//   const svgRef = useRef<SVGSVGElement | null>(null);
//   const [chart, setChart] = useState<{
//     update: (data: { nodes: SocialNode[]; links: VisualEdge[] }) => void;
//   } | null>(null);

//   const allNodes: SocialNode[] = [];
//   const allLinks: SocialEdge[] = [];
//   const seenNodes = new Set<number>();

//   useEffect(() => {
//     const svg = select(svgRef.current)
//       .attr("viewBox", [-width / 2, -height / 2, width, height].join(" "))
//       .attr("style", "max-width: 100%; height: auto; background: #111");

//     const graphGroup = svg.append("g");

//     let linkLayer = graphGroup.append("g").attr("class", "links");
//     let nodeLayer = graphGroup.append("g").attr("class", "nodes");

//     let linkGroup = linkLayer.selectAll<SVGLineElement, VisualEdge>("line");
//     let nodeGroup = nodeLayer.selectAll<SVGCircleElement, SocialNode>("circle");

//     const chartObj = {
//       update({ nodes, links }: { nodes: SocialNode[]; links: VisualEdge[] }) {
//         const oldNodes = new Map<number, SocialNode>(
//           (nodeGroup.data() as SocialNode[]).map(d => [d.id, d])
//         );

//         const newNodes = nodes.map(d => ({ ...oldNodes.get(d.id), ...d }));

//         nodeGroup = nodeLayer
//           .selectAll<SVGCircleElement, SocialNode>("circle")
//           .data(newNodes, d => d.id)
//           .join(
//             enter => enter
//               .append("circle")
//               .attr("r", 6)
//               .attr("fill", d => {
//                 switch (d.ideology) {
//                   case "left": return "#66c2a5";
//                   case "right": return "#fc8d62";
//                   case "centrist": return "#8da0cb";
//                   default: return "#999";
//                 }
//               })
//               .call(
//                 drag<SVGCircleElement, SocialNode>()
//                   .on("start", (event, d) => {
//                     if (!event.active) simulation.alphaTarget(0.3).restart();
//                     d.fx = d.x;
//                     d.fy = d.y;
//                   })
//                   .on("drag", (event, d) => {
//                     d.fx = event.x;
//                     d.fy = event.y;
//                   })
//                   .on("end", (event, d) => {
//                     if (!event.active) simulation.alphaTarget(0);
//                     d.fx = undefined;
//                     d.fy = undefined;
//                   })
//               )
//               .append("title")
//               .text(d => d.name)
        
//           );

//         linkGroup = linkLayer
//             .selectAll<SVGLineElement, VisualEdge>("line") // ✅ explicitly type selection
//             .data(links, (d) => `${d.source.id}-${d.target.id}`) // ✅ now 'd' is typed correctly
//             .join("line")
//             .attr("stroke", "#aaa")
//             .attr("stroke-width", 1.5);

//         simulation.nodes(newNodes);
//         simulation.force<ForceLink<SocialNode, VisualEdge>>("link")?.links(links);
//         simulation.alpha(1).restart();
//       }
//     };

//     const simulation = forceSimulation<SocialNode>()
//       .force("charge", forceManyBody().strength(-100))
//       .force("link", forceLink<SocialNode, VisualEdge>().id(d => d.id).distance(100))
//       .force("x", forceX())
//       .force("y", forceY())
//       .force("center", forceCenter(0, 0))
//       .on("tick", () => {
//         linkGroup
//           .attr("x1", d => d.source.x ?? 0)
//           .attr("y1", d => d.source.y ?? 0)
//           .attr("x2", d => d.target.x ?? 0)
//           .attr("y2", d => d.target.y ?? 0);

//         nodeGroup
//           .attr("cx", d => d.x ?? 0)
//           .attr("cy", d => d.y ?? 0);
//       });


//     setChart(chartObj);
//    return () => {
//     simulation.stop(); // ✅ clean up the simulation properly
//   };
//   }, [width, height]);

//   useEffect(() => {
//     if (!chart || !steps.length) return;

//     let i = 0;
//     const interval = setInterval(() => {
//       if (i >= steps.length) {
//         clearInterval(interval);
//         return;
//       }

//       const step = steps[i];

//       for (const node of step.nodes) {
//         if (!seenNodes.has(node.id)) {
//           seenNodes.add(node.id);
//           allNodes.push(node);
//         }
//       }

//       allLinks.push(...step.links);

//       const nodeMap = new Map<number, SocialNode>();
//       for (const node of allNodes) {
//         nodeMap.set(node.id, node);
//       }

//       const visualEdges: VisualEdge[]  = allLinks
//         .map(edge => {
//           const source = nodeMap.get(edge.source);
//           const target = nodeMap.get(edge.target);
//           if (!source || !target) return null;
//           return { ...edge, source, target };
//         })
//         .filter((e): e is VisualEdge => e !== null);

//       chart.update({ nodes: allNodes, links: visualEdges });
//       i++;
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [chart, steps]);

//   return <svg ref={svgRef} width={width} height={height} />;
// };

// export default ForceGraph;
import React, { useEffect, useRef, useState } from "react";
import {
  select,
  type Selection,
} from "d3-selection";
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  forceX,
  forceY,
  type ForceLink,
} from "d3-force";
import { drag, type D3DragEvent } from "d3-drag";


interface ForceGraphProps {
  steps: SimulationStep[];
  width?: number;
  height?: number;
}



const ForceGraph: React.FC<ForceGraphProps> = ({ steps, width = 900, height = 600 }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const simulationRef = useRef<any>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // State to track all nodes and links accumulated over time
  const [accumulatedData, setAccumulatedData] = useState<{
    nodes: SocialNode[];
    links: VisualEdge[];
  }>({ nodes: [], links: [] });

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = select(svgRef.current)
      .attr("viewBox", [-width / 2, -height / 2, width, height].join(" "))
      .attr("style", "max-width: 100%; height: auto; background: #111");

    // Clear existing content
    svg.selectAll("*").remove();

    const graphGroup = svg.append("g");
    const linkLayer = graphGroup.append("g").attr("class", "links");
    const nodeLayer = graphGroup.append("g").attr("class", "nodes");

    // Create simulation
    const simulation = forceSimulation<SocialNode>()
      .force("charge", forceManyBody().strength(-100))
      .force("link", forceLink<SocialNode, VisualEdge>()
        .id((d) => d.id.toString())
        .distance(50)
        .strength(0.5)
      )
      .force("x", forceX().strength(0.1))
      .force("y", forceY().strength(0.1))
      .force("center", forceCenter(0, 0));

    simulationRef.current = simulation;

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [width, height]);

  // Update visualization when accumulated data changes
  useEffect(() => {
    if (!simulationRef.current || !svgRef.current) return;

    const svg = select(svgRef.current);
    const linkLayer = svg.select("g.links");
    const nodeLayer = svg.select("g.nodes");

    // Update links
    const linkSelection = linkLayer
      .selectAll<SVGLineElement, VisualEdge>("line")
      .data(accumulatedData.links, d => `${d.source.id}-${d.target.id}`);

    linkSelection
      .enter()
      .append("line")
      .attr("stroke", "#666")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.8)
      .merge(linkSelection);

    linkSelection.exit().remove();

    // Update nodes
    const nodeSelection = nodeLayer
      .selectAll<SVGCircleElement, SocialNode>("circle")
      .data(accumulatedData.nodes, d => d.id.toString());

    const nodeEnter = nodeSelection
      .enter()
      .append("circle")
      .attr("r", 6)
      .attr("fill", d => {
        switch (d.ideology) {
          case "left": return "#66c2a5";
          case "right": return "#fc8d62";
          case "centrist": return "#8da0cb";
          default: return "#999";
        }
      })
      .attr("stroke", "#333")
      .attr("stroke-width", 1)
      .call(
        drag<SVGCircleElement, SocialNode>()
          .on("start", (event, d) => {
            if (!event.active) simulationRef.current.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulationRef.current.alphaTarget(0);
            d.fx = undefined;
            d.fy = undefined;
          })
      );

    // Add titles for tooltips
    nodeEnter
      .append("title")
      .text(d => `${d.name} (${d.ideology})`);

    nodeSelection.exit().remove();

    // Update simulation
    simulationRef.current.nodes(accumulatedData.nodes);
    const linkForce = simulationRef.current.force("link") as ForceLink<SocialNode, VisualEdge>;
    if (linkForce) {
      linkForce.links(accumulatedData.links);
    }

    // Set up tick function
    simulationRef.current.on("tick", () => {
      linkLayer
        .selectAll<SVGLineElement, VisualEdge>("line")
        .attr("x1", d => d.source.x ?? 0)
        .attr("y1", d => d.source.y ?? 0)
        .attr("x2", d => d.target.x ?? 0)
        .attr("y2", d => d.target.y ?? 0);

      nodeLayer
        .selectAll<SVGCircleElement, SocialNode>("circle")
        .attr("cx", d => d.x ?? 0)
        .attr("cy", d => d.y ?? 0);
    });

    simulationRef.current.alpha(0.5).restart();
  }, [accumulatedData]);

  // Animation logic - step through the simulation data
  useEffect(() => {
    if (!steps.length) return;

    const seenNodes = new Set<number>();
    const allNodes: SocialNode[] = [];
    const allLinks: SocialEdge[] = [];
    let stepIndex = 0;

    const animate = () => {
      if (stepIndex >= steps.length) return;


      const step = steps[stepIndex];

      const hasNewNodes = step.nodes.length > 0;
      const hasNewLinks = step.links.length > 0;
      
      // If no new nodes or links, skip remaining steps
      if (!hasNewNodes && !hasNewLinks) {
        console.log(`Simulation exhausted at step ${stepIndex} - no new activity`);
        return;
      }
      
      // Add new nodes
      step.nodes.forEach(node => {
        if (!seenNodes.has(node.id)) {
          seenNodes.add(node.id);
          allNodes.push({ ...node });
        }
      });

      // Add new links
      allLinks.push(...step.links);

      // Create node map for quick lookup
      const nodeMap = new Map<number, SocialNode>();
      allNodes.forEach(node => {
        nodeMap.set(node.id, node);
      });

      // Convert links to visual edges with proper node references
      const visualEdges: VisualEdge[] = allLinks
        .map(link => {
          const sourceNode = nodeMap.get(link.source);
          const targetNode = nodeMap.get(link.target);
          
          if (!sourceNode || !targetNode) {
            console.warn(`Missing node for link: ${link.source} -> ${link.target}`);
            return null;
          }
          
          return {
            ...link,
            source: sourceNode,
            target: targetNode
          };
        })
        .filter((edge): edge is VisualEdge => edge !== null);

      // Update accumulated data
      setAccumulatedData({
        nodes: [...allNodes],
        links: visualEdges
      });

      setCurrentStep(stepIndex + 1);
      stepIndex++;
    };

    // Start animation
    animate();
    const interval = setInterval(animate, 1500);

    return () => clearInterval(interval);
  }, [steps]);

  return (
    <div className="w-full">
      <div className="mb-4 text-white">
        Step: {currentStep} / {steps.length}
        <br />
        Nodes: {accumulatedData.nodes.length} | Links: {accumulatedData.links.length}
      </div>
      <svg ref={svgRef} width={width} height={height} className="border border-gray-600" />
    </div>
  );
};

export default ForceGraph;
