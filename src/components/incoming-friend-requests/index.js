import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirmFriendship } from '../../actions/friendships';
import Button from '../button';
import Message from '../message';

const mapStateToProps = ({ friendships }) => ({
  friendships,
});

const mapDispatchToProps = dispatch => ({
  confirmFriendship: confirmFriendship(dispatch)
});

class IncomingFriendRequest extends React.Component {
  static propTypes = {
    friend: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
    handleConfirmFriendship: PropTypes.func.isRequired,
  }
  
  handleClick = () => {
    const { friend } = this.props;

    this.props.handleConfirmFriendship({
      email: friend.email,
      id: friend.id,
    });
  }

  render() {
    const { friend } = this.props;

    if (!friend) {
      return null;
    }
 
    return (
      <div>
        <div>
          <span>{friend.name}</span>
          <span>{friend.email}</span>
        </div>
        <Button onClick={this.handleClick}>
          Confirm your friendship
        </Button>
      </div>
    );
  }
}

class IncomingFriendRequests extends React.Component {
  static propTypes = {
    incomingRequests: PropTypes.array,
  }

  confirmFriendship = ({ id, email }) => {
    this.props.confirmFriendship({ id, email });
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

      return (
        <IncomingFriendRequest
          key={`${friend.email}-${index}`}
          friend={friend}
          handleConfirmFriendship={this.confirmFriendship}
        />
      );
    });
  }

  render() {
    const { friend } = this.props.friendships;

    return (
      <section id="incoming-requests">
        { friend ? <Message message={`You've confirmed ${friend.email} as a friend!`} /> : null }
        { this.renderTitle() }
        { this.renderRequests() }
      </section>
    );
  }
}

export { IncomingFriendRequests };
export default connect(mapStateToProps, mapDispatchToProps)(IncomingFriendRequests);