import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './game-detail.module.scss';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { formatRating } from '@bg-hoard/store-util-formatters';

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
    fetch(`/api/games/${gameId}`)
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
}

export default StoreFeatureGameDetail;
