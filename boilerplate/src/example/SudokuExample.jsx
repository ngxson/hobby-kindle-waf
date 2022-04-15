import React from 'react';
import './styles.css';
import Board from './Board';
import GameData from './game2.json';

/**
 * 
 * Source: https://github.com/jonocr/react-sudoku
 * 
 */

class SudokuExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(81).fill(0),
      loading: true,
      movesLeft: 0,
    }
  }

  componentDidMount() {
    //Load initial game data from API
    // const apiUrl = "http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=3";
    // const response = await fetch(testUrl);

    if (GameData){
      const squares = this.generateInitialBoard(GameData.squares);
      this.setState({
        squares: squares,
        loading: false,
        movesLeft: 81 - GameData.squares.length,
        history: [{
          squares,
        }],
      });      
    }
  }

  //Returns the values of the initial game form x & y point into the main Array
  getInitialSquareValue(x,y,initData){
    const sqaureValues = initData;
    for (let i = x; i < 81; i++) {
      if (sqaureValues[i] && sqaureValues[i].x === x && sqaureValues[i].y === y) {
        return sqaureValues[i].value;
      }
    }
    return null;
  }

  generateInitialBoard(gameData){
    const squares = [];
    for (let i = 0; i < 9 ;i++) {
      for (let j = 0; j < 9; j++) {
        let value = this.getInitialSquareValue(i,j,gameData);
        let isInitValue = (value) ? true : false;
        let square = {
          x: i,
          y: j,
          block: 0,
          value: value,
          isInitValue: isInitValue,
          error: false,
        };
        squares.push(square);
      }
    }
    return squares;
  }

  handleClick(e, i) {
    //TODO: Validar numero, conteo de movimientos 
    let inputValue = e.target.value;
    let movesLeft = this.state.movesLeft;
    let errorMessage = false;
    const history = this.state.history.slice();
    const currentsquares = history.slice(history.length - 1);

    if (isNaN(inputValue)){
      e.target.value = "";
      return null;
    }
    if (inputValue.length > 1) {
      e.target.value = inputValue.charAt(inputValue.length -1);
    }

    //Validates the new input is not repeated in the board
    currentsquares[0].squares[i].value = e.target.value;
    if (!checkLineValues(currentsquares[0].squares, currentsquares[0].squares[i])) {
      errorMessage = true;
      // console.log("number ya existe en la linea");
    }
    if (!checkColumnValues(currentsquares[0].squares, currentsquares[0].squares[i])) {
      errorMessage = true;
      // console.log("number ya existe en la columna");
    }
    if (!checkBlockValues(currentsquares[0].squares, currentsquares[0].squares[i])) {
      errorMessage = true;
      // console.log("number ya existe en el block");
    }

    //Calculates how many moves are left to finish the game
    if (e.target.value.length > 0) {
      movesLeft--;
    } 
    if (e.target.value ==="") {
      movesLeft++;
      errorMessage = false;
    }
    currentsquares[0].squares[i].error = errorMessage;

    //Setstate with new movement
    this.setState({
         history: history.concat({squares: currentsquares[0].squares}),
         movesLeft: movesLeft,
    });
  }

  render() {
    const squares = this.state.squares;
    const movesLeft = this.state.movesLeft;
    return (
      <div>
        <div className="game-info">
          <div>{(movesLeft ===0) ?
            "You Won!!!" :
            ""
            }
          </div>
          <ol>{/*-- --*/}</ol>
        </div>
        
      <div className="game">
        <div className="game-board">          
        {this.state.loading ? 
        ("loading...") : 
         ( <Board
            squares={squares}
            onChange={(e,i) => this.handleClick(e, i)}
          />)
        }  
        </div>
      </div>
      </div>
    );
  }
}


export default SudokuExample;



// ====================== Helper functions

function checkLineValues(squares, square) {
  //Start point index in squares for every line
  const lineStart = [0,9,18,27,36,45,54,63,72];

  //Check for the same number in the same line
  let k = lineStart[square.x];
  for (let i = k; i < (9 + k); i++){
    //Checks is not the same square and checks the value
    if (squares[i].y !== square.y && squares[i].value === square.value) {
      return false;
    }
  }
  return true;
}

function checkColumnValues(squares, square) {
  //Start point index in squares for every line
  const lineStart = [0,9,18,27,36,45,54,63,72];

  //Check for the same number in the same column
  for (let i = 0; i < 9; i++) {
    //To find the index where to look, the index is the sum of the lineStart and the column number
    let objSquare = squares[lineStart[i] + square.y];
    //Checks is not the same square and checks the value
    if (objSquare.x !== square.x && objSquare.value === square.value){
      return false; 
    }
  }
  return true;
}

function checkBlockValues(squares, square) {
  //Start point index in squares for every block
  const lineStart = [0,3,6,27,30,33,54,57,60];

  //square.x & square.y < 3 = Block 1
  let startIndex = lineStart[0];
  if (square.x < 3 && square.y > 2 && square.y <6) {
    startIndex = lineStart[1]; // Block 2
  } else if (square.x < 3 && square.y > 5) {
    startIndex = lineStart[2]; // Block 3
  } else if (square.x > 2 && square.x < 6 && square.y < 3) {
    startIndex = lineStart[3]; // Block 4
  } else if (square.x > 2 && square.x < 6 && square.y > 2 && square.y <6) {
    startIndex = lineStart[4]; // Block 5
  } else if (square.x > 2 && square.x < 6 && square.y > 5) {
    startIndex = lineStart[5]; // Block 6
  } else if (square.x > 5 && square.y < 3) {
    startIndex = lineStart[6]; // Block 7
  } else if (square.x > 5 && square.y > 2 && square.y < 6) {
    startIndex = lineStart[7]; // Block 8
  } else if (square.x > 5 && square.y > 5) {
    startIndex = lineStart[8]; // Block 9
  }


  let increment = 0;
  //Starts looking at the begining of the block of the square
  for (let i = 0; i < 9; i++) {
    //increments acording to the row in the block
    if (i > 2 && i < 6) {
      increment = 6;
    } else if (i > 5) {
      increment = 12;
    } 
    //Checks values in the block
    const sq = squares[startIndex + i + increment];
    if (sq.x !== square.x && sq.y !== square.y && sq.value === square.value){
      return false;
    }
  }
  return true;
}