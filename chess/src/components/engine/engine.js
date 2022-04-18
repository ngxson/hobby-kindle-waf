import { Chess } from 'chess.js';
import decode from '../decode';
import { aiMove } from './ai/js-chess-engine';

const levels = ['very easy', 'easy', 'normal', 'hard'];

class ChessEngine {
  constructor () {
    this.loadState();
    window.currentChessEngine = this;
  }

  newGame(level) {
    this.aiEnable = level >= 0;
    this.aiLevel = this.aiEnable ? level : 2;
    this.game = new Chess();
    this.turn = 'w';
    this.saveState();
    if (window.onNewGame) {
      window.onNewGame();
    }
  }

  getGameModeStr = () => {
    return this.aiEnable
      ? `AI (${levels[this.aiLevel]})`
      : 'Human';
  }

  move(m) {
    return new Promise(resolve => {
      this.game.move(m);
      this.turn = this.turn === 'w' ? 'b' : 'w';
      if (this.aiEnable) {
        setTimeout(() => {
          this.aiMove();
          this.saveState();
          resolve();
        }, 100);
      } else {
        this.saveState();
        resolve();
      }
    });
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

  isGameOver() {
    return this.game.game_over();
  }

  saveState() {
    localStorage.setItem('chessAI', JSON.stringify({
      enable: this.aiEnable,
      level: this.aiLevel,
    }));
    localStorage.setItem('chessFEN', this.game.fen());
  }

  loadState() {
    const savedAI = localStorage.getItem('chessAI');
    const savedFEN = localStorage.getItem('chessFEN');

    if (savedAI) {
      const json = JSON.parse(savedAI);
      this.aiEnable = json.enable;
      this.aiLevel = json.level;
    } else {
      this.aiEnable = false;
      this.aiLevel = 2;
    }

    if (savedFEN) {
      const tmp = savedFEN.split(' ');
      this.game = new Chess(savedFEN);
      this.turn = tmp[tmp.length - 5];
    } else {
      this.game = new Chess();
      this.turn = 'w';
    }
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