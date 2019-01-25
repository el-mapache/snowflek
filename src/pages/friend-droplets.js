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
    const id = routerIdParamSelector(this.props);
    this.props.showUser({ id })
  }

  renderDroplets() {
    const { friend } = this.props;

    return (
      <section>
        { friend.droplets.map((droplet) => (
            <Droplet {...droplet} key={`${friend.id}-${droplet.id}`} />
        ))}
      </section>
    );
  }

  renderPageMessages() {
    return this.props.messages.map((message, index) =>
      <Message message={message.message} key={index} />
    );
  }

  renderHeading() {
    return <h2>This is how { this.props.friend.email } was feeling</h2>;
  }

  renderContent() {
    return (
      <section id="friend-droplets">
        { this.renderPageMessages() }
        { this.props.friend && this.renderHeading() }
        { this.props.friend && this.renderDroplets() }
      </section>
    );
  }

  render() {
    return (
      <Loader active={this.props.loading && !this.props.friend}>
        { this.renderContent() }
      </Loader>
    );
  }
}

const Composed = purgePageMessage(FriendDropletsPage)();

export { FriendDropletsPage };
export default connect(mapStateToProps, mapDispatchToProps)(Composed);
