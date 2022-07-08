import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import classes from '../styles/LoginPage.module.css'
import { setAdmin, setUser } from '../data/userReducer'

const LoginPage = () => {
    const [form, setForm] = useState({
        login: '',
        password: ''
    })
    const navigator = useNavigate()
    const dispatch = useDispatch()

    const authorizationHandler = async (e) => {
        e.preventDefault()
        let res = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(form)
        })
        res = await res.json()
        console.log(res)
        if(res['auth'])navigator('/', {replace: true})
        res['auth'] === 'admin' ? dispatch(setAdmin({name: res['name'], id: res['id']})) : dispatch(setUser({name: res['name'], id: res['id']}))
    }

  return (
    <div className={classes.main}>
        <form className={classes.form}>
            <div>
                <h2>Log in or register</h2>
                <div className={classes.inputContainer}>
                    <label htmlFor='login'>Login</label>
                    <input name='login' value={form.login} onChange={(e) => setForm({...form , login: e.target.value})}/>
                </div>
                <div className={classes.inputContainer}>
                    <label htmlFor='password'>Password</label>
                    <input type={'password'} name='password' value={form.password} onChange={(e) => setForm({...form , password: e.target.value})}/>
                </div>
                <button className={classes.LoginPageButton} onClick={authorizationHandler}>Sign up</button>
            </div>
        </form>
    </div>
  )
}

export default LoginPage