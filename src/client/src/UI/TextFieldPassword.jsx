import React, { useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const TextFieldPassword = props => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <TextField
            InputProps={{
                endAdornment: (
                    <InputAdornment position={'end'}>
                        <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end">
                            {!showPassword ? (
                                <Visibility
                                    style={{ width: '24px', height: '24px' }}
                                />
                            ) : (
                                <VisibilityOff
                                    style={{ width: '24px', height: '24px' }}
                                />
                            )}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...props}
            type={showPassword ? 'text' : 'password'}
            onChange={props.onChange}
        />
    );
};

export default TextFieldPassword;
