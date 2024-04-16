import { useEffect, useState } from "react"

const Enemie = ({ playerPosX, playerPosY }) => {
    const [enemieLeft, setEnemieLeft] = useState(Math.random() * (663 - 0) + 0)
    const [enemieTop, setEnemieTop] = useState(0)

    useEffect(() => {
        const testInterval = setInterval(() => {
            console.log(playerPosX, playerPosY)
        }, 5)
        return () => {
            clearInterval(testInterval)
        }
    }, [playerPosX, playerPosY])

    const hasCollision = () => (
        playerPosX < enemieLeft + 35 &&
        playerPosX + 50 > enemieLeft &&
        playerPosY < enemieTop + 35 &&
        playerPosY + 50 > enemieTop
    )

    const moveEnemie = () => {
        setEnemieTop(prevEnemieTop => {
            if (prevEnemieTop < 663) {
                return prevEnemieTop + 1
            } else {
                setEnemieLeft(Math.random() * (663 - 0) + 0)
                return 0
            }
        })
    }

    useEffect(() => {
        const moveEnemieInterval = setInterval(moveEnemie, 5)

        return () => {

            clearInterval(moveEnemieInterval)
        }
    }, [])

    return (
        <div style={{
            border: '2px solid black',
            backgroundColor: 'red',
            width: '35px',
            height: '35px',
            borderRadius: '100px',
            display: 'inline-block',
            position: 'absolute',
            top: enemieTop,
            left: enemieLeft
        }}></div>
    )
}

export default Enemie
