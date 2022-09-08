import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
// import LockIcon from '@mui/icons-material/LockOutlined';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Checkbox from '@mui/material/Checkbox';

// import TextFieldPassword from '../UI/TextFieldPassword'
import SignIn from './SignIn';
import SignUp from './SignUp';
import RecoveryPage from './RecoveryPage';

import { setAdmin, setUser } from '../data/userReducer'
import host from '../data/host'
import useDebounce from '../hooks/useDebounce'

import classes from '../styles/LoginPage.module.css'

const LoginPage = () => {
    const [form, setForm] = useState({
        login: '',
        password: '',
        password2: ''
    })
    const [userIsValid, setUserValid] = useState(false)
    const userName = useDebounce(form.login, 350)
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const { sign } = useParams()

    useEffect(() => {
        const fetchName = async() => {
            let resp = await fetch(`http://${host}:5000/api/check_user`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({name: userName})
            })
            setUserValid((await resp.json()).name !== null)
        }
        fetchName()
    }, [userName])

    const authorizationHandler = async (e) => {
        const storage = window.sessionStorage
        e.preventDefault()
        if((form.password === form.password2 && sign === "signup") || 
            (userIsValid && sign === "signin"))
            {
            let res = await fetch(`http://${host}:5000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(form)
            })
            res = await res.json()
            if(res['auth']){
                res['isadmin'] ? dispatch(setAdmin({name: res['name'], id: res['userid']})) : dispatch(setUser({name: res['name'], id: res['userid']}))
                storage.setItem('user', JSON.stringify({
                    name: res['name'],
                    id: res['userid'],
                    user: res['isadmin'] ? 'admin' : 'user'
                }))
                navigator('/')
            } else {
                alert(res['info'])
            }
        }
    }

    return (
        <div className={classes.main}>
            <form>
                {
                    {
                        signup: <SignUp form={form} setForm={setForm} authorizationHandler={authorizationHandler} userIsValid={userIsValid}/>,
                        signin: <SignIn form={form} setForm={setForm} authorizationHandler={authorizationHandler} userIsValid={userIsValid}/>,
                        recovery: <RecoveryPage form={form} setForm={setForm} authorizationHandler={authorizationHandler} userIsValid={userIsValid}/>
                    }[sign]
                }
                {/* <div className={classes.form}>  
                    <LockIcon />
                    <h2>{sign === "signup" ? "Sign up" : "Sign in"}</h2>
                    <div className={classes.textfield}>
                        <TextField 
                        fullWidth 
                        label="Username" 
                        required 
                        variant="outlined"
                        color={loginColorHandler()}
                        value={form.login}
                        onChange={e => setForm({...form, login: e.target.value})}/>
                    </div>
                    <div className={classes.textfield}>
                        <TextFieldPassword 
                        fullWidth            
                        rows={1}
                        variant="outlined" 
                        required            
                        label={sign === 'recovery' ? 'Input your new password': 'Password'} 
                        value={form.password}
                        onChange={e => setForm({...form, password: e.target.value})}/>
                    </div>
                    {sign !== "signin" 
                    ? <div className={classes.textfield}>
                        <TextFieldPassword 
                        fullWidth            
                        rows={1}
                        variant="outlined" 
                        color={form.password === form.password2 ? "success" : "error"}
                        required            
                        label="Repeat your password" 
                        value={form.password2}
                        onChange={e => setForm({...form, password2: e.target.value})}/>
                    </div>
                    : null
                    }
                    <div className={classes.checkboxContainer}>
                        <Checkbox /> <p>Remember me {'(Coming soon!)'}</p>
                    </div>
                    <div className={classes.textfield}>
                        <Button onClick={authorizationHandler} variant={"contained"} fullWidth>{sign === "signup" ? "Sign up" : "Sign in"}</Button>
                    </div>
                    <div className={[classes.underAuthButton].join(' ')}>
                        <Link className={classes.link} to={'recovery'}>Forgot password?</Link>
                        {   sign !== 'signup'
                        ? <Link className={classes.link} to={'signup'}>Don't have an account? Sign Up</Link>
                        : <Link className={classes.link} to={'signin'}>Already have an account? Sign In</Link>
                        }
                    </div>
                </div> */}
            </form>
        </div>
    )
}

export default LoginPage