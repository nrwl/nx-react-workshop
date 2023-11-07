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
  host.write(
    'apps/store-ui-shared-e2e/src/e2e/header/header.cy.ts',
    `
    describe('store-ui-shared: Header component', () => {
      beforeEach(() =>
        cy.visit('/iframe.html?id=header--primary&args=title:BoardGameHoard')
      );

      it('should show the title', () => {
        cy.get('h6').contains('Board Game Hoard');
      });
    });
    `
  );
}
