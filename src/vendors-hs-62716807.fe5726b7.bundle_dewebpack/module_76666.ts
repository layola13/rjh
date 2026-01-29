import React, { Component, ReactNode, ErrorInfo } from 'react';
import ErrorDisplay from './ErrorDisplay';

interface ErrorBoundaryProps {
  message?: string;
  description?: string;
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | undefined;
  info: ErrorInfo;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: undefined,
      info: {
        componentStack: ''
      }
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({
      error,
      info
    });
  }

  render(): ReactNode {
    const { message, description, children } = this.props;
    const { error, info } = this.state;
    
    const componentStack = info?.componentStack ?? null;
    const errorMessage = message ?? (error ?? '').toString();
    const errorDescription = description ?? componentStack;

    if (error) {
      return React.createElement(ErrorDisplay, {
        type: 'error',
        message: errorMessage,
        description: React.createElement('pre', null, errorDescription)
      });
    }

    return children;
  }
}