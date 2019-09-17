const yamlParse = require('js-yaml');
const fs = require('fs');
const path = require('path');

const fileType = {
  json: (file) => JSON.parse(file),
  yaml: (file) => yamlParse.load(file),
};

export default (file) => {
  const pathToFile = path.resolve('./', file);
  const content = fs.readFileSync(pathToFile, 'utf-8');
  const type = file.split('.').pop();
  const parse = fileType[type](content);
  return parse;
};
