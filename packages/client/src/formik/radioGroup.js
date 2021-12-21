import React from 'react';
import {useField} from "formik";

const FormikRadioGroup = ({label, name, options, idPrefix, currentlySelectedOption, ...props}) => {
  const [field] = useField({...props, type: 'radio', name});
  return (
    <>
      <h6 id={name}>{label}</h6>
      <div role={"group"} aria-labelledby={name} style={rg_btn_style}>
        {options.map((opt, index) => (
          <label
            htmlFor={`${idPrefix}_${opt.valueLabel.toLowerCase()}`}
            key={`key-${idPrefix}_${opt.valueLabel.toLowerCase()}`}
          >
            {opt.valueLabel}
            <input
              {...field} {...props}
              checked={currentlySelectedOption === `${index}`}
              id={`${idPrefix}_${opt.valueLabel.toLowerCase()}`}
              type={"radio"} value={`${index}`}
            />
          </label>
        ))}
      </div>
    </>
  );
};

const rg_btn_style = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '50%'
};

export default FormikRadioGroup;