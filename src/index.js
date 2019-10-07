import getdiff from './getdiff';
import parse from './parser';
import formatter from './formatters/getFormatter';
import { fileReading, getFileNameExtension } from './utils';

export default (firstConfig, secondConfig, format) => {
  const firstFileExt = getFileNameExtension(firstConfig);
  const secondFileExt = getFileNameExtension(secondConfig);
  const firstFileContent = fileReading(firstConfig);
  const secondFileContent = fileReading(secondConfig);
  return formatter(
    getdiff(parse(firstFileExt, firstFileContent),
      parse(secondFileExt, secondFileContent)), format,
  );
};
