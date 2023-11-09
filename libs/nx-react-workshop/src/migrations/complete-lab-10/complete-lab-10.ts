/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDependenciesToPackageJson, Tree } from '@nx/devkit';
import { storybookConfigurationGenerator } from '@nx/react';
import { dependencies } from '../../../package.json';

export default async function update(host: Tree) {
  // yarn add @nx/storybook
  await addDependenciesToPackageJson(
    host,
    {},
    {
      '@nx/storybook': dependencies['@nx/storybook'],
      vite: 'latest',
    }
  );
  // nx generate @nx/react:storybook-configuration store-ui-shared
  await storybookConfigurationGenerator(host, {
    name: 'store-ui-shared',
    configureCypress: false,
    generateStories: true,
    interactionTests: true,
  });
}
