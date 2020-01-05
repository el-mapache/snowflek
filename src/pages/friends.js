import { connect } from 'react-redux';
import React from 'react';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

class FriendsPage extends React.Component {
  render() {
    return (
      <h2>Your Friends</h2>
    )
  }
}

export { FriendsPage };
export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);
