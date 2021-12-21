import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from "formik";

// Formik Specific Imports
import {registrationFormSchema} 			from "../schema/formSchematics";
import formikRegisterValidationSchema from "../validation/formik.register.validationSchema";
import FormikTextInput	from "../../../formik/textInput";

// Constants
import {
  EMAIL_MIN_LEN, EMAIL_MAX_LEN,
  FIRST_NAME_MIN_LEN, FIRST_NAME_MAX_LEN,
  LAST_NAME_MIN_LEN, LAST_NAME_MAX_LEN,
  PASSWORD_MIN_LEN, PASSWORD_MAX_LEN
} from "../validation/formik.validation.constants";

import {
  registerUser
} from '../../../redux/actions/auth.actions'
import Notification from "../../layout/Notification";
import Loader from "../../layout/Loader";
import FormikDropdown from "../../../formik/dropdown";

const RegistrationForm = () => {
  const
    dispatch = useDispatch(),
    navigate = useNavigate(),
    userRegister = useSelector(state => state.userRegister),
    userLogin = useSelector(state => state.userLogin),
    [formMessage, setFormMessage] = useState(null),
    [formMessageType, setFormMessageType] = useState(null),
    [showRegistrationForm, setShowRegistrationForm] = useState(true),
    { loading: loadingRegistration, error: registrationError, registrationDetails } = userRegister,
    { auth } = userLogin;

  useEffect(() => { // Request Check
    if (auth !== null) { // Already Logged-In. Redirect To Home
      navigate({ pathname: `/` })
    }
    buildYearList();
    console.log(yearList);
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

  const monthList = [
    {
      id: 1,
      label: "January",
      value: "jan"
    },
    {
      id: 2,
      label: "February",
      value: "feb"
    },
    {
      id: 3,
      label: "March",
      value: "mar"
    },
    {
      id: 4,
      label: "April",
      value: "apr"
    },
    {
      id: 5,
      label: "May",
      value: "may"
    },
    {
      id: 6,
      label: "June",
      value: "june"
    },
    {
      id: 7,
      label: "July",
      value: "jul"
    },
    {
      id: 8,
      label: "August",
      value: "aug"
    },
    {
      id: 9,
      label: "September",
      value: "sep"
    },
    {
      id: 10,
      label: "October",
      value: "oct"
    },
    {
      id: 11,
      label: "November",
      value: "nov"
    },
    {
      id: 12,
      label: "December",
      value: "dec"
    }
  ];
  const yearList = [];
  const buildYearList = beginAtYear => {
    const limit = beginAtYear || 105;
    for (let i = 0; i < limit; i += 1) {
      if (i >= 12) {
        let year = new Date().getFullYear() - i;
        yearList.push({
          id: i,
          label: `${year}`,
          value: `${year}`
        });
      }
      }
  };

  return (
    <div className={"formikFormWrapper"}>
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
                                <FormikDropdown name={"register_birth_month"} label={"Birth Month"} options={monthList} />
                              </div>
                            </div>

                            <div className="form-row">
                              <div className="form-item registration-form-item">
                                <FormikDropdown name={"register_birth_year"} label={"Birth Year"} options={yearList} />
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