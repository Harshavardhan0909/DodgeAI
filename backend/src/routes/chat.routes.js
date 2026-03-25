import express from "express";
import { isDomainQuery } from "../guardrails/domainGuard.js";
import { translateToSQL } from "../llm/queryTranslator.js";

const router = express.Router();

router.post("/", async (req, res) => {

  const { message } = req.body;

  if (!isDomainQuery(message))
    return res.json({
      answer:
        "This system answers dataset related questions only."
    });

  const sql = await translateToSQL(message);

  res.json({
    generatedSQL: sql,
    answer: "Query generated."
  });
});

export default router;