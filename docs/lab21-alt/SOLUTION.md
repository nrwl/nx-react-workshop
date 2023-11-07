##### GitHub CD setup

```yaml
name: Deploy Website

on:
  push:
    branches:
      - master

env:
  SURGE_DOMAIN_STORE: ${{ secrets.SURGE_DOMAIN_STORE }}
  SURGE_DOMAIN_ADMIN_UI: ${{ secrets.SURGE_DOMAIN_ADMIN_UI }}
  SURGE_TOKEN: ${{ secrets.SURGE_TOKEN }}

jobs:
  build:
    runs-on: ubuntu-latest
    name: Deploying apps
    steps:
      - uses: actions/checkout@v4
      - uses: bahmutov/npm-install@v1
      - run: npm run nx build store
      - run: npm run nx build admin-ui -- --configuration=production
      - run: npm run nx deploy store
      - run: npm run nx deploy admin-ui
```
