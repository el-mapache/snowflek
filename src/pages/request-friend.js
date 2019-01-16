import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findUser } from '../actions/users';
import {
  requestFriend,
  getAllFriendRequests,
} from '../actions/friends';
import Form from '../components/form';
import FieldSet from '../components/fieldset';
import Button from '../components/button';
import Message from '../components/message';
import IncomingFriendRequests from '../components/incoming-friend-requests';

const mapStateToProps = ({ users, friendRequests }) => ({
  users,
  friendRequests,
});
const mapDispatchToProps = dispatch => ({
  fetchUser: findUser(dispatch),
  requestFriend: requestFriend(dispatch),
  getFriendRequests: getAllFriendRequests(dispatch),
});

class MakeFriendshipRequest extends React.Component {
  static propTypes = {
    friend: PropTypes.oneOfType([
      () => null,
      PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.email,
      }),
    ]),
    handleFriendRequest: PropTypes.func.isRequired,
  }

  renderActionOrError() {
    if (this.props.error) {
      return <Message message={this.props.error} />
    }

    return (
      <div>
        <p>Looks like {this.props.friend.email} is available for friendship!</p>
        <Button onClick={this.props.handleFriendRequest}>
          Request a friendship
        </Button>
      </div>
    );
  }
  render() {
    if (!this.props.friend) {
      return null;
    }

    return this.renderActionOrError();
  }
}

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
    errors.email = 'Sorry, but we need a valid email address';
  }

  return errors;
};

class RequestFriendPage extends React.Component {
  state = {
    email: '',
    currentFriend: null,
  }

  componentDidMount() {
    this.props.getFriendRequests();
  }

  handleClick = () => {
    const { users } = this.props;
    const friend = users.users[this.state.currentFriend];

    // TODO this is not the best UI
    /**
     * essentially, we want a way to clear the current friend being sought
     * once a successful friend request is made. since the state is spread out
     * across the reducers and this component (not necessarily a problem)
     * we have to do this suboptimal clearing of the email before the request
     * is actually completed
     * 
     * MUST REWORK HOW FRIENDS/FRIENDSHIPS/USERS are abstracted! API clarity
     * will help
     */
    this.setState(state => ({
      ...state,
      currentFriend: null
    }), () => {
      this.props.requestFriend({
        id: friend.id,
      });
    });
  }

  handleSubmit = (values) => {
    this.setState(state => ({
      ...state,
      currentFriend: values.email
    }), () => {
      this.props.fetchUser({
        email: values.email,
      });
    });
  }
 
  render() {
    const { users, friendRequests } = this.props;
    const formState = { email: this.state.email };

    return (
      <section id="friend-finder">
        <h2>Request a pal</h2>
        <Form
          button="Find friend"
          errors={users.errors}
          initialValues={formState}
          onSubmit={this.handleSubmit}
          validate={handleValidation}
        >
          <FieldSet
            label="Enter your friend's email address"
            name="email"
            type="email"
          />
        </Form>
        <MakeFriendshipRequest
          error={friendRequests.error.form}
          friend={users.users[this.state.currentFriend]}
          handleFriendRequest={this.handleClick}
        />
        <YourFriendRequests
          outgoingRequests={this.props.friendRequests.outgoingRequests}
          incomingRequests={this.props.friendRequests.incomingRequests}
        />
      </section>
    );
  }
}

export { RequestFriendPage };
export default connect(mapStateToProps, mapDispatchToProps)(RequestFriendPage);
