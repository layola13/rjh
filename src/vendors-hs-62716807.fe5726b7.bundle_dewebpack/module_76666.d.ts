import { Component, ReactNode, createElement } from 'react';

/**
 * Error boundary component state
 */
interface ErrorBoundaryState {
  /** The caught error object */
  error: Error | undefined;
  /** Additional error information from React */
  info: {
    /** Stack trace of component hierarchy where error occurred */
    componentStack: string;
  };
}

/**
 * Error boundary component props
 */
interface ErrorBoundaryProps {
  /** Custom error message to display. Defaults to error.toString() */
  message?: string;
  /** Custom error description. Defaults to component stack trace */
  description?: string;
  /** Child components to render when no error exists */
  children?: ReactNode;
}

/**
 * Alert/Result component props for displaying errors
 */
interface AlertProps {
  /** Type of alert to display */
  type: 'error';
  /** Error message heading */
  message: ReactNode;
  /** Detailed error description */
  description: ReactNode;
}

/**
 * React Error Boundary component that catches JavaScript errors anywhere in the child
 * component tree, logs those errors, and displays a fallback UI instead of crashing.
 * 
 * @example
 *