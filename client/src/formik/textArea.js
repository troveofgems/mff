import {useField} from "formik";
import React from "react";

const FormikTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
      </div>
      <textarea {...field} {...props} rows={"6"}  className={"w-100"}/>
      {meta.touched && meta.error ? (
        <div className={"formikErrorMessage"}>
          <i className={"fas fa-exclamation-triangle"} />{' '}
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export default FormikTextArea;