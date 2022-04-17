import { getTileClass } from "./dimensions";

function Clickable({x, y, onClick}) {
  return <div className={getTileClass(x, y)} onClick={onClick}></div>
}

export default Clickable;