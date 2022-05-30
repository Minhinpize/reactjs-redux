import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {

    const [btn, setBtn] = useState(false)

    const refWolwerine = useRef(null)
    
    useEffect(() => {
        // Show Wolwerine with his claws using a css class
        refWolwerine.current.classList.add('startingImg')
        
        // Removes class that display himself and his claws after 3s
        setTimeout(() => {
            refWolwerine.current.classList.remove('startingImg')
            setBtn(true)
        }, 1000);
    }, [])

    // Show right claw where btn is overed
    const setLeftImg = () => {
        refWolwerine.current.classList.add('leftImg')
    }

    const setRightImg = () => {
        refWolwerine.current.classList.add('rightImg')
    }

    const clearImg = () => {
        if (refWolwerine.current.classList.contains('leftImg')) {
            refWolwerine.current.classList.remove('leftImg')
        } else if (refWolwerine.current.classList.contains('rightImg')) {
            refWolwerine.current.classList.remove('rightImg')
        }
    }

    const displayBtn = btn && (
        <>
            <div
                className='leftBox'
                onMouseOver={setLeftImg}
                onMouseOut={clearImg}
            >
                <Link to='/signup' className='btn-welcome'>Inscription</Link>
            </div>

            <div
                className='rightBox'
                onMouseOver={setRightImg}
                onMouseOut={clearImg}
            >
                <Link to='/login' className='btn-welcome'>Connexion</Link>
            </div>
        </>
    )

    return (
        <main ref={refWolwerine} className='welcomePage'>
            {displayBtn}
        </main>
    )
}

export default Landing