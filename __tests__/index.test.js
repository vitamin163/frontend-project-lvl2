import path from 'path';
import fs from 'fs';
import getdiff from '../src';

const formats = ['json', 'yaml', 'ini'];

const getFixturePath = (name) => path.join(__dirname, '__fixtures__', name);

test.each(formats)('Comparison of nested structure %s', (format) => {
  const deepBefore = getFixturePath(`deepBefore.${format}`);
  const deepAfter = getFixturePath(`deepAfter.${format}`);
  const deepBeforeToAfter = fs.readFileSync(getFixturePath('deepBeforeToAfter.txt'), 'utf-8');
  expect(getdiff(deepBefore, deepAfter, 'default')).toEqual(deepBeforeToAfter);
});

test.each(formats)('Output format selection %s', (format) => {
  const before = getFixturePath(`before.${format}`);
  const after = getFixturePath(`after.${format}`);
  const deepBefore = getFixturePath(`deepBefore.${format}`);
  const deepAfter = getFixturePath(`deepAfter.${format}`);
  const defaultFormat = fs.readFileSync(getFixturePath('beforeToAfter.txt'), 'utf-8');
  const reverseDefaultFormat = fs.readFileSync(getFixturePath('afterToBefore.txt'), 'utf-8');
  const plainFormat = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
  const jsonFormat = fs.readFileSync(getFixturePath('json.txt'), 'utf-8');
  expect(getdiff(deepBefore, deepAfter, 'plain')).toEqual(plainFormat);
  expect(getdiff(before, after, 'json')).toEqual(jsonFormat);
  expect(getdiff(before, after, 'default')).toEqual(defaultFormat);
  expect(getdiff(after, before, 'default')).toEqual(reverseDefaultFormat);
});
