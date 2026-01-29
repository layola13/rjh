import React from 'react';
import ReactDOM from 'react-dom';
import { IconfontView } from './IconfontView';

interface PopupWindowProps {
  submitcall?: () => void;
  windowname?: string;
  oklabel?: string;
  cancellable?: string;
  headername?: string;
  contents?: React.ReactElement;
  winwidth?: number;
}

interface PopupWindowState {
  isHovering: boolean;
}

class Signal<T> {
  private listeners: Array<{ callback: Function; context?: any }> = [];

  listen(callback: Function, context?: any): void {
    this.listeners.push({ callback, context });
  }

  unlisten(callback: Function, context?: any): void {
    this.listeners = this.listeners.filter(
      listener => listener.callback !== callback || listener.context !== context
    );
  }

  dispatch(data?: T): void {
    this.listeners.forEach(listener => {
      listener.callback.call(listener.context, data);
    });
  }
}

export class PopupWindow extends React.Component<PopupWindowProps, PopupWindowState> {
  private signalPopupSubmitted: Signal<void> = new Signal<void>();

  constructor(props: PopupWindowProps) {
    super(props);
    this.state = {
      isHovering: false
    };
  }

  componentDidMount(): void {
    if (this.props.submitcall) {
      this.signalPopupSubmitted.listen(this.props.submitcall, this);
    }
  }

  componentWillUnmount(): void {
    if (this.props.submitcall) {
      this.signalPopupSubmitted.unlisten(this.props.submitcall, this);
    }
  }

  private handleMouseOver = (): void => {
    this.setState({ isHovering: true });
  };

  private handleMouseOut = (): void => {
    this.setState({ isHovering: false });
  };

  private handleCancelClick = (): boolean => {
    this.closePopup();
    return false;
  };

  private closePopup(): void {
    try {
      const container = document.querySelector('.popupcontainer');
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
      }
    } catch (error) {
      console.error('Error closing popup:', error);
      
      if (typeof HSApp !== 'undefined' && HSApp.App?.getApp()?.errorLogger) {
        const errorMessage = 'plugin.customizedmodeling error';
        HSApp.App.getApp().errorLogger.push(errorMessage, {
          errorStack: new Error(errorMessage),
          description: errorMessage,
          errorInfo: {
            info: error,
            path: {
              file: 'homestyler-tools-web/web/plugin/customizedmodeling/ui/widgets/popupwindow.js',
              functionName: '_closePopup()'
            }
          }
        });
      }
    }
  }

  private handleOkClick = (event: React.MouseEvent<HTMLButtonElement>): boolean => {
    if (event?.stopPropagation) {
      event.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
    
    event.preventDefault();
    this.signalPopupSubmitted.dispatch();
    this.closePopup();
    return false;
  };

  render(): React.ReactElement {
    const hoverClass = this.state.isHovering ? ' hover' : ' ';
    const windowWidth = this.props.winwidth ?? 500;
    const windowStyle: React.CSSProperties = {
      width: windowWidth,
      left: (document.body.clientWidth - windowWidth) / 2
    };
    const okButtonClass = this.props.oklabel ? ' ' : ' hidden ';
    const cancelButtonClass = this.props.cancellable ? ' ' : ' hidden ';

    return (
      <div className={this.props.windowname}>
        <div
          style={windowStyle}
          className="diy-popupwindows md-modal md-effect-1 md-show"
        >
          <div className="windowWrapper">
            <div className="windowHeader">
              <h2 className="title">{this.props.headername}</h2>
              <span
                className="popupwindow-close-btn"
                onClick={this.handleCancelClick}
              >
                <IconfontView
                  showType="hs_xian_guanbi"
                  customStyle={{ fontSize: '20px' }}
                  clickColor="#396EFE"
                  hoverBgColor="#f5f5f5"
                  bgExtendSize={10}
                />
              </span>
            </div>
            <div className="windowContents">
              <div className="contentsWrapper">{this.props.contents}</div>
              <div className="footerbuttons">
                <button
                  type="button"
                  onClick={this.handleOkClick}
                  onMouseOver={this.handleMouseOver}
                  onMouseOut={this.handleMouseOut}
                  className={`btn btn-primary${okButtonClass}${hoverClass}`}
                >
                  {this.props.oklabel}
                </button>
                <button
                  type="button"
                  onClick={this.handleCancelClick}
                  className={`btn btn-default${cancelButtonClass}`}
                >
                  {this.props.cancellable}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="popupoverlay md-overlay" onClick={this.handleCancelClick} />
        <div className="diy-files-uploader-container-mask" />
      </div>
    );
  }
}

export function showPopup(submitCallback: () => void): void {
  const popupElement = (
    <div className="popup">
      <PopupWindow
        windowname="createnewwishlist"
        headername={ResourceManager.getString('create_wish_list')}
        winwidth={500}
        submitcall={submitCallback}
        oklabel={ResourceManager.getString('wish_list_add_text')}
        cancellable={ResourceManager.getString('cancel')}
      />
    </div>
  );

  const container = document.querySelector('.popupcontainer');
  if (container) {
    ReactDOM.render(popupElement, container);
  }
}