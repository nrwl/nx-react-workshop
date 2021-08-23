import {
  checkFilesExist,
  ensureNxProject,
  runNxCommand,
} from '@nrwl/nx-plugin/testing';

describe('nx-workshop e2e', () => {
  describe('migrations', () => {
    it('should run the migrations', async () => {
      ensureNxProject(
        '@nx-workshop-react/nx-workshop',
        'dist/libs/nx-workshop'
      );
      expect(() => checkFilesExist(`libs`)).not.toThrow();

      runNxCommand(
        'generate @nx-workshop-react/nx-workshop:complete-labs 1-22'
      );
      console.log(
        'To complete the labs: `cd tmp/nx-e2e/proj && nx migrate --run-migrations=migrations.json`'
      );
      // await runNxCommandAsync('migrate --run-migrations=migrations.json');
    }, 120000);
  });
});
