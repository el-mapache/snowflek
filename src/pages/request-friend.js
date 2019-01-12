import React from 'react';

class RequestFriendPage extends React.Component {
  handleClick = () => {

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

export default RequestFriendPage;
