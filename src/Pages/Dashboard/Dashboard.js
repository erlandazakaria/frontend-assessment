import React, {useContext} from 'react';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { store } from '../../Store';

import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import LeftPanel from '../../Components/LeftPanel';
import Table from '../../Components/Table';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    title: {
        flexGrow: 1,
        color: theme.palette.primary
    },
    marginTop: {
        marginTop: theme.spacing(1)
    }
}));

export default function Dashboard() {
    const classes = useStyles();
    const { t } = useTranslation();
    const globalState = useContext(store);
    const { state } = globalState;
    const history = useHistory();
    if (!state.user.id) {
        history.push("/login");
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Header content={t('dashboard.page')} />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <LeftPanel user={state.user} />
                </Grid>
                <Grid item xs={12} lg={8}>
                    <Table />
                </Grid>
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Grid>
        </Container>
    );
}