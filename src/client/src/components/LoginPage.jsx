import React from 'react';
import { useParams } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RecoveryPage from './RecoveryPage';

import classes from '../styles/LoginPage.module.css';

const LoginPage = () => {
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
