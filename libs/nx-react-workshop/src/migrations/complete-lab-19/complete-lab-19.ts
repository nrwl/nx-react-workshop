import {
  addDependenciesToPackageJson,
  readJsonFile,
  readProjectConfiguration,
  Tree,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { uniq } from '@nrwl/nx-plugin/testing';
import { execSync } from 'child_process';

export default function update(host: Tree) {
  let herokuToken, herokuName;
  if (host.exists('.nx-workshop.json')) {
    const workshopConstants = readJsonFile('.nx-workshop.json');
    herokuToken = workshopConstants.herokuToken;
    herokuName = workshopConstants.surgeName;
  }
  if (!herokuToken || !herokuName) {
    const herokuToken = execSync('heroku authorizations:create')
      .toString()
      .split('\n')
      .filter((line) => line.startsWith('ID:'))
      .map((line) => line.replace('ID:', '').trim())[0];
    herokuName = uniq(`prophetic-narwhal-`);
    if (host.exists('.nx-workshop.json')) {
      updateJson(host, '.nx-workshop.json', (json) => {
        json.herokuToken = herokuToken;
        json.herokuName = herokuName;
        return json;
      });
    } else {
      host.write(
        '.nx-workshop.json',
        JSON.stringify({ herokuName, herokuToken })
      );
    }
  }

  execSync(`heroku create ${herokuName}`);

  host.write(
    'apps/api/.local.env',
    `
  HEROKU_API_KEY=${herokuToken}
  `
  );
  host.write(
    'apps/api/Dockerfile',
    `
# use a Node v12 based image
FROM node:12-alpine
# switch to the /app folder in the image
WORKDIR /app
# copy all files from the folder its in into the /app folder we switched to
COPY ./ ./
# launch the main.js file
CMD node main.js
`
  );

  const apiConfig = readProjectConfiguration(host, 'api');
  apiConfig.targets.build.configurations.production.externalDependencies = [
    '@nestjs/microservices',
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    'class-transformer',
    'class-validator',
    'cache-manager',
  ];
  apiConfig.targets.deploy = {
    executor: '@nrwl/workspace:run-commands',
    outputs: [],
    options: {
      commands: [
        'cp ../../../apps/api/Dockerfile .',
        'heroku container:login',
        `heroku container:push web -a ${herokuName}`,
        `heroku container:release web -a ${herokuName}`,
      ],
      cwd: 'dist/apps/api',
      parallel: false,
    },
  };
  updateProjectConfiguration(host, 'api', apiConfig);

  addDependenciesToPackageJson(host, { cors: '*' }, {});
  host.write(
    'apps/api/src/main.ts',
    `
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { getAllGames, getGame } from './app/games.repository';
import * as cors from 'cors';

const app = express();

app.use(cors());
app.get('/api/games', (req, res) => {
  res.send(getAllGames());
});

app.get('/api/games/:id', (req, res) => {
  return res.send(getGame(req.params.id));
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(\`Listening at http://localhost:\${port}/api\`);
});
server.on('error', console.error);
`
  );
}
