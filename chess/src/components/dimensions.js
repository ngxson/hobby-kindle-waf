import { viewportWidth } from '../Kindle';
import memoizee from 'memoizee';

export const cellWidth = (viewportWidth - 100) / 8;
export const paddingRight = 50;
export const paddingTop = 30;
export const paddingBottom = 20;
export const controlPaddingTop = paddingTop + (cellWidth*8) + paddingBottom;
export const tileStyleBase = (x, y) => ({
  left: `${paddingRight + cellWidth * x}px`,
  top: `${paddingTop + (7-y) * cellWidth}px`,
  width: `${cellWidth}px`,
  height: `${cellWidth}px`,
});
export const getTileClass = memoizee((x, y) => ` tile x${x}y${y} `);
