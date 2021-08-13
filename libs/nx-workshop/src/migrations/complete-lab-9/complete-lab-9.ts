/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree } from '@nrwl/devkit';
import { libraryGenerator, moveGenerator } from '@nrwl/workspace';

export default async function update(host: Tree) {
  // nx generate @nrwl/workspace:lib util-interface --directory=api
  await libraryGenerator(host, {
    name: 'util-interface',
    directory: 'api',
  });
  host.write(
    'libs/api/util-interface/src/lib/api-util-interface.ts',
    `export interface Game {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
}
`
  );
  host.write(
    'apps/api/src/app/games.repository.ts',
    `import { Game } from '@bg-hoard/api/util-interface';
const games: Game[] = [
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

  // nx generate @nrwl/workspace:move --projectName=api-util-interface util-interface
  await moveGenerator(host, {
    projectName: 'api-util-interface',
    destination: 'util-interface',
    updateImportPath: true,
  });
}
