import getdiff from './getdiff';
import parse from './parser';
import formatter from './formatters/getFormatter';
import readFile from './fileReader';

export default (firstConfig, secondConfig, format) => formatter(
  getdiff(parse(firstConfig, readFile(firstConfig)),
    parse(secondConfig, readFile(secondConfig))), format,
);
