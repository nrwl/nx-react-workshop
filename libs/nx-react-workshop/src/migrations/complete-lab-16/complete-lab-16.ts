/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree } from '@nx/devkit';
import { execSync } from 'child_process';

export default async function update(host: Tree) {
  execSync(`npx nx connect`, {
    stdio: [0, 1, 2],
  });
}
