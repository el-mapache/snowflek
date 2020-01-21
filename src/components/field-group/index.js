import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { Field, ErrorMessage } from 'formik';

const inputClasses = tw`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`;
const Textarea = styled.textarea`
  ${inputClasses}
`;
const Input = styled.input`
  ${inputClasses}
`;

const fieldFactory = (props) => {
  let composedProps = props;

  if (props.type === 'textarea') {
    composedProps = {
      ...props,
      render({ field }) {
        return (
          <Textarea
            id={field.name}
            {...props}
            {...field}
          />
        );
      }
    };
  }

  return <Input as={Field} id={props.name} {...composedProps} />
}

const FieldGroup = ({ name, label, ...rest }) => (
  <div className="mb-8">
    <label htmlFor={name} className="block font-semibold mb-2">
      {label}
    </label>
    { fieldFactory({ name, ...rest }) }
    <ErrorMessage name={name} />
  </div>
);

export default FieldGroup;
