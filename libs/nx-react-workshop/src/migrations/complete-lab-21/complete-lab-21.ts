import { readJsonFile, Tree } from '@nx/devkit';

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
      - uses: bahmutov/npm-install@v1.4.5
      - run: npm run nx build store -- --configuration=production
      - run: npm run nx build api -- --configuration=production
      - run: npm run nx deploy store
      - run: npm run nx deploy api
`
  );
}
