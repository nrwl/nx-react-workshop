/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  formatFiles,
  Tree,
  updateJson,
  getProjects,
  installPackagesTask,
  readJson,
} from '@nx/devkit';
import { removeGenerator } from '@nx/workspace';
import { execSync } from 'child_process';

export default async function update(tree: Tree) {
  // npx create-nx-workspace bg-hoard --preset=empty --no-nx-cloud
  const projects = getProjects(tree);
  const projectsToRemove = [
    'store-e2e',
    'store',
    'api',
    'api-e2e',
    'api-util-interface',
    'util-interface',
    'store-feature-game-detail',
    'ui-shared',
    'store-ui-shared',
    'store-ui-shared-e2e',
    'store-util-formatters',
    'api-util-notifications',
    'admin-ui',
    'admin-ui-e2e',
    'internal-plugin',
    'internal-plugin-e2e',
  ].filter((removeProject) => projects.has(removeProject));
  projectsToRemove.forEach(
    async (projectName) =>
      await removeGenerator(tree, {
        projectName,
        skipFormat: true,
        forceRemove: true,
      })
  );
  // hack to fix remove generator
  updateJson(tree, 'tsconfig.base.json', (json) => {
    json.compilerOptions.paths = {};
    return json;
  });

  // Lab 2
  [
    '.eslintignore',
    '.eslintrc.json',
    'jest.config.ts',
    'jest.preset.js',
  ].forEach((file) => tree.delete(file));

  // Lab 13
  tree.delete('tools/generators/util-lib');

  // Lab 14
  tree.delete('tools/generators/update-scope-schema');
  tree.delete('.husky');

  // Lab 15
  tree.delete('.github/workflows/ci.yml');
  // Lab 19
  if (tree.exists('.nx-workshop.json')) {
    const { flyName } = readJson(tree, '.nx-workshop.json');
    const flyApps = await execSync(`fly apps list`).toString();
    if (flyApps.includes(flyName)) {
      execSync(`fly apps destroy ${flyName} --yes`);
    }
    tree.delete('.nx-workshop.json');
  }
  // Lab 19-alt
  tree.delete('tools/generators/add-deploy-target');
  // Lab 21
  tree.delete('.github/workflows/deploy.yml');

  // Reset nx.json to default
  updateJson(tree, 'nx.json', (json) => {
    const newJson = {
      $schema: './node_modules/nx/schemas/nx-schema.json',
      namedInputs: {
        default: ['{projectRoot}/**/*', 'sharedGlobals'],
        production: ['default'],
        sharedGlobals: [],
      },
    };

    // Keep nxCloudAccessToken if they connected their repo to Nx Cloud
    if (json.nxCloudAccessToken) {
      newJson['nxCloudAccessToken'] = json.nxCloudAccessToken;
    }

    return newJson;
  });

  // Reset package.json to default
  updateJson(
    tree,
    'package.json',
    ({ name, version, license, dependencies, devDependencies }) => {
      const packagesToKeep = [
        '@nx/js',
        '@nx/workspace',
        'nx',
        '@nrwl/nx-react-workshop',
      ];

      const filterDependencies = (d: Record<string, string> = {}) =>
        Object.fromEntries(
          Object.entries(d).filter(([packageName]) =>
            packagesToKeep.includes(packageName)
          )
        );

      return {
        name,
        version,
        license,
        scripts: {},
        private: true,
        dependencies: filterDependencies(dependencies),
        devDependencies: filterDependencies(devDependencies),
      };
    }
  );

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
