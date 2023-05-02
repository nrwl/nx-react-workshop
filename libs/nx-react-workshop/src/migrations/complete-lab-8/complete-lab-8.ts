/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree } from '@nx/devkit';

export default function update(host: Tree) {
  host.delete('apps/store/src/fake-api.ts');

  host.write(
    'apps/store/src/app/app.tsx',
    `import { useEffect, useState } from 'react';

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

export const App = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<{
    data: any[];
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
    `import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './game-detail.module.css';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { formatRating } from '@bg-hoard/store/util-formatters';

/* eslint-disable-next-line */
export interface StoreFeatureGameDetailProps {}

export function StoreFeatureGameDetail(props: StoreFeatureGameDetailProps) {
  const [state, setState] = useState<{
    data: any;
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
    'libs/store/feature-game-detail/src/lib/game-detail/game-detail.module.css',
    `.game-image {
  width: 300px;
  border-radius: 20px;
  margin-right: 20px;
}

.content {
  display: flex;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sell-info {
  display: flex;
  flex-direction: column;
}

.buy-button {
  margin-right: 20px;
}

.container {
  max-width: 800px;
  margin: 50px auto;
}

.game-rating {
  padding-top: 10px;
}

.game-card-media {
  height: 200px;
  float: left;
  width: 300px;
  border-radius: 10px;
  margin: 0 16px 20px;
}
`
  );
}
