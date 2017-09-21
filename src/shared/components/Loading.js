import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

import Styles from '../../client/styles/main.scss'
const { primaryColor6 } = Styles;

export default class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <LinearProgress
          color={primaryColor6}
          mode="indeterminate"
        />
      </div>
    )
  }
}
