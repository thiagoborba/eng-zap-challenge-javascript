import React from 'react'
import { Routes } from './routes'
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: 32
  }
})

function App() {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Routes />
    </Container>
  );
}

export default App;
