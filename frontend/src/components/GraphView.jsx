// import { useEffect } from "react";
// import cytoscape from "cytoscape";
// import { api } from "../api";

// export default function GraphView() {

//   useEffect(() => {
//     api.get("/graph").then(res => {

//       cytoscape({
//         container: document.getElementById("graph"),
//         elements: [
//           ...res.data.nodes,
//           ...res.data.edges
//         ],
//         style: [{
//           selector: "node",
//           style: { label: "data(label)" }
//         }]
//       });

//     });
//   }, []);

//   return <div id="graph" className="graph"/>;
// }

import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import { api } from "../api";   // ✅ FIXED IMPORT

export default function GraphView() {
  const cyRef = useRef(null);

  useEffect(() => {
    async function loadGraph() {
      try {
        const res = await api.get("/graph");

        const { nodes = [], edges = [] } = res.data;

        if (!cyRef.current) return;

        cytoscape({
          container: cyRef.current,

          elements: [...nodes, ...edges],

          style: [
      {
          selector: "node",
          style: {
          label: "data(label)",
          "text-wrap": "wrap",
          "text-max-width": "80px",
          "font-size": "8px",
          "background-color": "#2563eb",
          color: "#fff",
          "text-valign": "center",
          "text-halign": "center"
          },
          },
            {
              selector: "edge",
              style: {
                width: 2,
                "line-color": "#999",
                "target-arrow-shape": "triangle",
                "target-arrow-color": "#999",
              },
            },
          ],

          layout: {
            name: "cose",
            animate: true,
            fit: true,
            padding: 50,
          },
        });
      } catch (err) {
        console.error("Graph load failed:", err);
      }
    }

    loadGraph();
  }, []);

  return (
    <div
      className="graph"
      ref={cyRef}
    />
  );
}