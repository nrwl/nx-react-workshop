import { addDependenciesToPackageJson, formatFiles, Tree } from '@nx/devkit';
import { dependencies } from '../../../package.json';
import { applicationGenerator } from '@nx/react';
import { Linter } from '@nx/eslint';
import labExamplesGenerator from '../../generators/lab-examples/generator';

export default async function update(tree: Tree) {
  await addDependenciesToPackageJson(
    tree,
    {
      '@mui/material': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
    },
    {
      '@nx/react': dependencies['@nx/react'],
    }
  )();

  await applicationGenerator(tree, {
    name: 'store',
    e2eTestRunner: 'cypress',
    directory: 'apps/store',
    projectNameAndRootFormat: 'as-provided',
    skipFormat: true,
    linter: Linter.EsLint,
    style: 'scss',
    unitTestRunner: 'jest',
    routing: true,
    addPlugin: true,
  });

  await labExamplesGenerator(tree, { lab: 2 });

  await formatFiles(tree);
}
