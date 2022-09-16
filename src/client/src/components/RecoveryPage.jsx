import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import KeyIcon from '@mui/icons-material/Key';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import host from '../data/host';
import TextFieldPassword from '../UI/TextFieldPassword'
import classes from '../styles/LoginPage.module.css'

const RecoveryPage = ({form, setForm, authorizationHandler, userIsValid}) => {

    const navigate = useNavigate()

    const resetPasswordHandler = async () => {
        if(form.password === form.password2){
            const response = await fetch(`http://${host}/api/recovery`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: form.login, password: form.password})
            })
            if((await response.json()).password_changed){
                alert('Password changed correctly!')
                setForm({login: '', password: '', password2: ''})
                navigate('signin')
            } else {
                alert('Password change failed, please try again later!..')
            }
        }

    }

    return (
        <div className={classes.form}>  
            <KeyIcon />
            <h2>Password Recovery</h2>
            <div className={classes.textfield}>
                <TextField 
                fullWidth 
                label="Username" 
                required 
                variant="outlined"
                color={userIsValid || form.login.length === 0 ? "info" : 'error'}
                value={form.login}
                onChange={e => setForm({...form, login: e.target.value})}/>
            </div>
            <div className={classes.textfield}>
                <TextFieldPassword 
                fullWidth            
                rows={1}
                variant="outlined" 
                required            
                label={'Input your new password'} 
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
                <Button onClick={resetPasswordHandler} variant={"contained"} fullWidth>Reset password</Button>
            </div>
            <div className={[classes.underAuthButton].join(' ')}>
                <Link className={classes.link} to={'recovery'}>Forgot password?</Link>
                <Link className={classes.link} to={'signup'}>Don't have an account? Sign Up</Link>
            </div>
        </div>
    )
}

export default RecoveryPage