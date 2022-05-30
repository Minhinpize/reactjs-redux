// React tools
import { useState, useEffect } from "react"

// Third party
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

// Components
import { auth } from "../Firebase/firebaseConfig"

const Logout = () => {
    const navigate = useNavigate()

    // Define states
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (checked) {
            // console.log('Déconnexion')
            signOut(auth)
                .then(() => {
                    // Sign out
                    console.log('Vous êtes déconnecté.')
                    setTimeout(() => {
                        navigate('/')
                    }, 1000);
                })
                .catch((error) => {
                    console.log('Nous avons une erreur')
                })
        }
    }, [checked])

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    return (
        <div className="logoutContainer">
            <label className="switch">
                <input
                    type='checkbox'
                    checked={checked}
                    onChange={handleChange}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Logout