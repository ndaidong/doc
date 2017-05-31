#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').execSync;

var bella = require('bellajs');

var {
  rollupify,
  writeFile,
  repository,
  author,
  license,
  name,
  version
} = require('./index');

const ENTRY_PATH = './src/main.js';
const GLOBAL_NAME = 'realdom';
const OUTPUT_DIR = 'dist';

let date = bella.date();
let releaseAt = date.utc();

let minHeader = `// ${name}@${version}, by ${author} - built on ${releaseAt} - published under ${license} license`;

let fullHeader = [
  `/**`,
  ` * ${name}`,
  ` * v${version}`,
  ` * built: ${releaseAt}`,
  ` * ${repository.type}: ${repository.url}`,
  ` * author: ${author}`,
  ` * License: ${license}`,
  `**/`
].join('\n');

var release = (output) => {
  if (fs.existsSync(OUTPUT_DIR)) {
    exec('rm -rf ' + OUTPUT_DIR);
  }
  exec(`mkdir ${OUTPUT_DIR}`);

  writeFile(`${OUTPUT_DIR}/${GLOBAL_NAME}.js`, [fullHeader, output.code].join('\n'));
  writeFile(`${OUTPUT_DIR}/${GLOBAL_NAME}.min.js`, [minHeader, output.minified].join('\n'));
};


let start = async () => {
  let result = await rollupify(ENTRY_PATH, GLOBAL_NAME);
  release(result);
};

module.exports = start();

