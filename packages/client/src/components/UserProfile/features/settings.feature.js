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

const SettingsFeature = () => {
  const deleteMessage = 'Do you want to continue with deleting your account?',
    inactivateMessage = 'Do you want to continue with inactivating your account?';

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
                                Configure Your Settings
                              </h2>
                              <div className="section-title-separator">{}</div>
                            </div>
                            {formMessage && (
                              <Notification variant={formMessageType}>
                                {formMessage}
                              </Notification>
                            )}
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
      <div>
        <h2 className={"text-black"}>Recoverable Actions</h2>
        <button
          type="button" className="button bg-warning text-black full login-btn mb-2"
          onClick={() => prompt(inactivateMessage)}
        >
          Inactivate My Account
        </button>
        <div className={"mb-5"}>
          <small className={"text-black"}>
            To understand the full implications of inactivating your account, please see our policy <a href={"#"}>here</a>.
          </small>
        </div>
      </div>
      <div>
        <h2 className={"text-black"}>Irrecoverable Actions</h2>
        <button
          type="button" className="button bg-danger text-white full login-btn mb-2"
          onClick={() => prompt(deleteMessage)}
        >
          Delete My Account
        </button>
        <div>
          <small className={"text-black"}>
            To understand the full implications of deleting your account, please see our policy <a href={"#"}>here</a>.
          </small>
        </div>
      </div>
    </>
  )
}

export default SettingsFeature;