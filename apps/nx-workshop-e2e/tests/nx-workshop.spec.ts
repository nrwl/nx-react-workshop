import { execSync, ExecSyncOptionsWithStringEncoding } from 'child_process';
import { join, dirname } from 'path';
import { mkdirSync, rmSync } from 'fs';
import { copy } from 'fs-extra';
import { compareSync, Result as DirCompareResult } from 'dir-compare';
import { stripIndents } from '@nx/devkit';

// TODO: Update to 22 once all labs are updated/fixed
// const LAB_COUNT = 22;
const LAB_COUNT = 2;

// We iterate from lab 2 to LAB_COUNT since lab 1 is a special case that resets the project
// which we test explicitly at the end of the test suite
const LABS_TO_TEST = Array.from({ length: LAB_COUNT - 1 }, (_, i) => ({
  labNumber: i + 2,
}));

describe('nx-react-workshop', () => {
  let projectDirectory: string;
  let emptyProjectDirectory: string;

  beforeAll(async () => {
    projectDirectory = createTestProject();

    // The plugin has been built and published to a local registry in the jest globalSetup
    // Install the plugin built with the latest source code into the test repo
    execSync(`npm install --save-dev @nrwl/nx-react-workshop@e2e`, {
      cwd: projectDirectory,
      stdio: 'inherit',
      env: process.env,
    });

    // A noop to verify generator works and setup project in an "initial state"
    runNxCommand(
      `generate @nrwl/nx-react-workshop:complete-labs --lab=0`,
      projectDirectory
    );

    // Make a copy of the initial project state so we can compare against it later
    emptyProjectDirectory = join(process.cwd(), 'tmp', 'empty-project');
    await copy(projectDirectory, emptyProjectDirectory, {
      filter: (src) => !src.includes('node_modules'),
    });
  }, 120000);

  afterAll(() => {
    // Cleanup the test project
    rmSync(emptyProjectDirectory, { recursive: true, force: true });
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
            'run-many --target=e2e --parallel=false',
            projectDirectory
          );
          runNxCommand(
            'run-many --target=lint --parallel=false',
            projectDirectory
          );
        }
      );

      /**
       * TODO: figure out what best approach for getProjects(tree) is
       *
       * Right now, if you call the removeGenerator for a project and then
       * immediately call getProjects(tree), getProjects will throw.
       *
       * This is due to getProjects fetching a list of project.json files
       * using globWithWorkspaceContextSync, which globs against the real
       * filesystem rather than the in-memory tree.
       *
       * Once the list of project.json flies is fetched, the project details
       * are they attempted to be fetched from the in-memory tree, which
       * subsequently fails because we just deleted it.
       *
       * See: {@link https://github.com/nrwl/nx/blob/master/packages/nx/src/generators/utils/project-configuration.ts#L251}
       *
       * Re-enabling this test will recreate the issue as long as the current
       * workspace has at least one project in it (which the previous test will create)
       */
      it.skip('should support migrating from one version to another', () => {
        runNxCommand(
          `generate @nrwl/nx-react-workshop:complete-labs --from=1 --to=${LAB_COUNT}`,
          projectDirectory
        );
        runNxCommand(
          'migrate --run-migrations=migrations.json --verbose',
          projectDirectory
        );
        runNxCommand(
          'run-many --target=e2e --parallel=false',
          projectDirectory
        );
        runNxCommand(
          'run-many --target=lint --parallel=false',
          projectDirectory
        );
      });

      // NOTE: this test assumes that the current test project is in the final lab completed state
      it('complete-lab-1 migration should match an empty create-nx-workspace', () => {
        // Reset the test project to it's initial state using the "complete-lab-1" migration
        runNxCommand(
          `generate @nrwl/nx-react-workshop:complete-labs --lab=1 --option=${option}`,
          projectDirectory
        );
        runNxCommand(
          'migrate --run-migrations=migrations.json --verbose',
          projectDirectory
        );

        const result = compareSync(projectDirectory, emptyProjectDirectory, {
          excludeFilter: [
            '*.env',
            '.git',
            '.DS_Store',
            '.nx',
            '.vscode',
            'dist',
            'node_modules',
            'tmp',
          ].join(','),
        });

        if (!result.same) {
          logProjectDifferences(result);
        }

        expect(result.same).toBeTruthy();
      });
    });
  });
});

/**
 * Creates a test project with create-nx-workspace and installs the plugin
 * @returns The directory where the test project was created
 */
function createTestProject(projectName = 'test-project') {
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

function logProjectDifferences(result: DirCompareResult) {
  console.error(
    stripIndents`
      Empty project and reset project do not match:
      %s
    `,
    result.diffSet
      .filter(({ state }) => state !== 'equal')
      .map((dif) => {
        switch (dif.state) {
          case 'distinct':
            return `  ${dif.name1}: expected migration to reset this files content`;

          case 'left':
            return `  ${dif.name1}: expected migration to delete this path`;

          case 'right':
            return `  ${dif.name1} expected migration to retain this path`;

          default:
            throw new Error(`Unexpected diff state: ${dif.state}`);
        }
      })
      .join('\n')
  );
}
