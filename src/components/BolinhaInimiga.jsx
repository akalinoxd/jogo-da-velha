import { useEffect, useState } from 'react';

const BolinhaInimiga = ({ index, startTime }) => {

    const [posX, setPosX] = useState(Math.random() * (678 - 0) + 0)
    const [posY, setPosY] = useState(0)
    const [isVisible, setVisible] = useState(false)

    const step = 3

    const ballStyle = {
        border: '2px solid black',
        backgroundColor: 'red',
        width: '20px',
        height: '20px',
        borderRadius: '100px',
        display: isVisible ? 'inline-block' : 'none',
        position: 'absolute',
        left: `${posX}px`,
        top: `${posY}px`
    }


    const move = () => {
        setPosY(prevPosY => {
            if (prevPosY > 0) {
                setVisible(true)
            }

            if (prevPosY <= 678) {
                return prevPosY + step
            } else {
                setPosX(() => Math.random() * (678 - 0) + 0)
                return 0
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            const interval = setInterval(() => {
                move()
            }, 50)
        }, startTime)
    }, [])

    return (
        <div className='elem' id={`elem${index}`} key={`elem${index}`} style={ballStyle}></div>
    )

}

export default BolinhaInimiga