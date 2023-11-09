import { useParams } from 'react-router-dom';
import styles from './store-feature-game-detail.module.scss';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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
