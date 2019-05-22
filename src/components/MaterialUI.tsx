import orange from '@material-ui/core/colors/orange';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';

interface IMaterialUIProps {
    children?: any;
}

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: orange,
        secondary: pink
    },
});

const MaterialUI = (props: IMaterialUIProps) => (
    <MuiThemeProvider theme={theme}>
        {props.children}
    </MuiThemeProvider>
);

export default MaterialUI;
