import React from 'react';
import { connect } from 'react-redux';
import { showUser } from '../actions/users';
import { withPageMessage } from '../actions/helpers';
import { pageMessageSelector } from '../reducers/app-messages';
import { routerPathSelector, routerIdParamSelector } from '../utils/selectors';
import { userSelector, userLoadingSelector } from '../reducers/users';
import Loader from '../components/loader';
import Droplet from '../components/droplet';
import Message from '../components/message';
import purgePageMessage from '../components/purge-page-message';

const mapStateToProps = (state, ownProps) => {
  const page = routerPathSelector(ownProps);
  const friend = userSelector(state, routerIdParamSelector(ownProps));

  return {
    loading: userLoadingSelector(state),
    friend,
    messages: pageMessageSelector(page, state),
    page,
  };
}

const mapDispatchToProps = (dispatch) => ({
  showUser(data) {
    const decoratedAction = withPageMessage(dispatch)({
      page: this.page,
      message: 'Sorry, it doesn\'t look like that user exists!',
    }, showUser);

    return decoratedAction(data);
  }
});

class FriendDropletsPage extends React.Component {
  componentDidMount() {
    // maybe this should be a helper or something to select it
    const { id } = this.props.match.params; 
    this.props.showUser({ id })
  }

  renderDroplets() {
    const { friend } = this.props;

    return friend.droplets.map((droplet) =>
      <Droplet {...droplet} key={`${friend.id}-${droplet.id}`}/>
    );
  }

  renderPageMessages() {
    return this.props.messages.map((message, index) =>
      <Message message={message.message} key={index} />
    );
  }

  renderContent() {
    return (
      <section id="friend-droplets">
        <h2>This is how { this.props.friend.email } was feeling</h2>
        { this.renderPageMessages() }
        <section>
          { this.renderDroplets() }
        </section>
      </section>
    );
  }

  render() {
    return (
      <Loader isLoading={this.props.loading && !this.props.friend}>
        { this.props.friend ? this.renderContent() : null }
      </Loader>
    );
  }
}

const Composed = purgePageMessage(FriendDropletsPage)();

export { FriendDropletsPage };
export default connect(mapStateToProps, mapDispatchToProps)(Composed);
