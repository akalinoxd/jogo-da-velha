import './jogobolinha.css'
import { useEffect, useState, useRef, useMemo, useCallback } from 'react'

const JogoBolinha = () => {
    // definindo variaveis para movimentação e funções do jogo
    const [playerPosX, setPlayerPosX] = useState(320)
    const [playerPosY, setPlayerPosY] = useState(320)
    const [isGameOver, setGameOver] = useState(false)
    const [bolinhas, setBolinhas] = useState([])

    // definindo estilização do player
    const playerBallStyle = {
        position: 'relative',
        top: `${playerPosY}px`,
        left: `${playerPosX}px`,
        width: '50px',
        height: '50px',
        border: '2px solid black',
        borderRadius: '100px',
        backgroundColor: 'grey'
    }

    // definindo os objetos do player e do inimigo
    const playerRef = useRef({ x: playerPosX, y: playerPosY, width: 50, height: 50 });
    useEffect(() => {
        playerRef.current = { x: playerPosX, y: playerPosY, width: 50, height: 50 }
    }, [playerPosY, playerPosX])

    // definindo os controles do jogador
    const playerStep = 10
    const pressedKeys = useMemo(() => ({}), []);
    const playerMovement = useCallback(() => {
        if (pressedKeys["ArrowUp"] && playerPosY > 0) {
            setPlayerPosY(prevplayerPosY => Math.max(prevplayerPosY - playerStep, 0));
        }
        if (pressedKeys["ArrowLeft"] && playerPosX > 0) {
            setPlayerPosX(prevplayerPosX => Math.max(prevplayerPosX - playerStep, 0));
        }
        if (pressedKeys["ArrowDown"] && playerPosY < 640) {
            setPlayerPosY(prevplayerPosY => Math.min(prevplayerPosY + playerStep, 640))
        }
        if (pressedKeys["ArrowRight"] && playerPosX < 640) {
            setPlayerPosX(prevplayerPosX => Math.min(prevplayerPosX + playerStep, 640))
        }

    }, [playerPosX, playerPosY, pressedKeys, bolinhas]);

    // função que detecta se há alguma das setas sendo apertadas e dispara a função de movimento do jogador
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isGameOver) {
                playerMovement()
            } else {
                setGameOver(true);
                clearInterval(interval)
            }
        }, 50)
        const checkKeyDown = e => {
            pressedKeys[e.key] = true
        }
        const checkKeyUp = e => {
            pressedKeys[e.key] = false
        }
        document.addEventListener('keydown', checkKeyDown)
        document.addEventListener('keyup', checkKeyUp)
        return () => {
            clearInterval(interval)
            document.removeEventListener('keydown', checkKeyDown)
            document.removeEventListener('keyup', checkKeyUp)
        }
    }, [isGameOver, pressedKeys])

    // adicionando inimigos na tela
    useEffect(() => {
        const addEnemieBall = () => {
            if (!isGameOver) {
                const novaBolinha = {
                    border: '2px solid black',
                    backgroundColor: 'red',
                    width: 20,
                    height: 20,
                    borderRadius: '100px',
                    display: 'inline-block',
                    position: 'absolute',
                    left: Math.random() * (678 - 0) + 0,
                    top: 0
                }
                setBolinhas(prevBolinhas => [...prevBolinhas, novaBolinha])
            }
        }
        const intervalID = setInterval(addEnemieBall, 1000)
        return () => clearInterval(intervalID)
    }, [isGameOver])

    // definindo a movimentação do inimigo e colisão com player
    const enemieStep = 10
    useEffect(() => {
        const chuvaBolinhas = () => {
            const player = playerRef.current
            if (!isGameOver) {
                bolinhas.map((bolinha, index) => {
                    if (
                        player.x < bolinha.left + bolinha.width &&
                        player.x + player.width > bolinha.left &&
                        player.y < bolinha.top + bolinha.height &&
                        player.height + player.y > bolinha.top
                    ) {
                        setGameOver(true)
                    } else {
                        bolinhas[index] = {
                            ...bolinha,
                            top: bolinha.top + 1
                        }
                    }
                })
            }
        }
        const removeBolinhas = () => {
            setBolinhas((prevBolinhas) => prevBolinhas.filter((bolinha) => bolinha.top <= 678));
        };
        const moveIntervalId = setInterval(chuvaBolinhas, 10)
        const removeInterval = setInterval(removeBolinhas, 10)
        return () => {
            clearInterval(moveIntervalId)
            clearInterval(removeInterval)
        }
    }, [isGameOver, bolinhas]);

    // função pra reiniciar o jogo
    const restartGame = () => {
        setPlayerPosX(320)
        setPlayerPosY(320)
        setGameOver(false)
        setBolinhas([])
    }

    return (
        <>
            <div className="containerNovoJogo">
                <div className='contentNovoJogo'>
                    <div style={playerBallStyle}></div>
                    <div className='elems'>
                        {isGameOver ?
                            <div className='gameOver'>
                                <span>Game Over!</span>
                                <button onClick={restartGame}>Restart</button>
                            </div> :
                            bolinhas.map((bolinha, index) => {
                                return <div key={index} style={{
                                    border: '2px solid black',
                                    backgroundColor: 'red',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '100px',
                                    display: 'inline-block',
                                    position: 'absolute',
                                    top: `${bolinha.top}px`,
                                    left: `${bolinha.left}px`
                                }}></div>
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default JogoBolinha;