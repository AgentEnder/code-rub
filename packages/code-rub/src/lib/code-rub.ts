#!/usr/bin/env node
import * as dotenv from 'dotenv';
import { cli } from 'cli-forge';

import { generate } from './commands/generate';
import { init } from './commands/init/init';

dotenv.config();

cli('code-rub')
  .command('init', {
    description: 'Create a new code-rub config for this git repo',
    usage: 'code-rub init [configFile] [--preset preset] [...preset options]',
    builder: (y) =>
      y
        .positional('configFile', {
          type: 'string',
          default: 'code-rub.config.js',
        })
        .option('preset', {
          type: 'string',
          required: false,
        })
        .option('skipInstall', {
          type: 'boolean',
          default: false,
        }),
    handler: (args) => init(args),
  })
  .command('generate', {
    description: 'Generate the next set of assignments',
    usage: 'code-rub generate [configFile]',
    builder: (y) =>
      y.positional('configFile', {
        type: 'string',
        default: 'code-rub.config.js',
      }),
    handler: (args) => generate(args),
  })
  .forge();
