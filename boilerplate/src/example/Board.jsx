import React from 'react';
import Square from './Square';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: props.squares,
      loading: props.loading,
    };
  }

  renderSquare(i) {
    const squares = this.state.squares;
    return (
      <Square 
        key = {i}
        value={squares[i].value} 
        square={i}
        isInitValue = {squares[i].isInitValue}
        error= {squares[i].error}
        onChange={(e,k) => this.props.onChange(e,k)}                
      />
    );
  }

  renderRow(i) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      //Render every square per row adding a consecutive number
      row.push(this.renderSquare(j+i*9));
    }
    return row;
  }

  render() {
    let boardPrint = [];
    if (!this.state.loading) {
      for (let i = 0; i < 9 ;i++) {
        boardPrint.push(<div key={i} className="board-row">{this.renderRow(i)}</div>);
      }
    }
    return (
      <div>
        {boardPrint}   
      </div>
    );
  }
}

export default Board;