import './TicTacToe.css';
import cn from 'classname';
import Button from './Button';
import React, {  useRef, useEffect, useReducer } from 'react';
//import { useLocalStorageState } from './useLocalStorageState';

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
    

const SET_PLAYER_X_ACTION_TYPE = 'SET_PLAYER_X';
const SET_PLAYER_Y__ACTION_TYPE = 'SET_PLAYER_Y';
const SET_CURRENT_PLAYER_ACTION_TYPE = 'SET_CURRENT_PLAYER';
const RESET_ACTION_TYPE = 'RESET';
const PLAY_NEXT_STEP_ACTION_TYPE = 'PLAY_NEXT_STEP';
const GOTO_STEP_ACTION_TYPE = 'GO_TO_STEP';

const initialState = {
    history: [Array(9).fill(null)],
    playerX: 'X',
    playerY: 'O',
    currentPlayer: 'X',
    step: 0,
    winningLine: [],
};

//1. Set player X
const setPlayerX = (playerName) => ({
    type: SET_PLAYER_X_ACTION_TYPE,
    playerName,
});

//2. Set Player Y
const setPlayerY = (playerName) => ({
    type: SET_PLAYER_Y__ACTION_TYPE, playerName,
});

const setCurrentPlayer = (playerName) => ({
    type: SET_CURRENT_PLAYER_ACTION_TYPE,
    playerName,
});


const playNextStep = (index) => ({
    type: PLAY_NEXT_STEP_ACTION_TYPE,
    index,
});




const ticTacToeReducer = (state, action) => {
    switch (action.type) {
        case SET_PLAYER_X_ACTION_TYPE:
            return { ...state, playerX: action.playerName };
        case SET_PLAYER_Y__ACTION_TYPE:
            return { ...state, playerY: action.playerName };
        case SET_CURRENT_PLAYER_ACTION_TYPE:
            return {...state, currentPlayer: action.playerName};
        case RESET_ACTION_TYPE:
            return action.initialState;
        case PLAY_NEXT_STEP_ACTION_TYPE:
            return reduceNextStep(state, action.index);
        case GOTO_STEP_ACTION_TYPE:
            if (action.step >= 0 && action.step < 10) {
                return { ...state, step: action.step };
            } else {
                throw new Error('Step needs to be within 0 and 10!');     
            }
        default:
            return state;
    }
};

function reduceNextStep(state, index) {
    //Get the most recent history from history, and
    //make a copy of it.
    let { history, step, currentPlayer, playerX, playerY } = state;
    const prevHistory = history[step];
    const newHistory = [...prevHistory];
    newHistory[index] = currentPlayer;

    //Concatenate the history
    history = history.concat([newHistory]);

    //Change the player for the next turn
    currentPlayer = currentPlayer === playerX ? playerY : playerX;
    //Indicate we want to play next step
    step += 1;

    return { ...state, history, step, currentPlayer };
}

    
    const [state, dispatch] = useReducer( ticTacToeReducer, initialState);
    let { history, step, currentPlayer, playerX, playerY } = state;

    //const [history, setHistory] = useLocalStorageState([Array(9).fill(null)], 'History');
    //const [step, setStep] = useLocalStorageState(0);

    /* let [player1, setPlayer1] = useState('X');
    let [player2, setPlayer2] = useState('O');
    let [player, setPlayer] = useState(player1); */
    

    const board = history[step];
    const winInfo = computeWinner(board);
    const winner = winInfo.winner;
    const handleClick = (i) => {
        const canInteract = () => step === history.length - 1;

        if(!canInteract()) {
          return;
        }

        if(board[i] === null && winner === null) {
            dispatch(playNextStep(i));
        }

    };
  
    
    
    function status() {
      //Check if there is a winner, if so, please show the status that there is a winner,
      //and game should end.
      //We can actually derive if there is a winner. We dont need to maintain a seperate state
      //for this.
     
      if(step === 9 && winner === null ) {
          return `Draw`;
      }
      else if (winner === null) {
          return `Next player: ${currentPlayer? currentPlayer : " " }`;
      } else {
          return `Player ${winner} won!`;
      } 
    }

  let jumpTo = (step) => {
    dispatch({type: 'GO_TO_STEP', step});
  };   

  function renderHistory() {
    /* return history.map((b, index) => (<li key = {index} ><button className={cn({historyButtonSelected: index == step})}  onClick = {() => {jumpTo(index)}}>{index === 0 ? "Go to start of the game" : `Goto step${index}`}
    </button></li>) */
    return history.map((b, index) => (<li key = {index} ><Button selected={index === step}  onClick = {() => jumpTo(index)}>{index === 0 ? "Go to start of the game" : `Goto step${index}`}
    </Button></li>)
    )
  }
 
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
    dispatch({type: RESET_ACTION_TYPE, initialState});
} 

    let firstPlayerNameFiledRef = useRef(null);
    //let secondPlayerNameFieldRef = useRef(null);
    console.log(firstPlayerNameFiledRef.current);

    useEffect(() => {
        console.log(firstPlayerNameFiledRef.current);
        if(firstPlayerNameFiledRef.current) {
            firstPlayerNameFiledRef.current.focus();
        } /* else {
            secondPlayerNameFieldRef.current.focus();
        } */
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
            <input ref={firstPlayerNameFiledRef} type={'text'} maxlength={1} onChange={(event) => { dispatch(setPlayerX(event.target.value));
                        dispatch(setCurrentPlayer(event.target.value))}}   placeholder={'X'}/><br></br>
            <input  type={'text'} maxlength={1} onChange={(event) => { dispatch(setPlayerY(event.target.value)); if(playerX === event.target.value) alert('Enter other name')  }} placeholder={'Y'} />
            </div>
            <div className="reset">
                <button onClick = {() => { reset(); }}>Play again</button>
            </div>
        </div>
    );
};

export default Game;
//if(setPlayerX === setPlayerY) alert('give other name')