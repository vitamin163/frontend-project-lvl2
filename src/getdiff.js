import _ from 'lodash';

const buildAst = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const keys = [...new Set([...keys1, ...keys2])].sort();
  const propertyActions = [
    {
      check: (arg) => obj1[arg] instanceof Object
        && !Array.isArray(obj1[arg]) && obj2[arg] instanceof Object
        && !Array.isArray(obj2[arg]),
      status: 'children',
      oldVal: () => { },
      newVal: (arg) => buildAst(obj1[arg], obj2[arg]),
    },
    {
      check: (arg) => !_.has(obj1, arg) && _.has(obj2, arg),
      status: 'added',
      oldVal: (arg) => obj1[arg],
      newVal: (arg) => obj2[arg],
    },
    {
      check: (arg) => _.has(obj1, arg) && !_.has(obj2, arg),
      status: 'removed',
      oldVal: (arg) => obj1[arg],
      newVal: (arg) => obj2[arg],
    },
    {
      check: (arg) => JSON.stringify(obj1[arg]) === JSON.stringify(obj2[arg]),
      status: 'unchanged',
      oldVal: (arg) => obj1[arg],
      newVal: (arg) => obj2[arg],
    },
    {
      check: (arg) => _.has(obj1, arg) && _.has(obj2, arg),
      status: 'changed',
      oldVal: (arg) => obj1[arg],
      newVal: (arg) => obj2[arg],
    },
  ];
  const getPropertyActions = (arg) => propertyActions.find(({ check }) => check(arg));

  const diff = keys.reduce(
    (acc, key) => {
      const { status, oldVal, newVal } = getPropertyActions(key);
      const node = {
        key, status, oldValue: oldVal(key), newValue: newVal(key),
      };

      return [...acc, node];
    },
    [],
  );
  return diff;
};

export default buildAst;
