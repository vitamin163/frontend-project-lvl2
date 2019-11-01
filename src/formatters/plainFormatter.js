const stringify = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return `'${value}'`;
};

const render = (ast, pathToNode = '') => {
  const nodeType = {
    nested: (oldValue, newValue, key, children) => render(children, `${pathToNode}${key}.`),
    changed: (oldValue, newValue, key) => `Property '${pathToNode}${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,
    unchanged: () => '',
    added: (oldValue, newValue, key) => `Property '${pathToNode}${key}' was added with value: ${stringify(newValue)}`,
    removed: (oldValue, newValue, key) => `Property '${pathToNode}${key}' was removed`,
  };


  const result = ast.map((obj) => {
    const {
      key, status, oldValue, newValue, children,
    } = obj;
    return nodeType[status](oldValue, newValue, key, children);
  });
  return result.filter((elem) => elem !== '').join('\n');
};


export default (ast) => render(ast).trim();
