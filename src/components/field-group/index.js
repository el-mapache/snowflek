import PropTypes from 'prop-types';
import React from 'react';
import styledInputFactory from '../styled-input-factory';
import { ErrorMessage } from 'formik';


const propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  /**
   * Any other props not enumerated here will be passed directly
   * to the input field. So, only valid HTML attrs should be supplied
   */
};

const FieldGroup = ({ name, label, ...rest }) => (
  <div className="mb-8">
    <label htmlFor={name} className="block font-semibold mb-2 text-">
      {label}
    </label>
    { styledInputFactory({ name, ...rest }) }
    <ErrorMessage
      component="p"
      name={name}
      className="text-orange-droplet-dark font-bold text-lg font-sans"
    />
  </div>
);

FieldGroup.propTypes = propTypes;

export default FieldGroup;
