---
id: getting-started
title: "Getting Started"
sidebar_label: "Getting Started"
slug: "/"
---
  
  # code-rub

This repository implements a base layer, CLI, and a few plugins to automate the process described here: https://hassanhabib.com/2020/02/09/code-rub/.

The core of code-rub is agnostic to ticketing system, project philosophy, and technology. On its own, it will do nothing except keep track of which files have been assigned for a rub, but it doesn't know how to actually create tickets and assign them. It doesn't even log them to the console by default.

## Quick Start

Currently, a jira plugin and an azure-devops plugin are provided. If this suits your use case, run `npx code-rub init --preset {jira|azure-devops}`, and then fill in the placeholder values created in `code-rub.config.js`.

If this doesn't suit your use case, run `npx code-rub init` to generate a blank configuration. There are examples of local plugins in this repo's tool folder, and the `code-rub.config.js` file here demonstrates how to point to them. They can be either typescript or javascript. There are future plans to add azure-devops and github issues based support, but they are not yet implemented. PRs adding them are welcome 😀

## Plugins

This is where the plugins come in. A code-rub plugin can change almost everything about the flow of `npx code-rub`. They can provide:

- A setup function: `setup`
- An initial configuration, used in `npx code-rub init --preset`: `initialConfiguration`
- A method to process assignments, after they are generated: `processAssignments`
- A method to process the file queue, useful for filtering out file extensions or paths: `processFileQueue`
- A method to process the `Ignore` object used when generating the repository file map: `processIgnore`
  - This is ran before `code-rub` saves the file map, so it affects all configuration files. This should only be specified in the repositories base configuration (or sole configuration).
- A method to read and write the file map: `readFileMap` and `saveFileMap` respectively.
  - Only one plugin may specify these methods.

Plugins are specified by two pieces of configuration, the `plugins` array and the `pluginConfiguration` object. Plugin's are loaded based on the `plugins` array, and the capabilities they provide are configured through their entry in `pluginConfiguration`.

Plugins are loaded, and executed based on their order in the `plugins` array. This is especially important for functions like `processFileQueue` which chains the results during execution.

> As an example, imagine you have plugin1 which removes typescript files but plugin2 expects them to be present. If you use `plugins: [plugin1, plugin2]`, plugin2 would not see any of the typescript files. If you use `plugins: [plugin2, plugin1]`, plugin2 would see them since they are not removed yet.

For an example plugin implementation, check the `jira` package in this repository.

  