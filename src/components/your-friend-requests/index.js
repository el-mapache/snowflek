import React from 'react';
import IncomingFriendRequests from '../incoming-friend-requests';
import OutgoingFriendRequests from '../outgoing-friend-requests';

const YourFriendRequests = ({ incoming, outgoing }) =>
  <section id="friend-requests">
    <IncomingFriendRequests incomingRequests={incoming} />
    <OutgoingFriendRequests outgoingRequests={outgoing} />
  </section>

export default YourFriendRequests;
