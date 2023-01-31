import { parse as csvParseSync } from "csv-parse/sync";
import fs from "fs";
// eslint-disable-next-line lodash/import-scope
import { chain } from "lodash";
import * as path from "path";

const publicDataDir = path.join(__dirname, "../../public/data");

const inputCsvPath = path.join(publicDataDir, "world-happiness.csv");
const outputCsvPath = path.join(publicDataDir, "regions-with-data.json");

async function main() {
  const rows = readCsvFile(inputCsvPath);
  // Generates a list of unique region IDs, eliminating empty values
  const regionIdList = chain(rows)
    .map((region) => region.regionId)
    .compact()
    .uniq()
    .value();

  fs.writeFileSync(outputCsvPath, JSON.stringify(regionIdList, null, 2));
}

function readCsvFile(csvPath: string) {
  const csvContent = fs.readFileSync(csvPath).toString();
  return csvParseSync(csvContent, { columns: true });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
