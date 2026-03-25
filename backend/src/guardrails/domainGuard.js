// export function isDomainQuery(q) {
//   const allowed = [
//     "order",
//     "delivery",
//     "invoice",
//     "payment",
//     "billing",
//     "customer"
//   ];

//   return allowed.some(k =>
//     q.toLowerCase().includes(k)
//   );
// }

import fs from "fs";
import path from "path";

const DATA_ROOT = process.env.DATASET_PATH;

/*
  Load dataset entities dynamically
*/
function getDatasetEntities() {

  if (!DATA_ROOT) return [];

  return fs.readdirSync(DATA_ROOT)
    .filter(name =>
      fs.statSync(path.join(DATA_ROOT, name)).isDirectory()
    );
}

/*
  DOMAIN GUARD
*/
export function isDomainQuery(message) {

  if (!message) return false;

  const query = message.toLowerCase();

  const entities = getDatasetEntities();

  // allow if query mentions any table
  return entities.some(entity =>
    query.includes(entity.toLowerCase())
  );
}