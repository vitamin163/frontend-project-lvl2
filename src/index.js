import getdiff from './getdiff';
import parse from './parser';
import formatter from './formatters/getFormatter';

export default (firstConfig, secondConfig, format) => formatter(
  getdiff(parse(firstConfig), parse(secondConfig)), format,
);
