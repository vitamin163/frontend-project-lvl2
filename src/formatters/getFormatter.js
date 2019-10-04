import defaultFormatter from './defaultFormatter';
import plainFormatter from './plainFormatter';
import jsonFormatter from './jsonFormatter';

export default (content, format) => {
  const formatType = {
    default: (ast) => defaultFormatter(ast),
    plain: (ast) => plainFormatter(ast),
    json: (ast) => jsonFormatter(ast),
  };
  return formatType[format](content);
};
