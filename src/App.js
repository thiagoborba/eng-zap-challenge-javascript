import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Container, CssBaseline, Toast } from './Components';
import { Routes } from './routes';
import { Provider } from './Store';

const useStyles = makeStyles({
  root: {
    padding: 32,
  }
})

function App() {
  const classes = useStyles()
  return (
    <Provider>
      <Toast />
      <CssBaseline />
      <Container className={classes.root}>
        <Routes />
      </Container>
    </Provider>
  );
}

export default App;
