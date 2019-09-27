import getdiff from './getdiff';
import render from './renderer';
import parse from './parser';

export default (firstConfig, secondConfig) => render(
  getdiff(parse(firstConfig), parse(secondConfig)),
);
