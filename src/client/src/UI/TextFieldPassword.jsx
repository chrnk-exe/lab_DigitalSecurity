import React, {useState} from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, TextField } from '@mui/material';

const TextFieldPassword = (props) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <TextField 
            InputProps={{
                endAdornment: (
                    <InputAdornment position={'end'}>
                        <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end">
                            {!showPassword ? <Visibility /> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            {...props}
            type={ showPassword ? 'text' : 'password'}
            onChange={props.onChange}/>
    )
}

export default TextFieldPassword