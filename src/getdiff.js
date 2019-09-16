import _ from 'lodash';

const fs = require('fs');
const path = require('path');

export default (firstConfig, secondConfig) => {
  const pathToFirstFile = path.resolve('./', firstConfig);
  const pathToSecondFile = path.resolve('./', secondConfig);

  const data1 = fs.readFileSync(pathToFirstFile, 'utf-8');
  const data2 = fs.readFileSync(pathToSecondFile, 'utf-8');

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = [...new Set([...keys1, ...keys2])];

  const diff = keys.reduce(
    (acc, key) => {
      if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key]) {
        return [...acc, `    ${key}: ${obj1[key]}\n`];
      }
      if (_.has(obj1, key) && _.has(obj2, key)) {
        return [
          ...acc,
          `  + ${key}: ${obj2[key]}\n`,
          `  - ${key}: ${obj1[key]}\n`,
        ];
      }
      if (!_.has(obj1, key) && _.has(obj2, key)) {
        return [...acc, `  + ${key}: ${obj2[key]}\n`];
      }
      if (_.has(obj1, key) && !_.has(obj2, key)) {
        return [...acc, `  - ${key}: ${obj1[key]}\n`];
      }
      return acc;
    },
    ['{\n'],
  );
  const result = [...diff, '}'].join('');
  return result;
};
