import yamlParse from 'js-yaml';
import ini from 'ini';


const parsers = {
  json: JSON.parse,
  yaml: yamlParse.safeLoad,
  ini: ini.parse,
};

export default (type, data) => {
  const parsed = parsers[type](data);
  return parsed;
};
