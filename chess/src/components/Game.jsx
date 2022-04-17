import React, { useEffect, useState, useRef } from 'react';
import decode from './decode';
import { getTileClass } from './dimensions';
import pieceComponents from './pieces';
import ChessEngine from './engine/engine';
import Labels from './Labels';
import Clickable from './Clickable';
import Board from './Board';
import memoizee from 'memoizee';
import Controls from './Controls';

function Game() {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [engine, setEngine] = useState();
  const selectedPieceRef = useRef();
  const engineRef = useRef();

  useEffect(() => {
    const engine = new ChessEngine();
    setEngine(engine);
    engineRef.current = engine;
  }, []);

  if (!engine) return null;

  const onTileClicked = (x, y) => memoizee(() => {
    const selectedPiece = selectedPieceRef.current;
    const engine = engineRef.current;
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
      engine.move(possibleMove);
      setTimeout(() => {
        setSelectedPiece(null);
        selectedPieceRef.current = null;
      }, 1);
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
      <Controls engine={engine} />
    </div>
  );
}

export default Game;
