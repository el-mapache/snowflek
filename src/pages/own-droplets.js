import React from 'react';
import { connect } from 'react-redux';
import { getDropletsForUser } from '../actions/droplets';
import Droplet from '../components/droplet';
import Loader from '../components/loader';
import CreateDroplet from '../components/droplet/create-droplet';
import dropletValidator from '../validators/droplet';

const mapStateToProps = ({ droplets }) => {
  return {
    droplets: droplets.droplets,
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
    const { droplets } = this.props;

    if (!droplets.length) {
      return null;
    }

    const validator = dropletValidator(droplets[0]);
    const dropletForToday = validator.dropletForToday();

    if (dropletForToday) {
      return (
        <div>
          <h1>my droplets</h1>
          { droplets.map((droplet) => (
              <Droplet
                content={droplet.content}
                key={`${droplet.id}${droplet.created_at}`}
              />
          )) }
        </div>
      );
    }

    return this.renderDropletCreator(dropletForToday)
  }

  renderDropletCreator(dropletExists) {
    return dropletExists ?
      'Looks like you\'ve already created a droplet today! Great job!' :
      <CreateDroplet />;
  }
 
  /** 
   * TODO: All of these resource type pages shouldn't display a loading indicater as the sole content
   * when data has been fetched previously. Rather, they should display the content they have already
   * fetched, plus a sub-loading indicator for the content getting refreshed.
   * Maybe:
   * 
   * <loadingPlaceholder />
   * <contentlist />
   * 
   * With new content pushed to the top of the list
   * */
  render() {
    return (      
      <section>
        <Loader isLoading={this.props.isLoading && !this.props.droplets}>
          { this.renderDroplets() }
        </Loader>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnDropletsPage);
