import fs from "fs";
import { callLLM } from "./llmClient.js";

const template =
  fs.readFileSync("./prompts/sql.prompt.txt", "utf8");

export async function translateToSQL(q) {
  return callLLM(
    template.replace("{{QUESTION}}", q)
  );
}