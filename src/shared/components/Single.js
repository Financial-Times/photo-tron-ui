import React from 'react';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import IconButton from 'material-ui/IconButton';

export default class Single extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { data } = this.props;
    const { title, description, url } = data;
    return (
      <Grid
        item
        xs={4}
      >
        <Card>
          <CardMedia
            image={url}
            title={title}
          >
            <img
              src={url}
              style={{
                height: 'auto',
                width: '100%'
              }}
            />
          </CardMedia>
          <CardContent>
            <Typography
              component="h5"
            >
              {title}
            </Typography>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse
            in={this.state.expanded}
            transitionDuration="auto"
            unmountOnExit
          >
            <CardContent>
              <Typography
                component="p"
              >
                {description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    )
  }
}
