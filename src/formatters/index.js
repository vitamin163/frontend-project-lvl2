import defaultFormatter from './defaultFormatter';
import plainFormatter from './plainFormatter';
import jsonFormatter from './jsonFormatter';

export default (content, format) => {
  const formatType = {
    default: defaultFormatter,
    plain: plainFormatter,
    json: jsonFormatter,
  };
  return formatType[format](content);
};
