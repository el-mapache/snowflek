import React from 'react';
import { connect } from 'react-redux';
import { requestFriend } from '../actions/friends';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  requestFriend: requestFriend(dispatch),
});

class RequestFriendPage extends React.Component {
  handleClick = () => {
    this.props.requestFriend({
      friend_request: {
        email: 'april@gmail.com',
      },
    });
  }
 
  render() {
    return (
      <form>
        <h2>Request a pal</h2>
        <button type="button" onClick={this.handleClick}>
          request friend
        </button>
      </form>
    );
  }
}

export { RequestFriendPage };
export default connect(mapStateToProps, mapDispatchToProps)(RequestFriendPage);
