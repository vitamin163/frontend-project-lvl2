import _ from 'lodash';

const path = require('path');
const commander = require('commander');
const fs = require('fs');

export default () => {
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
      const pathToFirstFile = path.resolve('./', firstConfig);
      const pathToSecondFile = path.resolve('./', secondConfig);

      const data1 = fs.readFileSync(pathToFirstFile, 'utf-8');
      const data2 = fs.readFileSync(pathToSecondFile, 'utf8');

      const obj1 = JSON.parse(data1);
      const obj2 = JSON.parse(data2);
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      const compare = (object1, object2) => {
        const keys = [...new Set([...keys1, ...keys2])];

        const diff = keys.reduce(
          (acc, key) => {
            if (object1[key] === object2[key]) {
              return [...acc, `\t${key}: ${object1[key]}\n`];
            }
            if (_.has(object1, key) && _.has(object2, key)) {
              return [
                ...acc,
                `\t+ ${key}: ${object2[key]}\n`,
                `\t- ${key}: ${object1[key]}\n`,
              ];
            }
            if (!_.has(object1, key) && _.has(object2, key)) {
              return [...acc, `\t+ ${key}: ${object2[key]}\n`];
            }
            if (_.has(object1, key) && !_.has(object2, key)) {
              return [...acc, `\t- ${key}: ${object1[key]}\n`];
            }
            return acc;
          },
          ['{\n'],
        );
        const result = [...diff, '}'];
        console.log(result.join(''));
      };

      compare(obj1, obj2);
    });

  program.parse(process.argv);
};
