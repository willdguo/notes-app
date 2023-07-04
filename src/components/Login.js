import {useState} from 'react'
import loginService from '../services/login'
import userService from '../services/user'
import getNotes from '../services/getNotes'


const Login = ( {user, setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [newuser, setNewuser] = useState(false)


    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleNewUsername = (e) => {
        setNewUsername(e.target.value)
    }

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value)
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
            window.location.reload()
        } catch (error) {
            setErrorMessage('Incorrect username/password')

            setTimeout(() => {
                setErrorMessage(null)
            }, 7000)

        }
    }

    const handleCreateUser = async (e) => {
        console.log('creating new user', newUsername, newPassword)

        try {
            let newuser = await userService.addUser({username: newUsername, password: newPassword}) 
            console.log('created: ')
            console.log(newuser)
            newuser = await loginService.login({username: newUsername, password: newPassword})

            console.log('logged in: ')
            console.log(newuser)

            getNotes.setToken(newuser.token)
            setUser(newuser)
            setNewUsername('')
            setNewPassword('')

            console.log('success')

            window.localStorage.setItem('loggedUser', JSON.stringify(newuser))
        } catch (error) {
            setErrorMessage('Username must be at least 3 characters & password must be at least 8 characters')

            setTimeout(() => {
                setErrorMessage(null)
            })
        }

    }

    const loginForm = () => (

        <div className = "login-container">
            <h2> Sign In </h2>

            <p> Username </p>
            <input value = {username} onChange = {handleUsername}/>

            <p>Password</p>
            <input value = {password} type = 'password' onChange = {handlePassword}/>

            <button onClick = {handleLogin}> Submit </button>

            <p className = 'newUser' onClick = {() => setNewuser(!newuser)}> New User? </p>

            <div className = "error-msg">
                {errorMessage}
            </div>

        </div>
    )

    const newUserForm = () => (
        <div className = "login-container">
            <h2> Create Account </h2>

            <p> Username </p>
            <input value = {newUsername} onChange = {handleNewUsername} />

            <p> Password </p>
            <input value = {newPassword} type = 'password' onChange = {handleNewPassword} />

            <button onClick = {handleCreateUser}> Submit </button>

            <p className = 'newUser' onClick = {() => setNewuser(!newuser)}> Log in </p>

            <div className = "error-msg">
                {errorMessage}
            </div>
        </div>
    )

    return (
        <div>
            {newuser === false
                ? loginForm()
                : newUserForm()
            }
        </div>
    )
}

export default Login
