import React from 'react';

export default class LoadingDots extends React.Component {
  render() {
    return (
      <div
        className="loading"
      >
        <div className="loading__circle" />
        <div className="loading__circle" />
        <div className="loading__circle" />
      </div>
    )
  }
}
