import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {Form, Formik} from "formik";
import formikEditUserValidationSchema from "../validation/formik.editUser.validationSchema";
import Notification from "../../../layout/Notification";
import FormikTextInput from "../../../../formik/textInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  FIRST_NAME_MAX_LEN, FIRST_NAME_MIN_LEN, LAST_NAME_MAX_LEN, LAST_NAME_MIN_LEN,
  PASSWORD_MAX_LEN, PASSWORD_MIN_LEN
} from "../../../UserProfile/validation/formik.validation.constants";
import FormikDropdown from "../../../../formik/dropdown";
import monthList from "../../../../data/monthList.json";
import FormikCheckbox from "../../../../formik/checkbox";
import FormikRadioGroup from "../../../../formik/radioGroup";
import Loader from "../../../layout/Loader";

import { useNavigate } from "react-router-dom";

import {adminGetUserProfileById, adminGetUserOrdersById, adminUpdateUserProfileById} from "../../../../redux/actions/admin.actions";
import {EMAIL_MAX_LEN, EMAIL_MIN_LEN} from "../validation/formik.validation.constants";

const AdminUserForm = () => {
  const
    [showBanOptions, setShowBanOptions] = useState(false),
    [showPrivOptions, setShowPrivOptions] = useState(false),
    [privilegeOptions, setPrivilegeOptions] = useState([{valueLabel: "User"}]),
    [formValues, setFormValues] = useState({
      id: 'No Data Available',
      accountLockoutStatus: false,
      accountVerified: false,
      isBanned: false,
      recentOrders: [],
      admin_update_first_name: null,
      admin_update_last_name: null,
      admin_update_birth_month: null,
      admin_update_email: null,
      accountLastLoggedInOn: null,
      accountLastModifiedOn: null,
      accountCreatedOn: null,
      update_account_ban_length: 1,
      banLengthDesc: 0,
      privilegeDesc: 0
    }),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    viewUser = useSelector(state => state.viewUser),
    userLogin = useSelector(state => state.userLogin),
    adminGetUserOrdersList = useSelector(state => state.adminGetUserOrdersList),
    location = useLocation(),
    { error, success, user, loading } = viewUser,
    { userOrders } = adminGetUserOrdersList,
    { auth } = userLogin;

  useEffect(() => {
    switch(auth.authLevel) {
      case 10:
        return setPrivilegeOptions([{valueLabel: "User"}, {valueLabel: "Admin"}, {valueLabel: "Auditor"}]);
      case 100:
        return setPrivilegeOptions([{valueLabel: "User"}, {valueLabel: "Admin"}]);
      default:
        return setPrivilegeOptions([{valueLabel: "User"}]);
    }
  }, []);
  useEffect(() => {
    if (location.state && location.state.length > 0) {
      dispatch(adminGetUserOrdersById(location.state));
      dispatch(adminGetUserProfileById(location.state));
    }
  }, [location.state]);
  useEffect(() => {
    if (!loading && user) {
      setFormValues({
        ...formValues,
        id: user._id,
        accountLockoutStatus: user.accountLockout,
        accountVerified: user.accountVerified,
        admin_update_first_name: user.firstName,
        admin_update_last_name: user.lastName,
        admin_update_birth_month: user.birthMonth,
        admin_update_email: user.currentEmail,
        admin_update_pending_email: user.placeholderEmail,
        accountLastModifiedOn: user.updatedAt,
        accountCreatedOn: user.createdAt,
        admin_update_account_lockout: user.accountLockout,
        recentOrders: userOrders,
        isBanned: user.isBanned,
        update_lastLoggedInTS: user.lastLoggedIn || "Never Logged In"
      });
    }
  }, [loading, user]);

  const processChanges = (formikValues, user) => {
    let preprocessedUpdates = {};

    preprocessedUpdates.update_registrationId = user._id;

    // Nine Possible Updates To Make
    if (formikValues.admin_update_first_name !== user.firstName) {
      preprocessedUpdates.firstName = formikValues.admin_update_first_name;
    }
    if (formikValues.admin_update_last_name !== user.lastName) {
      preprocessedUpdates.lastName = formikValues.admin_update_last_name;
    }
    if (formikValues.admin_update_email !== user.currentEmail) {
      preprocessedUpdates.currentEmail = formikValues.admin_update_email;
    }
    if (formikValues.admin_update_birth_month !== user.birthMonth) {
      preprocessedUpdates.birthMonth = parseInt(formikValues.admin_update_birth_month);
    }
    if (user.accountLockout) {
      if (formikValues.admin_update_account_lockout === false) {
        preprocessedUpdates.accountLockout = false;
        preprocessedUpdates.loginAttempts = 0;
      } else {
        preprocessedUpdates.accountLockout = true;
        preprocessedUpdates.loginAttempts = 0;
      }
    }
    if (formikValues.password_override) {
      preprocessedUpdates.password = formikValues.password_override;
    }
    if (showPrivOptions) {
      switch(parseInt(formikValues.privilegeDesc)) {
        case 2:
          preprocessedUpdates.authLevel = 1000;
          break;
        case 1:
          preprocessedUpdates.authLevel = 100;
          break;
        case 0: // Fallthrough is intentional
        default:
          preprocessedUpdates.authLevel = 2000;
          break;
      }
    }
    if (showBanOptions) { // Need to expand on full ban logic here
      preprocessedUpdates.isBanned = true;
      let
        startBanAt = new Date(),
        endBanAt = new Date();

      switch(parseInt(formikValues.banLengthDesc)) {
        case 3:
          endBanAt.setFullYear(startBanAt.getFullYear() + formikValues.update_account_ban_length);
          preprocessedUpdates.banExpiresAt = new Date(endBanAt);
          break;
        case 2:
          endBanAt.setMonth(startBanAt.getMonth() + formikValues.update_account_ban_length);
          preprocessedUpdates.banExpiresAt = new Date(endBanAt);
          break;
        case 1:
          endBanAt.setDate(startBanAt.getDate() + formikValues.update_account_ban_length);
          preprocessedUpdates.banExpiresAt = new Date(endBanAt);
          break;
        case 0:
        case "0":
        default:
          endBanAt.setHours(startBanAt.getHours() + formikValues.update_account_ban_length);
          preprocessedUpdates.banExpiresAt = new Date(endBanAt);
          break;
      }
    }
    return preprocessedUpdates;
  };

  const handleRequestToRemoveBan = () => {
    let
      startBanAt = new Date(),
      endBanAt = new Date();
    const updates = {
      isBanned: false,
      banExpiresAt: endBanAt.setHours(startBanAt.getHours() - 1), // Set The Ban To Have Expired An Hour Earlier
      update_registrationId: user._id
    }
    dispatch(adminUpdateUserProfileById(updates));
    dispatch(adminGetUserProfileById(location.state));
  };

  return (
    <>
      <div style={{minWidth: "1200px"}}>
        <Formik
          initialValues={formValues}
          validationSchema={formikEditUserValidationSchema}
          onSubmit={async (formData, {setSubmitting, resetForm}) => {
            console.log('Form Submitted. Time To Pre-process the data:', formData);
            let updates = processChanges(formData, user);
            console.log("Updates Have Been Processed And Are Ready To Be Sent To The Server", updates);
            setSubmitting(true);
            //Make Call TO Admin API Update User Call Here
            await dispatch(adminUpdateUserProfileById(updates));
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
                            <em>{`${formik.values.accountVerified}`}</em>
                          </h4>
                        </div>
                      <div className="form-row login-form-item">
                        <h4>
                          Account{' '} Banned:{' '}
                          <em>{`${formik.values.isBanned}`}</em>
                        </h4>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={"field-container"}>
                        <h3>Recent Orders</h3>
                        {(!formik.values.recentOrders || formik.values.recentOrders.length === 0) ? (
                          <>
                            <h5>No Orders Placed</h5>
                          </>
                        ) : (
                          <>
                            <ol>
                              {formik.values.recentOrders.map(order => (
                                <li key={order._id}>
                                  <button
                                    className={"btn btn-link"}
                                    type="button"
                                    onClick={() => navigate(`/l1ra/orders/invoice/${order._id}`, {state: {oid: order._id, adminCall: true}})}>
                                    {order.orderRefId}
                                  </button>
                                </li>
                              ))}
                            </ol>
                          </>
                        )}
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
                              id={'admin_update_first_name'} name={'admin_update_first_name'}
                              type='text' placeholder='First Name Here'
                              disabled={formik.values.isBanned || auth.authLevel === 1000}
                            />
                          </div>
                        </div>
                        <div className="form-row login-form-item">
                          <FormikTextInput
                            label='Last Name'
                            minLength={LAST_NAME_MIN_LEN} maxLength={LAST_NAME_MAX_LEN}
                            id={'admin_update_last_name'} name={'admin_update_last_name'}
                            type='text' placeholder='Last Name Here'
                            disabled={formik.values.isBanned || auth.authLevel === 1000}
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
                              disabled={formik.values.isBanned || auth.authLevel === 1000}
                            />
                          </div>
                        </div>
                        {formik.values.admin_update_pending_email && (
                          <div className="form-row">
                            <div className="form-item login-form-item">
                              <FormikTextInput
                                label='Pending Email Address'
                                minLength={EMAIL_MIN_LEN} maxLength={EMAIL_MAX_LEN}
                                id={'admin_update_pending_email'} name={'admin_update_pending_email'}
                                type='email' placeholder='michael@fricknfish.com'
                                disabled={formik.values.isBanned || auth.authLevel === 1000}
                              />
                            </div>
                          </div>
                        )}
                       {auth && auth.authLevel === 10 && (<div className="form-row">
                          <div className="form-item login-form-item">
                            <FormikTextInput
                              label='Password Override'
                              minLength={PASSWORD_MIN_LEN} maxLength={PASSWORD_MAX_LEN}
                              id={'password_override'} name={'password_override'}
                              type='password' placeholder='********'
                              disabled={formik.values.isBanned || auth.authLevel === 1000}
                            />
                          </div>
                        </div>)}
                        <div className="form-row login-form-item">
                          <label>Password Reset</label>
                          <div>
                            <button type="button" disabled={formik.values.isBanned || auth.authLevel === 1000}
                                    className="button full text-black login-btn"
                            >
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
                              name={"admin_update_birth_month"} label={"Birth Month"}
                              options={monthList} disabled={formik.values.isBanned || auth.authLevel === 1000}
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
                              children={
                                formik.values.admin_update_account_lockout ? "Account Locked" : "Lock Account"
                              }
                              id={"admin_update_account_lockout"} name={"admin_update_account_lockout"}
                              disabled={formik.values.isBanned || auth.authLevel === 1000}
                            />
                          </div>
                        </div>
                        {!formik.values.isBanned && (
                          <div className="form-row login-form-item">
                            <FormikCheckbox
                              children={"Set A Ban"}
                              id={"admin_update_accountBan"} name={"admin_update_accountBan"}
                              onClick={() => setShowBanOptions(!showBanOptions)}
                              disabled={auth.authLevel === 1000}
                            />
                            {
                              showBanOptions && (
                                <>
                                  <div className="form-item login-form-item">
                                    <FormikTextInput
                                      label='Ban Length'
                                      min={1} max={31}
                                      id={'update_account_ban_length'} name={'update_account_ban_length'}
                                      type='number' placeholder={0}
                                    />
                                    <div className={"py-2 pb-5"}>
                                      <FormikRadioGroup
                                        label={"Type"}
                                        name={"banLengthDesc"}
                                        options={[{valueLabel: "Hour"}, {valueLabel: "Day"}, {valueLabel: "Month"}, {valueLabel: "Year"}]}
                                        idPrefix={"banLengthDesc"}
                                        currentlySelectedOption={formik.values.banLengthDesc}
                                      />
                                    </div>
                                  </div>
                                </>
                              )
                            }
                          </div>
                        )}
                        <div className="form-row login-form-item">
                          <FormikCheckbox
                            children={"Privilege Elevation"}
                            id={"admin_update_accountPrivilege"} name={"admin_update_accountPrivilege"}
                            onClick={() => setShowPrivOptions(!showPrivOptions)}
                            disabled={formik.values.isBanned || auth.authLevel === 1000}
                          />
                          {
                            showPrivOptions && (
                              <>
                                <div className="form-item login-form-item">
                                  <FormikRadioGroup
                                    label={"Set Account Privilege To"} style={{marginTop: '1rem'}}
                                    name={"privilegeDesc"}
                                    options={privilegeOptions}
                                    idPrefix={"privilegeDesc"}
                                    currentlySelectedOption={formik.values.privilegeDesc}
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
                    <button type="button" className="button full text-black login-btn"
                            onClick={() => formik.submitForm()}
                            disabled={formik.values.isBanned || auth.authLevel === 1000}
                    >
                      Update User
                    </button>
                    {formik.values.isBanned && (
                      <>
                        <span className={"p-2"}>{}</span>
                        <button type="button" className="button full text-black login-btn"
                                onClick={() => handleRequestToRemoveBan()}
                        >
                          Remove Ban
                        </button>
                      </>
                    )}
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