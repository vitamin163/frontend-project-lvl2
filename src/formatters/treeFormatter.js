const stringify = (value, depth, nested) => {
  const currentDepth = depth + 1;
  const indent = ' '.repeat(currentDepth * 4);
  const tab = ' '.repeat((currentDepth * 4) + 4);
  if (nested) {
    return ['{', `${value}`, `${indent}}`].join('\n');
  }
  if (!(value instanceof Object)) {
    return `${value}`;
  }
  const key = Object.keys(value)[0];
  return ['{', `${tab}${key}: ${value[key]}`, `${indent}}`].join('\n');
};

const render = (ast, depth = 0) => {
  const currentDepth = depth + 1;
  const indent = ' '.repeat(currentDepth * 4);
  const cutIndent = ' '.repeat((currentDepth * 4) - 2);

  const nodeType = {
    nested: (oldValue, newValue, key, children) => `${indent}${key}: ${stringify(render(children, currentDepth), depth, 'nested')}`,
    unchanged: (oldValue, newValue, key) => `${indent}${key}: ${stringify(oldValue, depth)}`,
    changed: (oldValue, newValue, key) => [`${cutIndent}- ${key}: ${stringify(oldValue, depth)}`, `${cutIndent}+ ${key}: ${stringify(newValue, depth)}`],
    added: (oldValue, newValue, key) => `${cutIndent}+ ${key}: ${stringify(newValue, depth)}`,
    removed: (oldValue, newValue, key) => `${cutIndent}- ${key}: ${stringify(oldValue, depth)}`,
  };

  const result = ast.map((obj) => {
    const {
      key, status, oldValue, newValue, children,
    } = obj;
    return nodeType[status](oldValue, newValue, key, children);
  });
  return result.flat(Infinity).join('\n');
};


export default (ast) => `{\n${render(ast)}\n}\n`;
