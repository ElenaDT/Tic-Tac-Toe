import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Board from '../Board/Board.js';
import './App.css';

function Moves({ history, jumpTo }) {
  //const { history, jumpTo } = props;
  
  return (
     <React.Fragment>
      <ol>
    { history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
     
      return ( 
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
     
          
  );
    })}
      </ol>
     </React.Fragment>)   
  }

function App (){
  
  const [state, setState] = useState(
    {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    }
 
);
     

  function handleClick(i) {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext
    });
  }

  function jumpTo(step) {
    setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0 //se è pari è vero
    });
  }

    const history = state.history;
    const current = history[state.stepNumber];
    const winner = calculateWinner(current.squares);


    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (state.xIsNext ? "X" : "O");
    }

  return (
            <React.Fragment>
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <Moves history={history} jumpTo={jumpTo}/>
        </div>
      </div>
     </React.Fragment>
    );
  
}



// ========================================

ReactDOM.render(<App />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default App;