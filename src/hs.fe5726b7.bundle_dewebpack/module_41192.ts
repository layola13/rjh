import React from 'react';
import PropTypes from 'prop-types';

interface LoginPanelProps {
  urlParams: Record<string, unknown> | null;
  miniLoginEmbedder: {
    init: (params: Record<string, unknown> | null) => void;
  } | null;
  isGlobal: boolean;
  loginUrl: string;
}

/**
 * LoginPanel component for rendering authentication UI
 * Supports both embedded and global login modes
 */
export default class LoginPanel extends React.Component<LoginPanelProps> {
  static propTypes = {
    urlParams: PropTypes.object,
    miniLoginEmbedder: PropTypes.object
  };

  static defaultProps: LoginPanelProps = {
    urlParams: null,
    miniLoginEmbedder: null,
    isGlobal: false,
    loginUrl: ""
  };

  componentDidMount(): void {
    const { isGlobal, miniLoginEmbedder, urlParams } = this.props;
    
    if (!isGlobal && miniLoginEmbedder) {
      miniLoginEmbedder.init(urlParams);
    }
  }

  render(): React.ReactElement {
    const { isGlobal, loginUrl } = this.props;
    const logoImageUrl = `${HSApp.Config.LOGO_LEFT_IMG}?t=${Date.now()}`;

    let bodyContent: React.ReactElement;

    if (isGlobal) {
      bodyContent = (
        <div className="global-body">
          <iframe
            className="login-iframe"
            frameBorder="0"
            src={loginUrl}
          />
        </div>
      );
    } else {
      bodyContent = (
        <div className="login-body">
          <div className="left">
            <img className="left-bg" src={logoImageUrl} />
          </div>
          <div className="right">
            <div id="alibaba-login-iframe">
              <div id="alibaba-login-iframe-loading" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="login-panel">
        <div className="login-overlay" />
        {bodyContent}
      </div>
    );
  }
}