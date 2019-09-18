const yamlParse = require('js-yaml');
const fs = require('fs');
const path = require('path');
const ini = require('ini');

const fileType = {
  json: (file) => JSON.parse(file),
  yaml: (file) => yamlParse.load(file),
  ini: (file) => ini.parse(file),
};

export default (file) => {
  const pathToFile = path.resolve('./', file);
  const content = fs.readFileSync(pathToFile, 'utf-8');
  const type = file.split('.').pop();
  const parse = fileType[type](content);
  return parse;
};
