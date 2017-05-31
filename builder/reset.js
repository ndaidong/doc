#!/usr/bin/env node

var {join} = require('path');
var exec = require('child_process').execSync;

var dirs = [
  join(__dirname, '../dist'),
  join(__dirname, '../docs'),
  join(__dirname, '../node_modules')
];

dirs.forEach((d) => {
  exec(`rm -rf ${d}`);
});

exec('rm package-lock.json');

