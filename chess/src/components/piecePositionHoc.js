/* eslint-disable react/display-name, react/prop-types */

import React from 'react';
import { getTileClass } from './dimensions';


const piecePositionHoc = Piece => {
  const wrapper = (props) => {
    const {onMouseDown, onMouseUp, onTouchEnd, onTouchStart, onClick, x, y} = props
  
    return (
      <div
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
        onClick={onClick}
        className={getTileClass(x, y) + 'piece'}>
        <Piece size="85%" />
      </div>
    )
  }

  return React.memo(wrapper);
}

export default piecePositionHoc;
