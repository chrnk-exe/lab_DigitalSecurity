import React from 'react'
import classes from '../styles/Header.module.css'
import {ButtonGroup, Button} from '@mui/material'
import LoginIcon from '@mui/icons-material/LoginOutlined';
import LogoutIcon from "@mui/icons-material/LogoutOutlined"
import { useSelector } from 'react-redux/es/exports';
import {useNavigate} from 'react-router'
import { ThemeProvider } from '@mui/material'
import greenTheme from './theme';
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
                    <p>Logo</p>
                </div>
                <div className={classes.buttons}>
                    {
                        id === -1 
                        ? <ButtonGroup variant="text" size="large">
                            <Button 
                                onClick={() => navigate('login/signin')} 
                                style={{borderColor: "#45e7b1"}} 
                                className={classes.buttons} 
                                color="primary"
                                size="large" 
                                startIcon={<LoginIcon />}>
                                    Sign in
                            </Button>
                            <Button 
                                onClick={() => navigate('login/signup')} 
                                className={classes.buttons} 
                                color="primary"
                                size="large">
                                    Sign up
                            </Button>
                        </ButtonGroup>
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