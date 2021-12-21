import {useField} from "formik";
import React from "react";

export const FormikDropdown = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div style={{minWidth: '100%'}}>
        <select {...field} {...props} style={{minWidth: '65%', fontSize: '1.25rem'}} className={"text-center"}>
          {options.map(option => (<option id={option.id} value={option.value}>{option.label}</option>))}
        </select>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

export default FormikDropdown;