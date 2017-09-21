import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import routes from '../shared/routes/routes'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// import styles
import "./styles/main.scss";

ReactDOM.render(
  <Router routes={routes}
    history={browserHistory}
  />,
  document.getElementById('app')
);
