import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';

// Formik Specific Imports
import {Formik, Form} from "formik";
import FormikDropdown from "../../../formik/dropdown";
import FormikTextInput from "../../../formik/textInput";
import { registrationFormSchema } from "../schema/formSchematics";
import formikRegisterValidationSchema from "../validation/formik.register.validationSchema";

// Constraint Constants
import {
  EMAIL_MIN_LEN, EMAIL_MAX_LEN,
  FIRST_NAME_MIN_LEN, FIRST_NAME_MAX_LEN,
  LAST_NAME_MIN_LEN, LAST_NAME_MAX_LEN,
  PASSWORD_MIN_LEN, PASSWORD_MAX_LEN
} from "../validation/formik.validation.constants";

// Field Data
import monthList from '../../../data/monthList.json';

import Notification from "../../layout/Notification";
import Loader from "../../layout/Loader";

// Actions and Utils For Component
import { registerUser } from '../../../redux/actions/auth.actions';
import { buildDynamicYearList } from '../../../utils/buildDynamicYearList.utils';

const RegistrationForm = () => {
  const
    dispatch = useDispatch(),
    navigate = useNavigate(),
    userRegister = useSelector(state => state.userRegister),
    userLogin = useSelector(state => state.userLogin),
    [yearList, setYearList] = useState([]),
    [formMessage, setFormMessage] = useState(null),
    [formMessageType, setFormMessageType] = useState(null),
    [showRegistrationForm, setShowRegistrationForm] = useState(true),
    { loading: loadingRegistration, error: registrationError, registrationDetails } = userRegister,
    { auth } = userLogin;

  useEffect(() => { // Request Check
    let yearList = buildDynamicYearList();
    setYearList(yearList);
    if (auth !== null) { // Already Logged-In. Redirect To Home
      navigate({ pathname: `/` })
    }
  }, []);

  useEffect(() => { // Registration Success Message Handler
    if (registrationDetails && registrationDetails.registrationMessage && registrationDetails.registrationStatus) {
      if (registrationDetails.registrationStatus === 201) {
        setFormMessageType('success');
        setFormMessage(registrationDetails.registrationMessage);
        setShowRegistrationForm(false);
      }
    } else {
      setFormMessageType(null);
      setFormMessage(null);
      setShowRegistrationForm(true);
    }
  }, [registrationDetails]);

  useEffect(() => { // Registration Failure Message Handler
    if (registrationError) {
      setFormMessageType('danger');
      setFormMessage(registrationError);
    } else {
      setFormMessageType(null);
      setFormMessage(null);
    }
  }, [registrationError]);

  return (
    <div className={"formikFormWrapper"} style={{minWidth: "1200px"}}>
      {loadingRegistration ? (
        <Loader />
      ) : (
        <Formik
          initialValues={registrationFormSchema}
          validationSchema={formikRegisterValidationSchema}
          onSubmit={async (formData, { setSubmitting }) => {
            setSubmitting(true);
            await dispatch(registerUser(formData));
            setSubmitting(false);
          }}
        >
          <Form className='form-box form-wrap content-wrapper'>
            <div className="grid-limit">
              <div className="grid2-1col centered">
                <div id="" className="tab-wrap">
                  <div className="tab-body">
                    <div className="tab-item" style={{display: 'block'}}>
                      <div className="form-box">
                        <div className="section-title-wrap blue">
                          <h2 className="section-title medium text-black">
                            {(registrationDetails && registrationDetails.registrationMessage) ? (
                              "Congratulations!!"
                            ) : (
                              "Register For An Account!"
                            )}
                          </h2>
                          <div className="section-title-separator">{}</div>
                        </div>
                        {formMessage && (
                          <Notification variant={formMessageType}>
                            {formMessage}
                          </Notification>
                        )}
                        {showRegistrationForm && (
                          <div className="form-wrap">
                            <div className="form-row">
                              <div className="form-item registration-form-item">
                                <FormikTextInput
                                  label='First Name'
                                  id={'register_firstName'} name={'register_firstName'}
                                  type='text' placeholder='Your First Name Here...'
                                  minLength={FIRST_NAME_MIN_LEN} maxLength={FIRST_NAME_MAX_LEN}
                                />
                              </div>
                            </div>

                            <div className="form-row">
                              <div className="form-item registration-form-item">
                                <FormikTextInput
                                  label='Last Name'
                                  id={'register_lastName'} name={'register_lastName'}
                                  type='text' placeholder='Your Last Name Here...'
                                  minLength={LAST_NAME_MIN_LEN} maxLength={LAST_NAME_MAX_LEN}
                                />
                              </div>
                            </div>

                            <div className="form-row">
                              <div className="form-item registration-form-item">
                                <FormikTextInput
                                  label='Email Address'
                                  id={'register_email'} name={'register_email'}
                                  type='email' placeholder='Your Email Here...'
                                  minLength={EMAIL_MIN_LEN} maxLength={EMAIL_MAX_LEN}
                                />
                              </div>
                            </div>

                            <div className="form-row">
                              <div className="form-item registration-form-item">
                                <FormikDropdown
                                  name={"register_birth_month"} label={"Birth Month"}
                                  options={monthList}
                                />
                                <small className={"text-black"} style={{display: "block", width: "60%", margin: ".5rem auto"}}>
                                  <i className={"fas fa-info-circle"} />{' '}
                                  <span>
                                    Help us get to know you: we'll send you discounts, coupons, and prizes
                                    at the arrival of your birth month!
                                  </span>{' '}🎂{' '}🎉
                                </small>
                              </div>
                            </div>

                            <div className="form-row">
                              <div className="form-item registration-form-item">
                                <FormikDropdown
                                  name={"register_birth_year"} label={"Birth Year"}
                                  options={yearList}
                                />
                                <small className={"text-black"} style={{display: "block", width: "60%", margin: ".5rem auto"}}>
                                  <i className={"fas fa-info-circle"} />{' '}
                                  Your birth year will not be stored as part of your user account data. This is
                                  for anonymous statistics only.
                                </small>
                              </div>
                            </div>

                            <div className="form-row">
                              <div className="form-item registration-form-item">
                                <FormikTextInput
                                  label='Password'
                                  id={'register_pwd'} name={'register_pwd'}
                                  type='password' placeholder='Your Password Here...'
                                  minLength={PASSWORD_MIN_LEN} maxLength={PASSWORD_MAX_LEN}
                                />
                              </div>
                            </div>

                            <div className="form-row pb-3">
                              <div className="form-item registration-form-item">
                                <FormikTextInput
                                  label='Repeat Password'
                                  id={'register_pwd_repeat'} name={'register_pwd_repeat'}
                                  type='password' placeholder='Retype Your Password Here...'
                                  minLength={PASSWORD_MIN_LEN} maxLength={PASSWORD_MAX_LEN}
                                />
                              </div>
                            </div>
                            <div className="form-row pb-3">
                              <small className={"text-black"}>
                                <i className={"fas fa-info-circle"} />{' '}
                                By creating an account, you agree to our terms of use, privacy policy, and general
                                disclaimers of site use.
                              </small>
                            </div>
                            <div className="form-actions full py-4 pb-4">
                              <button type="submit" className="button text-black full login-btn">
                                Create your account!
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default RegistrationForm;