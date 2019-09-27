const yamlParse = require('js-yaml');
const fs = require('fs');
const path = require('path');
const ini = require('ini');

const formatType = {
  json: (content) => JSON.parse(content),
  yaml: (content) => yamlParse.load(content),
  ini: (content) => ini.parse(content),
};

export default (fileName) => {
  const pathToFile = path.resolve('./', fileName);
  const content = fs.readFileSync(pathToFile, 'utf-8');
  const format = fileName.split('.').pop();
  const parsed = formatType[format](content);
  return parsed;
};
