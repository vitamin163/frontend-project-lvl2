import path from 'path';
import fs from 'fs';
import getdiff from '../src';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const beforeJson = path.resolve(
  __dirname,
  '__fixtures__/inputFile/JSON/before.json',
);
const afterJson = path.resolve(__dirname, '__fixtures__/inputFile/JSON/after.json');
const beforeIni = path.resolve(__dirname, '__fixtures__/inputFile/INI/before.ini');
const afterIni = path.resolve(__dirname, '__fixtures__/inputFile/INI/after.ini');

const deepBeforeJson = path.resolve(
  __dirname,
  '__fixtures__/inputFile/JSON/deepBefore.json',
);

const deepAfterJson = path.resolve(
  __dirname,
  '__fixtures__/inputFile/JSON/deepAfter.json',
);

const deepBeforeYaml = path.resolve(
  __dirname,
  '__fixtures__/inputFile/YAML/deepBefore.yaml',
);

const deepAfterYaml = path.resolve(
  __dirname,
  '__fixtures__/inputFile/YAML/deepAfter.yaml',
);

const deepBeforeIni = path.resolve(
  __dirname,
  '__fixtures__/inputFile/INI/deepBefore.ini',
);

const deepAfterIni = path.resolve(
  __dirname,
  '__fixtures__/inputFile/INI/deepAfter.ini',
);

const beforeToAfter = readFile(
  path.resolve(__dirname, '__fixtures__/outputFile/beforeToAfter.txt'),
);
const afterToBefore = readFile(
  path.resolve(__dirname, '__fixtures__/outputFile/afterToBefore.txt'),
);

const deepBeforeToAfter = readFile(
  path.resolve(__dirname, '__fixtures__/outputFile/deepBeforeToAfter.txt'),
);
const outputPlainFormat = readFile(
  path.resolve(__dirname, '__fixtures__/outputFile/plain.txt'),
);

const outputJsonFormat = readFile(
  path.resolve(__dirname, '__fixtures__/outputFile/json.txt'),
);

test.each([
  [beforeJson, afterJson, beforeToAfter],
  [afterJson, beforeJson, afterToBefore],
  [beforeIni, afterIni, beforeToAfter],
  [deepBeforeJson, deepAfterJson, deepBeforeToAfter],
  [deepBeforeYaml, deepAfterYaml, deepBeforeToAfter],
  [deepBeforeIni, deepAfterIni, deepBeforeToAfter],
])('.testJsonFormat(%p, %p)', (a, b, expected) => {
  expect(getdiff(a, b, 'default')).toEqual(expected);
});

test('testPlainFormat', () => {
  expect(getdiff(deepBeforeJson, deepAfterJson, 'plain')).toEqual(outputPlainFormat);
});

test('testJsonFormat', () => {
  expect(getdiff(beforeJson, afterJson, 'json')).toEqual(outputJsonFormat);
});
