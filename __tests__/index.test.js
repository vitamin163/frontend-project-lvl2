import path from 'path';
import fs from 'fs';
import getdiff from '../src';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const beforeJson = path.resolve(
  __dirname,
  '__fixtures__/inputFile/before.json',
);
const afterJson = path.resolve(__dirname, '__fixtures__/inputFile/after.json');
const beforeIni = path.resolve(__dirname, '__fixtures__/inputFile/before.ini');
const afterIni = path.resolve(__dirname, '__fixtures__/inputFile/after.ini');

const beforeToAfter = readFile(
  path.resolve(__dirname, '__fixtures__/outputFile/beforeToAfter.txt'),
);
const afterToBefore = readFile(
  path.resolve(__dirname, '__fixtures__/outputFile/afterToBefore.txt'),
);

test.each([
  [beforeJson, afterJson, beforeToAfter],
  [afterJson, beforeJson, afterToBefore],
  [beforeIni, afterIni, beforeToAfter],
])('.flatTest(%p, %p)', (a, b, expected) => {
  expect(getdiff(a, b)).toEqual(expected);
});
