import React, { useState } 	from 'react';
import { useDispatch } from "react-redux";

import Notification from "../../layout/Notification";
//import Loader from "../../layout/Loader";

const SettingsFeature = () => {
  const deleteMessage = 'Do you want to continue with deleting your account?',
    inactivateMessage = 'Do you want to continue with inactivating your account?';

  const
    [formValues, setFormValues] = useState({ controls: true }),
    dispatch = useDispatch(),
    [formMessage, setFormMessage] = useState(null),
    [formMessageType, setFormMessageType] = useState(null);

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

  return (
    <>
      <h2 className={"text-black text-center"}>Account Actions</h2>
      {formMessage && (
        <Notification variant={formMessageType}>
          {formMessage}
        </Notification>
      )}
      <div style={{minWidth: "1200px"}}>
        <h3 className={"text-black"}>Recoverable Actions</h3>
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
        <h3 className={"text-black"}>Irrecoverable Actions</h3>
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