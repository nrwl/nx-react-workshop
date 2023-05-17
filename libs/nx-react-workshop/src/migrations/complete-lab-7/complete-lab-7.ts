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
  host.write(
    'apps/api-e2e/src/api/api.spec.ts',
    `import axios from 'axios';
    import { exec } from 'child_process';
    
    describe('GET /api/games', () => {
      it('should return a list of games', async () => {
        exec('nx serve api');
        const res = await axios.get(\`/api/games\`);
    
        expect(res.status).toBe(200);
        expect(res.data).toEqual([
          {
            description:
              'Help your bug family claim the best real estate in a spilled can of beans.',
            id: 'settlers-in-the-can',
            image: '/assets/beans.png',
            name: 'Settlers in the Can',
            price: 35,
            rating: 0.3587628267267855,
          },
          {
            description: 'A circular game of Chess that you can eat as you play.',
            id: 'chess-pie',
            image: '/assets/chess.png',
            name: 'Chess Pie',
            price: 15,
            rating: 0.2276820073595769,
          },
          {
            description: 'A cat grooming contest goes horribly wrong.',
            id: 'purrfection',
            image: '/assets/cat.png',
            name: 'Purrfection',
            price: 45,
            rating: 0.6945522801554647,
          },
        ]);
      });
    });
    `
  );
}
