import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Details } from '../pages/Details'
import { PAGE } from '../constants'
import { useContext } from '../Store'

const DetailsRoute = (props) => {
  const { state: { selectedProperty } } = useContext()
  const to = {
    pathname: PAGE.HOME(),
    state: { from: props.location },
    search: props.location.search,
  }
  const hasSelectedProperty = selectedProperty.id

  return hasSelectedProperty ? <Details { ...props } /> : <Redirect to={to}/>
}

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path={PAGE.HOME()} component={Home} />
      <Route exact path={PAGE.DETAILS()} component={DetailsRoute} />
    </Switch>
  </Router>
)

export default Routes