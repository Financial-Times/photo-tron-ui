import React from "react";
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Form from '../components/Form';
import Photo from '../components/Photo';
import { FtLogo } from '../components/icons/Index';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false
    }
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>

        <AppBar
          position="fixed"
        >
          <Toolbar>
            <Typography
              color="inherit"
              style={{
                flex: 1
              }}
            >
              <FtLogo
                color="#FFFFFF"
                width={40}
              />
            </Typography>
            <Button
              color="contrast"
              onClick={this.handleClick}
            >
              Send
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onRequestClose={this.handleRequestClose}
            >
              <MenuItem
                onClick={this.handleRequestClose}
              >
                Send to Methode
              </MenuItem>
              <MenuItem
                onClick={this.handleRequestClose}
              >
                Move to Fotoware folder
              </MenuItem>
              <MenuItem
                onClick={this.handleRequestClose}
              >
                Email to approver
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <div
          id="container"
        >
          <Form />
          <Photo />
        </div>

      </div>
    )
  }
}
