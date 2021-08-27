import { formatFiles, readJsonFile, Tree } from '@nrwl/devkit';
import { CompleteLabsGeneratorSchema } from './schema';

export default async function (
  tree: Tree,
  options: CompleteLabsGeneratorSchema
) {
  const { lab, from, to } = options;
  const migrationDefinitions = readJsonFile(
    'node_modules/@nx-workshop-react/nx-workshop/migrations.json'
  ).generators;
  let migrations = Object.keys(migrationDefinitions).map((name) => {
    const { version, description, implementation, cli } =
      migrationDefinitions[name];
    return {
      version,
      description,
      factory: implementation,
      cli,
      package: '@nx-workshop-react/nx-workshop',
      name,
    };
  });
  let including = false;
  migrations = migrations.filter((migration) => {
    const versionParts = migration.version.split('.');
    const lastVersionPart = versionParts[versionParts.length - 1];
    if (lastVersionPart === (from || lab) + '') {
      including = true;
    }
    if (lastVersionPart === (to || lab) + '') {
      including = false;
      return true;
    }
    return including;
  });
  tree.write('migrations.json', JSON.stringify({ migrations }, undefined, 2));
  await formatFiles(tree);
  console.log('Migration file generated, to complete the labs run:');
  console.log('nx migrate --run-migrations=migrations.json');
}
