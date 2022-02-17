import { readFileSync, writeFileSync } from 'fs';
import { basename } from 'path';

const fileList = process.argv.slice(2);
const outputFilename = 'dep-data.json';

type DependencyVersionMap = {
  [id: string]: string;
};

type NodeVersionMap = {
  [id: string]: DependencyVersionMap;
};

const mergedJson: NodeVersionMap = {};

for (const filename of fileList) {
  const baseFilename = basename(filename);
  console.log('Processing', baseFilename);
  const version = baseFilename.slice(0, baseFilename.length - 5);
  mergedJson[version] = JSON.parse(readFileSync(filename).toString());
}

writeFileSync(outputFilename, JSON.stringify(mergedJson, null, 2));
console.log('Wrote', outputFilename);
