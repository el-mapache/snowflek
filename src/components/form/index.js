import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Button from '../button';
import Message from '../message';

const getForm = component => el => component.form = el;

/**
 * Formats error messages in a reasonably sensible way
 * Handles case where error message might be a form level
 * error or a field level error.
 *
 * Prepends name of field to server generated error in the
 * latter case, and returns only the server error message in
 * the former.
*/
const friendlyFormError = (formFields, maybeFieldName, message) => {
  const formHasField = Object.keys(formFields).includes(maybeFieldName);

  return formHasField ?
    `${maybeFieldName} ${message}` :
    message;
};

class Form extends React.Component {
  static propTypes = {
    button: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]),
    buttonClassname: PropTypes.string,
    errors: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    onSubmit: PropTypes.func
  }

  form = null

  componentDidUpdate() {
    if (!this.props.errors) {
      return;
    }

    const errorsFromServer = Object.entries(this.props.errors);

    // TODO: will want the form to take prefixes as well, in case nested errors are needed
    const formattedErrors = errorsFromServer.reduce((memo, [name, message]) => {
      return { 
        ...memo,
        [name]: friendlyFormError(this.form.fields, name, message),
      };
    }, {});

    if (!Object.keys(formattedErrors).length && this.form.getFormikBag().dirty) {
      this.form.resetForm();
    }

    this.form.setSubmitting(false);
    this.form.setErrors(formattedErrors);
  }

  render() {
    const { button, ...rest } = this.props;

    return (
      <Formik
        {...rest}
        ref={getForm(this)}
        validateOnBlur={false}
      >
        {({ handleSubmit, isSubmitting, dirty, errors, setErrors, ...rest }) => {
          console.log(rest, errors)
          return (
            <form onSubmit={handleSubmit} noValidate>
              <Message
                level="error"
                message={errors.form}
                ackable
                handleClear={() => setErrors({form: null })}
              />
              { this.props.children }
              <Button
                disabled={!dirty || isSubmitting}
                onClick={handleSubmit}
                type="submit"
                secondary
                large
              >
                { button }
              </Button>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default Form;
