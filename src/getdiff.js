import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 }).sort();

  const buildNode = (key, status, oldValue, newValue, children) => ({
    key, status, oldValue, newValue, children,
  });

  const comparsion = [
    {
      check: (key) => _.isObject(obj1[key]) && !_.isArray(obj1[key])
        && _.isObject(obj2[key]) && !_.isArray(obj2[key]),
      status: 'children',
    },
    {
      check: (key) => !_.has(obj1, key) && _.has(obj2, key),
      status: 'added',
    },
    {
      check: (key) => _.has(obj1, key) && !_.has(obj2, key),
      status: 'removed',
    },
    {
      check: (key) => JSON.stringify(obj1[key]) === JSON.stringify(obj2[key]),
      status: 'unchanged',
    },
    {
      check: (key) => _.has(obj1, key) && _.has(obj2, key),
      status: 'changed',
    },
  ];
  const compareData = (key) => comparsion.find(({ check }) => check(key));

  const ast = keys.reduce(
    (acc, key) => {
      const { status } = compareData(key);
      const firstValue = obj1[key];
      const secondValue = obj2[key];
      const node = status === 'children' ? buildNode(key, status, null, null, getDiff(firstValue, secondValue)) : buildNode(key, status, firstValue, secondValue, null);
      return [...acc, node];
    },
    [],
  );
  return ast;
};

export default getDiff;
