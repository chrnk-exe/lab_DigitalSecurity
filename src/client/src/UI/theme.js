import { createTheme } from '@mui/material/styles';

const greenTheme = createTheme({
    typography: {
        fontSize: '1em',
    },
    palette: {
        primary: {
            main: 'rgb(69, 231, 177)',
        },
        secondary: {
            main: '#000000',
        },
    },
});

export default greenTheme;
