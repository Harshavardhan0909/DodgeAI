import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { loadDataset } from "./data/datasetLoader.js";

const PORT = process.env.PORT || 5000;

async function start() {
  await loadDataset();
  app.listen(PORT, () =>
    console.log(`Backend running on ${PORT}`)
  );
}

start();