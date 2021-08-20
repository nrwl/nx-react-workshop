import { readJsonFile } from '@nrwl/devkit';
import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
import { writeFileSync } from 'fs';
describe('nx-workshop e2e', () => {
  describe('migrations', () => {
    it('should run the migrations', async () => {
      ensureNxProject(
        '@nx-workshop-react/nx-workshop',
        'dist/libs/nx-workshop'
      );
      expect(() => checkFilesExist(`libs`)).not.toThrow();
      const migrationDefinitions = readJsonFile(
        'libs/nx-workshop/migrations.json'
      ).generators;
      const migrations = Object.keys(migrationDefinitions).map(
        (name, index) => {
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
        }
      );
      writeFileSync(
        'tmp/nx-e2e/proj/migrations.json',
        JSON.stringify({ migrations }, undefined, 2)
      );
      // await runNxCommandAsync('migrate --run-migrations=migrations.json');
    }, 120000);
  });
});
