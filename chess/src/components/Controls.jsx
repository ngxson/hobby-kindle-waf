import { useState } from 'react';
import { MenuDialog } from './Dialog';
import { getEngine } from './engine/engine';

function Controls() {
  const [showMenu, setShowMenu] = useState(false);

  const engine = getEngine();
  const turnIsWhite = engine.getCurrentTurn() === 'w';
  const turnBg = turnIsWhite ? '#fff' : '#000';
  const turnColor = turnIsWhite ? '#000' : '#fff';
  const turnTxt = turnIsWhite ? 'White' : 'Black';

  const newGame = (level) => {
    engine.newGame(level);
    setShowMenu(false);
  };

  window.chessOpenMenu = () => setShowMenu(true);

  return <>
    <div className='controls'>
      Turn:&nbsp;&nbsp;
      <div className="turn" style={{background: turnBg, color:turnColor}}>
        {turnTxt}
      </div>

      &nbsp;&nbsp;&nbsp;

      Mode: {engine.getGameModeStr()}

      &nbsp;&nbsp;&nbsp;

      <button onClick={() => setShowMenu(!showMenu)}>Menu</button>

      &nbsp;
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>

    {showMenu && <MenuDialog>
      -- Menu -- <br/>

      <br/>
      New Game: <br/>
      <button onClick={() => newGame(-1)}>Human vs Human</button><br/>
      <button onClick={() => newGame(0)}>AI (very easy)</button><br/>
      <button onClick={() => newGame(1)}>AI (easy)</button><br/>
      <button onClick={() => newGame(2)}>AI (normal)</button><br/>
      <button onClick={() => newGame(3)}>AI (hard)</button><br/>

      <br/>
      <button onClick={() => setShowMenu(false)}>Exit menu</button>
    </MenuDialog>}
  </>;
}

export default Controls;