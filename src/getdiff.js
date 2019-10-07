import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 }).sort();

  const comparsion = [
    {
      check: (key) => _.isObject(obj1[key]) && !_.isArray(obj1[key])
        && _.isObject(obj2[key]) && !_.isArray(obj2[key]),
      status: 'children',
      oldValue: () => { },
      newValue: (key) => getDiff(obj1[key], obj2[key]),
    },
    {
      check: (key) => !_.has(obj1, key) && _.has(obj2, key),
      status: 'added',
      oldValue: (key) => obj1[key],
      newValue: (key) => obj2[key],
    },
    {
      check: (key) => _.has(obj1, key) && !_.has(obj2, key),
      status: 'removed',
      oldValue: (key) => obj1[key],
      newValue: (key) => obj2[key],
    },
    {
      check: (key) => JSON.stringify(obj1[key]) === JSON.stringify(obj2[key]),
      status: 'unchanged',
      oldValue: (key) => obj1[key],
      newValue: (key) => obj2[key],
    },
    {
      check: (key) => _.has(obj1, key) && _.has(obj2, key),
      status: 'changed',
      oldValue: (key) => obj1[key],
      newValue: (key) => obj2[key],
    },
  ];
  const compareData = (key) => comparsion.find(({ check }) => check(key));

  const ast = keys.reduce(
    (acc, key) => {
      const { status, oldValue, newValue } = compareData(key);
      const node = {
        key, status, oldValue: oldValue(key), newValue: newValue(key),
      };

      return [...acc, node];
    },
    [],
  );
  return ast;
};

export default getDiff;
