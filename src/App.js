import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import './App.css';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './config/redux';
import UserService from './services/userService';

// pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import ManageUsers from './pages/ManageUsers';

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
const App = () => {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/users" component={ManageUsers} />
            <PrivateRoute path="/history" component={History} />
          </Switch>
        </Router>
      </Provider>
    </AlertProvider>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.authReducer);
  return (
    <Route {...rest} render={(props) => (auth.isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />)} />
  )
}

export default App;
