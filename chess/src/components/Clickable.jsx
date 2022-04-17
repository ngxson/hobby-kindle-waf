import { getTileClass } from "./dimensions";

function Clickable({x, y, onClick}) {
  return <button className={getTileClass(x, y) + 'clickable'} onClick={onClick}></button>
}

export default Clickable;