import React, { useState, useEffect } 	from 'react';
import { useDispatch, useSelector } from "react-redux";
// Formik
import {Form, Formik} from "formik";
import FormikTextInput from "../../../formik/textInput";
import FormikDropdown from "../../../formik/dropdown";
import FormikCheckbox from "../../../formik/checkbox";

import Notification from "../../layout/Notification";
import Loader from "../../layout/Loader";

import {
  FIRST_NAME_MAX_LEN, FIRST_NAME_MIN_LEN,
  LAST_NAME_MAX_LEN, LAST_NAME_MIN_LEN
} from "../../Authentication/validation/formik.validation.constants";

import {getLoggedInUserProfile, updateUserProfile} from "../../../redux/actions/auth.actions";
import {userProfile_loginSchema, userProfile_profileSchema} from '../schema/formSchematics';
import formikUPProfileValidationSchema from '../validation/formik.upProfile.validationSchema';

const monthList = require('../../../data/monthList.json');

const ProfileFeature = () => {
  const
    [formValues, setFormValues] = useState(userProfile_profileSchema),
    [formMessage, setFormMessage] = useState(null),
    [formMessageType, setFormMessageType] = useState(null),
    dispatch = useDispatch(),
    userViewProfile = useSelector(state => state.userViewProfile),
    userUpdateProfileDetails = useSelector(state => state.userUpdateProfileDetails),
    {loading: loadingProfile, error: viewProfileError, success: viewProfileSuccess, user} = userViewProfile,
    {success: userUpdateProfileDetailsSuccess} = userUpdateProfileDetails;

  useEffect(() => {
    dispatch(getLoggedInUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (viewProfileSuccess) {
      let prefilledSchema = createPrefillSchema(user, userProfile_profileSchema);
      return setFormValues(prefilledSchema);
    }
  }, [viewProfileSuccess]);
  useEffect(() => {
    if(userUpdateProfileDetailsSuccess) {
      setFormMessage('Your Profile Has Successfully Been Updated!');
      setFormMessageType('success');
    }
  }, [userUpdateProfileDetailsSuccess]);


  const createPrefillSchema = (prefillData, schema) => {
    schema.update_firstName = prefillData.firstName;
    schema.update_lastName = prefillData.lastName;
    schema.update_birth_month = prefillData.birthMonth;
    schema.update_remember_my_address = prefillData.rememberMyAddress;
    schema.update_registrationId = prefillData._id;
    schema.update_createdAccountTS = new Date(prefillData.createdAt).toString();
    schema.update_lastModifiedAccountTS = prefillData.updatedAt;
    return schema;
  };
  const processChanges = (formikValues, user) => {
    let preprocessedUpdates = {};

    preprocessedUpdates.update_registrationId = user._id;

    // Four Possible Updates To Make
    if (formikValues.update_firstName !== user.firstName) {
      preprocessedUpdates.firstName = formikValues.update_firstName;
    }
    if (formikValues.update_lastName !== user.lastName) {
      preprocessedUpdates.lastName = formikValues.update_lastName;
    }
    if (formikValues.update_birth_month !== user.birthMonth) {
      preprocessedUpdates.birthMonth = parseInt(formikValues.update_birth_month);
    }
    if (formikValues.update_remember_my_address !== user.rememberMyAddress) {
      preprocessedUpdates.rememberMyAddress = formikValues.update_remember_my_address;
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
          initialValues={(formValues)}
          validationSchema={formikUPProfileValidationSchema}
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
          enableReinitialize
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
                                    Update Your Profile
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
                                  <div className={"form-row mt-3"}>
                                    <h2>Your Name</h2>
                                    <div className={"row"}>
                                      <div className={"col-md-6 col-sm-12"} style={{overflow: 'hidden'}}>
                                        <div className="form-row">
                                          <div className="form-item registration-form-item">
                                            <FormikTextInput
                                              label='First Name'
                                              id={'update_firstName'} name={'update_firstName'}
                                              type='text' placeholder='Your First Name Here...'
                                              minLength={FIRST_NAME_MIN_LEN} maxLength={FIRST_NAME_MAX_LEN}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className={"col-md-6 col-sm-12"} style={{overflow: 'hidden'}}>
                                        <div className="form-row">
                                          <div className="form-item registration-form-item">
                                            <FormikTextInput
                                              label='Last Name'
                                              id={'update_lastName'} name={'update_lastName'}
                                              type='text' placeholder='Your Last Name Here...'
                                              minLength={LAST_NAME_MIN_LEN} maxLength={LAST_NAME_MAX_LEN}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className={"form-row mt-3"}>
                                    <h2>Your Birth Month</h2>
                                    <div className={"row"} style={{width: '50%'}}>
                                      <FormikDropdown
                                        name={"update_birth_month"}
                                        label={"Birth Month"} options={monthList}
                                      />
                                    </div>
                                  </div>

                                  <div className={"form-row mt-3"}>
                                    <h2>Address</h2>
                                    <FormikCheckbox
                                      children={"Remember My Shipping For Future Checkouts"}
                                      id={"update_remember_my_address"}
                                      name={"update_remember_my_address"}
                                    />
                                    {formik.values.update_remember_my_address && (
                                      <small className={"text-black"}>
                                        <div>
                                          By enabling this option, you will allow this application to direct your browser
                                          to store your address information by using your own browser's storage
                                          engine. This means that once you fill out the shipping form (at least one more time)
                                          , your address will be saved to your browser, and loaded from your browser to the
                                          shipping form on future checkouts. Please note: clearing your browser history and/or
                                          cache may also clear your address and this method may not prove reliable.
                                          Learn more about why we dont use cookies
                                          <a href={"https://www.globalsign.com/en/blog/death-cookie"}>here</a>.
                                        </div>
                                      </small>
                                    )}
                                  </div>

                                  <div className="form-row mt-3">
                                    <h2>Immutable Information</h2>
                                    <div className="form-item registration-form-item">
                                      <FormikTextInput
                                        label='Registration Id'
                                        id={'update_registrationId'} name={'update_registrationId'}
                                        type='text' readOnly disabled
                                      />
                                    </div>
                                    <div className={"row"}>
                                      <div className={"col-md-6 col-sm-12"} style={{overflow: 'hidden'}}>
                                        <div className="form-item registration-form-item mt-3">
                                          <FormikTextInput
                                            label='Account Created On'
                                            id={'update_createdAccountTS'} name={'update_createdAccountTS'}
                                            type='text' readOnly disabled
                                          />
                                        </div>
                                      </div>
                                      <div className={"col-md-6 col-sm-12"} style={{overflow: 'hidden'}}>
                                        <div className="form-item registration-form-item mt-3">
                                          <FormikTextInput
                                            label='Last Modified On'
                                            id={'update_lastModifiedAccountTS'} name={'update_lastModifiedAccountTS'}
                                            type='text' readOnly disabled
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-actions full py-4 pb-4">
                                    <button
                                      type="submit" className="button text-black full login-btn"
                                      disabled={
                                        !formik.isValid || formik.isSubmitting
                                      }
                                    >
                                      Update Profile Information
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

export default ProfileFeature;