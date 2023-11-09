/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree } from '@nx/devkit';

export default function update(host: Tree) {
  host.write(
    'libs/store/ui-shared/src/lib/header/header.stories.tsx',
    `import type { Meta, StoryObj } from '@storybook/react';
    import { Header } from './header';

    import { within } from '@storybook/testing-library';
    import { expect } from '@storybook/jest';

    const meta: Meta<typeof Header> = {
      component: Header,
      title: 'Header',
    };
    export default meta;
    type Story = StoryObj<typeof Header>;

    export const Primary = {
      args: {},
    };

    export const Heading: Story = {
      args: {
        title: 'Welcome to Board Game Hoard',
      },
      play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        expect(canvas.getByText(/Welcome to Board Game Hoard/gi)).toBeTruthy();
      },
    };
    `
  );
}
