/* eslint-disable react/display-name, react/prop-types */

import React from 'react';
import { cellWidth, paddingRight } from './dimensions';


const piecePositionHoc = Piece => {
  const wrapper = (props) => {
    const {onMouseDown, onMouseUp, onTouchEnd, onTouchStart, style, isMoving, onClick} = props
    //console.log(props)
  
    const styles = Object.assign({}, style, {
      position: 'absolute',
      left: `${paddingRight + cellWidth * props.x}px`,
      top: `${(7-props.y) * cellWidth}px`,
      width: `${cellWidth}px`,
      height: `${cellWidth}px`,
      textAlign: 'center',
      zIndex: isMoving ? 1000 : undefined,
    })
  
    return (
      <div
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
        onClick={onClick}
        style={styles}>
        <Piece size="85%" />
      </div>
    )
  }

  return React.memo(wrapper);
}

export default piecePositionHoc;
