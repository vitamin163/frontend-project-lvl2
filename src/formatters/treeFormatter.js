const stringify = (value, depth) => {
  const currentDepth = depth + 1;
  const indent = `\n${' '.repeat(currentDepth * 4)}`;
  const tab = `\n${' '.repeat((currentDepth * 4) + 4)}`;
  if (!(value instanceof Object)) {
    return `${value}`;
  }
  const valueToString = JSON.stringify(value).replace(/["]+/g, '').replace(/:|,/g, (match) => (match === ':' ? ': ' : ', '));
  const firstBrace = valueToString[0];
  const lastBrace = valueToString[valueToString.length - 1];
  const body = valueToString.replace(/[{[\]}]+/g, '');
  return `${firstBrace}${tab}${body}${indent}${lastBrace}`;
};

const render = (ast, depth = 0) => {
  const currentDepth = depth + 1;
  const indent = `\n${' '.repeat(currentDepth * 4)}`;
  const cutIndent = `\n${' '.repeat((currentDepth * 4) - 2)}`;

  const parts = [];

  const nodeType = {
    nested: (oldValue, newValue, key, children) => `${indent}${key}: {${render(children, currentDepth)}${indent}}`,
    unchanged: (oldValue, newValue, key) => `${indent}${key}: ${stringify(oldValue, depth)}`,
    changed: (oldValue, newValue, key) => `${cutIndent}- ${key}: ${stringify(oldValue, depth)}${cutIndent}+ ${key}: ${stringify(newValue, depth)}`,
    added: (oldValue, newValue, key) => `${cutIndent}+ ${key}: ${stringify(newValue, depth)}`,
    removed: (oldValue, newValue, key) => `${cutIndent}- ${key}: ${stringify(oldValue, depth)}`,
  };

  ast.reduce((acc, obj) => {
    const {
      key, status, oldValue, newValue, children,
    } = obj;
    acc.push(nodeType[status](oldValue, newValue, key, children));
    return acc;
  }, parts);

  return parts.join('');
};

export default (ast) => ['{', ...render(ast), '\n}\n'].join('');
