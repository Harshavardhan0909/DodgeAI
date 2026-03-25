import express from "express";
import { getGraph } from "../graph/graphStore.js";

const router = express.Router();

router.get("/", (req, res) => {
  const graph = getGraph();
  res.json(graph);
});

export default router;