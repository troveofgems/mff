import {
  userLoginReducer,
  userLogoutReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userViewProfileReducer
} from '../services/auth.reducer';

const authReducerMap = {
  userLogin: userLoginReducer,
  userLogout: userLogoutReducer,
  userRegister: userRegisterReducer,
  userViewProfile: userViewProfileReducer,
  userUpdateProfileDetails: userUpdateProfileReducer
};

export default authReducerMap;