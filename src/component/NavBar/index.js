import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { logout } from './../../config/redux/action/auth';

const NavBar = (props) => {
  const dispatch = useDispatch();
  const getUser = useSelector(state => state.authReducer.user.token);
  const decoded = jwt_decode(getUser);
  return (
    <div>
      <nav className="uk-navbar-container" >
        <div className="uk-navbar-left">
          <Link className="uk-navbar-item uk-logo" to="/">LOGO</Link>
          <ul className="uk-navbar-nav">
            {decoded.is_admin === 1 && 
            (
              <>
              <li>
                <a href="/users">
                  <span className="uk-icon uk-margin-small-right" uk-icon="icon: star"></span>
                      Manage User
                  </a>
              </li>
              <li>
                <a href="/labels">
                  <span className="uk-icon uk-margin-small-right" uk-icon="icon: star"></span>
                      Manage Label
                  </a>
              </li>
              </>
              )
            }
            <li>
              <a href="/">
                <span className="uk-icon uk-margin-small-right" uk-icon="icon: star"></span>
                    Manage Todos
                </a>
            </li>
            <li style={{
              position: 'absolute',
              right: 0
            }}>
              <a onClick={() => {
                dispatch(logout());
              }}>
                <span className="uk-icon uk-margin-small-right" uk-icon="icon: star"></span>
                    Logout
                </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
