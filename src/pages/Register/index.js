import React, { Component, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import AuthService from './../../services/authService';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      failed: false,
      message: '',
      name: "",
      username: "",
      password: "",
      loading: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
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

  handleRegister = async (e) => {
    const { dispatch, history } = this.props;
    e.preventDefault();
    if (this.state.name === '' || this.state.username === '' || this.state.password === '') {
      return;
    }

    const data = await AuthService.register(this.state.name, this.state.username, this.state.password);
    console.log('reg', data);
    if (data.code === 200) {
      this.setState({
        name: '',
        username: '',
        password: '',
      });
      history.push('/login');
    } else if(data.code === 204){
      this.setState({
        failed: true,
        message: data.message
      });
    }
  }


  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div className="uk-container">
          <div className="uk-flex uk-flex-center uk-margin-medium-top">
            <div className="uk-card uk-card-default uk-card-small uk-card-body uk-width-1-2@m">
              <h3 className="uk-card-title">Register</h3>
              {this.state.failed && (
                <>
                  <div className="uk-alert-danger">
                    <p>{this.state.message}</p>
                  </div>
                </>
              )}
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="username">Name</label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input"
                    id="username"
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="username">Username</label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input"
                    id="username"
                    type="text"
                    placeholder="Username"
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
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />
                </div>
              </div>
              <span>Already have an account?
            <Link to="/login">Sign In</Link>
              </span>
              <div className="uk-column-1-2">
                <button
                  className="uk-button uk-button-primary"
                  onClick={this.handleRegister}
                >Sign Up</button>
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

export default connect(mapStateToProps)(Register);
