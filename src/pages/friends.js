import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getFriends } from '../actions/friends';
import Friends from '../components/friends';

import React from 'react';

const mapStateToProps = ({ friends }) => ({
  ...friends
});

const mapDispatchToProps = dispatch => ({
  getAllFriends: getFriends(dispatch)
});

class FriendsPage extends React.Component {
  componentDidMount() {
    this.props.getAllFriends();
  }

  render() {
    return (
      <React.Fragment>
        <h2>Your Friends</h2>
          <Dimmer.Dimmable>
            <Segment>
              <Friends friends={this.props.friends} />
            </Segment>
            <Dimmer active={this.props.isLoading}>
              <Loader active={this.props.isLoading} inline="centered">
                Hang tight, we're finding your friends!
              </Loader>
            </Dimmer>
          </Dimmer.Dimmable>
        
      </React.Fragment>
    );
  }
}

export { FriendsPage };
export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);
