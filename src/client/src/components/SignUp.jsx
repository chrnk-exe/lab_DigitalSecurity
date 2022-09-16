import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import LockIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom'

import TextFieldPassword from '../UI/TextFieldPassword'
import classes from '../styles/LoginPage.module.css'

const SignUp = ({form, setForm, authorizationHandler, userIsValid}) => {


    return (
        <div className={classes.form}>  
            <LockIcon />
            <h2>Sign up</h2>
            <div className={classes.textfield}>
                <TextField 
                fullWidth 
                label="Username" 
                required 
                variant="outlined"
                color={!userIsValid ? "info": 'error'}
                value={form.login}
                onChange={e => setForm({...form, login: e.target.value})}/>
            </div>
            <div className={classes.textfield}>
                <TextFieldPassword 
                fullWidth            
                rows={1}
                variant="outlined" 
                required            
                label={'Password'} 
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}/>
            </div>
            <div className={classes.textfield}>
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
            {/* <div className={classes.checkboxContainer}>
                <Checkbox checked={form.rememberMe} onChange={() => setForm({...form, rememberMe: !form.rememberMe})}/> <p>Remember me</p>
            </div> */}
            <div className={classes.textfield}>
                <Button onClick={authorizationHandler} variant={"contained"} fullWidth>Sign up</Button>
            </div>
            <div className={[classes.underAuthButton].join(' ')}>
                <Link className={classes.link} to={'recovery'}>Forgot password?</Link>
                <Link className={classes.link} to={'signin'}>Already have an account? Sign In</Link>
            </div>
        </div>
    )
}

export default SignUp