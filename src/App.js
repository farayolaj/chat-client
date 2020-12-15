import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './views/Home';
import Settings from './views/Settings';
import Chat from './views/Chat';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(selectUser);
  return (
    <Route
      {...rest}
      render={props => Boolean(user) ? (
        <Component {...props} />
      ) : (
          <Redirect to={'/settings'} />
        )}
    />
  )
}

const App = () => (
  <Switch>
    <PrivateRoute path="/" component={Home} exact></PrivateRoute>
    {/* <Route path="/" component={Home} exact></Route> */}
    <Route path="/settings" component={Settings}></Route>
    <Route path="/chats/:username" component={Chat}></Route>
  </Switch>
);

export default App;