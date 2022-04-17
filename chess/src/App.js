import { useEffect, useState } from "react";
import Game from "./components/Game";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
