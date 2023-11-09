/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree, updateJson } from '@nx/devkit';

export default function update(host: Tree) {
  host.write(
    '.github/workflows/ci.yml',
    `
name: Run CI checks

on: [pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    name: Building affected apps
    steps:
      - uses: actions/checkout@v4
      - uses: bahmutov/npm-install@v1.4.5
      - run: npm run nx affected -- --target=build --base=origin/master --parallel
  test:
    runs-on: ubuntu-latest
    name: Testing affected apps
    steps:
      - uses: actions/checkout@v4
      - uses: bahmutov/npm-install@v1.4.5
      - run: npm run nx affected -- --target=test --base=origin/master --parallel
  lint:
    runs-on: ubuntu-latest
    name: Linting affected apps
    steps:
      - uses: actions/checkout@v4
      - uses: bahmutov/npm-install@v1.4.5
      - run: npm run nx affected -- --target=lint --base=origin/master --parallel
  e2e:
    runs-on: ubuntu-latest
    name: E2E testing affected apps
    steps:
      - uses: actions/checkout@v4
      - uses: bahmutov/npm-install@v1.4.5
      - run: npm run nx affected -- --target=e2e --base=origin/master --parallel
`
  );
  updateJson(host, 'nx.json', (json) => {
    const sharedGlobalsSet = new Set(json['namedInputs'].sharedGlobals || []);
    sharedGlobalsSet.add('{workspaceRoot}/.github/workflows/ci.yml');
    json['namedInputs'].sharedGlobals = Array.from(sharedGlobalsSet);
    return json;
  });
}
