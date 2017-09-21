import React from "react";
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Form from '../components/Form';
import Photo from '../components/Photo';
import { FtLogo } from '../components/icons/Index';

export default class Index extends React.Component {
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
            >
              Send
            </Button>
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
