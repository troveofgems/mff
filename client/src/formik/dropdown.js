import {useField} from "formik";
import React from "react";

export const FormikDropdown = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div>
        <label htmlFor={props.id || props.name}>
          {label}
        </label>
        <div className={"pb-2"}>
          <select {...field} {...props} className={props.className}>
            {options.map(option => (
              <option
                className={props.className}
                id={option.id} value={option.value} key={option.id + `${new Date()}`}
              >
                {option.label}
              </option>
            ))}
          </select>
          {meta.touched && meta.error ? (
            <div className={"formikErrorMessage"}>
              <i className={"fas fa-exclamation-triangle"}/>{' '}
              {meta.error}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FormikDropdown;