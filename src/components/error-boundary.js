import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState(state => ({
      ...state,
      error: errorInfo
    }));
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2>Something went wrong!</h2>
          {this.state.error}
        </>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;