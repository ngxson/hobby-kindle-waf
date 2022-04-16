import { cellWidth, paddingRight } from './dimensions';
import memoizee from 'memoizee';

const tileStyleBase = memoizee((x, y) => ({
  position: 'absolute',
  left: `${paddingRight + cellWidth * x}px`,
  top: `${(7-y) * cellWidth}px`,
  width: `${cellWidth}px`,
  height: `${cellWidth}px`,
}));

function Clickable({x, y, onClick}) {
  return <div style={tileStyleBase(x, y)} onClick={onClick}></div>
}

export default Clickable;