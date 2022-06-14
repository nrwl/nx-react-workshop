/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { componentGenerator, libraryGenerator } from '@nrwl/react';

export default async function update(tree: Tree) {
  // nx generate @nrwl/react:lib ui-shared --directory=store --no-component
  await libraryGenerator(tree, {
    name: 'ui-shared',
    directory: 'store',
    component: false,
    style: 'css',
    skipTsConfig: false,
    skipFormat: true,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
  });
  // nx generate @nrwl/react:component header --export --project=store-ui-shared
  await componentGenerator(tree, {
    name: 'header',
    project: 'store-ui-shared',
    style: 'css',
    export: true,
  });

  tree.write(
    'libs/store/ui-shared/src/lib/header/header.tsx',
    `import { makeStyles } from '@material-ui/core/styles';
  import AppBar from '@material-ui/core/AppBar';
  import Toolbar from '@material-ui/core/Toolbar';
  import Typography from '@material-ui/core/Typography';

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  /* eslint-disable-next-line */
  export interface HeaderProps {}

  export const Header = (props: HeaderProps) => {
    const classes = useStyles();

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Board Game Hoard
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };

  export default Header;
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
import { Header } from '@bg-hoard/store/ui-shared';

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
                    <strong>Rating:</strong> {x.rating}
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
