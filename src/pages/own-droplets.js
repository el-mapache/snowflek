import React from 'react';
import { connect } from 'react-redux';
import { getDropletsForUser } from '../actions/droplets';
import Droplet from '../components/droplet';
import CreateDroplet from '../components/droplet/create-droplet';

const mapStateToProps = ({ droplets }) => {
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
      <section>
        <h1>my droplets</h1>
        { this.props.myDroplets.map((droplet) => {
          return <Droplet content={droplet.content} key={`${droplet.id}${droplet.created_at}`} />
        })}
        <CreateDroplet />
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnDropletsPage);
