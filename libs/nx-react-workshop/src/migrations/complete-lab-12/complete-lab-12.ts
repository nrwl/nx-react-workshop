/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  readProjectConfiguration,
  Tree,
  updateJson,
  updateProjectConfiguration,
} from '@nx/devkit';

export default function update(host: Tree) {
  const projectUpdates = {
    store: {
      tags: ['scope:store', 'type:app'],
    },
    'store-e2e': {
      tags: ['scope:store', 'type:e2e'],
      implicitDependencies: ['store'],
    },
    'store-ui-shared': {
      tags: ['scope:store', 'type:ui'],
    },
    'store-util-formatters': {
      tags: ['scope:store', 'type:util'],
    },
    'store-feature-game-detail': {
      tags: ['scope:store', 'type:feature'],
    },
    api: {
      tags: ['scope:api', 'type:app'],
    },
    'util-interface': {
      tags: ['scope:shared', 'type:util'],
    },
  };
  process.env.NX_PROJECT_GLOB_CACHE = 'false';
  Object.keys(projectUpdates).forEach((projectName) => {
    const config = readProjectConfiguration(host, projectName);
    config.tags = projectUpdates[projectName].tags;
    config.implicitDependencies =
      projectUpdates[projectName].implicitDependencies || [];
    updateProjectConfiguration(host, projectName, config);
  });
  process.env.NX_PROJECT_GLOB_CACHE = 'true';

  updateJson(host, '.eslintrc.json', (json) => {
    json.overrides[0].rules['@nx/enforce-module-boundaries'][1].depConstraints =
      [
        {
          sourceTag: 'scope:store',
          onlyDependOnLibsWithTags: ['scope:store', 'scope:shared'],
        },
        {
          sourceTag: 'scope:api',
          onlyDependOnLibsWithTags: ['scope:api', 'scope:shared'],
        },
        {
          sourceTag: 'type:feature',
          onlyDependOnLibsWithTags: ['type:feature', 'type:ui', 'type:util'],
        },
        {
          sourceTag: 'type:ui',
          onlyDependOnLibsWithTags: ['type:ui', 'type:util'],
        },
        {
          sourceTag: 'type:util',
          onlyDependOnLibsWithTags: ['type:util'],
        },
      ];
    return json;
  });

  host.write(
    'apps/api-e2e/src/api/lint.spec.ts',
    `
  import { execSync } from 'child_process';
import { writeFileSync } from 'node:fs';

describe('Dependencies', () => {
  it('should fail linting when tag rules are applied', async () => {
    writeFileSync(
      'libs/util-interface/src/index.ts',
      \`import {} from '@bg-hoard/store-ui-shared';

export * from './lib/api-util-interface';
\`
    );
    expect(() => execSync('nx lint util-interface')).toThrow();
  });
  afterAll(() => {
    writeFileSync(
      'libs/util-interface/src/index.ts',
      \`export * from './lib/api-util-interface';
    \`
    );
  });
});
`
  );
}
