/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree, readJsonFile } from '@nx/devkit';

export default function update(host: Tree) {
  const { flyName } = readJsonFile('.nx-workshop.json');

  host.write(
    '.github/workflows/deploy.yml',
    `
name: Deploy Website

on:
  push:
    branches:
      - master

env:
  SURGE_DOMAIN: \${{ secrets.SURGE_DOMAIN }}
  SURGE_TOKEN: \${{ secrets.SURGE_TOKEN }}
  FLY_API_TOKEN: \${{ secrets.FLY_API_TOKEN }}
  NX_API_URL: https://${flyName}.fly.dev

jobs:
  build:
    runs-on: ubuntu-latest
    name: Deploying apps
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: bahmutov/npm-install@v1
      - uses: nrwl/nx-set-shas@v4
      - run: npm run nx affected -- --target=build --base=\${{ env.NX_BASE }} --parallel --configuration=production
      - run: npm run nx affected -- --target=deploy --base=\${{ env.NX_BASE }} --parallel
`
  );
}
