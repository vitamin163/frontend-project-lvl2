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
  const nodeType = {
    nested: (node, key, oldValue, newValue, children) => [render(node[children], parent.concat(`${node[key]}.`))].join(''),
    changed: (node, key, oldValue, newValue) => [`\n${parent}${node[key]}' was updated. From ${stringify(node[oldValue])} to ${stringify(node[newValue])}`],
    unchanged: () => [],
    added: (node, key, oldValue, newValue) => [`\n${parent}${node[key]}' was added with value: ${stringify(node[newValue])}`],
    removed: (node, key) => [`\n${parent}${node[key]}' was removed`],
  };

  const result = ast.map(
    (obj) => {
      const keys = Object.keys(obj);
      const [key, status, oldValue, newValue, children] = keys;
      const type = obj[status];
      return nodeType[type](obj, key, oldValue, newValue, children);
    },
  );
  return result.join('');
};

export default (ast) => render(ast).trim();
