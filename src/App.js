import { useState } from 'react'
import './App.css';

const gameBoard = [
  [], [], [],
  [], [], [],
  [], [], []
]
let winMessage = ''

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("O")

  function checkCurrentPlayer(player) {
    if (player === 'X') {
      setCurrentPlayer("O")
    } else {
      setCurrentPlayer("X")
    }
  }

  function checkWinner(board){
    for(let i = 0; i < board.length; i++){
      if(board[i] == currentPlayer && board[i+1] == currentPlayer && board[i+2] == currentPlayer){
        winMessage = `o "${currentPlayer}" venceu`
      }else if(board[i] == currentPlayer && board[i+3] == currentPlayer && board[i+6] == currentPlayer){
        winMessage = `o "${currentPlayer}" venceu`
      }
    }
  }

  function setPlayer(e) {
    const button = e.target
    const position = parseInt(button.id)

    gameBoard[position] = currentPlayer
    button.innerText = currentPlayer
    checkCurrentPlayer(currentPlayer)
    checkWinner(gameBoard)
  }

  return (
    <>
      <main>
        <table className='gameBoard'>
          <tbody>
            <tr>
              <td><button onClick={setPlayer} id='0'></button></td>
              <td><button onClick={setPlayer} id='1'></button></td>
              <td><button onClick={setPlayer} id='2'></button></td>
            </tr>
            <tr>
              <td><button onClick={setPlayer} id='3'></button></td>
              <td><button onClick={setPlayer} id='4'></button></td>
              <td><button onClick={setPlayer} id='5'></button></td>
            </tr>
            <tr>
              <td><button onClick={setPlayer} id='6'></button></td>
              <td><button onClick={setPlayer} id='7'></button></td>
              <td><button onClick={setPlayer} id='8'></button></td>
            </tr>
          </tbody>
        </table>
        <div className='winMessage'>
          {winMessage}
        </div>
      </main>
    </>
  );
}

export default App;
