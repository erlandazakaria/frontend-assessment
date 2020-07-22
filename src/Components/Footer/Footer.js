import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        textAlign: 'center'
    }
}));

export default function Footer() {
    const classes = useStyles();
    return(
        <Paper className={classes.paper}>
            © 2020 Erlanda Zakaria
        </Paper>
    );
}
