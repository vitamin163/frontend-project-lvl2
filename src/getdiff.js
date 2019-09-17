import _ from 'lodash';
import parse from './parser';

export default (firstConfig, secondConfig) => {
  const obj1 = parse(firstConfig);
  const obj2 = parse(secondConfig);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = [...new Set([...keys1, ...keys2])];

  const diff = keys.reduce(
    (acc, key) => {
      if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key]) {
        return [...acc, `    ${key}: ${obj1[key]}`];
      }
      if (_.has(obj1, key) && _.has(obj2, key)) {
        return [...acc, `  + ${key}: ${obj2[key]}`, `  - ${key}: ${obj1[key]}`];
      }
      if (!_.has(obj1, key) && _.has(obj2, key)) {
        return [...acc, `  + ${key}: ${obj2[key]}`];
      }
      if (_.has(obj1, key) && !_.has(obj2, key)) {
        return [...acc, `  - ${key}: ${obj1[key]}`];
      }
      return acc;
    },
    ['{'],
  );
  const result = [...diff, '}'].join('\n');
  return result;
};
