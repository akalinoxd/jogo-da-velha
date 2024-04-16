import './jogobolinha.css'
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'

const JogoBolinha = React.memo(() => {
    // definindo variaveis para movimentação e funções do jogo
    const [playerPosX, setPlayerPosX] = useState(320)
    const [playerPosY, setPlayerPosY] = useState(320)
    const [isGameOver, setGameOver] = useState(false)
    const [enemies, setEnemies] = useState([])
    const [bullets, setBullets] = useState([])

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
    const playerRef = useRef({ x: playerPosX, y: playerPosY, width: 55, height: 55 })
    useEffect(() => {
        playerRef.current = { x: playerPosX, y: playerPosY, width: 55, height: 55 }
    }, [playerPosY, playerPosX])

    // definindo as funções de movimentação do jogador
    const playerStep = 2.5
    const pressedKeys = useMemo(() => ({}), [])
    const playerMovement = () => {
        if (pressedKeys["ArrowUp"] && playerPosY > 0) {
            setPlayerPosY(prevplayerPosY => Math.max(prevplayerPosY - playerStep, 0))
        }
        if (pressedKeys["ArrowLeft"] && playerPosX > 0) {
            setPlayerPosX(prevplayerPosX => Math.max(prevplayerPosX - playerStep, 0))
        }
        if (pressedKeys["ArrowDown"] && playerPosY < 640) {
            setPlayerPosY(prevplayerPosY => Math.min(prevplayerPosY + playerStep, 640))
        }
        if (pressedKeys["ArrowRight"] && playerPosX < 640) {
            setPlayerPosX(prevplayerPosX => Math.min(prevplayerPosX + playerStep, 640))
        }
    }
    const move = () => {
        if (!isGameOver) {
            playerMovement()
        } else {
            setGameOver(true)
        }
    }
    const checkKeyDown = e => {
        pressedKeys[e.key] = true
    }
    const checkKeyUp = e => {
        pressedKeys[e.key] = false
    }

    useEffect(() => {
        const interval = setInterval(move, 5)
        document.addEventListener('keydown', checkKeyDown)
        document.addEventListener('keyup', checkKeyUp)
        return () => {
            clearInterval(interval)
            document.removeEventListener('keydown', checkKeyDown)
            document.removeEventListener('keyup', checkKeyUp)
        }
    }, [isGameOver])

    // criando função para atirar nos inimigos
    const createBullet = () => {
        if (!isGameOver) {
            const player = playerRef.current
            const bullet = {
                width: 25,
                height: 25,
                top: player.y,
                left: player.x
            }
            setBullets(prevBullets => {
                if(prevBullets.length < 1){
                    return [...prevBullets, bullet]
                }else{
                    return [...prevBullets]
                }
            })
        } else {
            setBullets([])
        }
    }
    const checkShotButton = (e) => {
        // space bar
        if (e.keyCode == 32) {
            createBullet()
        }
    }
    const checkCollision = (bullet, enemie) => {
        return (
            enemie.left < bullet.left + bullet.width &&
            enemie.left + enemie.width > bullet.left &&
            enemie.top < bullet.top + bullet.height &&
            enemie.top + enemie.height > bullet.top
        )
    }
    const makeBulletMove = () => {
        bullets.forEach((bullet, bulletIndex) => {
            enemies.forEach((enemie, enemieIndex) => {
                if (bullets.length > 0 && bullets[bulletIndex].top >= 5 && !checkCollision(bullet, enemies[enemieIndex])) {
                    bullets[bulletIndex].top -= 0.5
                } else if (checkCollision(bullet, enemie)) {
                    bullets.splice(bulletIndex, 1)
                    setEnemies(prevEnemies => {
                        delete prevEnemies[enemieIndex]
                        return prevEnemies
                    })
                } else {
                    bullets.splice(bulletIndex, 1)
                }
            })
        })
    }

    useEffect(() => {
        setInterval(makeBulletMove, 50)

        document.addEventListener('keyup', checkShotButton)
        return () => {
            document.removeEventListener('keyup', checkShotButton)
        }
    }, [bullets, enemies, isGameOver])

    // adicionando inimigos na tela
    const enemiesRef = useRef(enemies)

    useEffect(() => {
        enemiesRef.current = enemies
    }, [enemies])

    const addEnemieBall = () => {
        if (!isGameOver) {
            const novaBolinha = {
                width: 30,
                height: 30,
                left: Math.random() * (663 - 0) + 0,
                top: 0
            }
            setEnemies(prevenemies => [...prevenemies, novaBolinha])
        }
    }

    useEffect(() => {
        const intervalID = setInterval(addEnemieBall, 1600)
        return () => clearInterval(intervalID)
    }, [isGameOver])

    // definindo a movimentação do inimigo e colisão com player
    const enemiesRain = useCallback(() => {
        const player = playerRef.current
        if (!isGameOver) {
            enemies.map((bolinha, index) => {
                if (
                    player.x < bolinha.left + bolinha.width &&
                    player.x + player.width > bolinha.left &&
                    player.y < bolinha.top + bolinha.height &&
                    player.height + player.y > bolinha.top
                ) {
                    setGameOver(true)
                } else {
                    enemies[index] = {
                        ...bolinha,
                        top: bolinha.top + 1
                    }
                }
            })
        }
    }, [enemies])
    const removeEnemies = () => {
        setEnemies((prevenemies) => prevenemies.filter((bolinha) => bolinha.top <= 663))
    }

    useEffect(() => {
        const moveIntervalId = setInterval(enemiesRain, 10)
        const removeInterval = setInterval(removeEnemies, 10)
        console.log('montei')
        return () => {
            console.log('desmontei')
            clearInterval(moveIntervalId)
            clearInterval(removeInterval)
        }
    }, [isGameOver, enemies])

    // função pra reiniciar o jogo
    const restartGame = () => {
        setPlayerPosX(320)
        setPlayerPosY(320)
        setGameOver(false)
        setEnemies([])
        setBullets([])
        document.location.reload()
    }

    return (
        <>
            <div className="containerNovoJogo">
                <div className='contentNovoJogo'>
                    <div style={playerBallStyle}></div>
                    <div className='elems'>
                        <div className='bulletArea'>
                            {bullets.map((bullet, index) => {
                                return <div key={`bullet${index}`} style={{
                                    backgroundColor: 'yellow',
                                    width: '20px',
                                    height: '20px',
                                    border: '1px solid black',
                                    borderRadius: '100px',
                                    position: 'absolute',
                                    top: bullet.top,
                                    left: bullet.left + 15
                                }}></div>
                            })}
                        </div>
                        {isGameOver ?
                            <div className='gameOver'>
                                <span>Game Over!</span>
                                <button onClick={restartGame}>Restart</button>
                            </div> :
                            enemies.map((bolinha, index) => {
                                return <div key={`enemie${index}`} style={{
                                    border: '2px solid black',
                                    backgroundColor: 'red',
                                    width: '35px',
                                    height: '35px',
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
})

export default JogoBolinha

// primeiro problema:
// meu useEffect que chama as funções de movimento dos inimigos esta sendo montado e desmontado a cada execução
// ou seja, a cada 10 milesimos, e isso esta causando vazamento de memoria, preciso descobrir como arrumar isso.
// se eu tirar a dependencia [enemies] do useEffect, ele para de vazar memoria, entretanto, tambem para de fazer
// o efeito de queda dos inimigos
//
// notas sobre o primeiro problema:
// as linhas 135~150 são parte do problema, sempre que uma bolinha nova é criada, o useEffect de movimento é montado e desmontado
//
// segundo problema:
// o segundo problema é em relação ao ato de atirar do jogador. se o jogador pressionar 1 vez o espaço e atingir um inimigo
// apenas o inimigo atingido sera eliminado, entretanto, caso o jogador pressione mais de uma vez o espaço, o programa cria 
// uma fila de ações, onde mesmo que haja apenas uma bolinha de tiro, essa bolinha vai carregar a quantidade de vezes que o 
// usuario apertou espaço, sendo assim, quando o espaço é apertado mais de uma vez, e o tiro atinge um inimigo, ele eliminara 
// todos os inimigos subsequentes levando em consideração a quantidade de vezes que o espaço foi apertado, tendo em vista que 
// sempre que um inimigo é eliminado, ele é retirado do array, e o inimigo na proxima posição do array toma seu lugar

const JogoBolinhaComRef = React.memo(() => {
    // definindo variaveis para movimentação e funções do jogo
    const [playerPosX, setPlayerPosX] = useState(320)
    const [playerPosY, setPlayerPosY] = useState(320)
    const [isGameOver, setGameOver] = useState(false)
    const [enemies, setEnemies] = useState([])
    const [bullets, setBullets] = useState([])

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
    const playerRef = useRef({ x: playerPosX, y: playerPosY, width: 55, height: 55 })
    useEffect(() => {
        playerRef.current = { x: playerPosX, y: playerPosY, width: 55, height: 55 }
    }, [playerPosY, playerPosX])

    const enemiesRef = useRef(enemies)
    useEffect(() => {
        enemiesRef.current = enemies
    }, [enemies])

    // definindo as funções de movimentação do jogador
    const playerStep = 2.5
    const pressedKeys = useMemo(() => ({}), [])
    const playerMovement = () => {
        if (pressedKeys["ArrowUp"] && playerPosY > 0) {
            setPlayerPosY(prevplayerPosY => Math.max(prevplayerPosY - playerStep, 0))
        }
        if (pressedKeys["ArrowLeft"] && playerPosX > 0) {
            setPlayerPosX(prevplayerPosX => Math.max(prevplayerPosX - playerStep, 0))
        }
        if (pressedKeys["ArrowDown"] && playerPosY < 640) {
            setPlayerPosY(prevplayerPosY => Math.min(prevplayerPosY + playerStep, 640))
        }
        if (pressedKeys["ArrowRight"] && playerPosX < 640) {
            setPlayerPosX(prevplayerPosX => Math.min(prevplayerPosX + playerStep, 640))
        }
    }
    const move = () => {
        if (!isGameOver) {
            playerMovement()
        } else {
            setGameOver(true)
        }
    }
    const checkKeyDown = e => {
        pressedKeys[e.key] = true
    }
    const checkKeyUp = e => {
        pressedKeys[e.key] = false
    }

    useEffect(() => {
        const interval = setInterval(move, 5)
        document.addEventListener('keydown', checkKeyDown)
        document.addEventListener('keyup', checkKeyUp)
        return () => {
            clearInterval(interval)
            document.removeEventListener('keydown', checkKeyDown)
            document.removeEventListener('keyup', checkKeyUp)
        }
    }, [isGameOver])

    // criando função para atirar nos inimigos
    const createBullet = () => {
        if (!isGameOver) {
            const player = playerRef.current
            const currentEnemies = enemiesRef.current
            const bullet = {
                width: 25,
                height: 25,
                top: player.y,
                left: player.x
            }
            setBullets(prevBullets => {
                if(prevBullets.length < 1){
                    return [...prevBullets, bullet]
                }else{
                    return [...prevBullets]
                }
            })
        } else {
            setBullets([])
        }
    }
    const checkShotButton = (e) => {
        // space bar
        if (e.keyCode == 32) {
            createBullet()
        }
    }
    const checkCollision = (bullet, enemie) => {
        return (
            enemie.left < bullet.left + bullet.width &&
            enemie.left + enemie.width > bullet.left &&
            enemie.top < bullet.top + bullet.height &&
            enemie.top + enemie.height > bullet.top
        )
    }
    const makeBulletMove = () => {
        const currentEnemies = enemiesRef.current

        bullets.forEach((bullet, bulletIndex) => {
            enemies.forEach((enemie, enemieIndex) => {
                if (bullets.length > 0 && bullets[bulletIndex].top >= 5 && !checkCollision(bullet, enemies[enemieIndex])) {
                    bullets[bulletIndex].top -= 0.5
                } else if (checkCollision(bullet, enemie)) {
                    bullets.splice(bulletIndex, 1)
                    setEnemies(prevEnemies => {
                        delete prevEnemies[enemieIndex]
                        return prevEnemies
                    })
                } else {
                    bullets.splice(bulletIndex, 1)
                }
            })
        })
    }

    useEffect(() => {
        setInterval(makeBulletMove, 50)

        document.addEventListener('keyup', checkShotButton)
        return () => {
            document.removeEventListener('keyup', checkShotButton)
        }
    }, [bullets, isGameOver])

    // adicionando inimigos na tela
    const addEnemieBall = () => {
        if (!isGameOver) {
            const novaBolinha = {
                width: 30,
                height: 30,
                left: Math.random() * (663 - 0) + 0,
                top: 0
            }
            // setEnemies(prevenemies => [...prevenemies, novaBolinha])
            enemiesRef.current.push(novaBolinha)
        }
    }

    useEffect(() => {
        const intervalID = setInterval(addEnemieBall, 1600)
        return () => clearInterval(intervalID)
    }, [isGameOver])

    // definindo a movimentação do inimigo e colisão com player
    const enemiesRain = useCallback(() => {
        const player = playerRef.current
        const currentEnemies = enemiesRef.current
        if (!isGameOver) {
            currentEnemies.map((bolinha, index) => {
                if (
                    player.x < bolinha.left + bolinha.width &&
                    player.x + player.width > bolinha.left &&
                    player.y < bolinha.top + bolinha.height &&
                    player.height + player.y > bolinha.top
                ) {
                    setGameOver(true)
                } else {
                    currentEnemies[index].top = bolinha.top + 1
                }
            })
        }
    }, [])
    const removeEnemies = () => {
        // setEnemies((prevenemies) => prevenemies.filter((bolinha) => bolinha.top <= 663))
        enemiesRef.current = enemiesRef.current.filter(bolinha => bolinha.top <= 663)
    }

    useEffect(() => {
        const moveIntervalId = setInterval(enemiesRain, 10)
        const removeInterval = setInterval(removeEnemies, 10)
        console.log('montei')
        return () => {
            console.log('desmontei')
            clearInterval(moveIntervalId)
            clearInterval(removeInterval)
        }
    }, [isGameOver])

    // função pra reiniciar o jogo
    const restartGame = () => {
        setPlayerPosX(320)
        setPlayerPosY(320)
        setGameOver(false)
        setEnemies([])
        setBullets([])
        document.location.reload()
    }

    return (
        <>
            <div className="containerNovoJogo">
                <div className='contentNovoJogo'>
                    <div style={playerBallStyle}></div>
                    <div className='elems'>
                        <div className='bulletArea'>
                            {bullets.map((bullet, index) => {
                                return <div key={`bullet${index}`} style={{
                                    backgroundColor: 'yellow',
                                    width: '20px',
                                    height: '20px',
                                    border: '1px solid black',
                                    borderRadius: '100px',
                                    position: 'absolute',
                                    top: bullet.top,
                                    left: bullet.left + 15
                                }}></div>
                            })}
                        </div>
                        {isGameOver ?
                            <div className='gameOver'>
                                <span>Game Over!</span>
                                <button onClick={restartGame}>Restart</button>
                            </div> :
                            (enemiesRef.current).map((bolinha, index) => {
                                return <div key={`enemie${index}`} style={{
                                    border: '2px solid black',
                                    backgroundColor: 'red',
                                    width: '35px',
                                    height: '35px',
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
})