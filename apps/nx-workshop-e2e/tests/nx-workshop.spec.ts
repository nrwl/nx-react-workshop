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
      expect(() => checkFilesExist(`node_modules/.bin/nx`)).not.toThrow();
    }, 120000);
    for (let i = 1; i < 22; i++) {
      it(`should complete lab ${i}`, () => {
        runNxCommand(
          `generate @nrwl/nx-react-workshop:complete-labs --lab=${i}`
        );
        runNxCommand('migrate --run-migrations=migrations.json');
        runNxCommand('run-many --target=e2e --parallel=false');
      });
    }
  });
});
