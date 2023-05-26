/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDependenciesToPackageJson, Tree } from '@nx/devkit';
import { execSync } from 'child_process';
import { dependencies } from '../../../package.json';

export default async function update(host: Tree) {
  // yarn add nx-cloud
  await addDependenciesToPackageJson(
    host,
    {},
    {
      'nx-cloud': dependencies['nx-cloud'],
    }
  );
  execSync(`npx nx g nx-cloud:init`, {
    stdio: [0, 1, 2],
  });
}
