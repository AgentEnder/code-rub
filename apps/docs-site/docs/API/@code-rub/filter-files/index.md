---
id: "index"
title: "@code-rub/filter-files"
slug: "/API/@code-rub/filter-files/"
sidebar_label: "Readme"
sidebar_position: 0
custom_edit_url: null
---

# @code-rub/filter-files plugin

## Usage

Install with npm or yarn:
- `npm i --save-dev @code-rub/filter-files`
- `yarn add --dev @code-rub/filter-files`

Setup inside of your code-rub.config.js file:
- Add `@code-rub/filter-files` to the plugins array.
- Add an entry to `pluginConfiguration` with `@code-rub/filter-files` as the key.
  - Set up any bannedFileNames, bannedGlobPatterns, and allowedFileTypes inside of the config. Below is an example configuration, as used in this repository.

```javascript
module.exports = {
  plugins: [
    '@code-rub/filter-files',
  ],
  pluginConfiguration: {
    '@code-rub/filter-files': {
      allowedFileExtensions: ['.ts', '.js'],
      bannedGlobPatterns: ['*.config.ts'],
      bannedFileNames: ['jest.config.js', 'code-rub.config.js', 'jest.preset.js'],
    },
  },
};
```
