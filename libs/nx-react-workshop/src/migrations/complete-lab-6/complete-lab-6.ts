/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree } from '@nx/devkit';
import { Linter } from '@nx/linter';
import { componentGenerator, libraryGenerator } from '@nx/react';

export default async function update(host: Tree) {
  // nx generate @nx/react:library feature-game-detail --directory=store --appProject=store --no-component
  process.env.NX_PROJECT_GLOB_CACHE = 'false';
  await libraryGenerator(host, {
    name: 'feature-game-detail',
    directory: 'store',
    component: false,
    appProject: 'store',
    style: 'css',
    skipTsConfig: false,
    skipFormat: true,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
  });
  host.write(
    'apps/store/src/app/app.tsx',
    `import styles from './app.module.scss';
import { getAllGames } from '../fake-api';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Header } from '@bg-hoard/store/ui-shared';
import { formatRating } from '@bg-hoard/store/util-formatters';

import { Routes, Route, useNavigate } from 'react-router-dom';

import { StoreFeatureGameDetail } from '@bg-hoard/store/feature-game-detail';

export const App = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className={styles['container']}>
        <div className={styles['games-layout']}>
          {getAllGames().map((x) => (
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
      </div>

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <Routes>
        <Route path="/game/:id" element={<StoreFeatureGameDetail />} />;
      </Routes>
      {/* END: routes */}
    </>
  );
};

export default App;
`
  );

  process.env.NX_PROJECT_GLOB_CACHE = 'true';
  host.write(
    'libs/store/feature-game-detail/src/lib/store-feature-game-detail.tsx',
    `import { useParams } from 'react-router-dom';
import styles from './store-feature-game-detail.module.scss';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

/* eslint-disable-next-line */
export interface StoreFeatureGameDetailProps {}

export function StoreFeatureGameDetail(props: StoreFeatureGameDetailProps) {
  const params = useParams();
  return (
    <div className={styles['container']}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {params['id']}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default StoreFeatureGameDetail;
`
  );
  host.write(
    'libs/store/feature-game-detail/src/lib/store-feature-game-detail.module.scss',
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
`
  );
}
