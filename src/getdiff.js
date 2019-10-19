import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();

  const buildNode = (key, status, oldValue, newValue, children) => ({
    key, status, oldValue, newValue, children,
  });

  const comparsion = [
    {
      check: (key) => _.isObject(obj1[key]) && !_.isArray(obj1[key])
        && _.isObject(obj2[key]) && !_.isArray(obj2[key]),
      process: (key) => buildNode(key, 'nested', null, null, getDiff(obj1[key], obj2[key])),
    },
    {
      check: (key) => !_.has(obj1, key) && _.has(obj2, key),
      process: (key) => buildNode(key, 'added', obj1[key], obj2[key], null),
    },
    {
      check: (key) => _.has(obj1, key) && !_.has(obj2, key),
      process: (key) => buildNode(key, 'removed', obj1[key], obj2[key], null),
    },
    {
      check: (key) => JSON.stringify(obj1[key]) === JSON.stringify(obj2[key]),
      process: (key) => buildNode(key, 'unchanged', obj1[key], obj2[key], null),
    },
    {
      check: (key) => _.has(obj1, key) && _.has(obj2, key),
      process: (key) => buildNode(key, 'changed', obj1[key], obj2[key], null),
    },
  ];
  const compareData = (key) => comparsion.find(({ check }) => check(key));

  const ast = keys.map(
    (key) => {
      const { process } = compareData(key);
      const node = process(key);
      return node;
    },
  );
  return ast;
};

export default getDiff;
