import { Field } from 'formik';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const inputClasses = tw`text-2xl shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`;
const Textarea = styled.textarea`
  ${inputClasses}
`;
const Input = styled.input`
  ${inputClasses}
`;

/**
 * 
 * @param {Object} props The props to pass to the factory
 * @param {String} props.type The type of form field to create. This is not validated, but must be supplied
 */
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
};

export default fieldFactory;
