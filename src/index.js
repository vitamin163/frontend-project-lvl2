import getdiff from './getdiff';
import parse from './parser';
import render from './formatters';
import { fileReader, getFileNameExtension } from './utils';

export default (firstConfig, secondConfig, format) => {
  const firstFileExt = getFileNameExtension(firstConfig);
  const secondFileExt = getFileNameExtension(secondConfig);
  const firstFileContent = fileReader(firstConfig);
  const secondFileContent = fileReader(secondConfig);
  const parsedFirstConfig = parse(firstFileExt, firstFileContent);
  const parsedSecondConfig = parse(secondFileExt, secondFileContent);
  return render(getdiff(parsedFirstConfig, parsedSecondConfig), format);
};
