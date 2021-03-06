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
    button: PropTypes.oneOfType([ PropTypes.element, PropTypes.string ]),
    buttonClassname: PropTypes.string,
    errors: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
    onSubmit: PropTypes.func
  }

  form = null

  componentDidUpdate(prevProps) {
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
      >
        {({ handleSubmit, isSubmitting, errors }) => {
          return (
            <form className="ui form" onSubmit={handleSubmit}>
              <Message message={errors.form} />
              { this.props.children }
              <Button
                className={this.props.buttonClassname}
                disabled={isSubmitting}
                type="submit"
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
