import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

function NotchCard(props) {
  const { classes } = props;
  return (
    <div>
    <Card className={classes.card}>
    <CardMedia
    className={classes.media}
    image={props.img}
    title={props.title}
    >
    <img src={props.img} alt="" />
    </CardMedia>
    <CardContent>
    <Typography type="headline" component="h2">
    {props.title}
    </Typography>
    <Typography component="p">
    {props.description}
    </Typography>
    </CardContent>
    <CardActions>
    <Button dense color="primary">
    Share
    </Button>
    <Button dense color="primary">
    Learn More
    </Button>
    </CardActions>
    </Card>
    </div>
    );
}

NotchCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotchCard);