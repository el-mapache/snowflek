import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findUser } from '../actions/users';
import { getAllFriendRequests } from '../actions/friend-requests';
import Form from '../components/form';
import FieldSet from '../components/fieldset';
import IncomingFriendRequests from '../components/incoming-friend-requests';
import RequestFriend from '../components/request-friend';

const mapStateToProps = ({ users, friendRequests }) => ({
  users,
  friendRequests,
});
const mapDispatchToProps = dispatch => ({
  fetchUser: findUser(dispatch),
  getFriendRequests: getAllFriendRequests(dispatch),
});

class OutgoingFriendRequests extends React.Component {
  static propTypes = {
    outgoingRequests: PropTypes.array,
  }

  renderTitle() {
    if (this.props.outgoingRequests.length) {
      return (
        <h4>
          You are waiting for these people to confirm a friendship with you!
        </h4>
      );
    }

    return <h4>You aren't waiting for anyone to add you as a friend</h4>;
  }

  renderRequests() {
    const { outgoingRequests } = this.props;
    
    if (!outgoingRequests.length) {
      return null;
    }

    return outgoingRequests.map((request, index) => {
      const { requested_friend: friend } = request;

      return (
        <div key={`${friend.email}-${index}`}>
          <span>{friend.name}</span>
          <span>{friend.email}</span>
        </div>
      );
    });
  }

  render() {
    return (
      <section id="outgoing-requests">
        { this.renderTitle() }
        { this.renderRequests() }
      </section>
    );
  }
}

class YourFriendRequests extends React.Component {
  render() {
    return (
      <section id="friend-requests">
        <IncomingFriendRequests incomingRequests={this.props.incomingRequests} />
        <OutgoingFriendRequests outgoingRequests={this.props.outgoingRequests} />
      </section>
    );
  }
}

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

  handleClick = () => {
    const { users } = this.props;
    const friend = users.currentUser;

    this.props.requestFriend({
      id: friend.id,
    });
  }

  handleSubmit = (values) => {
    this.props.fetchUser({
      email: values.email,
    });
  }
 
  render() {
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
          outgoingRequests={this.props.friendRequests.outgoingRequests}
          incomingRequests={this.props.friendRequests.incomingRequests}
        />
      </section>
    );
  }
}

export { FriendRequestsPage };
export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestsPage);
