#!/usr/bin/env node

import getdiff from '../getdiff';

const commander = require('commander');

const program = new commander.Command();
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    if (!program.args.length) {
      program.help();
    }
    console.log(getdiff(firstConfig, secondConfig));
  });
program.parse(process.argv);
