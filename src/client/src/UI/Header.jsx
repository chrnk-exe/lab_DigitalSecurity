import React from 'react'
import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router'
import { ThemeProvider } from '@mui/material'
import Button from '@mui/material/Button';
import LogoutIcon from "@mui/icons-material/LogoutOutlined"

import SignButtons from './SignButtons';
import greenTheme from './theme';
import host from '../data/host'

import classes from '../styles/Header.module.css'

const Header = () => {
    const {id} = useSelector(state => state.user)
    const navigate = useNavigate()
    const logoutHandler = async () => {
        const resp = await fetch(`http://${host}:5000/logout`, {
            credentials: "include"
        })
        console.log(resp)
        window.sessionStorage.clear(); 
        window.location.reload();
    }

    return (
        <ThemeProvider theme={greenTheme}>
            <header className={classes.header}>
                <div className={classes.logo}>
                    {/* <Button 
                    className={classes.buttons} 
                    onClick={() => navigate(-1)}
                    startIcon={<ArrowBackIcon />}>
                        Back
                    </Button> */}
                    <p className={classes.logoText} onClick={() => navigate('/')}>Omega IT Technologies</p>
                </div>
                <div className={classes.buttons}>
                    {
                        id === -1 
                        ? <SignButtons theme={greenTheme}/>
                        :<Button 
                            onClick={logoutHandler} 
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