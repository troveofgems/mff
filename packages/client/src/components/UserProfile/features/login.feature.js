import React, { useState, useEffect } 	from 'react';
import { useDispatch, useSelector } from "react-redux";

import Notification from "../../layout/Notification";
import Loader from "../../layout/Loader";
import {Form, Formik} from "formik";
import FormikTextInput from "../../../formik/textInput";
import {
  EMAIL_MAX_LEN,
  EMAIL_MIN_LEN,
  FIRST_NAME_MAX_LEN,
  FIRST_NAME_MIN_LEN, LAST_NAME_MAX_LEN,
  LAST_NAME_MIN_LEN, PASSWORD_MAX_LEN, PASSWORD_MIN_LEN
} from "../../Authentication/validation/formik.validation.constants";
import FormikCheckbox from "../../../formik/checkbox";
import FormikRadioGroup from "../../../formik/radioGroup";
import {useNavigate} from "react-router-dom";
import {getLoggedInUserProfile} from "../../../redux/actions/auth.actions";

const LoginFeature = () => {
  const
    [showChangePassword, setShowChangePassword] = useState(false),
    [showPrefilledForm, setShowPrefilledForm] = useState(true),
    [formValues, setFormValues] = useState(null),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    userProfileDetails = useSelector(state => state.userUpdateProfileDetails),
    userLogin = useSelector(state => state.userLogin),
    userViewProfile = useSelector(state => state.userViewProfile),
    [formMessage, setFormMessage] = useState(null),
    [formMessageType, setFormMessageType] = useState(null),
    {loading: loadingProfile, error: viewProfileError, success: viewProfileSuccess, user} = userViewProfile,
    {auth} = userLogin;

  let
    baseSchema = {
      update_registrationId: 'First Render - Empty Form',
      update_createdAccountTS: 'First Render - Empty Form',
      update_lastModifiedAccountTS: 'First Render - Empty Form',
      update_firstName: 'First Render - Empty Form',
      update_lastName: 'First Render - Empty Form',
      update_email: 'First Render - Empty Form',
      update_password_type: '0',
      update_authtoken_type: '0'
    },
    savedDataSchema = {
      update_registrationId: 'Manually Loaded Data',
      update_createdAccountTS: 'Manually Loaded Data',
      update_lastModifiedAccountTS: 'Manually Loaded Data',
      update_firstName: 'Manually Loaded Data',
      update_lastName: 'Manually Loaded Data',
      update_email: 'Manually Loaded Data',
      update_password_type: '0',
      update_authtoken_type: '0'
    };

  useEffect(() => {
    dispatch(getLoggedInUserProfile());
  }, []);

  useEffect(() => {
    if (viewProfileSuccess) {
      console.log('Successfully retrieved User Profile');
      let prefilledSchema = createPrefillSchema(user);
      return setFormValues(prefilledSchema);
    }
  }, [viewProfileSuccess]);

  /*  const handlePasswordChangeView = () => {
      console.log('I was clicked!');
      //return setShowChangePassword(!showChangePassword);
    };*/

  const createPrefillSchema = prefillData => {
    return {
      update_registrationId: prefillData._id,
      update_createdAccountTS: prefillData.createdAt,
      update_lastModifiedAccountTS: prefillData.updatedAt,
      update_firstName: prefillData.firstName,
      update_lastName: prefillData.lastName,
      update_email: prefillData.email,
      update_password_type: '0',
      update_authtoken_type: '0'
    };
  };

  const manuallyLoadData = () => {
    console.log('Running Manually Load Data');
    return setFormValues(savedDataSchema);
  };

  return (
    <>
      <div className={"formikFormWrapper"} style={{minWidth: '1200px'}}>
        {!showPrefilledForm ? (
          <Loader/>
        ) : (
          <Formik
            initialValues={formValues || baseSchema}
            //validationSchema={formikRegisterValidationSchema}
            onSubmit={async (formData, {setSubmitting}) => {
              setSubmitting(true);
              console.log('Form Submit', formData);
              //await dispatch(updateUserProfile(formData));
              setSubmitting(false);
            }}
            enableReinitialize
          >
            {formik => (
              <Form className='form-box form-wrap'>
                <div className="grid-limit">
                  <div className="grid2-1col centered">
                    <div id="" className="tab-wrap">
                      <div className="tab-body">
                        <div className="tab-item" style={{display: 'block'}}>
                          <div className="form-box">
                            <div className="section-title-wrap blue">
                              <h2 className="section-title medium text-black text-center">
                                Update Your Login Information
                              </h2>
                              <div className="section-title-separator">{}</div>
                            </div>
                            {formMessage && (
                              <Notification variant={formMessageType}>
                                {formMessage}
                              </Notification>
                            )}
                            <div className="form-wrap">
                              <div className="form-row mt-3">
                                <h2>Email</h2>
                                <div className="form-item registration-form-item mb-2">
                                  <FormikTextInput
                                    label='Current Email Address'
                                    id={'update_email'} name={'update_email'}
                                    type='email' placeholder='Your New Email Here...'
                                    readOnly disabled
                                  />
                                </div>
                                <div className="form-item registration-form-item">
                                  <FormikTextInput
                                    label='Email Address'
                                    id={'update_email'} name={'update_email'}
                                    type='email' placeholder='Your New Email Here...'
                                    minLength={EMAIL_MIN_LEN} maxLength={EMAIL_MAX_LEN}
                                  />
                                </div>
                              </div>
                              <div className={"form-row mt-3"}>
                                <h2>Change Password</h2>
                                <FormikCheckbox
                                  children={"Change My Password"}
                                  id={"update_password"}
                                  name={"update_password"}
                                />
                                {(formik.values.update_password === true) && (
                                  <>
                                    <div>
                                      <h3>Password Type</h3>
                                      <FormikRadioGroup
                                        label={"Which Password Type Do You Prefer?"}
                                        name={"update_password_type"}
                                        options={[{valueLabel: "Standard"}, {valueLabel: "Kebab"}]}
                                        idPrefix={"passwordType"}
                                        currentlySelectedOption={formik.values.update_password_type}
                                      />
                                      <h4 className={"m-1 mt-3"}>
                                        Requirements
                                      </h4>
                                      <small>
                                        {formik.values.update_password_type === '0' && (
                                          <>
                                            <p className={"m-2"}>
                                              Your password must be between 8-32 ASCII Characters and contain some
                                              combination of alpha-numeric and special characters.
                                            </p>
                                            <div style={{width: '50%'}} className={"text-center"}>
                                              <h5 className={"m-2 text-decoration-underline text-center"}>Example</h5>
                                              <h6 className={"m-2 text-center"}>a1e5*s6n</h6>
                                            </div>
                                          </>
                                        )}
                                        {formik.values.update_password_type === '1' && (
                                          <>
                                            <p className={"m-2"}>
                                              Your password must contain at least 4 kebab-case strings with at least one
                                              (1) number.
                                            </p>
                                            <div style={{width: '50%'}} className={"text-center"}>
                                              <h5 className={"m-2 text-decoration-underline text-center"}>Example</h5>
                                              <h6 className={"m-2 text-center"}>test-variance0-asnZfTY-fancy</h6>
                                            </div>
                                          </>
                                        )}
                                      </small>
                                    </div>
                                    <div className="form-row">
                                      <div className="form-item registration-form-item">
                                        <FormikTextInput
                                          label='Old Password'
                                          id={'confirmation_pwd'} name={'confirmation_pwd'}
                                          type='password' placeholder='Your Old Password Here...'
                                          minLength={PASSWORD_MIN_LEN} maxLength={PASSWORD_MAX_LEN}
                                        />
                                      </div>
                                    </div>
                                    <div className="form-row">
                                      <div className="form-item registration-form-item">
                                        <FormikTextInput
                                          label='New Password'
                                          id={'update_pwd'} name={'update_pwd'}
                                          type='password' placeholder='Your New Password Here...'
                                          minLength={PASSWORD_MIN_LEN} maxLength={PASSWORD_MAX_LEN}
                                        />
                                      </div>
                                    </div>
                                    <div className="form-row pb-3">
                                      <div className="form-item registration-form-item">
                                        <FormikTextInput
                                          label='Repeat New Password'
                                          id={'update_pwd_repeat'} name={'update_pwd_repeat'}
                                          type='password' placeholder='Retype Your New Password Here...'
                                          minLength={PASSWORD_MIN_LEN} maxLength={PASSWORD_MAX_LEN}
                                        />
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="form-wrap">
                                <div className={"form-row mt-3"}>
                                  <h2>Authentication Settings</h2>
                                  <FormikCheckbox
                                    children={"Change the length of my login sessions"}
                                    id={"update_authenticationType"}
                                    name={"update_authenticationType"}
                                  />
                                  {(formik.values.update_authenticationType === true) && (
                                    <>
                                      <div>
                                        <div>
                                          <h6>Recommendations</h6>
                                          <small>
                                            The higher the security, the more potentially unfriendly User Experience (UX).
                                            Security is important and yielded higher priority. You're welcome to loosen some
                                            controls: though we do not recommend it.
                                          </small>
                                        </div>
                                        <h5 className={"mt-3"}>
                                          Available Methods
                                        </h5>
                                        <FormikRadioGroup
                                          label={""}
                                          name={"update_authtoken_type"}
                                          options={[{valueLabel: "Default"}, {valueLabel: "Advanced"}]}
                                          idPrefix={"authTokenType"}
                                          currentlySelectedOption={formik.values.update_authtoken_type}
                                        />
                                        <div className={"authTokenSettingsContainer"} style={{width: '50%'}}>
                                          <h5 className={"mt-3 text-center text-decoration-underline"}>
                                            Login Session Life-time
                                          </h5>
                                          <h6 className={"mt-1 text-center"}>
                                            {formik.values.update_authtoken_type === '0' && (
                                              <>
                                                (3) THREE HOURS
                                              </>
                                            )}
                                            {formik.values.update_authtoken_type === '1' && (
                                              <>
                                                (6) SIX HOURS
                                              </>
                                            )}
                                          </h6>
                                          {formik.values.update_authtoken_type === '1' && (
                                            <>
                                              ** <strong>Not Recommended</strong>
                                              <small>
                                                , but available for your convenience. Selecting this override places
                                                certain security factors into your own hands per our
                                                <a href={"#"}>{' '}Privacy Policy</a>.
                                              </small>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="form-actions full py-4 pb-4">
                                <button
                                  type="submit" className="button text-black full login-btn"
                                  disabled={!formik.isValid || formik.isSubmitting}
                                >
                                  Update Login Information
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  )
}

export default LoginFeature;