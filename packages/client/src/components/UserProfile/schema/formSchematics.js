let
  userProfile_loginSchema = {
      updateRegistrationId: null, // User Id
      // Email
      requestEmailChange: false,
      awaitingEmailVerification: false,
      immutableCurrentEmail: '',
      immutablePendingEmail: '',
      update_email: '',
      // Password
      showChangePasswordSection: false,
      update_pwd_type: 0,
      old_pwd: '',

      update_pwd: '',
      update_pwd_confirmation: '',
      // Authentication Type
      showChangeSessionLengthSection: false,
      update_sessionLength: 0
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