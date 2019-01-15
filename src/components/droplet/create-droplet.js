import React from 'react';
import { connect } from 'react-redux';
import Form from '..//form';
import Fieldset from '../fieldset';
import { createDroplet } from '../../actions/droplets';
import DropletValidator from '../../validators/droplet';

const mapStateToProps = ({ droplets }) => {
  return { errors: droplets.errors };
};

const mapDispatchToProps = dispatch => ({
  handleSubmit: createDroplet(dispatch),
});

const handleValidation = (values) => {
  const validator = DropletValidator(values);
  let errors = {};

  if (!validator.hasContent()) {
    errors.content =  'Droplet can\'t be blank';
  } else if (!validator.atMaxLength()) {
    errors.content = 'A droplet is limited to 300 characters.';
  }

  return errors
}

class CreateDroplet extends React.Component {
  state = {
    content: ''
  }
 
  handleSubmit = (values) => {
    this.props.handleSubmit(values);
  }

  render() {
    return (
      <section id="create-droplet">
        <h3>Hey friend, why not write something today?</h3>
        <Form
          initialValues={this.state}
          onSubmit={this.handleSubmit}
          validate={handleValidation}
        >
          <Fieldset
            label="What's on your mind today?"
            name="content"
            type="textarea"
            rows="6"
            cols="60"
          />
        </Form>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDroplet);
