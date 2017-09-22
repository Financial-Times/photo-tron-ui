import React from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Tabs, { Tab } from 'material-ui/Tabs';

import DataActions from '../actions/DataActions';

import { observer } from 'mobx-react';

@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      uuid: '',
      body: ''
    }
  }

  componentWillMount() {
  }

  handleSearchOnTouchTap = (type) => {
    switch (type) {
      case 'uuid':
        DataActions.getImagesByUuid(this.state.uuid);
        break;
      case 'body':
        DataActions.postToGetImagesByBody(this.state.body);
        break;
    }
  }

  handleUuidTextFieldOnChange = (event) => {
    this.setState({
      uuid: event.target.value
    })
  }

  handleBodyTextFieldOnChange = (event) => {
    this.setState({
      body: event.target.value
    })
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

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

            <Paper>
              <Tabs
                fullWidth
                indicatorColor="primary"
                textColor="primary"
                value={this.state.value}
                onChange={this.handleTabChange}
              >
                <Tab
                  fullWidth
                  label="UUID"
                />
                <Tab
                  fullWidth
                  label="Article Body"
                />
              </Tabs>
            </Paper>

            {this.state.value === 0 &&
              <Paper>
                <div
                  className="tab__pane"
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      defaultValue={this.state.uuid}
                      onChange={this.handleUuidTextFieldOnChange}
                      label="Please enter UUID"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <Button
                      raised
                      color="primary"
                      onTouchTap={this.handleSearchOnTouchTap.bind(this, 'uuid')}
                    >
                      Suggest
                    </Button>
                  </Grid>
                </div>
              </Paper>
            }
            {this.state.value === 1 &&
              <Paper>
                <div
                  className="tab__pane"
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      defaultValue={this.state.body}
                      onChange={this.handleBodyTextFieldOnChange}
                      label="Please enter text"
                      fullWidth
                      margin="normal"
                      multiline
                      rows="8"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <Button
                      raised
                      color="primary"
                      onTouchTap={this.handleSearchOnTouchTap.bind(this, 'body')}
                    >
                      Suggest
                    </Button>
                  </Grid>
                </div>
              </Paper>
            }

          </Grid>

        </Grid>

      </div>
    )
  }
}
