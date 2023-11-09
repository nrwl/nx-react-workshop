##### The full deploy script

```yaml
name: Deploy Website

on:
  push:
    branches:
      - master

env:
  SURGE_DOMAIN_STORE: ${{ secrets.SURGE_DOMAIN_STORE }}
  SURGE_TOKEN: ${{ secrets.SURGE_TOKEN }}
  FLY_API_TOKEN: \${{ secrets.FLY_API_TOKEN }}
  NX_API_URL: https://<your-fly-io-name>.fly.dev

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
        with:
          main-branch-name: 'main' # remember to set this correctly
      - run: npm run nx affected -- --target=build --base=${{ env.NX_BASE }} --parallel --configuration=production
      - run: npm run nx affected -- --target=deploy --base=${{ env.NX_BASE }} --parallel
```
