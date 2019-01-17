import React from 'react';
import { connect } from 'react-redux';
import { findUser } from '../actions/users';
import { getAllFriendRequests } from '../actions/friend-requests';
import Form from '../components/form';
import FieldSet from '../components/fieldset';
import RequestFriend from '../components/request-friend';
import YourFriendRequests from '../components/your-friend-requests';

const mapStateToProps = ({ users, friendRequests }) => ({
  users,
  friendRequests,
});
const mapDispatchToProps = dispatch => ({
  fetchUser: findUser(dispatch),
  getFriendRequests: getAllFriendRequests(dispatch),
});

const handleValidation = (values) => {
  let errors = {};

  if (!values.email.length) {
    errors.email = 'We need a valid email address to find your friend!';
  }

  return errors;
};

class FriendRequestsPage extends React.Component {
  state = {
    email: '',
  }

  componentDidMount() {
    this.props.getFriendRequests();
  }

  handleSubmit = (values) => {
    this.props.fetchUser({
      email: values.email,
    });
  }
 
  render() {
    const { friendRequests } = this.props;

    return (
      <section id="friend-finder">
        <h2>Request a pal</h2>
        <Form
          button="Find friend"
          errors={this.props.users.errors}
          initialValues={this.state}
          onSubmit={this.handleSubmit}
          validate={handleValidation}
        >
          <FieldSet
            label="Enter your friend's email address"
            name="email"
            type="email"
          />
        </Form>
        <RequestFriend />
        <YourFriendRequests
          outgoing={friendRequests.outgoingRequests}
          incoming={friendRequests.incomingRequests}
        />
      </section>
    );
  }
}

export { FriendRequestsPage };
export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestsPage);
