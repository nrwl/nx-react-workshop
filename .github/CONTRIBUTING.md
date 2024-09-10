# Contributing

`TODO`

## Local Package Publishing

When iterating on the `@nrwl/nx-workshop-e2e` package, it's often helpful to test out a published
version of the package locally. This can be done by starting the local registry, `verdaccio`, and using the `nx release` command.

To start the local registry, run the `local-registry` target for the root workspace project:

```bash
nx local-registry
```

In another terminal, you can then trigger deployment to that registry by running the `release` target for the `nx-workshop-e2e` project:

```bash
nx release version prerelease && nx release publish

# alternatively
nx release-dev nx-react-workshop
```

Once your dev version has been published, you can then update the `nx-workshop-e2e` package in your consuming project to the version you just published.

Since verdaccio configures itself in the `~/.npmrc` file, you can simply install using your standard package manager commands:

```bash
npm add --save-dev @nrwl/nx-react-workshop@latest
# or alternatively with yarn
yarn add -D @nrwl/nx-react-workshop@latest
```
