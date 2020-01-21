import * as fs from "fs-extra";
import * as path from "path";

import { getRegions } from "./regions";

function outputJson(filePath: string, data: any) {
  fs.outputJson(path.resolve(__dirname, filePath), data, { spaces: 2 });
}

outputJson("../../src/data/regions.json", getRegions());
