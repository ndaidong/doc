/**
 * Check built-files to ensure they have been regenated correctly
 * @ndaidong
 */

const {existsSync, readFileSync} = require('fs');

const pkgFake = require('../package.json');
const proFile = './dist/realdom.js';
const devFile = './dist/realdom.min.js';

describe('Validate production output', () => {
  it('Production file must be generated', () => {
    expect(existsSync(proFile)).toBe(true);
  });

  const content = readFileSync(proFile, 'utf8');
  const arr = content.split('\n');
  it('Production file must be not empty', () => {
    expect(content.length).toBeGreaterThan(0);
    expect(arr.length).toBeGreaterThan(5);
  });

  it('Package name must be correct', () => {
    expect(arr[1]).toMatch(`* ${pkgFake.name}@${pkgFake.version}`);
  });
  it('Package built time must be showed', () => {
    expect(arr[2]).toMatch(`* built on:`);
  });
  it('Package repository must be correct', () => {
    expect(arr[3]).toMatch(`* repository: ${pkgFake.repository.url}`);
  });
  it('Package author must be correct', () => {
    expect(arr[4]).toMatch(`* maintainer: ${pkgFake.author}`);
  });
  it('Package license must be correct', () => {
    expect(arr[5]).toMatch(`* License: ${pkgFake.license}`);
  });
});

describe('Validate development output', () => {
  it('Development file must be generated', () => {
    expect(existsSync(devFile)).toBe(true);
  });

  const content = readFileSync(devFile, 'utf8');
  const arr = content.split('\n');
  it('Development file must be not empty', () => {
    expect(content.length).toBeGreaterThan(0);
    expect(arr.length).toBeGreaterThan(1);
  });

  const topLine = arr[0];
  it('Package must be presented with name and version', () => {
    expect(topLine).toMatch(`${pkgFake.name}@${pkgFake.version}`);
  });
  it('Package author must be included', () => {
    expect(topLine).toMatch(`${pkgFake.author}`);
  });
  it('Package license must be included', () => {
    expect(topLine).toMatch(`${pkgFake.license}`);
  });
});
