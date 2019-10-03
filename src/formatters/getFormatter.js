import defaultFormatter from './defaultFormatter';
import plainFormatter from './plainFormatter';

export default (content, format) => {
  const formatType = {
    default: (ast) => defaultFormatter(ast),
    plain: (ast) => plainFormatter(ast),
  };
  return formatType[format](content);
};
