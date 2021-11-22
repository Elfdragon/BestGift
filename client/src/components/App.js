import { Route, Router, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Header from './Header';
import Home from './Home';
import Login from './Login';
import history from '../history';
import SignUp from './SignUp';
import { useState } from 'react';

const App = () => {
  const [isAuth, setIsAuth] = useState(false)
  return (
    <Container>
      <Router history={history}>
        <>
          <Header isAuth={isAuth} setIsAuth={setIsAuth} />
          <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route path="/" exact >
                <Home isAuth={isAuth} />
              </Route>
              <Route path="/login" exact >
                <Login isAuth={setIsAuth} />
              </Route>
              <Route path="/signup" exact component={SignUp} />
              {/*<Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/:id" exact component={StreamShow} /> */}
            </Switch>
          </Container>
        </>
      </Router>
    </Container>
  );
};

export default App;
