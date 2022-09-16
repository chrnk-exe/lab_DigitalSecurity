import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';

import TextFieldPassword from '../UI/TextFieldPassword';
import classes from '../styles/LoginPage.module.css';
import host from '../data/host';
import {setAdmin, setUser} from '../reducers/userReducer'

const SignUp = () => {
    const [form, setForm] = useState({
        login: '',
        password: '',
        password2: '',
    });
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const authorizationHandler = async () => {
        if(form.password === form.password2){
            let res = await fetch(`http://${host}/registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(form),
            })
            res = await res.json()
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
        }
    }

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
                    color='info'
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
                    label={'Password'}
                    value={form.password}
                    onChange={e =>
                        setForm({ ...form, password: e.target.value })
                    }
                />
            </div>
            <div className={classes.textfield}>
                <TextFieldPassword
                    fullWidth
                    rows={1}
                    variant="outlined"
                    color={
                        form.password === form.password2 ? 'success' : 'error'
                    }
                    required
                    label="Repeat your password"
                    value={form.password2}
                    onChange={e =>
                        setForm({ ...form, password2: e.target.value })
                    }
                />
            </div>
            <div className={classes.textfield}>
                <Button
                    onClick={authorizationHandler}
                    variant={'contained'}
                    fullWidth>
                    Sign up
                </Button>
            </div>
            <div className={[classes.underAuthButton].join(' ')}>
                <Link className={classes.link} to={'recovery'}>
                    Forgot password?
                </Link>
                <Link className={classes.link} to={'signin'}>
                    Already have an account? Sign In
                </Link>
            </div>
        </div>
    );
};

export default SignUp;
