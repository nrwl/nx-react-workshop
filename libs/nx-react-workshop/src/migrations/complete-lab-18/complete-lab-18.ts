/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addDependenciesToPackageJson,
  Tree,
  updateJson,
  readJsonFile,
} from '@nx/devkit';
import { uniq } from '@nx/plugin/testing';
import { runCommandsGenerator } from '@nx/workspace';
import { execSync } from 'child_process';

export default function update(host: Tree) {
  addDependenciesToPackageJson(
    host,
    {},
    {
      surge: '*',
    }
  );

  let surgeToken, surgeName;
  if (host.exists('.nx-workshop.json')) {
    const workshopConstants = readJsonFile('.nx-workshop.json');
    surgeToken = workshopConstants.surgeToken;
    surgeName = workshopConstants.surgeName;
  }
  if (!surgeToken || !surgeName) {
    surgeToken = execSync('npx surge token').toString().trim();
    surgeName = uniq(`prophetic-narwhal-`);
    if (host.exists('.nx-workshop.json')) {
      updateJson(host, '.nx-workshop.json', (json) => {
        json.surgeToken = surgeToken;
        json.surgeName = surgeName;
        return json;
      });
    } else {
      host.write(
        '.nx-workshop.json',
        JSON.stringify({ surgeToken, surgeName })
      );
    }
  }

  // nx generate run-commands deploy --project=store --command="surge dist/apps/store https://<chose-some-unique-url-123>.surge.sh --token <your-surge-token>"
  runCommandsGenerator(host, {
    name: 'deploy',
    project: 'store',
    command: `surge dist/apps/store https://${surgeName}.surge.sh --token ${surgeToken}`,
  });
}
