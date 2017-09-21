import React from "react";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

import Form from '../components/Form';

export default class Index extends React.Component {
  render() {
    return (
      <div>

        <AppBar
          position="fixed"
        >
          <Toolbar>

            <Button
              color="contrast"
            >
              PhotoTron
            </Button>

          </Toolbar>

        </AppBar>


        <div
          id="container"
        >
          <Form />
        </div>

      </div>
    )
  }
}
