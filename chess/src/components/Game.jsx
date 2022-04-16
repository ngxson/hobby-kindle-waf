import { useEffect, useState } from 'react';
import decode from './decode';
import { cellWidth, paddingRight } from './dimensions';
import pieceComponents from './pieces';
import memoizee from 'memoizee';
import ChessEngine from './engine/engine';
import Labels from './Labels';
import Clickable from './Clickable';

const tileStyleBase = memoizee((x, y) => ({
  position: 'absolute',
  left: `${paddingRight + cellWidth * x}px`,
  top: `${(7-y) * cellWidth}px`,
  width: `${cellWidth}px`,
  height: `${cellWidth}px`,
}));
const tileStyleSpec = memoizee((light, selected, possibleMove) => ({
  background: possibleMove ? '#777' : (light ? '#fff' : '#ccc'),
  boxShadow: selected
    ? 'inset 0px 0px 0px 5px #000'
    : (possibleMove ? 'inset 0px 0px 0px 5px #ccc' : 'none'),
}));

function Game() {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [engine, setEngine] = useState();

  useEffect(() => {
    setEngine(new ChessEngine());
  }, []);

  if (!engine) return null;

  const onTileClicked = (x, y) => () => {
    if (!selectedPiece) {
      // select a new piece
      const moves = engine.getPossibleMoves(x, y);
      if (!moves) return;
      setSelectedPiece({x, y, moves});
      return;
    }

    let possibleMove;
    const selectedSquare = decode.xyToDecl(x, y);
    for (const m of selectedPiece.moves) {
      if (m.endsWith(selectedSquare)) {
        possibleMove = m;
        break;
      }
    }

    if (possibleMove) {
      engine.move(possibleMove);
      setTimeout(() => {
        setSelectedPiece(null);
      }, 10);
    } else {
      // deselect
      setSelectedPiece(null);
    }
  };

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

  const _tiles = [];
  const possibleMoves = selectedPiece ? selectedPiece.moves.map(m => m.slice(-2)) : [];
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const square = decode.xyToDecl(x, y);
      let selected, isPossibleMove;
      if (selectedPiece) {
        selected = selectedPiece.x === x && selectedPiece.y === y;
        isPossibleMove = possibleMoves.indexOf(square) !== -1;
      }
      if (isPossibleMove) {
        const k = _clickTargets.length;
        _clickTargets.push(
          <Clickable key={k} x={x} y={y} onClick={onTileClicked(x, y)} />
        );
      }
      const odd = x % 2;
      const light = y % 2 ? !odd : !!odd;
      const styles = {
        ...tileStyleBase(x, y),
        ...tileStyleSpec(light, selected, isPossibleMove),
      }
      _tiles.push(<div
        style={styles}
        key={`${x}${y}`}
      />);
    }
  }

  return (
    <div>
      {_tiles}
      <Labels />
      {_pieces}
      {_clickTargets}
    </div>
  );
}

export default Game;
