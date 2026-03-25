// import { graph } from "./graphStore.js";

// /* ---------- ADD NODE ---------- */
// export function addNode(id, type, data = {}) {
//   const nodeId = `${type}_${id}`;

//   // prevent duplicates
//   const exists = graph.nodes.find(n => n.data.id === nodeId);
//   if (exists) return nodeId;

//   graph.nodes.push({
//     data: {
//       id: nodeId,
//       label: `${type}: ${id}`,
//       type,
//       ...data
//     }
//   });

//   return nodeId;
// }

// /* ---------- ADD EDGE ---------- */
// export function addEdge(source, target, relation = "related") {
//   graph.edges.push({
//     data: {
//       id: `${source}_${target}`,
//       source,
//       target,
//       label: relation
//     }
//   });
// }

// /* ---------- CLEAR GRAPH ---------- */
// export function resetGraph() {
//   graph.nodes.length = 0;
//   graph.edges.length = 0;
// }



// import { graph } from "./graphStore.js";

// /**
//  * Add Node
//  */
// export function addNode(id, type, data = {}) {

//   const nodeId = `${type}_${id}`;

//   // ✅ fast duplicate checkk
//   if (graph.nodeIndex.has(nodeId)) return;

//   graph.nodeIndex.add(nodeId);

//   graph.nodes.push({
//     data: {
//       id: nodeId,
//       label: type,
//       type,
//       ...data
//     }
//   });
// }

// /**
//  * Add Edge
//  */
// export function addEdge(sourceType, sourceId, targetType, targetId, relation = "related") {

//   const source = `${sourceType}_${sourceId}`;
//   const target = `${targetType}_${targetId}`;
//   const edgeId = `${source}_${relation}_${target}`;

//   // ✅ prevent duplicates
//   if (graph.edgeIndex.has(edgeId)) return;

//   graph.edgeIndex.add(edgeId);

//   graph.edges.push({
//     data: {
//       id: edgeId,
//       source,
//       target,
//       label: relation
//     }
//   });
// }


import { loadDatasetTables } from "../data/datasetLoader.js";


export function buildGraph() {
  const tables = loadDatasetTables();

  const nodes = [];
  const edges = [];

  /*
    Create ONE NODE per TABLE
  */
  tables.forEach((table) => {
    nodes.push({
      data: {
        id: table,
        label: table.replaceAll("_", " "),
      },
    });
  });

  /*
    SAP Order-to-Cash Relationships
  */
  const relations = [
    ["sales_order_headers", "sales_order_items"],
    ["sales_order_headers", "sales_order_schedule_lines"],

    ["sales_order_headers", "outbound_delivery_headers"],
    ["outbound_delivery_headers", "outbound_delivery_items"],

    ["outbound_delivery_headers", "billing_document_headers"],
    ["billing_document_headers", "billing_document_items"],

    ["billing_document_headers", "payments_accounts_receivable"],

    ["business_partners", "business_partner_addresses"],

    ["products", "product_descriptions"],
    ["products", "product_plants"],
  ];

  relations.forEach(([source, target]) => {
    if (tables.includes(source) && tables.includes(target)) {
      edges.push({
        data: {
          id: `${source}-${target}`,
          source,
          target,
        },
      });
    }
  });

  return { nodes, edges };
}