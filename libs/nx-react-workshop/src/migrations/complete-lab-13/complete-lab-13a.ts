/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatFiles, Tree, updateJson } from '@nx/devkit';
import { pluginGenerator, generatorGenerator } from '@nx/plugin/generators';
import { Linter } from '@nx/eslint';

export default async function update(host: Tree) {
  // nx generate @nx/plugin:generator util-lib
  process.env.NX_PROJECT_GLOB_CACHE = 'false';
  await pluginGenerator(host, {
    name: 'internal-plugin',
    directory: 'libs/internal-plugin',
    projectNameAndRootFormat: 'as-provided',
    skipTsConfig: false,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
    compiler: 'tsc',
    skipFormat: false,
    skipLintChecks: false,
  });
  process.env.NX_PROJECT_GLOB_CACHE = 'true';

  await generatorGenerator(host, {
    name: 'util-lib',
    project: 'internal-plugin',
    unitTestRunner: 'jest',
  });

  host.write(
    'libs/internal-plugin/src/generators/util-lib/generator.ts',
    `import { formatFiles, installPackagesTask, Tree } from '@nx/devkit';
import { libraryGenerator } from '@nx/js';
import { UtilLibGeneratorSchema } from './schema';

export default async function (tree: Tree, schema: UtilLibGeneratorSchema) {
  await libraryGenerator(tree, {
    name: \`util-\${schema.name}\`,
    directory: schema.directory,
    tags: \`type:util, scope:\${schema.directory}\`,
  });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
    `
  );
  host.write(
    'libs/internal-plugin/src/generators/util-lib/schema.d.ts',
    `export interface UtilLibGeneratorSchema {
  name: string;
  directory: 'store' | 'api' | 'shared';
}
`
  );
  updateJson(
    host,
    'libs/internal-plugin/src/generators/util-lib/schema.json',
    (json) => {
      delete json.properties.tags;
      return {
        ...json,
        properties: {
          ...json.properties,
          directory: {
            type: 'string',
            description: 'The scope of your lib.',
            'x-prompt': {
              message: 'Which directory do you want the lib to be in?',
              type: 'list',
              items: [
                {
                  value: 'store',
                  label: 'store',
                },
                {
                  value: 'api',
                  label: 'api',
                },
                {
                  value: 'shared',
                  label: 'shared',
                },
              ],
            },
          },
        },
      };
    }
  );
  host.write(
    'libs/internal-plugin/src/generators/util-lib/generator.spec.ts',
    `import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import generator from './generator';
import { UtilLibGeneratorSchema } from './schema';

describe('util-lib generator', () => {
  let appTree: Tree;
  const options: UtilLibGeneratorSchema = { name: 'foo', directory: 'store' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should add util to the name and add appropriate tags', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'store-util-foo');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['type:util', 'scope:store']);
  });
});
    `
  );
  await formatFiles(host);
}
