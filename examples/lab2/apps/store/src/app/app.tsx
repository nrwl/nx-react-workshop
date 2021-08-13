import styles from './app.module.scss';
import { getAllGames } from '../fake-api';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export const App = () => {
  return (
    <div className={styles.container}>
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
