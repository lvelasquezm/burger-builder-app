import axios from 'axios';

import * as actionTypes from './actionTypes';

const API_KEY = 'AIzaSyCz3hHnLmw8dml-6gOGPzfCY0wj0jnJLhI';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, (expirationTime * 1000));
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
    if (!isSignup) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
    }

    axios.post(url, authData)
      .then(response => {
        console.log(response);

        const { idToken, localId, expiresIn } = response.data;
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

        localStorage.setItem('token', idToken);
        localStorage.setItem('userId', localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(idToken, localId));
        dispatch(checkAuthTimeout(expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        const secondsDifference = (expirationDate.getTime() - new Date().getTime()) / 1000;

        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(secondsDifference));
      }
    }
  };
};
