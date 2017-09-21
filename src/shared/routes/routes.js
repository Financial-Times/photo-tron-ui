import React from 'react';
import { Router, Route, IndexRoute } from "react-router";
import Index from "../handlers/Index";
import AppController from "../controller/AppController";

export default (
  <Router>
    <Route path="/"
      component={AppController}
    >
      <IndexRoute component={Index} />
    </Route>
    <Route path="*"
      component={Index}
    />
  </Router>
);
