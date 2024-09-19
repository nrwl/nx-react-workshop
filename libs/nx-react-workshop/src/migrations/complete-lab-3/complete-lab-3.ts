import { tsquery } from '@phenomnomnominal/tsquery';
import { formatFiles, Tree, updateJson } from '@nx/devkit';
import ts = require('typescript');

// deeply set a property where parent properties are created if they don't exist
function setProperty(obj: Record<string, any>, path: string, value: any) {
  return path
    .split('.')
    .reduce(
      (acc, key, index, arr) =>
        (acc[key] = index === arr.length - 1 ? value : acc[key] || {}),
      obj
    );
}

function addExtractLicensesProperty(webpackConfig: string) {
  const ast = tsquery.ast(webpackConfig);
  const query = `NewExpression:has(Identifier[name="NxAppWebpackPlugin"]) ObjectLiteralExpression`;
  const [config] = tsquery<ts.ObjectLiteralExpression>(ast, query);

  if (!config) {
    throw new Error('NxAppWebpackPlugin configuration not found');
  }

  const newProperty = ts.factory.createPropertyAssignment(
    'extractLicenses',
    ts.factory.createBinaryExpression(
      ts.factory.createElementAccessExpression(
        ts.factory.createIdentifier('process.env'),
        ts.factory.createStringLiteral('NODE_ENV')
      ),
      ts.SyntaxKind.EqualsEqualsEqualsToken,
      ts.factory.createStringLiteral('production')
    )
  );

  const index = config.properties.findIndex(
    (prop) =>
      ts.isPropertyAssignment(prop) &&
      ts.isIdentifier(prop.name) &&
      prop.name.escapedText === 'extractLicenses'
  );

  // config.properties is an immutable node array so we cast
  // a mutable array to simplify our implementation
  const configProperties: ts.ObjectLiteralElementLike[] =
    config.properties as any;

  if (index !== -1) {
    configProperties[index] = newProperty;
  } else {
    configProperties.push(newProperty);
  }

  return ts.createPrinter().printFile(ast);
}

export default async function update(tree: Tree) {
  const webpackConfig = tree.read('apps/store/webpack.config.js', 'utf-8');
  tree.write(
    'apps/store/webpack.config.js',
    addExtractLicensesProperty(webpackConfig)
  );

  updateJson(tree, 'apps/store/project.json', (json) => {
    setProperty(json, 'targets.build.configurations.development.args', [
      '--node-env=development',
    ]);

    return json;
  });

  await formatFiles(tree);
}
