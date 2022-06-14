/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace';

export default async function update(host: Tree) {
  // nx generate @nrwl/workspace:lib util-formatters --directory=store
  await libraryGenerator(host, {
    name: 'util-formatters',
    directory: 'store',
  });

  host.write(
    'libs/store/util-formatters/src/lib/store-util-formatters.ts',
    `export function formatRating(rating = 0) {
  return \`\${Math.round(rating * 100) / 10} / 10\`;
}
`
  );

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

export const App = () => {
  return (
    <>
      <header />
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
    </>
  );
};

export default App;
`
  );
}
