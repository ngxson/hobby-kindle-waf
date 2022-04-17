import memoizee from 'memoizee';

const charCodeOffset = 97;
const alpha = 'abcdefgh';
const num = '12345678';

const decode = {
  fromPieceDecl: memoizee(pos => {
    const [piece, square] = pos.split('@')
    const x = square.toLowerCase().charCodeAt(0) - charCodeOffset
    const y = Number(square[1]) - 1
    return {x, y, piece, square}
  }),

  getXFromSquare: memoizee(sq => sq.toLowerCase().charCodeAt(0) - charCodeOffset),
  getYFromSquare: memoizee(sq => Number(sq[1]) - 1),

  xyToDecl: memoizee((x, y) => {
    return `${alpha[x]}${num[y]}`;
  }),

  charCodeOffset
}

export default decode;
