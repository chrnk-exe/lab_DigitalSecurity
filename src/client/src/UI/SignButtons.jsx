import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import { ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router';

import classes from '../styles/Header.module.css';

const SignButtons = ({ theme, color }) => {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            <ButtonGroup variant="text" size="large">
                <Button
                    onClick={() => navigate('/login/signin')}
                    style={{ borderColor: '#45e7b1' }}
                    className={classes.buttons}
                    color={color ? color : 'primary'}
                    size="large"
                    startIcon={<LoginIcon />}>
                    Sign in
                </Button>
                <Button
                    onClick={() => navigate('/login/signup')}
                    className={classes.buttons}
                    color={color ? color : 'primary'}
                    size="large">
                    Sign up
                </Button>
            </ButtonGroup>
        </ThemeProvider>
    );
};

export default SignButtons;
