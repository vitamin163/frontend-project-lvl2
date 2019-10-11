import path from 'path';
import fs from 'fs';

export const fileReading = (fileName) => {
  const pathToFile = path.resolve('./', fileName);
  const content = fs.readFileSync(pathToFile, 'utf-8');
  return content;
};

export const getFileNameExtension = (fileName) => path.extname(fileName);
