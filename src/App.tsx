import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import UniqueKey from 'uuid/v1'
import store from './reducers/store';
import { router } from './routes'

import Root from './components/Root'

const reduceRoutes = (isAuthenticated: boolean, rest: any) => (routes: any, { isProtected, component: Component, path }: any) => {
  if (isProtected && !isAuthenticated) return routes

  return [
    ...routes,
    <Route
      exact
      key={UniqueKey()}
      path={path}
      render={props => <Component isAuthenticated={isAuthenticated} { ...props } {...rest} />}
    />
  ]
}

const App: React.FC = () => {
  return (
    <div>
      <header>Header</header>
      <Root>
        {({ isAuthenticated, ...rest }) => (
          <Provider store={store}>
            <Router>
              <Switch>
                {router.reduce(reduceRoutes(isAuthenticated, rest), [])}
                <Redirect from='*' to='/' />
              </Switch>
            </Router>
          </Provider>
        )}
      </Root>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
