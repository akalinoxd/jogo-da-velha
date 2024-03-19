import { useState } from 'react'
import './App.css';

let gameBoard = [
  [], [], [],
  [], [], [],
  [], [], []
]
let winMessage = ''
let gameOver = false

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("O")
  const [inGame, isInGame] = useState(true)

  function checkCurrentPlayer(player) {
    if (player === 'X') {
      setCurrentPlayer("O")
    } else {
      setCurrentPlayer("X")
    }
  }

  function checkWinner(board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i] == currentPlayer && board[i + 1] == currentPlayer && board[i + 2] == currentPlayer && (i+2 == 2 || i+2 == 5 || i+2 == 8)  ||
        board[i] == currentPlayer && board[i + 3] == currentPlayer && board[i + 6] == currentPlayer ||
        board[i] == currentPlayer && board[i + 4] == currentPlayer && board[i + 8] == currentPlayer ||
        board[i] == currentPlayer && board[i + 2] == currentPlayer && board[i + 4] == currentPlayer) {
        winMessage = `o "${currentPlayer}" venceu`
        gameOver = true
        isInGame(false)
        console.log(board)
      }
    }
  }

  function setPlayer(e) {
    const button = e.target
    const position = parseInt(button.id)

    gameBoard[position] = currentPlayer
    checkCurrentPlayer(currentPlayer)
    checkWinner(gameBoard)
  }

  let gameDisplayer = (
    <tbody>
      <tr>
        <td><button onClick={setPlayer} id='0'>{gameBoard[0]}</button></td>
        <td><button onClick={setPlayer} id='1'>{gameBoard[1]}</button></td>
        <td><button onClick={setPlayer} id='2'>{gameBoard[2]}</button></td>
      </tr>
      <tr>
        <td><button onClick={setPlayer} id='3'>{gameBoard[3]}</button></td>
        <td><button onClick={setPlayer} id='4'>{gameBoard[4]}</button></td>
        <td><button onClick={setPlayer} id='5'>{gameBoard[5]}</button></td>
      </tr>
      <tr>
        <td><button onClick={setPlayer} id='6'>{gameBoard[6]}</button></td>
        <td><button onClick={setPlayer} id='7'>{gameBoard[7]}</button></td>
        <td><button onClick={setPlayer} id='8'>{gameBoard[8]}</button></td>
      </tr>
    </tbody>
  )

  return (
    <>
      <main>
        <table className='gameBoard'>
          {gameDisplayer}
        </table>
        <div className='container' style={{
          display: gameOver == false ? 'none' : 'flex'
        }}>
          <div className='winMessage'>
            <span>{winMessage}</span>
            <button onClick={() => {
              gameBoard = [
                [], [], [],
                [], [], [],
                [], [], []
              ]
              gameOver = false
              setCurrentPlayer("O")
              isInGame(true)
            }}>Reiniciar</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
