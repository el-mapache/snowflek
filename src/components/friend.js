import { Link } from 'react-router-dom';
import Card from './card';
import friend from '../types/friend';
import PropTypes from 'prop-types';
import React from 'react';


const getName = friend => friend.name || friend.uid;
const getImage = friend => friend.image || 'http://placekitten.com/100/100';

const Friend = ({ friend }) => {
  if (!friend) {
    return null;
  }

  console.log(friend.droplets)
  return (
    <Card>
      <img src={getImage(friend)} className="w-10 h-10 rounded-full mr-4" alt={`Image of ${getName(friend)}`} />
      <h5 className="h5">{getName(friend)}</h5>
      {/* { friend.droplets[0].content } */}
    </Card>
  );
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
