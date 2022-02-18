import React, { useState, useEffect } 	from 'react';
import { useDispatch, useSelector } from "react-redux";
// Formik Imports
import {Form, Formik} from "formik";
import FormikTextInput from "../../../formik/textInput";
import FormikCheckbox from "../../../formik/checkbox";
import FormikRadioGroup from "../../../formik/radioGroup";

import Loader from "../../layout/Loader";
import Notification from "../../layout/Notification";

import {
  EMAIL_MAX_LEN, EMAIL_MIN_LEN,
  PASSWORD_MAX_LEN, PASSWORD_MIN_LEN
} from "../../Authentication/validation/formik.validation.constants";

import {getLoggedInUserProfile, updateUserProfile} from "../../../redux/actions/auth.actions";

import {userProfile_loginSchema} from '../schema/formSchematics';
import formikUPLoginValidationSchema from '../validation/formik.upLogin.validationSchema';

const LoginFeature = () => {
  const
    [formValues, setFormValues] = useState(userProfile_loginSchema),
    dispatch = useDispatch(),
    userViewProfile = useSelector(state => state.userViewProfile),
    userUpdateProfileDetails = useSelector(state => state.userUpdateProfileDetails),
    [formMessage, setFormMessage] = useState(null),
    [formMessageType, setFormMessageType] = useState(null),
    {loading: loadingProfile, error: viewProfileError, success: viewProfileSuccess, user} = userViewProfile,
    {success: userUpdateProfileDetailsSuccess} = userUpdateProfileDetails;

  useEffect(() => {
    dispatch(getLoggedInUserProfile());
  }, [dispatch]);
  useEffect(() => {
    if (viewProfileSuccess) {
      let prefilledSchema = createPrefillSchema(user, userProfile_loginSchema);
      setFormValues(prefilledSchema);
    }
  }, [viewProfileSuccess]);
  useEffect(() => {
    if(userUpdateProfileDetailsSuccess) {
      setFormMessage('Your Profile Has Successfully Been Updated!');
      setFormMessageType('success');
    }
  }, [userUpdateProfileDetailsSuccess]);

  const createPrefillSchema = (prefillData, schema) => {
    schema.updateRegistrationId = prefillData._id;
    schema.immutablePendingEmail = prefillData.placeholderEmail;
    schema.awaitingEmailVerification = prefillData.awaitingEmailVerification;
    schema.immutableCurrentEmail = prefillData.currentEmail;
    schema.update_pwd_type = prefillData.pwdType;
    schema.update_sessionLength = prefillData.authTokenType;
    setFormValues(schema);
    return schema;
  };
  const processChanges = (formikValues, user) => {
    let preprocessedUpdates = {};

    preprocessedUpdates.update_registrationId = user._id;

    // Three Main Possible Updates To Make
    let userMadeAnEmailUpdate =
      formikValues.update_email !== user.currentEmail && formikValues.update_email.length !== 0;

    if (userMadeAnEmailUpdate) {
      preprocessedUpdates.update_email = true;
      preprocessedUpdates.placeholderEmail = formikValues.update_email;
      preprocessedUpdates.awaitingEmailVerification = true;
    }
    if (formikValues.showChangePasswordSection) {
      preprocessedUpdates.update_password = formikValues.update_pwd;
      preprocessedUpdates.old_password =  formikValues.old_pwd;
      preprocessedUpdates.password = formikValues.update_pwd;
      preprocessedUpdates.pwdType = parseInt(formikValues.update_pwd_type);
    }
    if (formikValues.showChangeSessionLengthSection) {
      preprocessedUpdates.authTokenType = formikValues.update_sessionLength;
    }
    return preprocessedUpdates;
  };
  const resetNotification = () => {
    setTimeout(() => {
      setFormMessageType(null);
      setFormMessage(null);
    }, 3000);
  };

  return (
    <>
      <div className={"formikFormWrapper"} style={{minWidth: '1200px'}}>
        <Formik
          initialValues={formValues} enableReinitialize
          validationSchema={formikUPLoginValidationSchema}
          onSubmit={async (formData, {setSubmitting, resetForm}) => {
            let updates = processChanges(formData, user);
            if (Object.keys(updates).length <= 1) { return; }
            setSubmitting(true);
            await dispatch(updateUserProfile(updates));
            await dispatch(getLoggedInUserProfile());
            setFormValues(createPrefillSchema(user, userProfile_loginSchema));
            resetForm(); // Clean Formik Values
            setSubmitting(false);
            resetNotification();
          }}
        >
          {formik => (
            <>
              {formik.isSubmitting ? (
                  <>
                    <Loader/>
                  </>
              ) : (
                <>
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
                                    <div className={"w-100 m-auto text-center"}>
                                      {formMessage}
                                    </div>
                                  </Notification>
                                )}
                                <div className="form-wrap">
                                  <div className="form-row mt-3">
                                    <h2>Email</h2>
                                    <div className="form-item registration-form-item mb-2">
                                      <FormikTextInput
                                        label='Current Email Address'
                                        id={'immutableCurrentEmail'} name={'immutableCurrentEmail'}
                                        type='email' readOnly disabled
                                      />
                                    </div>
                                    {
                                      formik.values.awaitingEmailVerification && (
                                        <div className="form-item registration-form-item mb-2">
                                          <FormikTextInput
                                            label='New Email Pending Verification'
                                            id={'immutablePendingEmail'} name={'immutablePendingEmail'}
                                            type='email' readOnly disabled
                                          />
                                        </div>
                                      )}
                                    <div className="form-item registration-form-item">
                                      <FormikTextInput
                                        label='New Email Address'
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
                                      id={"showChangePasswordSection"} name={"showChangePasswordSection"}
                                    />
                                    {(formik.values.showChangePasswordSection) && (
                                      <>
                                        <div>
                                          <h3>Password Type</h3>
                                          <FormikRadioGroup
                                            label={"Which Password Type Do You Prefer?"}
                                            name={"update_pwd_type"}
                                            options={[{valueLabel: "Standard"}, {valueLabel: "Kebab"}]}
                                            idPrefix={"passwordType"}
                                            currentlySelectedOption={formik.values.update_pwd_type}
                                          />
                                          <h4 className={"m-1 mt-3"}>
                                            Requirements
                                          </h4>
                                          <small>
                                            {parseInt(formik.values.update_pwd_type) === 0 && (
                                              <>
                                                <p className={"m-2"}>
                                                  Your password must be between 8-32 ASCII Characters and contain some
                                                  combination of alpha-numeric and special characters.
                                                </p>
                                                <div style={{width: '50%'}} className={"text-center"}>
                                                  <h5
                                                    className={"m-2 text-decoration-underline text-center"}>Example</h5>
                                                  <h6 className={"m-2 text-center"}>a1e5*s6n</h6>
                                                </div>
                                              </>
                                            )}
                                            {parseInt(formik.values.update_pwd_type) === 1 && (
                                              <>
                                                <p className={"m-2"}>
                                                  Your password must contain at least 4 kebab-case strings with at least
                                                  one
                                                  (1) number.
                                                </p>
                                                <div style={{width: '50%'}} className={"text-center"}>
                                                  <h5
                                                    className={"m-2 text-decoration-underline text-center"}>Example</h5>
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
                                              id={'old_pwd'} name={'old_pwd'}
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
                                              id={'update_pwd_confirmation'} name={'update_pwd_confirmation'}
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
                                        id={"showChangeSessionLengthSection"} name={"showChangeSessionLengthSection"}
                                      />
                                      {formik.values.showChangeSessionLengthSection && (
                                        <>
                                          <div>
                                            <div>
                                              <h6>Recommendations</h6>
                                              <small>
                                                The higher the security, the more potentially unfriendly User Experience
                                                (UX).
                                                Security is important and yielded higher priority. You're welcome to
                                                loosen some
                                                controls: though we do not recommend it.
                                              </small>
                                            </div>
                                            <h5 className={"mt-3"}>
                                              Available Methods
                                            </h5>
                                            <FormikRadioGroup
                                              label={""}
                                              name={"update_sessionLength"}
                                              options={[{valueLabel: "Default"}, {valueLabel: "Advanced"}]}
                                              idPrefix={"authTokenType"}
                                              currentlySelectedOption={parseInt(formik.values.update_sessionLength)}
                                            />
                                            <div className={"authTokenSettingsContainer"} style={{width: '50%'}}>
                                              <h5 className={"mt-3 text-center text-decoration-underline"}>
                                                Login Session Life-time
                                              </h5>
                                              <h6 className={"mt-1 text-center"}>
                                                {parseInt(formik.values.update_sessionLength) === 0 && (
                                                  <>
                                                    <div>3</div>
                                                    THREE HOURS
                                                  </>
                                                )}
                                                {parseInt(formik.values.update_sessionLength) === 1 && (
                                                  <>
                                                    <div>6</div>
                                                    SIX HOURS
                                                  </>
                                                )}
                                              </h6>
                                              {parseInt(formik.values.update_sessionLength) === 1 && (
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
                </>
              )}
            </>
          )}
        </Formik>
      </div>
    </>
  )
}

export default LoginFeature;