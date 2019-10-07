const path = require('path');
const yamlParse = require('js-yaml');
const ini = require('ini');

const formatType = {
  '.json': (content) => JSON.parse(content),
  '.yaml': (content) => yamlParse.load(content),
  '.ini': (content) => ini.parse(content),
};

export default (fileName, content) => {
  const format = path.extname(fileName);
  const parsed = formatType[format](content);
  return parsed;
};
