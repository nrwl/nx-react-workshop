import {
  checkFilesExist,
  ensureNxProject,
  runNxCommand,
} from '@nrwl/nx-plugin/testing';
describe('nx-react-workshop e2e', () => {
  describe('migrations', () => {
    it('should run the migrations', async () => {
      ensureNxProject('@nrwl/nx-react-workshop', 'dist/libs/nx-react-workshop');
      expect(() => checkFilesExist(`libs`)).not.toThrow();

      runNxCommand(
        'generate @nrwl/nx-react-workshop:complete-labs --from=1 --to=22 --option=option2'
      );
      console.log(
        'To complete the labs: `cd tmp/nx-e2e/proj && nx migrate --run-migrations=migrations.json`'
      );
      // await runNxCommandAsync('migrate --run-migrations=migrations.json');
    }, 120000);
  });
});
