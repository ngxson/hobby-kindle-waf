import { Chess } from 'chess.js';
import decode from '../decode';

const jsChessEngine = require('js-chess-engine');
const { aiMove } = jsChessEngine;

class ChessEngine {
  constructor (initState) {
    this.game = new Chess(initState);
    this.aiLevel = 2;
    this.aiEnable = true;
    this.turn = 'w';
    window.currentChessEngine = this;
  }

  move(m) {
    this.game.move(m);
    this.turn = this.turn === 'w' ? 'b' : 'w';
    this.aiMove();
  }

  aiMove() {
    if (this.turn === 'w') return;
    const moves = Object.entries(aiMove(this.game.fen()));
    if (!moves.length) return;
    const move = moves[0].map(m => m.toLowerCase());
    console.log({from: move[0], to: move[1]})
    this.game.move({from: move[0], to: move[1]});
    this.turn = this.turn === 'w' ? 'b' : 'w';
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

  getCurrentTurn() {
    return this.turn;
  }
}

export const getEngine = () => {
  if (!window.currentChessEngine) {
    return new ChessEngine();
  } else {
    return window.currentChessEngine;
  }
};

export default ChessEngine;