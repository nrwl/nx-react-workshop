import styles from './app.module.scss';
import { getAllGames } from '../fake-api';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

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
