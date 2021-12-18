#!/usr/bin/env node
import yargs from 'yargs';
import { generate } from './commands/generate';
import { init } from './commands/init/init';

import * as dotenv from 'dotenv';
dotenv.config();

yargs(process.argv.slice(2))
  .scriptName('code-rub')
  .usage('$0 [cmd] [args]')
  .command(
    'init [configFile] [--preset preset]',
    'Create a new code-rub config for this git repo',
    (y) => {
      y.positional('configFile', {
        default: 'code-rub.config.js',
      });
      y.option({
        preset: {
          string: true,
          required: false,
          default: null,
        },
        skipInstall: {
          boolean: true,
          default: false,
        },
      });
    },
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
