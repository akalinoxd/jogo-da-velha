import './novojogo.css';
import { useState, useEffect } from 'react';

const NovoJogo = () => {

    const [posX, setPosX] = useState(0)
    const [posY, setPosY] = useState(0)
    const step = 15
    const limit = 320
    const pressedKeys = {}

    const moveElement = () => {
        if (pressedKeys["ArrowUp"] && posY > -limit) {
            setPosY(prevPosY => Math.max(prevPosY - step, -limit));
        }
        if (pressedKeys["ArrowLeft"] && posX > -limit) {
            setPosX(prevPosX => Math.max(prevPosX - step, -limit));
        }
        if (pressedKeys["ArrowDown"] && posY < limit) {
            setPosY(prevPosY => Math.min(prevPosY + step, limit))
        }
        if (pressedKeys["ArrowRight"] && posX < limit) {
            setPosX(prevPosX => Math.min(prevPosX + step, limit))
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            moveElement()
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
    }, [])

    const bolinhaStyle = {
        position: 'relative',
        top: `${posY}px`,
        left: `${posX}px`,
        width: '50px',
        height: '50px',
        border: '2px solid black',
        borderRadius: '100px',
        margin: 'auto',
        backgroundColor: 'grey'
    };

    return (
        <>
            <div className="containerNovoJogo">
                <div className='contentNovoJogo'>
                    <div style={bolinhaStyle}></div>
                </div>
            </div>
        </>
    )

}

export default NovoJogo
