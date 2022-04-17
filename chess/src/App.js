import { useEffect, useState } from 'react';
import { getEngine } from './components/engine/engine';
import Game from './components/Game';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEngine();
    setTimeout(() => setLoading(false), 1);
  }, []);

  if (loading) {
    return <center>
      <br/><br/><br/><br/>
      Loading...
    </center>
  }

  return (
    <div>
      <Game />
    </div>
  );
}

export default App;
