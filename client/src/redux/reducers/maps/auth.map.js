import {
  userLoginReducer,
  userLogoutReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userViewProfileReducer,
  userRequestPasswordResetReducer,
  userResetPasswordReducer
} from '../services/auth.reducer';

const authReducerMap = {
  userRequestToResetPassword: userRequestPasswordResetReducer,
  userResetPasswordDetails: userResetPasswordReducer,
  userLogin: userLoginReducer,
  userLogout: userLogoutReducer,
  userRegister: userRegisterReducer,
  userViewProfile: userViewProfileReducer,
  userUpdateProfileDetails: userUpdateProfileReducer
};

export default authReducerMap;