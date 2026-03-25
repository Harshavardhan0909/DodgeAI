import fs from "fs";
import readline from "readline";

export async function readJSONL(filePath) {
  const stream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: stream
  });

  const rows = [];

  for await (const line of rl) {
    if (line.trim())
      rows.push(JSON.parse(line));
  }

  return rows;
}