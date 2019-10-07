const yamlParse = require('js-yaml');
const ini = require('ini');

const extensions = {
  '.json': (content) => JSON.parse(content),
  '.yaml': (content) => yamlParse.load(content),
  '.ini': (content) => ini.parse(content),
};

export default (fileNameExtension, content) => {
  const parsed = extensions[fileNameExtension](content);
  return parsed;
};
