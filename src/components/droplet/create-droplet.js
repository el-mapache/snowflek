import { connect } from 'react-redux';
import { createDroplet } from '../../actions/droplets';
import {FormTransition} from '../transitions';
import Card from '../card';
import DropletValidator from '../../validators/droplet';
import FieldGroup from '../field-group';
import Form from '../form';
import React from 'react';

const mapStateToProps = ({ droplets }) => {
  return {
    errors: droplets.errors
  };
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

  return errors;
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
      <FormTransition>
        {(style) => {
          return (
            <Card style={style} className="mx-auto">
              <h3 className="h3 text-black-droplet-light">
                What's on your mind?
              </h3>
              <Form
                button="write my droplet"
                initialValues={this.state}
                onSubmit={this.handleSubmit}
                validate={handleValidation}
              >
                <FieldGroup
                  label="What's on your mind today?"
                  name="content"
                  type="textarea"
                  rows="6"
                  cols="60"
                />
              </Form>
            </Card>
          )
        }}
      </FormTransition>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDroplet);
