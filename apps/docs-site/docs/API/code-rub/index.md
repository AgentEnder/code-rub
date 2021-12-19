---
id: "index"
title: "code-rub"
slug: "/API/code-rub/"
sidebar_label: "Readme"
sidebar_position: 0
custom_edit_url: null
---

# Code Rub CLI

## Commands

### `npx code-rub init`

Initialize a blank code-rub configuration for your workspace. This is the starting point :).

- `--preset [package]` allows creating a workspace setup for a certain plugin.
- `npx code-rub some-config-file.js` allows creating a new config file in an existing workspace
  - This is especially useful when multiple teams work in the same codebase.
- `--skipInstall` allows bypassing the package.json checks + update. If using a preset not already installed, this **will** fail.

### `npx code-rub [configFile]` (or `npx code-rub generate [configFile]`)

Generates the next set of assignments for the configuration specified. If not provided, [configFile] defaults to 'code-rub.config.js'
