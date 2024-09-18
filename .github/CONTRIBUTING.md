# Contributing

`TODO`

## Local Package Publishing

When iterating on the `@nrwl/nx-react-workshop-e2e` package, it's often helpful to test out a published
version of the package locally. This can be done by starting the local registry, `verdaccio`, and using the `nx release` command.

To start the local registry, run the `local-registry` target for the root workspace project:

```bash
nx local-registry
```

In another terminal, you can then trigger deployment to that registry by running the `release` target for the `nx-react-workshop-e2e` project:

```bash
nx release version prerelease && nx release publish

# alternatively
nx release-dev nx-react-workshop
```

Once your dev version has been published, you can then update the `nx-react-workshop-e2e` package in your consuming project to the version you just published.

Since verdaccio configures itself in the `~/.npmrc` file, you can simply install using your standard package manager commands:

```bash
npm add --save-dev @nrwl/nx-react-workshop@latest
# or alternatively with yarn
yarn add -D @nrwl/nx-react-workshop@latest
```

## Updating workshop content

The workshop content is stored in the `docs` directory. The content is written in markdown and is organized by lab. Each lab has its own directory with a `LAB.md` and `SOLUTION.md`.

When updating:

1. Use the migration generator to jump to the lab before the being updating

   ```sh
   # Reset the repo (currently required as a separate step due to issue with getProjects)
   # See comment in nx-workspace-e2e/tests/nx-workshop.spec.ts for more details
   nx generate @nrwl/nx-react-workshop:complete-labs 1
   nx migrate --run-migrations=migrations.json --verbose

   # Run migrations to the prior lab
   nx generate @nrwl/nx-react-workshop:complete-labs --from=2 --to=<the-prior-lab-number>
   nx migrate --run-migrations=migrations.json --verbose
   ```

2. Manually run through the lab and verify:

   - The instructions in LAB.md and language reflect the current state of the nx
   - The contents of SOLUTION.md match 1:1 with the steps in the lab
   - Any screenshots or prompt examples accurately reflect the output from the lab

3. Verify the completion migration reflects the steps outlined in the solution

   ```sh
   # After manually following the lab in step #2

   # git commit
   git add . && git commit -m 'manually run through completion steps'

   # reset repo state
   nx generate @nrwl/nx-react-workshop:complete-labs 1
   nx migrate --run-migrations=migrations.json --verbose

   # migrate to end of lab
   nx generate @nrwl/nx-react-workshop:complete-labs --from=2 --to=<the-lab-being-updated>
   nx migrate --run-migrations=migrations.json --verbose

   # Verify there are no differences
   git status # should show no changes
   ```
