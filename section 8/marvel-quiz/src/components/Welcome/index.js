// React tools
import { useState, useEffect } from 'react'

// Third party
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

// Components
import Logout from '../Logout'
import Quiz from '../Quiz'
import { auth, user } from '../Firebase/firebaseConfig'

const Welcome = () => {
    const navigate = useNavigate()
    // Define states
    const [userSession, setUserSession] = useState(null)
    const [userData, setuserData] = useState({})

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (user) => {
            user ? setUserSession(user) : navigate('/')
        })

        if (!!userSession) {

            const colRef = user(userSession.uid)
            
            getDoc(colRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const docData = snapshot.data()
                    setuserData(docData)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }

        return listener()
    }, [userSession])

    return userSession === null
    ? (
        <>
        <div className='loader'></div>
        <p className='loaderText'>Loading...</p>
        </>
    )
    : (
        <div className='quiz-bg'>
            <div className='container'>
                <Logout />
                <Quiz userData={userData} />
            </div>
        </div>
    )
}

export default Welcome