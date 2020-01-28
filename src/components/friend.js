import { Link } from 'react-router-dom';
import { differenceInCalendarDays, parse } from 'date-fns';
import Card from './card';
import friend from '../types/friend';
import PropTypes from 'prop-types';
import React from 'react';


const getName = friend => friend.name || friend.uid;
const getImage = friend => friend.image || 'http://placekitten.com/100/100';
const getFirstDroplet = friend => friend.droplets[0] && friend.droplets[0].content;
  

const FirstDroplet = ({ droplet, owner }) => {
  if (!droplet) {
    return <em>Looks like {getName(owner)} hasn't written anything yet.</em>;
  }

  const daysSinceLastDroplet = differenceInCalendarDays(new Date(), parse(droplet.created_at));
  
  return daysSinceLastDroplet
}

const Friend = ({ friend }) => {
  return (
    <Card>
      <section className="flex w-full items-center mb-4">
        <img src={getImage(friend)} className="w-16 h-16 rounded-lg mr-4" alt={`Image of ${getName(friend)}`} />
        <h5 className="h5">{getName(friend)}</h5>
      </section>
      <div className="w-full">
        <p class="mb-4">{ getFirstDroplet(friend) }</p>
        <h1><FirstDroplet droplet={getFirstDroplet(friend)} owner={friend} /></h1>
        <p>
          <Link
            to={`/friends/${friend.id}/droplets`}
            className="hover:border-purple-droplet border-transparent border-solid border-b-2 pb-1"
          >
            See more of what {getName(friend)} is thinking!
          </Link>
        </p>
      </div>
    </Card>
  );
}

Friend.propTypes = {
  friend: PropTypes.shape(friend).isRequired
};

export default Friend;
