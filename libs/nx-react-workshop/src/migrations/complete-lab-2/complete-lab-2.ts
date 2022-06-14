/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addDependenciesToPackageJson,
  formatFiles,
  installPackagesTask,
  Tree,
} from '@nrwl/devkit';
import { dependencies } from '../../../package.json';
import { applicationGenerator } from '@nrwl/react';
import { Linter } from '@nrwl/linter';
import fetch from 'node-fetch';

export default async function update(tree: Tree) {
  await addDependenciesToPackageJson(
    tree,
    {
      '@material-ui/core': 'latest',
    },
    {
      '@nrwl/react': dependencies['@nrwl/react'],
    }
  );
  await applicationGenerator(tree, {
    name: 'store',
    babelJest: true,
    e2eTestRunner: 'cypress',
    skipFormat: true,
    linter: Linter.EsLint,
    style: 'scss',
    unitTestRunner: 'jest',
    routing: true,
  });
  tree.write(
    'apps/store/src/fake-api.ts',
    `const games = [
    {
      id: 'settlers-in-the-can',
      name: 'Settlers in the Can',
      image: '/assets/beans.png', // 'https://media.giphy.com/media/xUNda3pLJEsg4Nedji/giphy.gif',
      description:
        'Help your bug family claim the best real estate in a spilled can of beans.',
      price: 35,
      rating: Math.random()
    },
    {
      id: 'chess-pie',
      name: 'Chess Pie',
      image: '/assets/chess.png', // 'https://media.giphy.com/media/iCZyBnPBLr0dy/giphy.gif',
      description: 'A circular game of Chess that you can eat as you play.',
      price: 15,
      rating: Math.random()
    },
    {
      id: 'purrfection',
      name: 'Purrfection',
      image: '/assets/cat.png', // 'https://media.giphy.com/media/12xMvwvQXJNx0k/giphy.gif',
      description: 'A cat grooming contest goes horribly wrong.',
      price: 45,
      rating: Math.random()
    }
  ];

  export const getAllGames = () => games;
  export const getGame = (id: string) => games.find(game => game.id === id);
  `
  );
  tree.write(
    'apps/store/src/app/app.module.scss',
    `.games-layout {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .container {
    max-width: 800px;
    margin: 50px auto;
  }

  .game-card {
    max-width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .game-rating {
      padding-top: 10px;
    }
  }

  .center-content {
    display: flex;
    justify-content: center;
  }

  .game-details {
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  .game-card-media {
    height: 140px;
  }
  `
  );
  tree.write(
    'apps/store/src/app/app.tsx',
    `import styles from './app.module.scss';
  import { getAllGames } from '../fake-api';

  import Card from '@material-ui/core/Card';
  import CardActionArea from '@material-ui/core/CardActionArea';
  import CardContent from '@material-ui/core/CardContent';
  import CardMedia from '@material-ui/core/CardMedia';
  import Typography from '@material-ui/core/Typography';

  export const App = () => {
    return (
      <div className={styles['container']}>
        <div className={styles['games-layout']}>
          {getAllGames().map((x) => (
            <Card key={x.id} className={styles['game-card']}>
              <CardActionArea>
                <CardMedia
                  className={styles['game-card-media']}
                  image={x.image}
                  title={x.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {x.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {x.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={styles['game-rating']}
                  >
                    <strong>Rating:</strong> {x.rating}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  export default App;
  `
  );
  formatFiles(tree);
  async function download(uri: string, filename: string) {
    await fetch(uri)
      .then(async (res) => Buffer.from(await res.arrayBuffer()))
      .then((buffer) => {
        tree.write(filename, buffer);
      });
  }
  await download(
    'https://github.com/nrwl/nx-react-workshop/raw/main/examples/lab2/apps/store/src/assets/beans.png',
    'apps/store/src/assets/beans.png'
  );
  await download(
    'https://github.com/nrwl/nx-react-workshop/raw/main/examples/lab2/apps/store/src/assets/cat.png',
    'apps/store/src/assets/cat.png'
  );
  await download(
    'https://github.com/nrwl/nx-react-workshop/raw/main/examples/lab2/apps/store/src/assets/chess.png',
    'apps/store/src/assets/chess.png'
  );
  return async () => {
    installPackagesTask(tree);
  };
}
