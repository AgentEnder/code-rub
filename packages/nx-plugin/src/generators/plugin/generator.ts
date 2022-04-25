import {
  formatFiles,
  generateFiles,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/node';
import * as path from 'path';
import { NxPluginGeneratorSchema } from './schema';

interface NormalizedSchema extends NxPluginGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  importPath: string;
}

function normalizeOptions(
  tree: Tree,
  options: NxPluginGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `packages/${projectDirectory}`;

  return {
    ...options,
    projectName,
    projectRoot,
    importPath: `@code-rub/${name}`,
    projectDirectory,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
    tmpl: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

export default async function (tree: Tree, options: NxPluginGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  libraryGenerator(tree, {
    ...options,
    buildable: true,
    compiler: 'tsc',
    publishable: true,
    importPath: normalizedOptions.importPath,
  });
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
