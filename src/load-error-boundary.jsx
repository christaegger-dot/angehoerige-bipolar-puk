import React from 'react';

// Keep the surrounding navigation usable when a lazy chunk cannot be loaded.
// A full reload is required to retry a rejected React.lazy import.
class LoadErrorBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidUpdate(previousProps) {
    if (this.state.failed && previousProps.resetKey !== this.props.resetKey) {
      this.setState({ failed: false });
    }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export { LoadErrorBoundary };
