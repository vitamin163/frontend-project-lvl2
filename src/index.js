const commander = require('commander');

export default () => {
  const program = new commander.Command();
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .arguments('<firstConfig> <secondConfig>')
    .action(() => {
      console.log(program.arguments);
      if (!program.args.length) {
        program.help();
      }
    });

  program.parse(process.argv);
};
