/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree } from '@nx/devkit';
import { execSync } from 'child_process';

export default function update(host: Tree) {
  execSync(
    'npx nx workspace-generator util-lib --name=notifications --directory=api'
  );
}
