/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';
import { execSync } from 'child_process';
import { dependencies } from '../../../package.json';

export default async function update(host: Tree) {
  // yarn add @nrwl/nx-cloud
  await addDependenciesToPackageJson(
    host,
    {},
    {
      '@nrwl/nx-cloud': dependencies['@nrwl/nx-cloud'],
    }
  );
  execSync(`npx nx g @nrwl/nx-cloud:init`, {
    stdio: [0, 1, 2],
  });
}
