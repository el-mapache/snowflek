import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch) => ({

});

class FriendDropletsPage extends React.Component {
  componentDidMount() {
    // fetch friend if none exists

  }

  render() {
    console.log(this.props);

    return (
      <h2>its me, your friend!</h2>
    );
  }
}

export default FriendDropletsPage;
