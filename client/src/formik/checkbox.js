import {useField} from "formik";
import React from "react";

const FormikCheckbox = ({ label, children, ...props }) => {
  const [field, meta] = useField({...props, type: 'checkbox'});
  return (
    <>
     <div className={"mb-3"}>
       <label style={props.labelstyle}>
         <svg className={"cross-cb-icon small"} style={{maxWidth: '1px', maxHeight: '1px'}}>
           <use xlinkHref={"#svg-cross-cb-small"}>{}</use>
         </svg>
         <input type={"checkbox"} {...field} {...props} />
         <span style={{marginLeft: '20px'}}>{children}</span>
       </label>
       {meta.touched && meta.error ? (
         <div className={"error"}>{meta.error}</div>
       ) : null}
       {meta.touched && props.handleChange && props.handleChange(meta.value)}
     </div>
    </>
  );
};

const fricknFishCheckbox_Style = {
//  display: 'flex'
  maxHeight: '50px'
};

export default FormikCheckbox;