import React from 'react';
import { connect } from 'react-redux';
import { getDropletsForUser } from '../actions/droplets';
import Droplet from '../components/droplet';
import Loader from '../components/loader';
import CreateDroplet from '../components/droplet/create-droplet';
import dropletValidator from '../validators/droplet';

const mapStateToProps = ({ droplets }) => {
  return {
    myDroplets: droplets.droplets,
    isLoading: droplets.isFetching,
  };
};

const mapDispatchToProps = dispatch => ({
  getOwnDroplets: getDropletsForUser(dispatch)
});

class OwnDropletsPage extends React.Component {
  componentDidMount() {
    this.props.getOwnDroplets();
  }

  renderDroplets() {
    return this.props.myDroplets.map((droplet) => (
      <Droplet
        content={droplet.content}
        key={`${droplet.id}${droplet.created_at}`}
      />
    ));
  }

  renderDropletCreator(dropletExists) {
    return dropletExists ?
      'Looks like you\'ve already created a droplet today! Great job!' :
      <CreateDroplet />;
  }
 
  render() {
    const validator = dropletValidator(this.props.myDroplets[0]);

    return (      
      <section>
        <h1>my droplets</h1>
        <Loader isLoading={this.props.isLoading}>
          { this.renderDroplets() }
        </Loader>
        { this.renderDropletCreator(validator.dropletForToday()) }
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnDropletsPage);
