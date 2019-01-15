import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findUser } from '../actions/users';
import { requestFriend, friendRequests } from '../actions/friends';
import Form from '../components/form';
import FieldSet from '../components/fieldset';
import Button from '../components/button';
import Message from '../components/message';

const mapStateToProps = ({ users, friendRequests }) => ({
  users,
  friendRequests,
});
const mapDispatchToProps = dispatch => ({
  fetchUser: findUser(dispatch),
  requestFriend: requestFriend(dispatch),
  getFriendRequests: friendRequests(dispatch),
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

  render() {
    if (!this.props.friend) {
      return null;
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

class IncomingFriendRequests extends React.Component {
  static propTypes = {
    incomingRequests: PropTypes.array,
  }

  renderTitle() {
    if (this.props.incomingRequests.length) {
      return <h4>People want to be your friend!</h4>;
    }

    return <h4>No one is waiting for you to confirm them as a friend.</h4>
  }

  renderRequests() {
    const { incomingRequests } = this.props;
    
    if (!incomingRequests.length) {
      return null;
    }

    return incomingRequests.map((request, index) => {
      const { requesting_friend: friend } = request;

      if (!friend) {
        return null;
      }

      return (
        <div key={`${friend.email}-${index}`}>
          <span>{friend.name}</span>
          <span>{friend.email}</span>
          <Button>Confirm your friendship</Button>
        </div>
      );
    });
  }

  render() {
    return (
      <section id="incoming-requests">
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

    this.props.requestFriend({
      email: friend.email,
      id: friend.id,
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
          initialValues={formState}
          button="Find friend"
          errors={users.errors}
          onSubmit={this.handleSubmit}
        >
          <Message message={friendRequests.error.form} />
          <FieldSet
            label="Enter your friend's email address"
            name="email"
            type="email"
          />
        </Form>
        <MakeFriendshipRequest
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
