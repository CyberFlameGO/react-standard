import React, { PropsWithChildren } from "react";

export interface ErrorBoundaryState {
  error: any;
  errorInfo: any;
}
export interface ErrorBoundaryProps extends PropsWithChildren {
  /**
   * The path to be rendererd when an error occurs.
   */
  errorPath: (state: ErrorBoundaryState) => JSX.Element;
}

/**
 * The error boundary is a component that, upon an error occurring
 * within its children, will unmount them from the tree and instead render the `errorPath` component,
 * as specified in the props.
 *
 * If the component's children change, the error boundary will erase the error and re-mount the children.
 *
 * As with all error boundaries in React, the error boundary will not catch errors raised in timers or event handlers.
 */
export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidUpdate(previousProps: PropsWithChildren<any>) {
    if (previousProps.children !== this.props.children)
      this.setState({ error: null, errorInfo: null });
  }
  componentDidCatch(error: any, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return this.props.errorPath(this.state);
    }
    // Normally, just render children
    return this.props.children;
  }
}
