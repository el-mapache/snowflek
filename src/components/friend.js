import { Link } from 'react-router-dom';
import friend from '../types/friend';
import PropTypes from 'prop-types';
import React from 'react';


const Friend = ({ friend }) => {
  if (!friend) {
    return null;
  }

  return null;
  // return (
  //   <Item>
  //     <Item.Image size="tiny" src={friend.image} />
  //     <Item.Content>
  //       <Item.Header>{friend.name}</Item.Header>
  //       <Item.Meta>Description</Item.Meta>
  //       <Item.Description>
  //         { friend.droplets[0].content }
  //       </Item.Description>
  //       <Item.Extra>
  //         <Link to={`/friends/${friend.id}/droplets`}>
  //           See more of what {friend.name} is thinking!
  //         </Link>
  //       </Item.Extra>
  //     </Item.Content>
  //   </Item>
  // );
}

Friend.propTypes = {
  friend: PropTypes.shape(friend)
};

export default Friend;
