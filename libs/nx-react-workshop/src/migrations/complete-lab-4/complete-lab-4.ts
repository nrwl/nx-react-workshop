/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree } from '@nx/devkit';
import { Linter } from '@nx/eslint';
import { componentGenerator, libraryGenerator } from '@nx/react';

export default async function update(tree: Tree) {
  // nx generate @nx/react:lib ui-shared --directory=store --no-component
  await libraryGenerator(tree, {
    name: 'store-ui-shared',
    directory: 'libs/store/ui-shared',
    projectNameAndRootFormat: 'as-provided',
    component: false,
    style: 'css',
    skipTsConfig: false,
    skipFormat: true,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
  });
  // nx generate @nx/react:component libs/store/ui-shared/src/lib/header --export
  await componentGenerator(tree, {
    name: 'header',
    directory: 'libs/store/ui-shared/src/lib/header',
    nameAndDirectoryFormat: 'as-provided',
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
import { Header } from '@bg-hoard/store-ui-shared';

export const App = () => {
  return (
    <>
      <Header />
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
  tree.write(
    'apps/store-e2e/src/e2e/app.cy.ts',
    `describe('store', () => {
    beforeEach(() => cy.visit('/'));

    it('should have 3 games', () => {
      cy.contains('Settlers in the Can');
      cy.contains('Chess Pie');
      cy.contains('Purrfection');
    });
    it('should have a header', () => {
      cy.contains('Board Game Hoard');
    });
  });
  `
  );
}
