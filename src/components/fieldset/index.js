import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FieldSet = ({ name, label, ...rest }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <Field id={name} name={name} {...rest} />
    <ErrorMessage name={name} />
  </div>
);

export default FieldSet;
