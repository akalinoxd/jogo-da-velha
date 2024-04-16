import './jogobolinha.css'
import Enemie from '../components/Enemie.jsx'
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'

const JogoBolinha = React.memo(() => {

    const [playerPosX, setPlayerPosX] = useState(320)
    const [playerPosY, setPlayerPosY] = useState(320)

    // setting player movement
    const playerStep = 1
    const pressedKeys = useMemo(() => ({}), [])
    const playerMovement = () => {
        if (pressedKeys["ArrowUp"] && playerPosY > 0) {
            setPlayerPosY(prevplayerPosY => Math.max(prevplayerPosY - playerStep, 0))
        }
        if (pressedKeys["ArrowLeft"] && playerPosX > 0) {
            setPlayerPosX(prevplayerPosX => Math.max(prevplayerPosX - playerStep, 0))
        }
        if (pressedKeys["ArrowDown"] && playerPosY < 648) {
            setPlayerPosY(prevplayerPosY => Math.min(prevplayerPosY + playerStep, 648))
        }
        if (pressedKeys["ArrowRight"] && playerPosX < 648) {
            setPlayerPosX(prevplayerPosX => Math.min(prevplayerPosX + playerStep, 648))
        }
    }
    const checkKeyDown = e => {
        pressedKeys[e.key] = true
    }
    const checkKeyUp = e => {
        pressedKeys[e.key] = false
    }

    useEffect(() => {
        const interval = setInterval(playerMovement, 1)
        document.addEventListener('keydown', checkKeyDown)
        document.addEventListener('keyup', checkKeyUp)
        return () => {
            clearInterval(interval)
            document.removeEventListener('keydown', checkKeyDown)
            document.removeEventListener('keyup', checkKeyUp)
        }
    }, [])

    return (
        <>
            <div className="containerNovoJogo">
                <div className='contentNovoJogo'>
                    <div style={{
                        border: '1px solid black',
                        width: '50px',
                        height: '50px',
                        borderRadius: '100px',
                        backgroundColor: 'grey',
                        position: 'relative',
                        top: playerPosY,
                        left: playerPosX
                    }}></div>
                    <div className='elems'>
                        <Enemie playerPosX={playerPosX} playerPosY={playerPosY} />
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