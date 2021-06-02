import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Details } from '../pages/Details'
import { PAGE } from '../constants'

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path={PAGE.HOME()} component={Home} />
      <Route exact path={PAGE.DETAILS()} component={Details} />
    </Switch>
  </Router>
)

export default Routes