import * as fs from 'fs-extra';
import * as path from 'path';

import { getRegions } from './regions';
import { getStartingRegions } from './starting_regions';

// common
import { getFactions } from './common/factions';

function outputJson(filePath: string, data: any) {
  fs.outputJson(path.resolve(__dirname, filePath), data, { spaces: 2 });
}

getRegions().then(result => outputJson('../../src/data/regions.json', result));
getStartingRegions().then(result => outputJson('../../src/data/starting_regions.json', result));

getFactions().then(result => outputJson('../../src/data/common/factions.json', result));
