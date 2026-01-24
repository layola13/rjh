import React from 'react';
import PropTypes from 'prop-types';

/**
 * Props for the LoginPanel component
 */
export interface LoginPanelProps {
  /**
   * URL parameters to be passed to the mini login embedder
   */
  urlParams?: Record<string, any> | null;
  
  /**
   * Mini login embedder instance with init method
   */
  miniLoginEmbedder?: {
    init: (params: Record<string, any> | null) => void;
  } | null;
  
  /**
   * Whether to display global login mode with iframe
   * @default false
   */
  isGlobal?: boolean;
  
  /**
   * Login URL for global mode iframe
   * @default ""
   */
  loginUrl?: string;
}

/**
 * LoginPanel component
 * 
 * Renders a login interface with two modes:
 * - Local mode: Displays a split-screen layout with logo and embedded login
 * - Global mode: Displays a full iframe-based login
 */
export default class LoginPanel extends React.Component<LoginPanelProps> {
  /**
   * PropTypes validation (legacy support)
   */
  static propTypes: {
    urlParams: PropTypes.Requireable<object>;
    miniLoginEmbedder: PropTypes.Requireable<object>;
    isGlobal: PropTypes.Requireable<boolean>;
    loginUrl: PropTypes.Requireable<string>;
  };

  /**
   * Default prop values
   */
  static defaultProps: LoginPanelProps;

  /**
   * Initializes the mini login embedder on component mount (non-global mode only)
   */
  componentDidMount(): void;

  /**
   * Renders the login panel UI
   * @returns React element representing the login interface
   */
  render(): React.ReactElement;
}