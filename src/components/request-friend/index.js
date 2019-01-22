import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestFriendship } from '../../actions/friend-requests';
import { friendRequestErrorSelector } from '../../reducers/friend-requests';
import Message from '../message';
import Button from '../button';

const mapStateToProps = (state) => {
  return {
    friend: state.users.currentUser,
    friendRequestError: friendRequestErrorSelector(state),
  };
};
const mapDispatchToProps = dispatch => ({
  requestFriendship: requestFriendship(dispatch),
});

class RequestFriend extends React.Component {
  static propTypes = {
    friend: PropTypes.oneOfType([
      () => null,
      PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.email,
      }),
    ]),
  }

  handleClick = () => {  
    this.props.requestFriendship({
      id: this.props.friend.id,
    });
  }

  renderActionOrError() {
    if (this.props.friendRequestError) {
      // TODO this pattern sucks and just hides the error handling problem
      // the form only accepts one kind of error, which is a mistake
      return <Message message={this.props.friendRequestError.form} />;
    }

    if (!this.props.friend) {
      return null;
    }

    return (
      <div>
        <p>Looks like {this.props.friend.email} is available for friendship!</p>
        <Button onClick={this.handleClick}>
          Request a friendship
        </Button>
      </div>
    );
  }
  render() {
    return this.renderActionOrError();
  }
}

export { RequestFriend };
export default connect(mapStateToProps, mapDispatchToProps)(RequestFriend);
