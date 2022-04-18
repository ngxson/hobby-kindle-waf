import React, { useState, useRef } from 'react';
import decode from './decode';
import { getTileClass } from './dimensions';
import pieceComponents from './pieces';
import { getEngine } from './engine/engine';
import Labels from './Labels';
import Clickable from './Clickable';
import Board from './Board';
import memoizee from 'memoizee';
import Controls from './Controls';
import { MessageDialog } from './Dialog';

const delay = ms => new Promise(r => setTimeout(r, ms));

function Game() {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const rerender = useState(0)[1];
  const selectedPieceRef = useRef();
  const engine = getEngine();

  window.onNewGame = () => {
    setSelectedPiece(null);
    setIsAIThinking(false);
    setIsGameOver(false);
    rerender(Date.now());
  };

  const onTileClicked = (x, y) => memoizee(async () => {
    const selectedPiece = selectedPieceRef.current;
    const engine = getEngine();
    if (!selectedPiece) {
      // select a new piece
      const moves = engine.getPossibleMoves(x, y);
      if (!moves || !moves.length) return;
      const s = {x, y, moves: moves.map(m => {
        const sq = m.slice(-2);
        return {
          x: decode.getXFromSquare(sq),
          y: decode.getYFromSquare(sq),
          m,
        };
      })};
      setSelectedPiece(s);
      selectedPieceRef.current = s;
      return;
    }

    let possibleMove;
    for (const {x: x0, y: y0, m} of selectedPiece.moves) {
      if (x === x0 && y === y0) {
        possibleMove = m;
        break;
      }
    }

    if (possibleMove) {
      // select a move
      if (engine.aiEnable) setIsAIThinking(true);
      if (engine.aiEnable) await delay(200);
      await engine.move(possibleMove);
      if (engine.aiEnable) setIsAIThinking(false);
      setSelectedPiece(null);
      selectedPieceRef.current = null;
      if (engine.isGameOver()) {
        setIsGameOver(true);
      }
    } else {
      // deselect
      setSelectedPiece(null);
      selectedPieceRef.current = null;
    }
  });

  const pieces = engine.getAllPieces();
  const _pieces = pieces.map((decl) => {
    const {x, y, piece} = decl;
    const Piece = pieceComponents[piece];
    return <Piece key={`${x}${y}${piece}`} isMoving={false} x={x} y={y} />;
  });

  const _clickTargets = pieces.map((decl, i) => {
    const {x, y} = decl;
    return <Clickable key={i} x={x} y={y} onClick={onTileClicked(x, y)} />;
  });

  const _tileOverlay = selectedPiece
    ? selectedPiece.moves.map(({x, y}) => {
      const className = getTileClass(x, y);
      return <React.Fragment key={className}>
        <div className={className + 'black border-normal'}></div>
        <Clickable x={x} y={y} onClick={onTileClicked(x, y)} />
      </React.Fragment>
    })
    : null;
  
  if (selectedPiece) {
    const {x, y} = selectedPiece;
    _tileOverlay.push(<React.Fragment key="selected">
      <div className={getTileClass(x, y) + 'border-thick'}></div>
    </React.Fragment>);
  }

  return (
    <div>
      <Board />
      {_tileOverlay}
      <Labels />
      {_pieces}
      {_clickTargets}
      {isAIThinking && <MessageDialog>
        Machine is thinking...
      </MessageDialog>}
      {isGameOver && <MessageDialog>
        Win / Game Over<br/><br/>
        <button onClick={window.chessOpenMenu()}>New Game</button>
      </MessageDialog>}
      <Controls engine={engine} />
    </div>
  );
}

export default Game;
