import React from 'react';
import { tileStyleBase, getTileClass, controlPaddingTop, cellWidth, paddingRight } from './dimensions';

function Tile({x, y}) {
  const odd = x % 2;
  const light = y % 2 ? !odd : !!odd;
  return <div
    className={getTileClass(x, y) + (light ? 'light' : 'dark')}
  ></div>
}

function Board() {
  let tileStyles = '';
  const tiles = [];

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const styleBase = tileStyleBase(x, y);
      const cssClassName = `.tile.x${x}y${y}`;
      tileStyles += `${cssClassName} {`
        + `left: ${styleBase.left};`
        + `top: ${styleBase.top};`
        + `width: ${styleBase.width};`
        + `height: ${styleBase.height};`
        + '}\n';
      tiles.push(<Tile key={cssClassName} x={x} y={y} />);
    }
  }

  tileStyles += `.controls {
    top: ${controlPaddingTop}px;
    text-align: center;
    position: absolute;
    width: 95%;
    font-size: 40px;
  }\n`;

  tileStyles += `.dialog-overlay {
    position: absolute;
    background: rgba(255, 255, 255, 0.7);
    top: 0;
    left: 0;
    height: ${controlPaddingTop}px;
    width: 95%;
  }\n`;

  tileStyles += `.dialog-wrapper {
    font-size: 45px;
    position: absolute;
    background: white;
    top: ${cellWidth * 2}px;
    left: ${paddingRight}px;
    width: ${cellWidth * 8}px;
    text-align: center;
    padding: 20px 0px;
    border: 3px solid black;
  }\n`;

  return <>
    <style jsx="true" global="true">
      {tileStyles}
    </style>
    {tiles}
  </>;
}

export default React.memo(Board);