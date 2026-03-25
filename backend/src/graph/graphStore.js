/**
 * In-memory Graph Store
 * Used by graphBuilder + datasetLoader
 */



// export const graph = {
//   nodes: [],
//   edges: [],

//   // fast lookup maps (avoid duplicates)
//   nodeIndex: new Set(),
//   edgeIndex: new Set()
// };

// /**
//  * Reset graph (used before dataset reload)
//  */
// export function resetGraph() {
//   graph.nodes.length = 0;
//   graph.edges.length = 0;
//   graph.nodeIndex.clear();
//   graph.edgeIndex.clear();
// }



import { buildGraph } from "./graphBuilder.js";

let graphCache = null;

export function getGraph() {
  if (!graphCache) {
    console.log("Building SAP graph...");
    graphCache = buildGraph();
  }

  return graphCache;
}