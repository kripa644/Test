import './TicTacToe.css';
import cn from 'classname';
import Button from './Button';
import React, { useState, useRef, useEffect } from 'react';
import { useLocalStorageState } from './useLocalStorageState';

const Square = ({ value, handleClick, highlight }) => {
    const classes = cn('square', {'highlight': highlight});
    return (
        <button className={classes} onClick={handleClick}>
            {value}
        </button>
    );
};

const Board = ({board, handleClick, winLine}) => {
    function renderSquare(i) {
        return (
            <Square
                value={board[i]}
                handleClick = {() => handleClick(i)}
                highlight={winLine && winLine.includes(i)}
            />
        );
    }

     return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)} 
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
};

const Game = () => {

    const [history, setHistory] = useLocalStorageState([Array(9).fill(null)], 'History');
    const [step, setStep] = useLocalStorageState(0);

    let [player1, setPlayer1] = useState('X');
    let [player2, setPlayer2] = useState('O');
    let [player, setPlayer] = useState(player1);
    

    const board = history[step];

    const winInfo = computeWinner(board);
    const winner = winInfo.winner;
    
    let handleClick = (i) => {
    console.log(`square ${i} is clicked`);
    //We need to record this interaction in the board state
    //1. The square got fresh tap
    //2. The square already had a value associated, in other words, board[i] had a non null value
    
    const canInteract = () => step === history.length - 1;
        
        console.log(step);
        console.log(history.length);


        if(!canInteract()) {
          return;
        }


    if (board[i] === null && winner === null) {
        //Set board state to a new state depending who is the current player
        //we need to derive right board for the given step
        const newBoard = [...board]; //Note, we have to create a new state object, and never mutate the current state and set it back. React wont come to know any state change in this case and there will be no re rendering that is going to happen
        newBoard[i] = player;
        //Flip the player
        setPlayer(player === player1? player2 : player1);
        //Set the board state
        console.log(board);
        //[initial board, step1board]

        const newHistory = history.concat([newBoard]);
        setHistory(newHistory);
        

        //update the step 
        const newStep = step + 1; 
        setStep(newStep);
    }
   
}
  
    
    
    function status() {
      //Check if there is a winner, if so, please show the status that there is a winner,
      //and game should end.
      //We can actually derive if there is a winner. We dont need to maintain a seperate state
      //for this.
     
      if(step == 9 && winner === null ) {
          return `Draw`;
      }
      else if (winner === null) {
          return `Next player: ${player? player : " " }`;
      } else {
          return `Player ${winner} won!`;
      } 
    }

  let jumpTo = (step) => {
      setStep(step);
  };  

  function renderHistory() {
    /* return history.map((b, index) => (<li key = {index} ><button className={cn({historyButtonSelected: index == step})}  onClick = {() => {jumpTo(index)}}>{index === 0 ? "Go to start of the game" : `Goto step${index}`}
    </button></li>) */
    return history.map((b, index) => (<li key = {index} ><Button selected={index === step}  onClick = {() => {jumpTo(index)}}>{index === 0 ? "Go to start of the game" : `Goto step${index}`}
    </Button></li>)
    )
  }
 
  console.log(board);

  

  function computeWinner(board) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
             console.log(lines[i])
             return {
                winner: board[a],
                line: lines[i],
              };
           
        }
    }
    return { 
        winner:null,
        line: null,
    }; 
}


function reset() {
    setStep(0); 
    const newHistory = history.slice(0, 1);
    setHistory(newHistory);
    setPlayer(player1);
}

    let firstPlayerNameFiledRef = useRef(null);
    let secondPlayerNameFieldRef = useRef(null);
    console.log(firstPlayerNameFiledRef.current);

    useEffect(() => {
        console.log(firstPlayerNameFiledRef.current);
        if(firstPlayerNameFiledRef.current) {
            firstPlayerNameFiledRef.current.focus();
        } else {
            secondPlayerNameFieldRef.current.focus();
        }
    },[]);

    return (
        <div className="game">
            <div className="game-board">
                {/* <Board board={history[step]} handleClick={handleClick}/> */}
                <Board winLine={winInfo.line} board={history[step]} handleClick={handleClick} />
            </div>
            <div className="game-info">
                <div>{ status() }</div>
                <ol>{renderHistory()}</ol>
                {/* <div>{highlightwinner()}</div> */}
            </div>
            <div className="name-inputs">
            <input ref={firstPlayerNameFiledRef} type={'text'} maxlength={1} onChange={(event) => { setPlayer(event.target.value); setPlayer1(event.target.value)}} placeholder={'X'}/><br></br>
            <input ref={secondPlayerNameFieldRef} type={'text'} maxlength={1} onChange={(event) => { setPlayer2(event.target.value); if(firstPlayerNameFiledRef.current === secondPlayerNameFieldRef.current) alert('give other name') }} placeholder={'Y'} />
            </div>
            <div className="reset">
                <button onClick = {() => {reset(); }}>Play again</button>
            </div>
        </div>
    );
};

export default Game;