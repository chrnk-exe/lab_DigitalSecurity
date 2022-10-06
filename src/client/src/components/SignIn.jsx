import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';

import TextFieldPassword from '../UI/TextFieldPassword';
import classes from '../styles/LoginPage.module.css';
import host from '../data/host';
import { setAdmin, setUser } from '../reducers/userReducer';

const SignIn = () => {
    const [form, setForm] = useState({
        login: '',
        password: '',
        password2: '',
        rememberMe: true,
    });
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const authorizationHandler = async e => {
        e.preventDefault();
        let res = await fetch(`http://${host}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(form),
        });
        res = await res.json();
        if (res['auth']) {
            if (res['isadmin']) {
                dispatch(
                    setAdmin({
                        name: res['name'],
                        id: res['id'],
                        flag: res['flag'],
                    }),
                );
            } else {
                dispatch(setUser({ name: res['name'], id: res['id'] }));
            }
            navigator('/');
        } else {
            alert(res['info']);
        }
    };

    return (
        <div className={classes.form}>
            <LockIcon />
            <h2>Sign in</h2>
            <div className={classes.textfield}>
                <TextField
                    fullWidth
                    label="Username"
                    required
                    variant="outlined"
                    color="info"
                    value={form.login}
                    onChange={e => setForm({ ...form, login: e.target.value })}
                />
            </div>
            <div className={classes.textfield}>
                <TextFieldPassword
                    fullWidth
                    rows={1}
                    variant="outlined"
                    required
                    label="Password"
                    value={form.password}
                    onChange={e =>
                        setForm({ ...form, password: e.target.value })
                    }
                />
            </div>
            {/* <div className={classes.checkboxContainer}>
                <Checkbox checked={form.rememberMe} onChange={() => setForm({...form, rememberMe: !form.rememberMe})}/> <p>Remember me</p>
            </div> */}
            <div className={classes.textfield}>
                <Button
                    onClick={authorizationHandler}
                    variant={'contained'}
                    id={'login_button'}
                    fullWidth>
                    Sign in
                </Button>
            </div>
            <div className={[classes.underAuthButton].join(' ')}>
                <Link className={classes.link} to={'recovery'}>
                    Forgot password?
                </Link>
                <Link className={classes.link} to={'signup'}>
                    Don't have an account? Sign Up
                </Link>
            </div>
        </div>
    );
};

export default SignIn;
