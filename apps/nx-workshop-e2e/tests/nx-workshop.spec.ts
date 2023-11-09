import { readJsonFile, workspaceRoot, writeJsonFile } from '@nx/devkit';
import { ExecSyncOptionsWithStringEncoding, execSync } from 'child_process';
import { ensureDirSync, removeSync, existsSync } from 'fs-extra';
import { dirname, join } from 'path';

describe('nx-react-workshop e2e', () => {
  describe('migrations for alternative option', () => {
    it('should run the migrations', () => {
      createNewWorkspace();

      expect(() => checkFilesExist(`node_modules/.bin/nx`)).not.toThrow();
    }, 120000);

    for (let i = 1; i < 23; i++) {
      it(`should complete lab ${i}`, () => {
        runNxCommand(
          `generate @nrwl/nx-react-workshop:complete-labs --lab=${i} --option=option1`
        );
        runNxCommand('migrate --run-migrations=migrations.json --verbose');
        runNxCommand(
          'run-many --target=e2e --parallel=false --exclude=internal-plugin-e2e'
        );
        runNxCommand('run-many --target=lint --parallel=false');
      });
    }
  });

  describe('migrations for deployment path', () => {
    it('should run the migrations', () => {
      createNewWorkspace();

      expect(() => checkFilesExist(`node_modules/.bin/nx`)).not.toThrow();
    }, 120000);

    for (let i = 1; i < 23; i++) {
      it(`should complete lab ${i}`, () => {
        runNxCommand(
          `generate @nrwl/nx-react-workshop:complete-labs --lab=${i} --option=option2`
        );
        runNxCommand('migrate --run-migrations=migrations.json');
        runNxCommand(
          'run-many --target=e2e --parallel=false --exclude=internal-plugin-e2e'
        );
        runNxCommand('run-many --target=lint --parallel=false');
      });
    }
  });
});

const scope = `bg-hoard`;

function tmpProjPath() {
  return join(process.cwd(), 'tmp', 'nx-e2e', scope);
}

function createNewWorkspace() {
  const localTmpDir = dirname(tmpProjPath());
  ensureDirSync(localTmpDir);
  removeSync(tmpProjPath());
  // create new workspace
  execSync(
    `node ${require.resolve(
      'nx'
    )} new ${scope} --nx-workspace-root=${localTmpDir} --no-interactive --skip-install --collection=@nx/workspace --npmScope=${scope} --preset=apps --packageManager=npm`,
    {
      cwd: localTmpDir,
    }
  );
  // patch package.json
  const path = join(tmpProjPath(), 'package.json');
  const json = readJsonFile(path);
  json.devDependencies[
    '@nrwl/nx-react-workshop'
  ] = `file:${workspaceRoot}/dist/libs/nx-react-workshop`;
  writeJsonFile(path, json);
  // install dependencies
  execSync('npm install', {
    cwd: tmpProjPath(),
    stdio: ['ignore', 'ignore', 'ignore'],
  });
}

function checkFilesExist(...expectedPaths) {
  expectedPaths.forEach((path) => {
    const filePath = join(tmpProjPath(), path);
    if (!execSync(filePath)) {
      throw new Error(`'${filePath}' does not exist`);
    }
  });
}

function runNxCommand(command): string {
  function _runNxCommand(c) {
    const execSyncOptions: ExecSyncOptionsWithStringEncoding = {
      cwd: tmpProjPath(),
      env: process.env,
      encoding: 'utf-8',
    };
    if (existsSync(join(tmpProjPath(), 'package.json'))) {
      return execSync(`npx nx ${c}`, execSyncOptions);
    } else {
      return execSync(`./nx %${c}`, execSyncOptions);
    }
  }
  try {
    return _runNxCommand(command)
      .toString()
      .replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        ''
      );
  } catch (e) {
    console.log(e.stdout.toString(), e.stderr.toString());
    throw e;
  }
}
