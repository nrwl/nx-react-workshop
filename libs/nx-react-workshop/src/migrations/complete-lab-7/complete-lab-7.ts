/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree, addDependenciesToPackageJson } from '@nx/devkit';
import { applicationGenerator } from '@nx/express';
import { Linter } from '@nx/linter';
import { dependencies } from '../../../package.json';

export default async function update(host: Tree) {
  await addDependenciesToPackageJson(
    host,
    {},
    {
      '@nx/express': dependencies['@nx/express'],
    }
  );

  // nx generate @nx/express:application api --frontendProject=store
  await applicationGenerator(host, {
    name: 'api',
    frontendProject: 'store',
    skipFormat: true,
    skipPackageJson: false,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
    js: false,
    pascalCaseFiles: false,
  });
  host.write(
    'apps/api/src/app/games.repository.ts',
    `const games = [
  {
    id: 'settlers-in-the-can',
    name: 'Settlers in the Can',
    image: '/assets/beans.png', // 'https://media.giphy.com/media/xUNda3pLJEsg4Nedji/giphy.gif',
    description:
      'Help your bug family claim the best real estate in a spilled can of beans.',
    price: 35,
    rating: Math.random(),
  },
  {
    id: 'chess-pie',
    name: 'Chess Pie',
    image: '/assets/chess.png', // 'https://media.giphy.com/media/iCZyBnPBLr0dy/giphy.gif',
    description: 'A circular game of Chess that you can eat as you play.',
    price: 15,
    rating: Math.random(),
  },
  {
    id: 'purrfection',
    name: 'Purrfection',
    image: '/assets/cat.png', // 'https://media.giphy.com/media/12xMvwvQXJNx0k/giphy.gif',
    description: 'A cat grooming contest goes horribly wrong.',
    price: 45,
    rating: Math.random(),
  },
];

export const getAllGames = () => games;
export const getGame = (id: string) => games.find((game) => game.id === id);
`
  );
  host.write(
    'apps/api/src/main.ts',
    `/**
* This is not a production server yet!
* This is only a minimal backend to get started.
*/

import express from 'express';
import { getAllGames, getGame } from './app/games.repository';

const app = express();

app.get('/api/games', (req, res) => {
 res.send(getAllGames());
});

app.get('/api/games/:id', (req, res) => {
 return res.send(getGame(req.params.id));
});

const port = process.env.port || 3000;
const server = app.listen(port, () => {
 console.log(\`Listening at http://localhost:\${port}/api\`);
});
server.on('error', console.error);
`
  );
}
