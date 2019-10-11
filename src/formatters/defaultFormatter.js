const stringify = (value, depth) => {
  const currentDepth = depth + 1;
  const indent = ' '.repeat(currentDepth * 4);
  const tab = ' '.repeat((currentDepth * 4) + 4);
  if (value instanceof Object) {
    const valueToString = JSON.stringify(value).replace(/["]+/g, '').replace(/:|,/g, (match) => (match === ':' ? ': ' : ', '));
    const firstBrace = valueToString[0];
    const lastBrace = valueToString[valueToString.length - 1];
    const body = valueToString.replace(/[{[\]}]+/g, '');
    return `${firstBrace}\n${tab}${body}\n${indent}${lastBrace}`;
  }
  return `${value}`;
};

const render = (ast, depth = 0) => {
  const currentDepth = depth + 1;
  const indent = ' '.repeat(currentDepth * 4);
  const cutIndent = ' '.repeat((currentDepth * 4) - 2);

  const nodeType = [
    {
      status: (arg) => arg === 'children',
      process: (node, key, oldValue, newValue, accum, children) => [...accum, `\n${indent}${node[key]}: `, '{', ...render(node[children], currentDepth), `\n${indent}}`],
    },
    {
      status: (arg) => arg === 'unchanged',
      process: (node, key, oldValue, newValue, accum) => [
        ...accum, `\n${indent}${node[key]}: `, stringify(node[oldValue], depth),
      ],
    },
    {
      status: (arg) => arg === 'changed',
      process: (node, key, oldValue, newValue, accum) => [
        ...accum, `\n${cutIndent}- ${node[key]}: `, stringify(node[oldValue], depth), `\n${cutIndent}+ ${node[key]}: `, stringify(node[newValue], depth),
      ],
    },
    {
      status: (arg) => arg === 'added',
      process: (node, key, oldValue, newValue, accum) => [
        ...accum, `\n${cutIndent}+ ${node[key]}: `, stringify(node[newValue], depth),
      ],
    },
    {
      status: (arg) => arg === 'removed',
      process: (node, key, oldValue, newValue, accum) => [
        ...accum, `\n${cutIndent}- ${node[key]}: `, stringify(node[oldValue], depth),
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
    [''],
  );
  return result;
};

export default (ast) => ['{', ...render(ast), '\n}\n'].join('');
