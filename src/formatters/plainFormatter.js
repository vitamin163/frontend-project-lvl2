const stringify = (value) => {
  if (value instanceof Object) {
    return `${'[complex value]'}`;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return `'${value}'`;
};

const render = (ast, parent = '\nProperty \'') => {
  const nodeType = {
    nested: (oldValue, newValue, key, children) => render(children, parent.concat(`${key}.`)),
    changed: (oldValue, newValue, key) => `${parent}${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,
    unchanged: () => '',
    added: (oldValue, newValue, key) => `${parent}${key}' was added with value: ${stringify(newValue)}`,
    removed: (oldValue, newValue, key) => `${parent}${key}' was removed`,
  };

  const parts = [];

  ast.reduce((acc, obj) => {
    const {
      key, status, oldValue, newValue, children,
    } = obj;
    acc.push(nodeType[status](oldValue, newValue, key, children));
    return acc;
  }, parts);

  return parts.join('');
};

export default (ast) => render(ast).trim();
