import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import classes from '../styles/LoginPage.module.css'
import { setAdmin, setUser } from '../data/userReducer'
import host from '../data/host'
import LockIcon from '@mui/icons-material/LockOutlined';
import { Button, TextField } from '@mui/material'
import TextFieldPassword from '../UI/TextFieldPassword'
import { Checkbox } from '@mui/material'
import { useParams } from 'react-router-dom'
import useDebounce from '../data/useDebounce'

const LoginPage = () => {
    const [form, setForm] = useState({
        login: '',
        password: '',
        password2: ''
    })
    const [userIsValid, setUserValid] = useState(false)
    const userName = useDebounce(form.login, 250)
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
        if(form.password === form.password2 || sign === "signin" && userIsValid){
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
                <div className={classes.form}>
                    <LockIcon />
                    <h2>{sign === "signup" ? "Sign up" : "Sign in"}</h2>
                    <div className={classes.textfield}>
                        <TextField 
                        fullWidth 
                        label="Username" 
                        required 
                        variant="outlined"
                        color={userIsValid || form.login.length === 0 ? "info" : "error"}
                        value={form.login}
                        onChange={e => setForm({...form, login: e.target.value})}/>
                        {/* {!(userIsValid || form.login.length === 0)
                        ? <div>User doesnt exist</div>
                        : null
                        } */}
                    </div>
                    <div className={classes.textfield}>
                        <TextFieldPassword 
                        fullWidth            
                        rows={1}
                        variant="outlined" 
                        required            
                        label="Password" 
                        value={form.password}
                        onChange={e => setForm({...form, password: e.target.value})}/>
                    </div>
                    {sign === "signup" 
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
                        <Checkbox /> <p>Remember me (Coming soon!)</p>
                    </div>
                    <div className={classes.textfield}>
                        <Button onClick={authorizationHandler} variant={"contained"} fullWidth>Sign in</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginPage