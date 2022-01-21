import React, { useState } from 'react';
import {Link, useLocation} from "react-router-dom";
import {Form, Formik} from "formik";
import {loginFormSchema} from "../../../Authentication/schema/formSchematics";
import formikLoginValidationSchema from "../../../Authentication/validation/formik.login.validationSchema";
import Notification from "../../../layout/Notification";
import FormikTextInput from "../../../../formik/textInput";
import {
  EMAIL_MAX_LEN,
  EMAIL_MIN_LEN, PASSWORD_MAX_LEN,
  PASSWORD_MIN_LEN
} from "../../../Authentication/validation/formik.validation.constants";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  FIRST_NAME_MAX_LEN,
  FIRST_NAME_MIN_LEN, LAST_NAME_MAX_LEN,
  LAST_NAME_MIN_LEN
} from "../../../UserProfile/validation/formik.validation.constants";
import FormikDropdown from "../../../../formik/dropdown";
import monthList from "../../../../data/monthList.json";
import FormikCheckbox from "../../../../formik/checkbox";
import FormikRadioGroup from "../../../../formik/radioGroup";
import Loader from "../../../layout/Loader";

const AdminUserForm = () => {
  const
    [formValues, setFormValues] = useState({
      id: 'No Data Available',
    }),
    location = useLocation();

  console.log(location);

  const {id} = formValues;

  return (
    <>
      <div style={{minWidth: "1200px"}}>
        <Formik
          initialValues={loginFormSchema}
          validationSchema={formikLoginValidationSchema}
          onSubmit={async (formData, {setSubmitting}) => {
            setSubmitting(true);

            setSubmitting(false);
          }}
        >
          {formik => (
            <>
              {formik.isSubmitting ? (
                <>
                  <Loader/>
                </>
              ) : (
                <Form className="form-box form-wrap content-wrapper" style={{minWidth: "1200px"}}>
                  <div className="section-title-wrap blue">
                    <h2 className="section-title medium text-black">
                      User Id: {id}
                    </h2>
                    <div className="section-title-separator">{}</div>
                  </div>
                  <Row className={"mb-5"}>
                    <h3>Healthchecks</h3>
                    <Col md={6}>
                      <div className={"field-container"}>
                        <div className="form-row">
                          <div className="form-item login-form-item">
                            <h4>
                              Account Lockout:{' '}
                              <em>False</em>
                            </h4>
                          </div>
                        </div>
                        <div className="form-row login-form-item">
                          <h4>
                            Account Verified:{' '}
                            <em>False</em>
                          </h4>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <h3>Personal Data</h3>
                  <Row>
                    <Col md={6}>
                      <div className={"field-container"}>
                        <div className="form-row">
                          <div className="form-item login-form-item">
                            <FormikTextInput
                              label='First Name'
                              minLength={FIRST_NAME_MIN_LEN} maxLength={FIRST_NAME_MAX_LEN}
                              id={'admin_update_firstName'} name={'admin_update_firstName'}
                              type='text' placeholder='First Name Here'
                            />
                          </div>
                        </div>
                        <div className="form-row login-form-item">
                          <FormikTextInput
                            label='Last Name'
                            minLength={LAST_NAME_MIN_LEN} maxLength={LAST_NAME_MAX_LEN}
                            id={'admin_update_lastName'} name={'admin_update_lastName'}
                            type='text' placeholder='Last Name Here'
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={"field-container"}>
                        <div className="form-row">
                          <div className="form-item login-form-item">
                            <FormikTextInput
                              label='Email Address'
                              minLength={EMAIL_MIN_LEN} maxLength={EMAIL_MAX_LEN}
                              id={'login_email'} name={'login_email'}
                              type='email' placeholder='jerry@fricknfish.com'
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-item login-form-item">
                            <FormikTextInput
                              label='Password Override'
                              minLength={PASSWORD_MIN_LEN} maxLength={PASSWORD_MAX_LEN}
                              id={'password_override'} name={'password_override'}
                              type='password' placeholder='********'
                            />
                          </div>
                        </div>
                        <div className="form-row login-form-item">
                          <label>Password</label>
                          <div>
                            <button type="button" className="button full text-black login-btn">
                              Generate & Email New Password To User
                            </button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className={"field-container"}>
                        <div className="form-row">
                          <div className="form-item login-form-item">
                            <FormikDropdown
                              name={"register_birth_month"} label={"Birth Month"}
                              options={monthList}
                            />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className={"my-5 mb-5"}>
                    <Col md={6}>
                      <h3>Account Actions</h3>
                      <div className={"field-container"}>
                        <div className="form-row">
                          <div className="form-item login-form-item">
                            <FormikCheckbox
                              children={"Lock Account"
                              }
                              id={"admin_update_accountLockout"} name={"admin_update_accountLockout"}
                              onClick={() => {
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-row login-form-item">
                          <FormikCheckbox
                            children={"Set A Ban"
                            }
                            id={"admin_update_accountBan"} name={"admin_update_accountBan"}
                            onClick={() => {
                            }}
                          />
                          {
                            true && (
                              <>
                                <div className="form-item login-form-item">
                                  <FormikTextInput
                                    label='Ban Length'
                                    min={0} max={31}
                                    id={'update_account_ban_length'} name={'update_account_ban_length'}
                                    type='number' placeholder={0}
                                  />
                                  <FormikRadioGroup
                                    label={"Type"} style={{marginTop: '1rem'}}
                                    name={"banLengthDesc"}
                                    options={[{valueLabel: "Hour"}, {valueLabel: "Day"}, {valueLabel: "Month"}, {valueLabel: "Year"}]}
                                    idPrefix={"banLengthDesc"}
                                    currentlySelectedOption={formik.values.banLengthDesc}
                                  />
                                </div>
                              </>
                            )
                          }
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={"field-container"}>
                        <h3>Immutable Account Information</h3>
                        <div className="form-row">
                          <div className="form-item login-form-item">
                            <FormikTextInput
                              label='Last Logged In'
                              id={'update_lastLoggedInTS'} name={'update_lastLoggedInTS'}
                              type='text' readOnly disabled
                            />
                          </div>
                          <div className="form-item login-form-item">
                            <FormikTextInput
                              label='Account Last Modified On'
                              id={'update_lastModifiedAccountTS'} name={'update_lastModifiedAccountTS'}
                              type='text' readOnly disabled
                            />
                          </div>
                        </div>
                        <div className="form-row login-form-item">
                          <FormikTextInput
                            label='Account Created On'
                            id={'update_createdAccountTS'} name={'update_createdAccountTS'}
                            type='text' readOnly disabled
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="form-actions full py-4 pb-4">
                    <button type="submit" className="button full text-black login-btn">
                      Update User
                    </button>
                  </div>
                </Form>
              )}
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AdminUserForm;