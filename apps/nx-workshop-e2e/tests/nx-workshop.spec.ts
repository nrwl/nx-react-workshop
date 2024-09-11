import { execSync, ExecSyncOptionsWithStringEncoding } from 'child_process';
import { join, dirname } from 'path';
import { mkdirSync, rmSync } from 'fs';

// TODO: Update to 22 once all labs are updated/fixed
// const LAB_COUNT = 22;
const LAB_COUNT = 3;
const LABS_TO_TEST = Array.from({ length: LAB_COUNT }, (_, i) => ({
  labNumber: i + 1,
}));

describe('nx-react-workshop', () => {
  let projectDirectory: string;

  beforeAll(() => {
    projectDirectory = createTestProject();

    // The plugin has been built and published to a local registry in the jest globalSetup
    // Install the plugin built with the latest source code into the test repo
    execSync(`npm install @nrwl/nx-react-workshop@e2e`, {
      cwd: projectDirectory,
      stdio: 'inherit',
      env: process.env,
    });
  });

  afterAll(() => {
    // Cleanup the test project
    try {
      rmSync(projectDirectory, { recursive: true, force: true });
    } catch {
      // Sometimes the daemon writes to `.nx/` while we're deleting
      // Make a second attempt to clean that up
      rmSync(projectDirectory, { recursive: true, force: true });
    }
  });

  it('should be installed', () => {
    // npm ls will fail if the package is not installed properly
    execSync('npm ls @nrwl/nx-react-workshop', {
      cwd: projectDirectory,
      stdio: 'inherit',
    });
  });

  describe('migrations', () => {
    describe.each(['option1', 'option2'])('for %s', (option) => {
      it.each(LABS_TO_TEST)(
        `should successfully complete lab $labNumber`,
        ({ labNumber }) => {
          runNxCommand(
            `generate @nrwl/nx-react-workshop:complete-labs --lab=${labNumber} --option=${option}`,
            projectDirectory
          );
          runNxCommand(
            'migrate --run-migrations=migrations.json --verbose',
            projectDirectory
          );
          runNxCommand(
            'run-many --target=e2e --parallel=false --exclude=internal-plugin-e2e',
            projectDirectory
          );
          runNxCommand(
            'run-many --target=lint --parallel=false',
            projectDirectory
          );
        }
      );
    });

    // TODO: fix this as a part of updating lab 2
    it.todo('should support migrating from one version to another'); /*, () => {
      runNxCommand(
        `generate @nrwl/nx-react-workshop:complete-labs --from=1 --to=${LAB_COUNT}`,
        projectDirectory
      );
      runNxCommand(
        'migrate --run-migrations=migrations.json --verbose',
        projectDirectory
      );
      runNxCommand(
        'run-many --target=e2e --parallel=false --exclude=internal-plugin-e2e',
        projectDirectory
      );
      runNxCommand('run-many --target=lint --parallel=false', projectDirectory);
    }); */
  });
});

/**
 * Creates a test project with create-nx-workspace and installs the plugin
 * @returns The directory where the test project was created
 */
function createTestProject() {
  const projectName = 'test-project';
  const projectDirectory = join(process.cwd(), 'tmp', projectName);

  // Ensure projectDirectory is empty
  rmSync(projectDirectory, { recursive: true, force: true });
  mkdirSync(dirname(projectDirectory), { recursive: true });

  execSync(
    `npx --yes create-nx-workspace@latest ${projectName} --preset apps --nxCloud=skip --no-interactive`,
    {
      cwd: dirname(projectDirectory),
      stdio: 'inherit',
      env: process.env,
    }
  );
  console.log(`Created test project in "${projectDirectory}"`);

  return projectDirectory;
}

function runNxCommand(command: string, projectDirectory: string): string {
  const execSyncOptions: ExecSyncOptionsWithStringEncoding = {
    cwd: projectDirectory,
    env: process.env,
    stdio: 'inherit',
    encoding: 'utf-8',
  };

  return execSync(`npx nx ${command}`, execSyncOptions);
}
