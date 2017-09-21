import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import { observer } from 'mobx-react';

@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  handleSearchOnTouchTap = () => {
    console.log(this.uuid.value);
    console.log(this.body.value);
  }

  render() {
    return (
      <div>

        <Grid
          container
          spacing={24}
        >

          <Grid
            item
            xs={12}
          >
            <TextField
              label="Please enter UUID"
              fullWidth
              margin="normal"
              inputRef={el => this.uuid = el}
            />
          </Grid>

          <Grid
            item
            xs={12}
          >
            <TextField
              label="Please enter body copy"
              fullWidth
              margin="normal"
              multiline
              inputRef={el => this.body = el}
            />
          </Grid>

          <Grid
            item
            xs={12}
          >
            <Button
              raised
              color="primary"
              onTouchTap={this.handleSearchOnTouchTap}
            >
              Primary
            </Button>
          </Grid>

        </Grid>

      </div>
    )
  }
}
