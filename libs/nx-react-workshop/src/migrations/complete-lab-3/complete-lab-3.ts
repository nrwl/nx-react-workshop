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

const addOrUpdateProperty =
  (propertyName: string | ts.PropertyName, propertyValue: ts.Expression) =>
  (objectToUpdate: ts.ObjectLiteralExpression): ts.ObjectLiteralExpression => {
    const newProperty = ts.factory.createPropertyAssignment(
      propertyName,
      propertyValue
    );

    const existingPropertyIndex = objectToUpdate.properties.findIndex(
      (prop) => prop.name === propertyName
    );

    const updatedProperties = [...objectToUpdate.properties];
    if (existingPropertyIndex === -1) {
      updatedProperties.push(newProperty);
    } else {
      updatedProperties[existingPropertyIndex] = newProperty;
    }

    return ts.factory.updateObjectLiteralExpression(
      objectToUpdate,
      updatedProperties
    );
  };

const updateMatchingObjectLiteral =
  (
    objectToUpdate: ts.ObjectLiteralExpression,
    transform: (o: ts.ObjectLiteralExpression) => ts.ObjectLiteralExpression
  ): ts.TransformerFactory<ts.SourceFile> =>
  (context) =>
  (sourceFile) => {
    const visit: ts.Visitor = (node) =>
      ts.isObjectLiteralExpression(node) && node === objectToUpdate
        ? transform(node)
        : ts.visitEachChild(node, visit, context);

    return ts.visitNode(sourceFile, visit) as ts.SourceFile;
  };

function addExtractLicensesProperty(webpackConfig: string) {
  const ast = tsquery.ast(webpackConfig);
  const query = `NewExpression:has(Identifier[name="NxAppWebpackPlugin"]) ObjectLiteralExpression`;
  const [config] = tsquery<ts.ObjectLiteralExpression>(ast, query);

  if (!config) {
    throw new Error('NxAppWebpackPlugin configuration not found');
  }

  // process.env['NODE_ENV'] === 'production'
  const newPropertyValue = ts.factory.createBinaryExpression(
    ts.factory.createElementAccessExpression(
      ts.factory.createIdentifier('process.env'),
      ts.factory.createStringLiteral('NODE_ENV')
    ),
    ts.SyntaxKind.EqualsEqualsEqualsToken,
    ts.factory.createStringLiteral('production')
  );

  const result = ts.transform(ast, [
    updateMatchingObjectLiteral(
      config,
      addOrUpdateProperty('extractLicenses', newPropertyValue)
    ),
  ]);

  return ts.createPrinter().printFile(result.transformed[0]);
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
