#!/usr/bin/env node
import yargs from 'yargs';
import { generate } from './commands/generate';
import { init } from './commands/init';

yargs(process.argv.slice(2))
  .scriptName('code-rub')
  .usage('$0 <cmd> [args]')
  .command(
    'init [configFile]',
    'Create a new code-rub config for this git repo',
    (y) =>
      y.positional('configFile', {
        default: 'code-rub.config.js',
      }),
    init
  )
  .command(
    ['generate [configFile]', '$0 [configFile]'],
    'Generate the next set of assignments',
    (y) =>
      y.positional('configFile', {
        default: 'code-rub.config.js',
      }),
    generate
  )
  .parse();
