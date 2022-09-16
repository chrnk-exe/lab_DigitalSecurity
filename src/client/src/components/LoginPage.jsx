import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RecoveryPage from './RecoveryPage';

import { setAdmin, setUser } from '../reducers/userReducer';
import host from '../data/host';
import useDebounce from '../hooks/useDebounce';

import classes from '../styles/LoginPage.module.css';

const LoginPage = () => {
    const [form, setForm] = useState({
        login: '',
        password: '',
        password2: '',
        rememberMe: true,
    });
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const { sign } = useParams();

    return (
        <div className={classes.main}>
            <form>
                {
                    {
                        signup: <SignUp />,
                        signin: <SignIn />,
                        recovery: <RecoveryPage />,
                    }[sign]
                }
            </form>
        </div>
    );
};

export default LoginPage;
