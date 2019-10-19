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

  const nodeType = {
    nested: (node, key, oldValue, newValue, children) => [`\n${indent}${node[key]}: `, '{', ...render(node[children], currentDepth), `\n${indent}}`].join(''),
    unchanged: (node, key, oldValue) => [`\n${indent}${node[key]}: ${stringify(node[oldValue], depth)}`],
    changed: (node, key, oldValue, newValue) => [`\n${cutIndent}- ${node[key]}: ${stringify(node[oldValue], depth)}\n${cutIndent}+ ${node[key]}: ${stringify(node[newValue], depth)}`],
    added: (node, key, oldValue, newValue) => [`\n${cutIndent}+ ${node[key]}: ${stringify(node[newValue], depth)}`],
    removed: (node, key, oldValue) => [`\n${cutIndent}- ${node[key]}: ${stringify(node[oldValue], depth)}`],
  };

  const result = ast.map(
    (obj) => {
      const keys = Object.keys(obj);
      const [key, status, oldValue, newValue, children] = keys;
      const type = obj[status];
      return nodeType[type](obj, key, oldValue, newValue, children);
    },
  );
  return result;
};

export default (ast) => ['{', ...render(ast), '\n}\n'].join('');
