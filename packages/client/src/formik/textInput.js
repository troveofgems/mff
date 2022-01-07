import {useField} from "formik";
import React from "react";

const FormikTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
      </div>
      <input className="text-input" {...field} {...props} style={{fontSize: '1.25rem', ...props.stylesOverride}} />
      {meta.touched && meta.error ? (
        <div className={"formikErrorMessage"}>
          <i className={"fas fa-exclamation-triangle"} />{' '}
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export default FormikTextInput;