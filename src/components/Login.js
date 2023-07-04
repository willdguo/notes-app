import {useState} from 'react'
import loginService from '../services/login'
import getNotes from '../services/getNotes'


const Login = ( {user, setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)


    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        console.log('logging in with', username, password)

        try {
            const user = await loginService.login({username, password})

            getNotes.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

            console.log('success')

            window.localStorage.setItem('loggedUser', JSON.stringify(user))
        } catch (error) {
            setErrorMessage('Incorrect username/password')

            setTimeout(() => {
                setErrorMessage(null)
            }, 7000)

        }
    }

    return (
        <div className = "login-container">
            <h2> Sign In </h2>

            <p> Username </p>
            <input onChange = {handleUsername}/>

            <p>Password</p>
            <input onChange = {handlePassword}/>

            <button onClick = {handleLogin}> Submit </button>

            <div className = "error-msg">
                {errorMessage}
            </div>

        </div>
    )
}

export default Login
