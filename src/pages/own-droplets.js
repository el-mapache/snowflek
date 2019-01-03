import React from 'react';
import { connect } from 'react-redux';
import { getDropletsForUser } from '../actions/droplets';

const mapStateToProps = ({ droplets }) => {
  debugger
  return {
    myDroplets: droplets.droplets
  };
};

const mapDispatchToProps = dispatch => ({
  getOwnDroplets: getDropletsForUser(dispatch)
});

class OwnDropletsPage extends React.Component {
  componentDidMount() {
    this.props.getOwnDroplets();
  }

  render() {
    return (
      <div>
        <h1>my droplets</h1>
        <section>
          { this.props.myDroplets.map((droplet) => {
            return droplet.content;
          })}
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnDropletsPage);
