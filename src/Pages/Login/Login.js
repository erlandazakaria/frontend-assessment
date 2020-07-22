import React, {useContext, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import database from '../../Database/database.json';
import { store } from '../../Store';
import * as userActions from '../../Actions/UserActions';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        boxSizing: 'border-box',
        margin: '0',
        padding: theme.spacing(0)
    },
    paper: {
        padding: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    gridContainer: {
        height: '100%'
    },
    gridItem: {
        display: 'flex',
        height: 'auto'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        textAlign: 'center'
    },
    submit: {
        marginTop: theme.spacing(1),
        justifySelf: 'center',
        width: 'auto',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
  }));

function checkLogin (login, setErr, setBD, dispatch, history) {
    let user = database.employees.filter(e => e.login === login);
    if(user && user[0]) {
        setErr(false);
        setBD(true);
        setTimeout(() => {
            userActions.loginUser(dispatch, user[0]);
            setBD(false);
            history.push("/");
        }, 1000)
    } else {
        setErr(true)
    }
}

export default function Login() {
    const { t } = useTranslation();
    const classes = useStyles();
    const globalState = useContext(store);
    const { state, dispatch } = globalState;
    const history = useHistory();
    if (state.user && state.user.id) {
        history.push("/");
    }

    const [isErr, setErr] = useState(false);
    const [isBD, setBD] = useState(false);
    return (
        <Container component="main" className={classes.container} maxWidth>
        <Backdrop className={classes.backdrop} open={isBD}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <Grid 
            container 
            spacing={0} 
            className={classes.gridContainer}
            justify="center"
            alignItems="center"
        >
            <Grid item xs={12} className={classes.gridItem} justify="center">
                <Paper className={classes.paper}>
                    <Typography variant="h4" color="primary">
                        <b>{t('login.page')}</b>
                    </Typography>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={(e) => {
                        e.preventDefault(); 
                        checkLogin(document.getElementById('login').value, setErr, setBD, dispatch, history); 
                    }}>
                        <TextField
                            error={isErr}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label={t('login.placeholder')}
                            name="login"
                            autoFocus
                            id="login"
                            type="password"
                            helperText={isErr ? t('login.wrong') : ''}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {t('login.submit')}
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
        </Container>
    );
}