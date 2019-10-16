import yamlParse from 'js-yaml';
import ini from 'ini';


const extensions = {
  '.json': JSON.parse,
  '.yaml': yamlParse.safeLoad,
  '.ini': ini.parse,
};

export default (type, data) => {
  const parsed = extensions[type](data);
  return parsed;
};
