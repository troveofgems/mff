import {
  CLEAR_LOGGED_IN_USER,
  LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS,
  LOGOUT_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS,
  VIEW_USER_PROFILE_FAILURE, VIEW_USER_PROFILE_REQUEST, VIEW_USER_PROFILE_SUCCESS
} from "../../constants/auth.constants";


export const userLoginReducer = (state = {}, action) => {
  switch(action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        error: null,
        auth: null,
        loading: true
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        auth: action.payload
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        auth: null,
        loading: false,
        error: action.payload
      };
    case CLEAR_LOGGED_IN_USER:
      return {
        ...state,
        loading: false,
        error: null,
        auth: null
      };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = { registrationDetails: {registrationMessage: null, registrationStatus: null}, loading: false, error: null}, action) => {
  switch(action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        registrationDetails: null
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        registrationDetails: action.payload
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        registrationDetails: state,
        error: action.payload
      };
    default:
      return state;
  }
};

export const userLogoutReducer = (state = {}, action) => {
  switch(action.type) {
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        tokenFlushSuccess: false
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tokenFlushSuccess: action.payload
      };
    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = { user: {} }, action) => {
  switch(action.type) {
    case UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        user: null,
        success: null,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        success: true
      };
    case UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
        success: false
      };
    default:
      return state;
  }
};

export const userViewProfileReducer = (state = { user: {} }, action) => {
  switch(action.type) {
    case VIEW_USER_PROFILE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        user: null,
        success: false
      };
    case VIEW_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        success: true
      };
    case VIEW_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload
      };
    default:
      return state;
  }
};
