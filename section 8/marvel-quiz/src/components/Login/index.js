import React, { useState, useEffect } from 'react'

// Third party
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

// Components
import { auth } from '../Firebase/firebaseConfig'

const Login = () => {
    const navigate = useNavigate()

    // Define states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [btn, setBtn] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (password.length > 5 && email !== '') {
            setBtn(true)
        } else if (btn) {
            setBtn(false)
        }
    }, [btn, email, password])

    const handleSubmit = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth ,email, password)
        .then((user) => {
            setEmail('')
            setPassword('')
            navigate('/welcome', { replace: true })
        })
        .catch((error) => {
            setError(error)
            setEmail('')
            setPassword('')
        })
    }

    return (
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftLogin'>
                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        {error !== '' && <span>{error.message}</span>}

                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='inputBox'>
                                <input
                                    type='email'
                                    required
                                    autoComplete='off'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <label
                                    htmlFor='email'
                                >Email</label>
                            </div>

                            <div className='inputBox'>
                                <input
                                    type='password'
                                    required
                                    autoComplete='off'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <label
                                    htmlFor='password'
                                >Mot de passe</label>
                            </div>

                            {
                                <button disabled={btn ? false : true}>Connexion</button>
                            }
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to='/signup'>
                                Nouveau sur Marvel Quiz? Inscrivez-vous maintenant.
                            </Link>
                            <br />
                            <Link className='simpleLink' to='/forget-password'>
                                Mot de passe oublié? Récupérez-le ici
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login