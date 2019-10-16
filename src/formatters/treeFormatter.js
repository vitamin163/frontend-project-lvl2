const stringify = (value, depth) => {
  const currentDepth = depth + 1;
  const indent = ' '.repeat(currentDepth * 4);
  const tab = ' '.repeat((currentDepth * 4) + 4);
  if (!(value instanceof Object)) {
    return `${value}`;
  }
  const valueToString = JSON.stringify(value).replace(/["]+/g, '').replace(/:|,/g, (match) => (match === ':' ? ': ' : ', '));
  const firstBrace = valueToString[0];
  const lastBrace = valueToString[valueToString.length - 1];
  const body = valueToString.replace(/[{[\]}]+/g, '');
  return `${firstBrace}\n${tab}${body}\n${indent}${lastBrace}`;
};

const render = (ast, depth = 0) => {
  const currentDepth = depth + 1;
  const indent = ' '.repeat(currentDepth * 4);
  const cutIndent = ' '.repeat((currentDepth * 4) - 2);

  const nodeType = [
    {
      state: 'nested',
      process: (node, key, oldValue, newValue, accum, children) => [...accum, `\n${indent}${node[key]}: `, '{', ...render(node[children], currentDepth), `\n${indent}}`],
    },
    {
      state: 'unchanged',
      process: (node, key, oldValue, newValue, accum) => [
        ...accum, `\n${indent}${node[key]}: `, stringify(node[oldValue], depth),
      ],
    },
    {
      state: 'changed',
      process: (node, key, oldValue, newValue, accum) => [
        ...accum, `\n${cutIndent}- ${node[key]}: `, stringify(node[oldValue], depth), `\n${cutIndent}+ ${node[key]}: `, stringify(node[newValue], depth),
      ],
    },
    {
      state: 'added',
      process: (node, key, oldValue, newValue, accum) => [
        ...accum, `\n${cutIndent}+ ${node[key]}: `, stringify(node[newValue], depth),
      ],
    },
    {
      state: 'removed',
      process: (node, key, oldValue, newValue, accum) => [
        ...accum, `\n${cutIndent}- ${node[key]}: `, stringify(node[oldValue], depth),
      ],
    },
  ];

  const result = ast.reduce(
    (acc, obj) => {
      const keys = Object.keys(obj);
      const [key, status, oldValue, newValue, children] = keys;
      const { process } = nodeType.find(({ state }) => state === obj[status]);
      return process(obj, key, oldValue, newValue, acc, children);
    },
    [''],
  );
  return result;
};

export default (ast) => ['{', ...render(ast), '\n}\n'].join('');
