import { useState, useEffect } from 'react'

const Enemie = () => {
    const [enemies, setEnemies] = useState([])

    // creating enemies
    const createEnemie = () => {
        const newEnemie = {
            width: 30,
            height: 30,
            top: 0,
            left: Math.random() * (663 - 0) + 0
        }

        setEnemies(prevEnemies => [...prevEnemies, newEnemie])
    }

    useEffect(() => {
        let createEnemieInterval = setInterval(createEnemie, 2000)
        return () => {
            clearInterval(createEnemieInterval)
        }
    }, [])

    // setting enemies movement
    const moveEnemie = () => {
        enemies.map((enemie, index) => {
            enemies[index].top = enemie.top + 1
        })
    }

    useEffect(() => {
        let moveEnemieInterval = setInterval(moveEnemie, 1)
        console.log('montei')
        return () => {
            console.log('desmontei')
            clearInterval(moveEnemieInterval)
        }
    }, [enemies])

    return (
        <>
            {enemies.map((enemie, index) => {
                return (
                    <div key={`enemie${index}`} style={{
                        border: '2px solid black',
                        backgroundColor: 'red',
                        width: '35px',
                        height: '35px',
                        borderRadius: '100px',
                        display: 'inline-block',
                        position: 'absolute',
                        top: enemie.top,
                        left: enemie.left
                    }}></div>
                )
            })}
        </>
    )
}

export default Enemie