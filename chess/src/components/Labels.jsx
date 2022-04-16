import memoizee from 'memoizee';
import { cellWidth, paddingRight } from './dimensions';

const alpha = 'abcdefgh';
const num = '12345678';

const Labels = memoizee(() => {
  const labels = [];
  const paddingBottomRight = 25;
  
  const addLabel = (x, y, key) => {
    const styles = {
      position: 'absolute',
      left: x === null
        ? `${paddingRight}px`
        : `${paddingRight + cellWidth * (x + 1) - paddingBottomRight}px`,
      top: x === null
        ? `${(7-(y || 0)) * cellWidth}px`
        : `${8 * cellWidth - paddingBottomRight}px`,
    };
    labels.push(<div style={styles} key={key}>
      {x !== null ? alpha[x] : ''}
      {y !== null ? num[y] : ''}
    </div>)
  };

  for (let y = 0; y < 8; y++) {
    addLabel(null, y, `y${y}`);
  }
  for (let x = 0; x < 8; x++) {
    addLabel(x, null, `x${x}`);
  }

  return <>{labels}</>;
});

export default Labels;