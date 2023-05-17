import {
  checkFilesExist,
  ensureNxProject,
  runNxCommand,
} from '@nx/plugin/testing';
import { execSync } from 'child_process';
describe('nx-react-workshop e2e', () => {
  describe('migrations', () => {
    it('should run the migrations', () => {
      ensureNxProject('@nrwl/nx-react-workshop', 'dist/libs/nx-react-workshop');
      expect(() => checkFilesExist(`libs`)).not.toThrow();

      // runNxCommand(
      //   'generate @nrwl/nx-react-workshop:complete-labs --from=1 --to=22 --option=option2'
      // );
      // console.log(
      //   'To complete the labs: `cd tmp/nx-e2e/proj && nx migrate --run-migrations=migrations.json`'
      // );
      // runNxCommand('migrate --run-migrations=migrations.json');
    }, 120000);
    for (let i = 1; i < 9; i++) {
      it(`should complete lab ${i}`, () => {
        runNxCommand(`generate @nrwl/nx-react-workshop:complete-labs --lab=${i}`);
        runNxCommand('migrate --run-migrations=migrations.json');
        runNxCommand('run-many --target=e2e');
      });
    }
  });
});
