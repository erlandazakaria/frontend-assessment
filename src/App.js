import React, { useEffect, useState, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { availableLanguages } from './Utils/i18n';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import Routes from './Routes';

import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';

let primaryPallete = {
  light: '#8a99a1',
  main: '#596e79',
  dark: '#3e4d54',
  contrastText: '#FFFFFF'
}
let secondaryPallete = {
  light: '#C6E3F3',
  main: '#41a2d7',
  dark: '#2D7196',
  contrastText: '#FFFFFF'
}

function DifferentLang({setShowDiffLang}) {
  return(
    <Dialog
      open={true}
      onClose={() => setShowDiffLang(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Sorry for the inconvenience, language used in your browser is not yet available in our website. Website will using English.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowDiffLang(false)} color="primary" autoFocus>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function App() {
  let theme = createMuiTheme({
    palette: {
      primary: primaryPallete,
      secondary: secondaryPallete
    }
  });
  theme = responsiveFontSizes(theme);

  const [ showDiffLang, setShowDiffLang ] = useState(false);

  useEffect(() => {
    let userLang = navigator.language || navigator.userLanguage;
    if(!availableLanguages.map(al => al.replace('_', '-')).includes(userLang)) {
      setShowDiffLang(true)
    }
    console.log('user Language:', userLang);
    console.log('available Language:', availableLanguages);
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        {Routes.map(route => (
          <Route exact path={route.path} key={route.path}>
            <Suspense fallback="loading">
              {showDiffLang && <DifferentLang setShowDiffLang={setShowDiffLang} />}
              <route.component />
            </Suspense>
          </Route>
        ))}
      </Switch>
    </ThemeProvider>
  );
}
