/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addDependenciesToPackageJson,
  formatFiles,
  installPackagesTask,
  Tree,
  updateJson,
} from '@nx/devkit';
import { Linter } from '@nx/eslint';
import { applicationGenerator } from '@nx/next';
import { runCommandsGenerator } from '@nx/workspace';
import { generatorGenerator } from '@nx/plugin/generators';
import { dependencies } from '../../../package.json';

export default async function update(host: Tree) {
  // yarn add @nx/next # or "npm i -S @nx/next"
  addDependenciesToPackageJson(
    host,
    {},
    {
      '@nx/next': dependencies['@nx/next'],
    }
  );
  // nx g @nx/next:app admin-ui
  await applicationGenerator(host, {
    name: 'admin-ui',
    style: 'scss',
    directory: 'apps/admin-ui',
    e2eTestRunner: 'cypress',
    projectNameAndRootFormat: 'as-provided',
    skipFormat: true,
    linter: Linter.EsLint,
    unitTestRunner: 'jest',
  });
  // nx generate run-commands deploy --project=admin-ui --command="surge dist/apps/admin-ui/exported \${SURGE_DOMAIN_ADMIN_UI} --token \${SURGE_TOKEN}"
  runCommandsGenerator(host, {
    name: 'deploy',
    project: 'admin-ui',
    command:
      'surge dist/apps/admin-ui/exported ${SURGE_DOMAIN_ADMIN_UI} --token ${SURGE_TOKEN}',
  });

  // nx g @nx/plugin/generator add-deploy-target
  generatorGenerator(host, {
    directory: 'libs/internal-plugin/src/generators/add-deploy-target',
    nameAndDirectoryFormat: 'as-provided',
    unitTestRunner: 'jest',
    name: 'add-deploy-target',
    skipFormat: true,
  });

  host.write(
    `libs/internal-plugin/src/generators/add-deploy-target/files/.local.env`,
    `
SURGE_DOMAIN_<%= undercaps(project) %>=https://<%= subdomain %>.surge.sh
`
  );

  // add js package for dependency checks
  updateJson(host, 'libs/internal-plugin/package.json', (json) => {
    json.dependencies['@nx/workspace'] = json.dependencies['@nx/devkit'];
    return json;
  });

  host.write(
    `libs/internal-plugin/src/generators/add-deploy-target/index.ts`,
    `
import {
  Tree,
  formatFiles,
  installPackagesTask,
  generateFiles,
} from '@nx/devkit';
import { runCommandsGenerator } from '@nx/workspace/generators';
import { join } from 'path';

interface Schema {
  project: string;
  subdomain: string;
}

export default async function (host: Tree, schema: Schema) {
  await runCommandsGenerator(host, {
    name: 'deploy',
    project: schema.project,
    command: \`surge dist/apps/\${
      schema.project
    } \\\${SURGE_DOMAIN_\${underscoreWithCaps(
      schema.project
    )}} --token \\\${SURGE_TOKEN}\`,
  });
  await generateFiles(
    host,
    join(__dirname, './files'),
    \`apps/\${schema.project}\`,
    {
      tmpl: '',
      project: schema.project,
      subdomain: schema.subdomain,
      undercaps: underscoreWithCaps,
    }
  );
  await formatFiles(host);
  return () => {
    installPackagesTask(host);
  };
}

export function underscoreWithCaps(value: string): string {
  return value.replace(/-/g, '_').toLocaleUpperCase();
}
`
  );

  host.write(
    `libs/internal-plugin/src/generators/add-deploy-target/schema.json`,
    `
{
  "cli": "nx",
  "id": "add-deploy-target",
  "type": "object",
  "properties": {
    "project": {
      "type": "string",
      "description": "Project name to generate the deploy target for",
      "$default": {
        "$source": "argv",
        "index": 0
      }
    },
    "subdomain": {
      "type": "string",
      "description": "Surge subdomain where you want it deployed.",
      "x-prompt": "What is the Surge subdomain you want it deployed under? (https://<your-subdomain>.surge.sh)"
    }
  },
  "required": ["project", "subdomain"]
}
`
  );
  await formatFiles(host);
  return async () => {
    installPackagesTask(host);
  };
}
