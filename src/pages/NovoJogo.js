import './novojogo.css';
import { useState, useEffect } from 'react';
import BolinhaInimiga from '../components/BolinhaInimiga.jsx';

const NovoJogo = () => {

    const [posX, setPosX] = useState(0)
    const [posY, setPosY] = useState(300)

    const step = 10
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

    const bolinhaPrincipalStyle = {
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
                    <div className='elems'>
                        <BolinhaInimiga index={1} startTime={0} />
                        <BolinhaInimiga index={2} startTime={500} />
                        <BolinhaInimiga index={3} startTime={1000} />
                        <BolinhaInimiga index={4} startTime={1500} />
                        <BolinhaInimiga index={5} startTime={2000} />
                        <BolinhaInimiga index={6} startTime={2500} />
                        <BolinhaInimiga index={7} startTime={3000} />
                        <BolinhaInimiga index={8} startTime={3500} />
                        <BolinhaInimiga index={9} startTime={4000} />
                        <BolinhaInimiga index={10} startTime={4500} />
                    </div>
                    <div style={bolinhaPrincipalStyle}></div>
                </div>
            </div>
        </>
    )

}

export default NovoJogo
