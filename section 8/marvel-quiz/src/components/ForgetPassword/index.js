// React tools
import { useState } from 'react'

// Third party
import { Link, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'

// Components
import { auth } from '../Firebase/firebaseConfig'

const ForgetPassword = () => {
    const navigate = useNavigate()

    // Define states
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        sendPasswordResetEmail(auth, email)
        .then(() => {
            setError(null)
            setSuccess(`Consultez votre email ${email} pour charger le mot de passe.`)
            setEmail('')

            setTimeout(() => {
                navigate('/login')
            }, 5000);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const disabled = email === ''

    return (
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftForget'>
                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>

                        {
                        success
                        && <span
                            style={{ 
                                border: '1px solid green',
                                background: 'green',
                                color: '#fff'
                            }}
                        >
                            {success}
                        </span>
                        }

                        { error && <span>{error.message}</span> }

                        <h2>Mot de passe oublié?</h2>
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

                            <button disabled={disabled}>Récupérer</button>
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to='/login'>
                                Déjà inscrit ? Connectez-vous
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword