const path = require('path');
const fs = require('fs');

export default (fileName) => {
  const pathToFile = path.resolve('./', fileName);
  const content = fs.readFileSync(pathToFile, 'utf-8');
  return content;
};
