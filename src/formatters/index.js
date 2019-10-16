import treeFormatter from './treeFormatter';
import plainFormatter from './plainFormatter';
import jsonFormatter from './jsonFormatter';

export default (content, format) => {
  const formatType = {
    tree: treeFormatter,
    plain: plainFormatter,
    json: jsonFormatter,
  };
  return formatType[format](content);
};
