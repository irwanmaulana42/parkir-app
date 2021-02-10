import React, { Component, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import { login } from './../../config/redux/action/auth';


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      failed: false,
      message: '',
      username: "",
      password: "",
      loading: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    console.log('handle Login', this.props);
    dispatch(login(this.state.username, this.state.password))
    .then((response) => {
      if(response.code === 204 || response.code === 404){
        this.setState({
          failed: true,
          message: response.message
        });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    const { isLoggedIn, message } = this.props;
    if(isLoggedIn){
      return window.location.href = "/";
    }

    return (
      <div>
        <div className="uk-container">
          <div className="uk-flex uk-flex-center uk-margin-medium-top">
            <div className="uk-card uk-card-default uk-card-small uk-card-body uk-width-1-2@m">
              <h3 className="uk-card-title">Login</h3>
              {this.state.failed && (
                <>
                  <div className="uk-alert-danger">
                    <p>{this.state.message}</p>
                  </div>
                </>
              )}
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="username">Username</label>
                <div className="uk-form-controls">
                  <input 
                    className="uk-input" 
                    id="username" 
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="password">Password</label>
                <div className="uk-form-controls">
                  <input 
                    className="uk-input" 
                    id="password" 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}    
                  />
                </div>
              </div>
              <span>Not have account?
            <Link to="/register">Sign Up</Link>
              </span>
              <div className="uk-column-1-2">
                <button className="uk-button uk-button-primary" onClick={this.handleLogin}>Sign In</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isLoggedIn } = state.authReducer;
  const { message } = state.messageReducer;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);
