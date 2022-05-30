// React tools
import React, { useState } from 'react'

// Third party
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'

// Components
import { auth, user } from '..//Firebase/firebaseConfig'

const Signup = () => {

    const navigate = useNavigate()

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [loginData, setLoginData] = useState(data)
    const [error, setError] = useState('')

    const { pseudo, email, password, confirmPassword } = loginData

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault() // avoid page refresh process after submit

        const { email, password } = loginData
        createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
            return setDoc(user(authUser.user.uid), {
                pseudo: pseudo,
                email: email
            })
        })
        .then(() => {
            setLoginData({...data})
            navigate('/welcome')
        })
        .catch((error) => {
            setError(error)
            setLoginData({...data})
        })
    }

    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword
    ? <button disabled>Inscription</button>
    : <button>Inscription</button>

    // Handle errors
    const errorMsg = error !== '' && <span>{error.message}</span>

    return (
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftSignup'>
                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        {errorMsg}
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='inputBox'>
                                <input
                                    type='text'
                                    id='pseudo'
                                    required
                                    autoComplete='off'
                                    onChange={handleChange}
                                    value={pseudo}
                                />
                                <label
                                    htmlFor='pseudo'
                                >Pseudo</label>
                            </div>

                            <div className='inputBox'>
                                <input
                                    type='email'
                                    id='email'
                                    required
                                    autoComplete='off'
                                    onChange={handleChange}
                                    value={email}
                                />
                                <label
                                    htmlFor='email'
                                >Email</label>
                            </div>

                            <div className='inputBox'>
                                <input
                                    type='password'
                                    id='password'
                                    required
                                    autoComplete='off'
                                    onChange={handleChange}
                                    value={password}
                                />
                                <label
                                    htmlFor='password'
                                >Mot de passe</label>
                            </div>

                            <div className='inputBox'>
                                <input
                                    type='password'
                                    id='confirmPassword'
                                    required
                                    autoComplete='off'
                                    onChange={handleChange}
                                    value={confirmPassword}
                                />
                                <label
                                    htmlFor='confirmPassword'
                                >Confirmer mot de passe</label>
                            </div>

                            {btn}
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to='/login'>
                                Déjà inscrit? Connectez-vous.
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup