import { addProjectConfiguration, readJson, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import update from './complete-lab-3';

function exampleWebpackConfig(additionalConfig = '') {
  return `
module.exports = {
  plugins: [
    new NxAppWebpackPlugin({
      foo: 'bar',
      optimization: process.env['NODE_ENV'] === 'production',
      ${additionalConfig}
    }),
  ],
};
`;
}

describe('complete-lab-3', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(tree, 'store', { root: 'apps/store', targets: {} });
  });

  it('should add extractLicenses to the NxAppWebpackPlugin configuration', async () => {
    tree.write('apps/store/webpack.config.js', exampleWebpackConfig());

    await update(tree);

    expect(readJson(tree, 'apps/store/project.json')).toHaveProperty(
      'targets.build.configurations.development.args',
      ['--node-env=development']
    );

    expect(tree.read('apps/store/webpack.config.js', 'utf-8')).toContain(
      `extractLicenses: process.env['NODE_ENV'] === 'production'`
    );
  });

  it('should replace extractLicenses to NxAppWebpackPlugin if it already exists', async () => {
    tree.write(
      'apps/store/webpack.config.js',
      exampleWebpackConfig('extractLicenses: true')
    );

    await update(tree);

    expect(tree.read('apps/store/webpack.config.js', 'utf-8')).toContain(
      `extractLicenses: process.env['NODE_ENV'] === 'production'`
    );
  });
});
