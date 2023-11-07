/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree } from '@nx/devkit';
import { moveGenerator } from '@nx/workspace';
import { libraryGenerator } from '@nx/js';

export default async function update(host: Tree) {
  // nx generate @nx/js:lib util-interface --directory=api
  await libraryGenerator(host, {
    name: 'api-util-interface',
    directory: 'libs/api/util-interface',
    projectNameAndRootFormat: 'as-provided',
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

  // nx generate @nx/workspace:move --projectName=api-util-interface util-interface
  await moveGenerator(host, {
    projectName: 'api-util-interface',
    destination: 'util-interface',
    updateImportPath: true,
  });

  host.write(
    'apps/api/src/app/games.repository.ts',
    `import { Game } from '@bg-hoard/util-interface';
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

  host.write(
    'apps/store/src/app/app.tsx',
    `
  import { useEffect, useState } from 'react';

  import styles from './app.module.scss';

  import { Header } from '@bg-hoard/store/ui-shared';

  import Card from '@material-ui/core/Card';
  import CardActionArea from '@material-ui/core/CardActionArea';
  import CardContent from '@material-ui/core/CardContent';
  import CardMedia from '@material-ui/core/CardMedia';
  import Typography from '@material-ui/core/Typography';

  import { formatRating } from '@bg-hoard/store/util-formatters';

  import { Routes, Route, useNavigate } from 'react-router-dom';

  import { StoreFeatureGameDetail } from '@bg-hoard/store/feature-game-detail';
  import { Game } from '@bg-hoard/util-interface';

  export const App = () => {
    const navigate = useNavigate();
    const [state, setState] = useState<{
      data: Game[];
      loadingState: 'success' | 'error' | 'loading';
    }>({
      data: [],
      loadingState: 'success',
    });

    useEffect(() => {
      setState((state) => ({
        ...state,
        loadingState: 'loading',
      }));
      fetch('/api/games')
        .then((x) => x.json())
        .then((res) => {
          setState((state) => ({
            ...state,
            data: res,
            loadingState: 'success',
          }));
        })
        .catch((err) => {
          setState((state) => ({
            ...state,
            loadingState: 'error',
          }));
        });
    }, []);

    return (
      <>
        <Header />
        <div className={styles['container']}>
          <div className={styles['games-layout']}>
            {state.loadingState === 'loading'
              ? 'Loading...'
              : state.loadingState === 'error'
              ? '<div>Error retrieving data</div>'
              : state.data.map((x) => (
                  <Card
                    key={x.id}
                    className={styles['game-card']}
                    onClick={() => navigate(\`/game/\${x.id}\`)}
                  >
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
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {x.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          className={styles['game-rating']}
                        >
                          <strong>Rating:</strong> {formatRating(x.rating)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
          </div>
          <Routes>
            <Route path="/game/:id" element={<StoreFeatureGameDetail />} />;
          </Routes>
        </div>
      </>
    );
  };

  export default App;
  `
  );
  host.write(
    'libs/store/feature-game-detail/src/lib/game-detail/game-detail.tsx',
    `
  import { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import styles from './game-detail.module.css';

  import Button from '@material-ui/core/Button';
  import Card from '@material-ui/core/Card';
  import CardActions from '@material-ui/core/CardActions';
  import CardHeader from '@material-ui/core/CardHeader';
  import CardContent from '@material-ui/core/CardContent';
  import Typography from '@material-ui/core/Typography';
  import CardMedia from '@material-ui/core/CardMedia';
  import { formatRating } from '@bg-hoard/store/util-formatters';
  import { Game } from '@bg-hoard/util-interface';

  /* eslint-disable-next-line */
  export interface StoreFeatureGameDetailProps {}

  export function StoreFeatureGameDetail(props: StoreFeatureGameDetailProps) {
    const [state, setState] = useState<{
      data: Partial<Game>;
      loadingState: 'success' | 'error' | 'loading';
    }>({
      data: {},
      loadingState: 'success',
    });
    const params = useParams();

    useEffect(() => {
      setState({
        ...state,
        loadingState: 'loading',
      });
      const gameId = params['id'];
      fetch(\`/api/games/\${gameId}\`)
        .then((x) => x.json())
        .then((res) => {
          setState({
            ...state,
            data: res,
            loadingState: 'success',
          });
        })
        .catch((err) => {
          setState({
            ...state,
            loadingState: 'error',
          });
        });
    }, [params['id']]);

    return (
      <div className={styles['container']}>
        {state.loadingState === 'loading' ? (
          'Loading...'
        ) : state.loadingState === 'error' ? (
          <div>Error fetching data</div>
        ) : state.data == null ? (
          ''
        ) : (
          <Card>
            <CardHeader title={state.data.name}></CardHeader>
            {state.data.image ? (
              <CardMedia
                className={styles['game-card-media']}
                image={state.data.image}
                title={state.data.name}
              />
            ) : null}
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {state.data.description}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={styles['game-rating']}
              >
                <strong>Rating:</strong> {formatRating(state.data.rating)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary">
                Buy
              </Button>
              <Button variant="contained">Share</Button>
            </CardActions>
          </Card>
        )}
      </div>
    );
  };

  export default StoreFeatureGameDetail;
  `
  );
  host.write(
    'apps/api-e2e/src/api/graph.spec.ts',
    `import { execSync } from 'child_process';
    import { readFileSync } from 'node:fs';

    describe('Dependencies', () => {
      it('should have three dependencies on util-interface', async () => {
        execSync('nx graph --file=graph.json');
        const graph = JSON.parse(readFileSync('graph.json').toString());
        expect(graph.graph.dependencies['store'].some(dep => dep.target === 'util-interface')).toBe(true);
        expect(graph.graph.dependencies['store-feature-game-detail'].some(dep => dep.target === 'util-interface')).toBe(true);
        expect(graph.graph.dependencies['api'].some(dep => dep.target === 'util-interface')).toBe(true);
      });
    });
    `
  );
}
