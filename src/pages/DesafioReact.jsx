import { useState } from 'react'
import './desafioreact.css'

const DesafioReact = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogged, setIsLogged] = useState(true)
    const [loginAlert, setLoginAlert] = useState(<div></div>)

    const checkEmail = () => {
        const emails = ['@gmail.com', '@outlook.com', '@hotmail.com']
        let isEmailValid = false
        for (let i = 0; i < emails.length; i++) {
            if (email.includes(emails[i]) && email != '') {
                isEmailValid = true
            }
        }
        
        if (isEmailValid) {
            return true
        } else {
            return false
        }
    }

    const checkPassword = () => {
        const dividedPass = password.split('')
        if (dividedPass.length >= 6) {
            return true
        } else {
            return false
        }
    }

    const handleSubmit = () => {
        if (checkEmail()) {
            if (checkPassword()) {
                setIsLogged(true)
                setLoginAlert(<div className='loginSuccess'>Logged with success!</div>)
            } else {
                setIsLogged(false)
                setLoginAlert(<div></div>)
            }
        }else{
            setIsLogged(false)
        }
    }

    return (
        <>
            <main>
                <div className="loginArea">
                    <h2>Login Form 🐞</h2>
                    <h3 className='errorAlert' style={{ display: isLogged ? 'none' : 'block' }}>E-MAIL OR PASSWORD WRONG.</h3>
                    <div>
                        <span>Email</span>
                        <input type="text" onChange={(elem) => {
                            const text = elem.target.value
                            setEmail(text)
                        }} />
                    </div>
                    <div>
                        <span>Password</span>
                        <input type="text" onChange={(elem) => {
                            const text = elem.target.value
                            setPassword(text)
                            checkPassword()
                        }} />
                    </div>
                    <button onClick={handleSubmit} style={{
                        display: email == '' ? 'none' : 'inline-block'
                    }}>Login</button>
                </div>
                {loginAlert}
            </main>
        </>
    )
}

export default DesafioReact