import Database from "better-sqlite3";

const db = new Database(process.env.DB_PATH);

db.exec(`
CREATE TABLE IF NOT EXISTS sales_orders(
 id TEXT PRIMARY KEY,
 raw JSON
)
`);

export default db;