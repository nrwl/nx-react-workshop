import { RouteComponentProps } from 'react-router-dom';
import styles from './game-detail.module.scss';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

type TParams = { id: string };

/* eslint-disable-next-line */
export interface StoreFeatureGameDetailProps
  extends RouteComponentProps<TParams> { }

export const StoreFeatureGameDetail = (props: StoreFeatureGameDetailProps) => {
  return (
    <div className={styles.container}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.match.params.id}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default StoreFeatureGameDetail;
