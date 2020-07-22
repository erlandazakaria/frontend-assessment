import React, {useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { store } from '../../Store';
import * as userActions from '../../Actions/UserActions';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    marginTop: {
        marginTop: theme.spacing(1)
    }
}));

export default function LeftPanel({user}) {
    const classes = useStyles();
    const globalState = useContext(store);
    const { dispatch } = globalState;
    const { t } = useTranslation();
    return(
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={12}>
                    {t('dashboard.leftPanel-name')} {user.name}
                </Grid>
                <Grid item xs={12} className={classes.marginTop}>
                    <Button variant="outlined" color="primary" size="small" onClick={() => userActions.logoutUser(dispatch)}>
                        {t('dashboard.logout')}
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
