import React from 'react'
import { Routes } from './routes'
import { Container, makeStyles } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { Toast } from './Components'
import { Provider } from './Store'

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
