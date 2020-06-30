import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes
} from '../createRequestSaga';
import * as authAPI from '../api/auth';
import HTTP from '../api/client';
import axios from 'axios'


// Register
export const actions = {
  AUTH_REGISTER: "AUTH_REGISTER",
  AUTH_REGISTER_SUCCESS: "AUTH_REGISTER_SUCCESS",
  AUTH_REGISTER_FAILURE: "AUTH_REGISTER_FAILURE",
  AUTH_LOGIN : "AUTH_LOGIN",
  AUTH_LOGIN_SUCCESS : "AUTH_LOGIN_SUCCESS",
  AUTH_LOGIN_FAILURE : "AUTH_LOGIN_FAILURE"
}

/* REGISTER */
export function registerRequest(username, email, password, passwordConfirm) {
  return (dispatch) => {
    // Inform Register API is starting
    dispatch(register());

    let data = JSON.stringify({
      username: username,
      email: email,
      password1: password,
      password2: passwordConfirm
    })
    return HTTP.post('/rest-auth/registration', data, 
    { 
      headers: {
      'Access-Control-Allow-Origin': "*",
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    } })
      .then((response) => {
        dispatch(registerSuccess());
      }).catch((error) => {
        dispatch(registerFailure(error.response.data.code));
      });
  };
}

export function loginRequest(username, password) {
  return (dispatch) => {
      // Inform Login API is starting
      dispatch(login());

      let data = JSON.stringify({
        username: username,
        password1: password,
      })
      // API REQUEST
      return HTTP.post('/rest-auth/logind', data, 
      {headers: {
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      }})
      .then((response) => {
          // SUCCEED
          dispatch(loginSuccess(username));
      }).catch((error) => {
          // FAILED
          dispatch(loginFailure());
      });
  };
}
 

export function login() {
  return {
      type: actions.AUTH_LOGIN
  };
}

export function loginSuccess(username) {
  return {
      type: actions.AUTH_LOGIN_SUCCESS,
      username
  };
}

export function loginFailure() {
  return {
      type: actions.AUTH_LOGIN_FAILURE
  };
}


function register() {
  return {
    type: actions.AUTH_REGISTER
  };
}

function registerSuccess() {
  return {
    type: actions.AUTH_REGISTER_SUCCESS,
  };
}

function registerFailure(error) {
  return {
    type: actions.AUTH_REGISTER_FAILURE,
    error
  };
}


const initialState = {
  login: {
    status: 'INIT'
  },
  register: {
    status: 'INIT',
    error: -1
  },
  status: {
    valid: false,
    isLoggedIn: false,
    currentUser: ''
  }
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case actions.AUTH_REGISTER:
      return {
        ...state,
        register: {
          status: 'WAITING',
          error: -1
        }
      }
    case actions.AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          status: 'SUCCESS'
        }
      }
    case actions.AUTH_REGISTER_FAILURE:
      return {
        ...state,
        register: {
          status: 'FAILURE',
          error: action.error
        }
      }
      /* LOGIN */
    case actions.AUTH_LOGIN:
      return {
        ...state,
        login : {
          status: 'WAITING'
        }
      }
  case actions.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        login: {
            status: 'SUCCESS'
        },
        status: {
          ...state.status,
          isLoggedIn: true,
          currentUser: action.username
        }
      }
  case actions.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        login:{
          status: 'FAILURE'
        }
      }
    default:
      return state;
  }
};

