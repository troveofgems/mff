import axios from 'axios';
import {
  REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,
  LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS,
  LOGOUT_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS,
  VIEW_USER_PROFILE_FAILURE, VIEW_USER_PROFILE_REQUEST, VIEW_USER_PROFILE_SUCCESS,
  USER_RESET_PWD_REQUEST_FAILURE, USER_RESET_PWD_REQUEST_REQUEST, USER_RESET_PWD_REQUEST_SUCCESS,
  USER_RESET_PWD_FAILURE, USER_RESET_PWD_REQUEST, USER_RESET_PWD_SUCCESS
} from '../constants/auth.constants';

export const loginUser = userCredentials => async dispatch => {
  dispatch({ type: LOGIN_USER_REQUEST });
  let credentials = {
    currentEmail: userCredentials.login_email,
    password: userCredentials.login_pwd
  }
  try {
    const
      config = {
        'Content-Type': 'application/json',
      },
      { data: {data} } = await axios.post('/api/v1/authentorization/authentication/login', credentials, config);

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data.token));// TODO: Fix the issue here with the refreshed token
  } catch(err) {
    localStorage.setItem('userInfo', null);
    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: err.response.data.error.message
    });
  }
};
export const registerUser = registrationData => async dispatch => {
  dispatch({ type: REGISTER_USER_REQUEST });

  let formData = {
    currentEmail: registrationData.register_email,
    firstName: registrationData.register_firstName,
    lastName: registrationData.register_lastName,
    birthMonth: registrationData.register_birth_month,
    password: registrationData.register_pwd
  };

  try {
    const
      config = {
        'Content-Type': 'application/json'
      },
      res = await axios.post('/api/v1/authentorization/authentication/register', formData, config);

    await axios.put('/api/v1/authentorization/authentication/register/anonAnalytics/uby', {
      [registrationData.register_birth_year]: 1
    }, config);

    let payload = {
      registrationMessage: 'Your account has successfully been created. Please Login To Continue.',
      registrationStatus: res.status
    };
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload
    });
  } catch(err) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: err.response.data.error.message
    });
  }
};
export const logoutUser = () => async dispatch => {
  dispatch({ type: LOGOUT_USER_REQUEST });
  try {
    localStorage.removeItem('userInfo');
    dispatch({
      type: LOGOUT_USER_SUCCESS,
      payload: true
    });
  } catch(err) {
    dispatch({
      type: LOGOUT_USER_FAILURE,
      payload: err
    });
  }
};
export const getLoggedInUserProfile = () => async (dispatch, getState) => {
  dispatch({ type: VIEW_USER_PROFILE_REQUEST });
  const
    { userLogin: { auth } } = getState(),
    xAuthToken = auth.token || auth;

  if (xAuthToken === undefined) { // Dont allow requests without a token to send a response to the server. 8000
    throw new Error('Contact The Sys-Admin. Error Code: 8000');
  }

  try {
      const config = {
        'headers': {
          'Content-Type': 'application/json',
          'x-auth-token': xAuthToken
        }
      };

      const {data: {data}} = await axios.get(`/api/v1/authentorization/authentication/authenticatedProfile`, config);

    dispatch({
      type: VIEW_USER_PROFILE_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: VIEW_USER_PROFILE_FAILURE,
      payload: err.response.data.error.message
    });
  }
};
export const updateUserProfile = updates => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_PROFILE_REQUEST });
  const
    { userLogin: { auth } } = getState(),
    xAuthToken = auth.token || auth;

  if (xAuthToken === undefined) { // Dont allow requests without a token to send a response to the server. 8000
    throw new Error('Contact The Sys-Admin. Error Code: 8000');
  }

  try {
    const config = {
      'headers': {
        'Content-Type': 'application/json',
        'x-auth-token': xAuthToken
      }
    };

    const {data: {data}} = await axios.put(`/api/v1/authentorization/authentication/updateUser`, updates, config);

    dispatch({
      type: UPDATE_USER_PROFILE_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAILURE,
      payload: err
    });
  }

};

export const sendEmailToResetPassword = accountData => async dispatch => {
  dispatch({ type: USER_RESET_PWD_REQUEST_REQUEST });
  try {
    const config = {
      'headers': {
        'Content-Type': 'application/json'
      }
    };

    await axios.post(`/api/v1/authentorization/authentication/forgotpwd`, accountData, config);

    dispatch({
      type: USER_RESET_PWD_REQUEST_SUCCESS,
    });
  } catch(err) {
    dispatch({
      type: USER_RESET_PWD_REQUEST_FAILURE,
      payload: err
    });
  }

};
export const sendUpdateToUserAccountPwd = (token, update) => async dispatch => {
  dispatch({ type: USER_RESET_PWD_REQUEST });
  console.log('About to call reset password!!');
  try {
    const config = {
      'headers': {
        'Content-Type': 'application/json'
      }
    };

    await axios.put(`/api/v1/authentorization/authentication/resetpwd/${token}`, update, config);

    dispatch({
      type: USER_RESET_PWD_SUCCESS,
    });
  } catch(err) {
    dispatch({
      type: USER_RESET_PWD_FAILURE,
      payload: err
    });
  }
};