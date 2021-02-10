import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import AuthService from './../../../services/authService';

const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password)
  .then((response) => {
    if(response.code === 200){
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user: response
        }
      });
    }
    console.log('adasd', response);

    return Promise.resolve(response);
  }, (error) => {
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
  })
}

const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export {
  login,
  logout,
};