import { format } from 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';

class Droplet extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }

  render() { 
    return (
      <div className="py-2 px-4 border-solid border-2 border-midnight rounded-lg mb-12 last:m-2">
        <p className="font-sans text-black-droplet-light font-hairline mb-4">
          { format(new Date(this.props.created_at), 'PPPP') }
        </p>
        <p className="font-sans text-black-droplet font-semibold">
          {this.props.content}
        </p>
      </div>
    )
  }
}

export default Droplet;
