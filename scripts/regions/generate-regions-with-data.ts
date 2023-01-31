import fs from "fs";
// eslint-disable-next-line lodash/import-scope
import { chain } from "lodash";
import * as path from "path";

import { parseCsv } from "@actnowcoalition/actnow.js";

const publicDataDir = path.join(__dirname, "../../public/data");

const inputCsvPath = path.join(publicDataDir, "world-happiness.csv");
const outputCsvPath = path.join(publicDataDir, "regions-with-data.json");

async function main() {
  const csvText = fs.readFileSync(inputCsvPath).toString();
  const rows = parseCsv(csvText);
  // Generates a list of unique region IDs, eliminating empty values
  const regionIdList = chain(rows)
    .map((row) => row.regionId)
    .compact()
    .uniq()
    .value();

  fs.writeFileSync(outputCsvPath, JSON.stringify(regionIdList, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
