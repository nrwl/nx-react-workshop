import {
  checkFilesExist,
  cleanup,
  patchPackageJsonForPlugin,
  runNxCommand,
  runPackageManagerInstall,
  tmpProjPath,
} from '@nx/plugin/testing';
import { execSync } from 'child_process';
import { ensureDirSync } from 'fs-extra';
import { dirname } from 'path';

describe('nx-react-workshop e2e', () => {
  describe('migrations for alternative option', () => {
    it('should run the migrations', () => {
      ensureDirSync(tmpProjPath());
      cleanup();
      const localTmpDir = dirname(tmpProjPath());
      execSync(
        `node ${require.resolve(
          'nx'
        )} new proj --nx-workspace-root=${localTmpDir} --no-interactive --skip-install --collection=@nx/workspace --npmScope=proj --preset=apps --packageManager=yarn`,
        {
          cwd: localTmpDir,
        }
      );
      patchPackageJsonForPlugin('@nrwl/nx-react-workshop', 'dist/libs/nx-react-workshop');
      runPackageManagerInstall();

      expect(() => checkFilesExist(`node_modules/.bin/nx`)).not.toThrow();
    }, 120000);

    for (let i = 1; i < 23; i++) {
      it(`should complete lab ${i}`, () => {
        runNxCommand(
          `generate @nrwl/nx-react-workshop:complete-labs --lab=${i > 18 && i < 22 ? i + '-alt' : i}`
        );
        runNxCommand('migrate --run-migrations=migrations.json');
        runNxCommand('run-many --target=e2e --parallel=false');
      });
    }
  });

  describe('migrations for deployment path', () => {
    it('should run the migrations', () => {
      ensureDirSync(tmpProjPath());
      cleanup();
      const localTmpDir = dirname(tmpProjPath());
      execSync(
        `node ${require.resolve(
          'nx'
        )} new proj --nx-workspace-root=${localTmpDir} --no-interactive --skip-install --collection=@nx/workspace --npmScope=proj --preset=apps --packageManager=yarn`,
        {
          cwd: localTmpDir,
        }
      );
      patchPackageJsonForPlugin('@nrwl/nx-react-workshop', 'dist/libs/nx-react-workshop');
      runPackageManagerInstall();

      expect(() => checkFilesExist(`node_modules/.bin/nx`)).not.toThrow();
    }, 120000);

    for (let i = 1; i < 23; i++) {
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

