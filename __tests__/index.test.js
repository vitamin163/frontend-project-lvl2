import path from 'path';
import fs from 'fs';
import getdiff from '../src';

const pathToInputFile = path.resolve(__dirname, '__fixtures__/inputFile');
const pathToOutputFile = path.resolve(__dirname, '__fixtures__/outputFile');

test('testFlatJsonBeforetoAfter', () => {
  expect(
    getdiff(`${pathToInputFile}/before.json`, `${pathToInputFile}/after.json`),
  ).toEqual(fs.readFileSync(`${pathToOutputFile}/beforeToAfter.txt`, 'utf-8'));
});

test('testFlatJsonAfterToBefore', () => {
  expect(
    getdiff(`${pathToInputFile}/after.json`, `${pathToInputFile}/before.json`),
  ).toEqual(fs.readFileSync(`${pathToOutputFile}/afterToBefore.txt`, 'utf-8'));
});
