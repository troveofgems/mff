let
  userProfile_loginSchema = {
    update_registrationId: null, // User Id
    // Email
    requestEmailChange: false,
    awaitingEmailVerification: false,
    immutable_current_email: 'No Data Available',
    update_email: '',
    // Password
    old_password: '',
    update_password: false,
    update_password_type: 0,
    update_pwd: '',
    update_pwd_repeat: '',
    // Authentication Type
    update_authenticationType: false,
    update_authTokenType: 0
  };

let
  userProfile_profileSchema = {
    update_registrationId: 'First Render - Empty Form',
    update_createdAccountTS: 'First Render - Empty Form',
    update_lastModifiedAccountTS: 'First Render - Empty Form',
    update_firstName: 'First Render - Empty Form',
    update_lastName: 'First Render - Empty Form',
    update_birth_month: 12,
    update_remember_my_address: false
  };

export { userProfile_loginSchema, userProfile_profileSchema };