import React from 'react'
import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router'
import { ThemeProvider } from '@mui/material'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import LogoutIcon from "@mui/icons-material/LogoutOutlined"

import SignButtons from './SignButtons';
import greenTheme from './theme';

import classes from '../styles/Header.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = () => {
    const {id} = useSelector(state => state.user)
    const navigate = useNavigate()

    return (
        <ThemeProvider theme={greenTheme}>
            <header className={classes.header}>
                <div className={classes.logo}>
                    <Button 
                    className={classes.buttons} 
                    onClick={() => navigate(-1)}
                    startIcon={<ArrowBackIcon />}>
                        Back
                    </Button>
                    <p className={classes.logoText} onClick={() => navigate('/')}>Omega IT Technologies</p>
                </div>
                <div className={classes.buttons}>
                    {
                        id === -1 
                        ? <SignButtons/>
                        :<Button 
                            onClick={() => {window.sessionStorage.clear(); window.location.reload()}} 
                            className={classes.buttons} 
                            endIcon={<LogoutIcon/>}>
                                Log out
                        </Button>
                    }
                </div>
            </header>
        </ThemeProvider>
  )
}

export default Header