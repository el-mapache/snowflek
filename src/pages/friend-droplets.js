import React from 'react';
import { connect } from 'react-redux';
import { showUser } from '../actions/users';
import { withPageMessage } from '../actions/helpers';
import { pageMessageSelector } from '../reducers/app-messages';
import { routerPathSelector } from '../utils/selectors';
import Message from '../components/message';
import purgePageMessage from '../components/purge-page-message';

const mapStateToProps = (state, ownProps) => {
  const page = routerPathSelector(ownProps);

  return {
    page,
    messages: pageMessageSelector(page, state)
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
    this.props.showUser({ id: this.props.match.params.id })
  }

  render() {
    console.log('pal droplet props', this.props)
    return (
      <section id="friend-droplets">
        <h2>its me, your friend!</h2>
        { this.props.messages.map((message, index) =>
            <Message message={message.message} key={index} />
          )
        }
      </section>
    );
  }
}

const Composed = purgePageMessage(FriendDropletsPage)();

export { FriendDropletsPage };
export default connect(mapStateToProps, mapDispatchToProps)(Composed);
