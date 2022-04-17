import { Chess } from 'chess.js';
import decode from '../decode';

class ChessEngine {
  constructor (initState) {
    this.game = new Chess(initState);
  }

  move(m) {
    this.game.move(m);
  }

  getPossibleMoves(x, y) {
    const square = decode.xyToDecl(x, y);
    if (this.game.get(square))
      return this.game.moves({ square });
    else
      return null;
  }

  getAllPieces() {
    const b = this.game.board();
    const pieces = [];
    for (const line of b) {
      for (const cell of line) {
        if (!cell) continue;
        pieces.push({
          x: decode.getXFromSquare(cell.square),
          y: decode.getYFromSquare(cell.square),
          square: cell.square,
          piece: cell.color === 'w' ? cell.type.toUpperCase() : cell.type,
        });
      }
    }
    return pieces;
  }
}

export default ChessEngine;