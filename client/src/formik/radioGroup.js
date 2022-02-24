import React from 'react';
import {useField} from "formik";

const FormikRadioGroup = ({label, name, options, idPrefix, currentlySelectedOption, ...props}) => {
  const [field] = useField({...props, type: 'radio', name});
  return (
    <>
      <h6 id={name}>{label}</h6>
      <div role={"group"} aria-labelledby={name}>
        {options.map((opt, index) => (
          <label
            style={{fontSize: "1.25rem", letterSpacing: ".15rem", padding: "5px"}}
            htmlFor={`${idPrefix}_${opt.valueLabel.toLowerCase()}`}
            key={`key-${idPrefix}_${opt.valueLabel.toLowerCase()}`}
          >
            {opt.valueLabel}
            <input
              {...field} {...props}
              checked={parseInt(currentlySelectedOption) === index}
              id={`${idPrefix}_${opt.valueLabel.toLowerCase()}`}
              className={"m-1"}
              type={"radio"} value={parseInt(index)}
            />
          </label>
        ))}
      </div>
    </>
  );
};

export default FormikRadioGroup;