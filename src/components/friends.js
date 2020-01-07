import { Divider, Item } from 'semantic-ui-react';
import Friend from '../components/friend';
import PlaceHolderWithImage from '../components/placeholder';
import PropTypes from 'prop-types'
import React from 'react';
import friend from '../types/friend';

class Friends extends React.Component {
  render() {
    const friendsList = Object.values(this.props.friends);

    if (!friendsList.length) {
      return <PlaceHolderWithImage />;
    }

    return (
      <Item.Group>
        {
          friendsList.map((friend, index) =>
            <>
              <Friend friend={friend} key={`friend-${index}`} />
              { index === friendsList.length - 1 ? null : <Divider /> }
            </>
          )
        }
      </Item.Group>
    );
  }
}

Friends.propTypes = {
  friends: PropTypes.arrayOf(friend)
};

export default Friends;
