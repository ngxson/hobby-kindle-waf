function Controls({engine}) {
  const turnIsWhite = engine.getCurrentTurn() === 'w';
  const turnBg = turnIsWhite ? '#fff' : '#000';
  const turnColor = turnIsWhite ? '#000' : '#fff';
  const turnTxt = turnIsWhite ? 'White' : 'Black';

  return <div className='controls'>
    Turn:&nbsp;&nbsp;
    <div className="turn" style={{background: turnBg, color:turnColor}}>
      {turnTxt}
    </div>

    &nbsp;&nbsp;&nbsp;

    Mode: Human

    &nbsp;&nbsp;&nbsp;

    <button onClick={() => window.location.reload()}>Reload</button>
  </div>;
}

export default Controls;