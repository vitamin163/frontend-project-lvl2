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

test('testFlatYamlBeforetoAfter', () => {
  expect(
    getdiff(`${pathToInputFile}/before.yaml`, `${pathToInputFile}/after.yaml`),
  ).toEqual(fs.readFileSync(`${pathToOutputFile}/beforeToAfter.txt`, 'utf-8'));
});

test('testFlatYamlAfterToBefore', () => {
  expect(
    getdiff(`${pathToInputFile}/after.yaml`, `${pathToInputFile}/before.yaml`),
  ).toEqual(fs.readFileSync(`${pathToOutputFile}/afterToBefore.txt`, 'utf-8'));
});

test('differentFormat', () => {
  expect(
    getdiff(`${pathToInputFile}/before.yaml`, `${pathToInputFile}/after.json`),
  ).toEqual(fs.readFileSync(`${pathToOutputFile}/beforeToAfter.txt`, 'utf-8'));
});
