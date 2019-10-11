const stringify = (value) => {
  if (value instanceof Object) {
    return `${'[complex value]'}`;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return `'${value}'`;
};

const render = (ast, parent = 'Property \'') => {
  const nodeType = [
    {
      status: (arg) => arg === 'children',
      process: (node, key, oldValue, newValue, accum, children) => [
        ...accum, render(node[children], parent.concat(`${node[key]}.`)),
      ],
    },
    {
      status: (arg) => arg === 'changed',
      process: (node, key, oldValue, newValue, accum) => [
        ...accum, `\n${parent}`, `${node[key]}' was updated. From ${stringify(node[oldValue])} to ${stringify(node[newValue])}`,
      ],
    },
    {
      status: (arg) => arg === 'unchanged',
      process: (node, key, oldValue, newValue, accum) => [...accum],
    },
    {
      status: (arg) => arg === 'added',
      process: (node, key, oldValue, newValue, accum) => [
        ...accum, `\n${parent}`, `${node[key]}' was added with value: ${stringify(node[newValue])}`,
      ],
    },
    {
      status: (arg) => arg === 'removed',
      process: (node, key, oldValue, newValue, accum) => [
        ...accum, `\n${parent}`, `${node[key]}' was removed`,
      ],
    },
  ];

  const checkType = (statusV) => nodeType.find(
    ({ status }) => status(statusV),
  );

  const result = ast.reduce(
    (acc, obj) => {
      const keys = Object.keys(obj);
      const [key, status, oldValue, newValue, children] = keys;
      const { process } = checkType(obj[status]);
      return process(obj, key, oldValue, newValue, acc, children);
    },
    [],
  );
  return result.join('');
};

export default (ast) => render(ast).trim();
