// import fs from "fs";
// import path from "path";
// import db from "../config/db.js";
// import { readJSONL } from "../utils/jsonlReader.js";
// import { graph } from "../graph/graphStore.js";

// /**
//  * Loads SAP dataset
//  * ✅ Stores rows in DB
//  * ✅ Builds GRAPH at ENTITY LEVEL (not row level)
//  */

// export async function loadDataset() {

//   const rootPath = process.env.DATASET_PATH;

//   if (!rootPath || !fs.existsSync(rootPath)) {
//     console.error("Dataset path not found:", rootPath);
//     return;
//   }

//   const entityFolders = fs
//     .readdirSync(rootPath)
//     .filter(f =>
//       fs.statSync(path.join(rootPath, f)).isDirectory()
//     );

//   console.log("Entities detected:", entityFolders);

//   /* ----------------------------------
//      CREATE ONE NODE PER ENTITY
//   -----------------------------------*/

//   graph.nodes.length = 0;
//   graph.edges.length = 0;

//   entityFolders.forEach(entity => {
//     graph.nodes.push({
//       data: {
//         id: entity,
//         label: entity.replaceAll("_", " ")
//       }
//     });
//   });

//   /* ----------------------------------
//      LOAD DATA INTO SQLITE ONLY
//   -----------------------------------*/

//   for (const entity of entityFolders) {

//     const entityPath = path.join(rootPath, entity);

//     const files = fs
//       .readdirSync(entityPath)
//       .filter(f => f.endsWith(".jsonl"));

//     console.log(`Loading ${entity} (${files.length} files)`);

//     for (const file of files) {

//       const rows = await readJSONL(
//         path.join(entityPath, file)
//       );

//       rows.forEach((row, index) => {

//         const id =
//           row.id ||
//           row.sales_order ||
//           row.delivery_document ||
//           row.billing_document ||
//           `${entity}_${index}`;

//         db.prepare(`
//           INSERT OR IGNORE INTO sales_orders(id, raw)
//           VALUES (?,?)
//         `).run(
//           `${entity}_${id}`,
//           JSON.stringify(row)
//         );
//       });
//     }
//   }

//   /* ----------------------------------
//      ENTITY RELATIONSHIPS (SAP O2C)
//   -----------------------------------*/

//   const relations = [
//     ["sales_order_headers", "sales_order_items"],
//     ["sales_order_headers", "sales_order_schedule_lines"],

//     ["sales_order_headers", "outbound_delivery_headers"],
//     ["outbound_delivery_headers", "outbound_delivery_items"],

//     ["outbound_delivery_headers", "billing_document_headers"],
//     ["billing_document_headers", "billing_document_items"],

//     ["billing_document_headers", "payments_accounts_receivable"],

//     ["business_partners", "business_partner_addresses"],

//     ["products", "product_descriptions"],
//     ["products", "product_plants"]
//   ];

//   relations.forEach(([source, target]) => {
//     if (
//       entityFolders.includes(source) &&
//       entityFolders.includes(target)
//     ) {
//       graph.edges.push({
//         data: {
//           id: `${source}-${target}`,
//           source,
//           target
//         }
//       });
//     }
//   });

//   console.log(
//     `Graph built: ${graph.nodes.length} nodes, ${graph.edges.length} edges`
//   );
// }


import fs from "fs";
import path from "path";

/*
  GLOBAL DATA STORE
  (accessible from anywhere in backend)
*/
export let DATASET_TABLES = [];

// safer env access
function getDatasetRoot() {
  const datasetPath = process.env.DATASET_PATH;

  if (!datasetPath) {
    throw new Error("DATASET_PATH missing in .env");
  }

  return path.resolve(datasetPath);
}

/*
  Returns SAP tables (folder names)
*/
export function loadDatasetTables() {
  const DATA_ROOT = getDatasetRoot();

  if (!fs.existsSync(DATA_ROOT)) {
    throw new Error(`Dataset folder not found: ${DATA_ROOT}`);
  }

  const folders = fs.readdirSync(DATA_ROOT);

  return folders.filter((name) => {
    const full = path.join(DATA_ROOT, name);
    return fs.statSync(full).isDirectory();
  });
}

/*
  Main dataset loader
*/
export async function loadDataset() {
  console.log("Loading dataset...");

  const DATA_ROOT = getDatasetRoot();
  console.log("Dataset path:", DATA_ROOT);

  // ✅ SAVE GLOBALLY
  DATASET_TABLES = loadDatasetTables();

  console.log(`✅ Loaded ${DATASET_TABLES.length} tables`);
  console.log(DATASET_TABLES);

  return DATASET_TABLES;
}