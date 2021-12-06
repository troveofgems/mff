export const forgotPasswordFormSchema = {
  forgotPassword_email: ''
};

export const loginFormSchema = {
  login_email: 	'',
  login_pwd: 		''
};

export const registrationFormSchema = {
  register_firstName: 								'',
  register_lastName: 									'',
  register_email: 										'',
  register_username: 									'',
  register_pwd: 											'',
  register_pwd_repeat: 								'',
  register_dateOfBirth: 							'',
  register_ageConfirmation: 					false,
  register_privacyPolicyConfirmation: false,
  register_termsOfUseConfirmation: 		false
};