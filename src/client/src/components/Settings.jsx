import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Navigate, useNavigate } from 'react-router';
import classes from '../styles/Settings.module.css';
import adminPic from '../assets/admin.jpg';
import userPic from '../assets/user.jpg';
import TextFieldPassword from '../UI/TextFieldPassword';
import { ThemeProvider } from '@mui/material';
import greenTheme from '../UI/theme';
import useDebounce from '../hooks/useDebounce';
import host from '../data/host';
import { setUserName } from '../reducers/userReducer';

const Settings = () => {
    const { user, name, id, flag } = useSelector(state => state.user);
    const [form, setForm] = useState({
        username: '',
        password: '',
        password2: '',
    });
    const [nameIsValid, setNameValid] = useState(true);
    const debouncedUsername = useDebounce(form.username, 350);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchName = async () => {
            let resp = await fetch(`http://${host}/api/check_user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name: form.username }),
            });
            setNameValid((await resp.json()).name !== null);
        };
        fetchName();
    }, [debouncedUsername]);

    const changeNameHandler = async () => {
        if (!nameIsValid) {
            const response = await fetch(`http://${host}/api/change_name`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name: form.username, id }),
            });
            if ((await response.json()).name_changed) {
                alert('Username changed correctly!');
                dispatch(setUserName(form.username));
                setForm({ ...form, username: '' });
            } else {
                alert('Username change failed... try again later!');
            }
        }
    };

    const resetPasswordHandler = async () => {
        if (form.password === form.password2) {
            const response = await fetch(`http://${host}/api/recovery`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name, password: form.password }),
            });
            if ((await response.json()).password_changed) {
                alert('Password changed correctly!');
                setForm({ username: '', password: '', password2: '' });
            } else {
                alert('Password change failed, please try again later!..');
            }
        }
    };

    if (id === -1) {
        return <Navigate to={'/'} replace />;
    }
    return (
        <div className={classes.Settings}>
            <ThemeProvider theme={greenTheme}>
                <section className={classes.userCard}>
                    <img
                        height={300}
                        src={user === 'admin' ? adminPic : userPic}
                        alt=""
                    />
                    <p>User ID: {user === 'admin' ? id + ' ' + flag : id}</p>
                </section>
                <section className={classes.SettingsTextFields}>
                    <h2>Change your username</h2>
                    <div className={classes.TextField}>
                        <TextField
                            color={
                                (!nameIsValid || form.username === name) &&
                                form.username.length !== 0
                                    ? 'info'
                                    : 'error'
                            }
                            style={{ fontSize: '1.2em' }}
                            fullWidth
                            placeholder={name}
                            value={form.username}
                            onChange={e =>
                                setForm({ ...form, username: e.target.value })
                            }
                        />
                    </div>
                    <Button
                        disabled={
                            !(!nameIsValid || form.username === name) ||
                            form.username.length === 0
                        }
                        variant="contained"
                        onClick={changeNameHandler}>
                        Change username
                    </Button>
                    <h2>Change your password</h2>
                    <div className={classes.TextField}>
                        <TextFieldPassword
                            color={'info'}
                            fullWidth
                            placeholder="Type your new password"
                            value={form.password}
                            onChange={e =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />
                    </div>
                    <div className={classes.TextField}>
                        <TextFieldPassword
                            color={
                                form.password === form.password2
                                    ? 'success'
                                    : 'error'
                            }
                            fullWidth
                            placeholder="Repeat your password"
                            value={form.password2}
                            onChange={e =>
                                setForm({ ...form, password2: e.target.value })
                            }
                        />
                    </div>
                    <Button
                        variant="contained"
                        disabled={form.password !== form.password2}
                        onClick={resetPasswordHandler}>
                        {' '}
                        Change password{' '}
                    </Button>
                </section>
            </ThemeProvider>
        </div>
    );
};

export default Settings;
