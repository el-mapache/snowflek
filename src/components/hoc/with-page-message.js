import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addPageMessage } from '../../actions/app-messages/creators';
import { routerPathSelector } from '../../utils/selectors';
import { pageMessageSelector } from '../../reducers/app-messages';

const dispatchPageErrorMessage = dispatch => (message, action) => data => {
  return new Promise((resolve) => {
    const dispatchable = action(dispatch);

    dispatchable(data)
    .then(
      resolve,
      () => {
        dispatch(addPageMessage({
          ...message
        }));
      }
    );
  });
};

const mapStateToProps = (state, ownProps) => {
  const page = routerPathSelector(ownProps);

  return {
    messages: pageMessageSelector(page, state),
    page,
  };
}

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   showUser(data) {
//     const decoratedAction = withPageMessage(dispatch)({
//       page: this.page,
//       message: 'Sorry, it doesn\'t look like that user exists!',
//     }, showUser);

//     return decoratedAction(data);
//   }
// });

const withPageMessage = Component => () => {
  return class extends React.Component {
    renderPageMessages() {
      return this.props.messages.map((message, index) =>
        <Message message={message.message} key={index} />
      );
    }

    render() {
      return (
        <>
          { this.renderPageMessages() }
          <Component {...this.props} />
        </>
      );
    }
  }
};

export default compose(connect(mapStateToProps, null), withPageMessage);
