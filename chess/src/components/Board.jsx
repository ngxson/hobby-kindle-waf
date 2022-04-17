import React from 'react';
import memoizee from 'memoizee';
import { tileStyleBase, getTileClass } from './dimensions';

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

  return <>
    <style jsx="true" global="true">
      {tileStyles}
    </style>
    {tiles}
  </>;
}

export default React.memo(Board);