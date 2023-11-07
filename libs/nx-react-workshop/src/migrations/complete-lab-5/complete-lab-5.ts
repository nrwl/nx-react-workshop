/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tree } from '@nx/devkit';
import { libraryGenerator } from '@nx/js';

export default async function update(host: Tree) {
  // nx generate @nx/js:lib util-formatters --directory=store
  await libraryGenerator(host, {
    name: 'store-util-formatters',
    directory: 'libs/store/util-formatters',
    projectNameAndRootFormat: 'as-provided',
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

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Header } from '@bg-hoard/store-ui-shared';
import { formatRating } from '@bg-hoard/store-util-formatters';

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
  host.write(
    'apps/store-e2e/cypress.config.ts',
    `import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { execSync } from 'child_process';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    setupNodeEvents(on, config) {
      on('task', {
        showProjects() {
          return execSync('nx show projects').toString();
        },
      });
    },
  },
});`
  );
  host.write(
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
      it('should have a store-util-formatters library', () => {
        cy.task('showProjects').should('contain', 'store-util-formatters');
      });
    });
`
  );
}
