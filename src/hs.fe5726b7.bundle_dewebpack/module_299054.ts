import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

interface NotificationPopupProps {
  className?: string;
  content?: string;
  btnText?: string;
  noclose?: boolean;
  noicon?: boolean;
  onClick?: () => void;
}

interface NotificationPopupState {
  show: boolean;
}

interface ShowNotificationOptions {
  content: string;
  btnText: string;
  onClick?: () => void;
  noclose?: boolean;
  noicon?: boolean;
  className?: string;
}

class NotificationPopup extends React.Component<NotificationPopupProps, NotificationPopupState> {
  static propTypes = {
    className: PropTypes.string,
    content: PropTypes.string,
    btnText: PropTypes.string,
    noclose: PropTypes.bool,
    noicon: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps: NotificationPopupProps = {
    className: '',
    content: '',
    btnText: '',
    noclose: false,
    noicon: false
  };

  constructor(props: NotificationPopupProps) {
    super(props);
    this.state = {
      show: true
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: NotificationPopupProps): void {
    this.setState({
      show: true
    });
  }

  gotIt = (): void => {
    this.props.onClick?.();
    this.close();
  };

  close = (): void => {
    this.setState({
      show: false
    });
  };

  render(): React.ReactElement {
    const hiddenClass = this.state.show ? '' : ' hidden';
    const closeButton = this.props.noclose ? undefined : (
      <img
        className="closebtn"
        src={require('./path/to/close-icon')}
        onClick={this.gotIt}
      />
    );
    const noIconClass = this.props.noicon ? 'noicon' : '';

    return (
      <div className={`notificationpopupwrapper ${this.props.className}${hiddenClass}`}>
        <div className="mask" />
        <div className="notificationpopup">
          <div className="header">{closeButton}</div>
          <div className={`content ${noIconClass}`}>
            <img
              className="image"
              src={require('./path/to/notification-icon')}
            />
            <div className="text">{this.props.content}</div>
          </div>
          <div className="actions">
            <div className="notification-btn" onClick={this.gotIt}>
              {this.props.btnText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function showNotification(options: ShowNotificationOptions): void {
  const { content, btnText, onClick, noclose, noicon, className } = options;
  
  let notificationNode = document.querySelector<HTMLDivElement>('#ui-container .notification-node');
  
  if (!notificationNode) {
    const uiContainer = document.querySelector<HTMLElement>('#ui-container');
    if (uiContainer) {
      notificationNode = document.createElement('div');
      notificationNode.className = 'notification-node';
      uiContainer.appendChild(notificationNode);
    }
  }

  if (notificationNode) {
    ReactDOM.render(
      <NotificationPopup
        content={content}
        btnText={btnText}
        onClick={onClick}
        noclose={noclose}
        noicon={noicon}
        className={className}
      />,
      notificationNode
    );
  }
}

export default {
  showNotification
};