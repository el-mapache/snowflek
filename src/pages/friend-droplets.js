import React from 'react';
import { connect } from 'react-redux';
import { showUser } from '../actions/users';
import { withPageMessage } from '../actions/helpers';
import { pageMessageSelector } from '../reducers/app-messages';
import { routerPathSelector, routerIdParamSelector } from '../utils/selectors';
import { userSelector } from '../reducers/users';
import Message from '../components/message';
import purgePageMessage from '../components/purge-page-message';

const mapStateToProps = (state, ownProps) => {
  const page = routerPathSelector(ownProps);
  const friend = userSelector(state.users, routerIdParamSelector(ownProps));

  return {
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
