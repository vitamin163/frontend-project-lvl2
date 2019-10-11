import yamlParse from 'js-yaml';
import ini from 'ini';


const extensions = {
  '.json': JSON.parse,
  '.yaml': yamlParse.safeLoad,
  '.ini': ini.parse,
};

export default (fileNameExtension, content) => {
  const parsed = extensions[fileNameExtension](content);
  return parsed;
};
