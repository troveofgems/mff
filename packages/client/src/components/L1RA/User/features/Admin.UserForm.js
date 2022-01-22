import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
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

import {adminGetUserProfileById} from "../../../../redux/actions/admin.actions";

const AdminUserForm = () => {
  const
    [showBanOptions, setShowBanOptions] = useState(false),
    [formValues, setFormValues] = useState({
      id: 'No Data Available',
      accountLockoutStatus: false,
      accountVerifiedStatus: false,
      recentOrders: [],
      admin_update_first_name: null,
      admin_update_last_name: null,
      admin_update_birth_month: null,
      admin_update_email: null,
      supadmin_update_password_override: null,
      admin_override_lockout_status: false,
      admin_ban_status: {
        admin_update_ban_length: 0,
        admin_update_ban_type: "h"
      },
      accountLastLoggedInOn: null,
      accountLastModifiedOn: null,
      accountCreatedOn: null
    }),
    dispatch = useDispatch(),
    viewUser = useSelector(state => state.viewUser),
    location = useLocation(),
    { error, success, user, loading } = viewUser;

  useEffect(() => {
    if (location.state && location.state.length > 0) {
      dispatch(adminGetUserProfileById(location.state));
    }
  }, [location.state]);

  useEffect(() => {
    if (!loading && user) {
      console.log("Prefill form data!", user);
      setFormValues({
        ...formValues,
        id: user._id,
        accountLockoutStatus: user.accountLockout,
        accountVerifiedStatus: !user.awaitingEmailVerification,
        admin_update_firstName: user.firstName,
        admin_update_lastName: user.lastName,
        admin_update_birthMonth: user.birthMonth,
        admin_update_email: user.currentEmail,
        admin_update_pending_email: user.placeholderEmail,
        accountLastModifiedOn: user.updatedAt,
        accountCreatedOn: user.createdAt
      });
    }
  }, [loading, user]);

  console.log(location);

  return (
    <>
      <div style={{minWidth: "1200px"}}>
        <Formik
          initialValues={formValues}
          validationSchema={formikLoginValidationSchema}
          onSubmit={async (formData, {setSubmitting}) => {
            setSubmitting(true);

            setSubmitting(false);
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
                <Form className="form-box form-wrap content-wrapper" style={{minWidth: "1200px"}}>
                  <div className="section-title-wrap blue">
                    <h2 className="section-title medium text-black">
                      User Id: {formik.values.id}
                    </h2>
                    <div className="section-title-separator">{}</div>
                  </div>
                  <Row className={"mb-5"}>
                    <Col md={6}>
                      <h3>Healthchecks</h3>
                      <div className={"field-container"}>
                        <div className="form-row">
                          <div className="form-item login-form-item">
                            <h4>
                              Account Lockout:{' '}
                              <em>{`${formik.values.accountLockoutStatus}`}</em>
                            </h4>
                          </div>
                        </div>
                        <div className="form-row login-form-item">
                          <h4>
                            Account Verified:{' '}
                            <em>{`${formik.values.accountVerifiedStatus}`}</em>
                          </h4>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={"field-container"}>
                        <h3>Recent Orders</h3>
                        <p>
                          {formik.values.recentOrders.map(order => (
                            <>
                             <span>Some Item, </span>
                            </>
                          ))}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <h3>Personal Data</h3>
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
                              label='Current Email Address'
                              minLength={EMAIL_MIN_LEN} maxLength={EMAIL_MAX_LEN}
                              id={'admin_update_email'} name={'admin_update_email'}
                              type='email' placeholder='michael@fricknfish.com'
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-item login-form-item">
                            <FormikTextInput
                              label='Pending Email Address'
                              minLength={EMAIL_MIN_LEN} maxLength={EMAIL_MAX_LEN}
                              id={'admin_update_pending_email'} name={'admin_update_pending_email'}
                              type='email' placeholder='michael@fricknfish.com'
                            />
                          </div>
                        </div>
                       {/* <div className="form-row">
                          <div className="form-item login-form-item">
                            <FormikTextInput
                              label='Password Override'
                              minLength={PASSWORD_MIN_LEN} maxLength={PASSWORD_MAX_LEN}
                              id={'password_override'} name={'password_override'}
                              type='password' placeholder='********'
                            />
                          </div>
                        </div>*/}
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
                              name={"admin_update_birthMonth"} label={"Birth Month"}
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
                            children={"Set A Ban"}
                            id={"admin_update_accountBan"} name={"admin_update_accountBan"}
                            onClick={() => setShowBanOptions(!showBanOptions)}
                          />
                          {
                            showBanOptions && (
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
                              id={'accountLastModifiedOn'} name={'accountLastModifiedOn'}
                              type='text' readOnly disabled
                            />
                          </div>
                        </div>
                        <div className="form-row login-form-item">
                          <FormikTextInput
                            label='Account Created On'
                            id={'accountCreatedOn'} name={'accountCreatedOn'}
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