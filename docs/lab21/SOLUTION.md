##### GitHub CD setup

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
      - uses: bahmutov/npm-install@v1
      - run: npm run nx build store
      - run: npm run nx build api -- --configuration=production
      - run: npm run nx deploy store
      - run: npm run nx deploy api
```
