import React from 'react';
import PropTypes from 'prop-types';

class OutgoingFriendRequests extends React.Component {
  static propTypes = {
    outgoingRequests: PropTypes.array,
  }

  renderTitle() {
    let message;

    if (this.props.outgoingRequests.length) {
      message = 'You are waiting for these people to confirm a friendship with you!';
    } else {
      message = 'You aren\'t waiting for anyone to add you as a friend'; 
    }

    return <h4>{message}</h4>;
  }

  renderRequests() {
    const { outgoingRequests } = this.props;
    
    if (!outgoingRequests.length) {
      return null;
    }

    return outgoingRequests.map((friendRequest, index) => {
      const { requested_friend: friend } = friendRequest;

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

export default OutgoingFriendRequests;
