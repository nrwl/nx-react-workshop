/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';
import { storybookConfigurationGenerator } from '@nrwl/react';
import { dependencies } from '../../../package.json';

export default async function update(host: Tree) {
  // yarn add @nrwl/storybook
  await addDependenciesToPackageJson(
    host,
    {},
    {
      '@nrwl/storybook': dependencies['@nrwl/storybook'],
    }
  );
  // nx generate @nrwl/react:storybook-configuration store-ui-shared
  await storybookConfigurationGenerator(host, {
    name: 'store-ui-shared',
    configureCypress: true,
    generateStories: true,
    generateCypressSpecs: true,
  });
}
