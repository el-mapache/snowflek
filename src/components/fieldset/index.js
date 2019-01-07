import React from 'react';
import { Field, ErrorMessage } from 'formik';

const fieldFactory = (props) => {
  let composedProps = props;

  if (props.type === 'textarea') {
    composedProps = {
      ...props,
      render({ field }) {
        return (
          <textarea
            id={field.name}
            {...props}
            {...field}
          />
        );
      }
    };
  }

  return <Field id={props.name} {...composedProps} />
}

const FieldSet = ({ name, label, ...rest }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    { fieldFactory({ name, ...rest }) }
    <ErrorMessage name={name} />
  </div>
);

export default FieldSet;
