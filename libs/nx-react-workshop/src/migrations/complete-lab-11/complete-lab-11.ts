/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree } from '@nx/devkit';

export default function update(host: Tree) {
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
