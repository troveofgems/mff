import React, { useState, useEffect } 	from 'react';
import { useDispatch, useSelector } from "react-redux";

import Notification from "../../layout/Notification";
import Loader from "../../layout/Loader";
import {Form, Formik} from "formik";
import FormikTextInput from "../../../formik/textInput";
import {
  FIRST_NAME_MAX_LEN, FIRST_NAME_MIN_LEN,
  LAST_NAME_MAX_LEN, LAST_NAME_MIN_LEN,
  BIRTH_MONTH_MAX_LEN, BIRTH_YEAR_MIN_LEN
} from "../../Authentication/validation/formik.validation.constants";

import {useNavigate} from "react-router-dom";
import {getLoggedInUserProfile} from "../../../redux/actions/auth.actions";
import FormikDropdown from "../../../formik/dropdown";
import AddressWidget from "../../Address/widgets/address.widget";

const monthList = require('../../../data/monthList.json');

const ProfileFeature = () => {
  const
    [showPrefilledForm, setShowPrefilledForm] = useState(true),
    [formValues, setFormValues] = useState(null),
    dispatch = useDispatch(),
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

  const createPrefillSchema = prefillData => {
    return {
      update_registrationId: prefillData._id,
      update_createdAccountTS: new Date(prefillData.createdAt).toString(),
      update_lastModifiedAccountTS: prefillData.updatedAt,
      update_firstName: prefillData.firstName,
      update_lastName: prefillData.lastName,
      update_birth_month: prefillData.birthMonth
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
                                Update Your Profile
                              </h2>
                              <div className="section-title-separator">{}</div>
                            </div>
                            {formMessage && (
                              <Notification variant={formMessageType}>
                                {formMessage}
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
                                <div className={"row"}>
                                  <div className={"col-md-6 col-sm-12"} style={{overflow: 'hidden'}}>
                                    <AddressWidget widgetTitle={"Mailing"} children={(
                                      <button
                                        type="submit" className="button text-black full login-btn"
                                        disabled={!formik.isValid || formik.isSubmitting}
                                      >
                                        Update Mailing Address
                                      </button>
                                    )}/>
                                  </div>
                                  <div className={"col-md-6 col-sm-12"} style={{overflow: 'hidden'}}>
                                    <AddressWidget widgetTitle={"Billing"} />

                                  </div>
                                </div>
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
                                  disabled={!formik.isValid || formik.isSubmitting}
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
            )}
          </Formik>
        )}
      </div>
    </>
  )
}

export default ProfileFeature;