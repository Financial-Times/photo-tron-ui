import React from 'react';

export default class FtLogo extends React.Component {
  render() {
    const { color, width, x, y } = this.props;
    const setColor = color || 'rgba(0, 0, 0, 0.1)';
    const setWidth = width || 500;
    const setHeight = setWidth;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        height={setHeight}
        width={setWidth}
        x={x}
        y={y}
      >
        <rect
          fill='transparent'
          width="1024"
          height="1024"
        />
        <path
          fill={setColor}
          d="M112,145.2v17.6c44.4,2.4,57.2,7.6,57.2,56V534.4c0,48.4-12.8,54-58.4,56V608H330V590.4c-55.2-2.4-68-7.6-68-56h-0.4V383.2H296c60,0,87.2,13.6,96.8,68h17.6V288H392.8c-9.2,48.4-24.8,61.2-96.8,61.2H261.6V202.8c0-18.8,4.8-23.6,26-23.6h70c90.4,0,108,16.4,124.4,68h19.2l-2.8-102H112Z"
          transform="translate(0 0)"
        />
        <path
          fill={setColor}
          d="M936,145.2H530.8l-9.6,102h23.2c14.8-50,36.8-68,85.6-68h57.2V534.4c0,48.4-12.8,53.6-65.2,56V608H845.2V590.4c-52.4-2-65.2-7.6-65.2-56V179.2h57.2c48.8,0,70.8,18,85.6,68H946Z"
          transform="translate(0 0)"
        />
      </svg>
    )
  }
}
