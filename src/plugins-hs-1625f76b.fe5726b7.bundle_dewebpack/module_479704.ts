import React from 'react';
import ReactDOM from 'react-dom';
import { IconfontView } from './IconfontView';

interface PopupWindowProps {
  submitcall?: () => void;
  cancelcall?: () => void;
  windowname?: string;
  oklabel?: string;
  cancellabel?: string;
  headername?: string;
  contents?: React.ReactElement;
  winwidth: number;
  winheight?: number;
  wintop?: number;
  hasHelp?: boolean;
  tooltip?: string;
  popover?: string;
}

interface PopupWindowState {
  isHovering: boolean;
}

interface Signal {
  listen(callback: () => void, context: unknown): void;
  unlisten(callback: () => void, context: unknown): void;
  dispatch(): void;
}

interface TooltipHelper {
  create(container: HTMLElement, options: {
    src: string;
    tooltip?: string;
    popover?: string;
  }): void;
}

declare global {
  const HSCore: {
    Util: {
      Signal: new (context: unknown) => Signal;
    };
  };
  const HSApp: {
    App: {
      getApp(): {
        errorLogger: {
          push(message: string, details: {
            errorStack: Error;
            description: string;
            errorInfo: {
              info: unknown;
              path: {
                file: string;
                functionName: string;
              };
            };
          }): void;
        };
      };
    };
  };
  interface Window {
    event: {
      cancelBubble: boolean;
    };
  }
}

export default class PopupWindow extends React.Component<PopupWindowProps, PopupWindowState> {
  private signalPopupSubmitted: Signal;
  private signalPopupCanceled: Signal;
  private refs: {
    tooltipContainer?: HTMLElement;
    popupwindow?: HTMLElement;
  };

  constructor(props: PopupWindowProps) {
    super(props);
    this.state = {
      isHovering: false
    };
    this.signalPopupSubmitted = new HSCore.Util.Signal(this);
    this.signalPopupCanceled = new HSCore.Util.Signal(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleOkClick = this.handleOkClick.bind(this);
    this.refs = {};
  }

  componentDidMount(): void {
    if (this.props.submitcall) {
      this.signalPopupSubmitted.listen(this.props.submitcall, this);
    }
    if (this.props.cancelcall) {
      this.signalPopupCanceled.listen(this.props.cancelcall, this);
    }
    if (this.props.hasHelp && this.refs.tooltipContainer) {
      const tooltipHelper: TooltipHelper = (window as any).default;
      tooltipHelper.create(this.refs.tooltipContainer, {
        src: "plugin/commonUI/res/question.svg",
        tooltip: this.props.tooltip,
        popover: this.props.popover
      });
    }
  }

  componentWillUnmount(): void {
    if (this.props.submitcall) {
      this.signalPopupSubmitted.unlisten(this.props.submitcall, this);
    }
    if (this.props.cancelcall) {
      this.signalPopupCanceled.unlisten(this.props.cancelcall, this);
    }
  }

  handleMouseOver = (): void => {
    this.setState({
      isHovering: true
    });
  };

  handleMouseOut = (): void => {
    this.setState({
      isHovering: false
    });
  };

  handleCancelClick(event?: React.MouseEvent): boolean {
    if (event?.stopPropagation) {
      event.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
    event?.preventDefault();
    this.signalPopupCanceled.dispatch();
    this._closePopup();
    return false;
  }

  private _closePopup(): void {
    try {
      const popupContainer = document.querySelector(".popupcontainer");
      if (popupContainer) {
        ReactDOM.unmountComponentAtNode(popupContainer);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = "Close popup window error";
      HSApp.App.getApp().errorLogger.push(errorMessage, {
        errorStack: new Error(errorMessage),
        description: errorMessage,
        errorInfo: {
          info: error,
          path: {
            file: "homestyler-tools-web/web/plugin/commonUI/widgets/newpopupwindow.js",
            functionName: "_closePopup()"
          }
        }
      });
    }
  }

  handleOkClick(event?: React.MouseEvent): boolean {
    if (event?.stopPropagation) {
      event.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
    event?.preventDefault();
    this.signalPopupSubmitted.dispatch();
    this._closePopup();
    return false;
  }

  render(): React.ReactElement {
    const hoverClass = this.state.isHovering ? " hover" : " ";
    const windowStyle: React.CSSProperties = {
      width: this.props.winwidth,
      left: (document.body.clientWidth - this.props.winwidth) / 2
    };

    if (this.props.winheight) {
      windowStyle.height = this.props.winheight;
      windowStyle.top = this.props.wintop;
    }

    const okButtonClass = this.props.oklabel ? " " : " hidden ";
    const cancelButtonClass = this.props.cancellabel ? " " : " hidden ";

    return (
      <div className={this.props.windowname}>
        <div
          style={windowStyle}
          ref={(ref) => { this.refs.popupwindow = ref ?? undefined; }}
          className="popupwindows md-modal md-effect-1 md-show"
        >
          <div className="windowWrapper popup-window">
            <div
              className="windowHeader window-header"
              ref={(ref) => { this.refs.tooltipContainer = ref ?? undefined; }}
            >
              <h2 className="title">{this.props.headername}</h2>
              <span
                className="popupwindow-close-btn"
                onClick={this.handleCancelClick}
              >
                <IconfontView
                  showType="hs_xian_guanbi"
                  customStyle={{ fontSize: "20px" }}
                  clickColor="#396EFE"
                  hoverBgColor="#f5f5f5"
                  bgExtendSize={10}
                />
              </span>
            </div>
            <div className="windowContents window-contents">
              <div className="contentsWrapper">{this.props.contents}</div>
              <div className="footerbuttons footer-buttons">
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
                  {this.props.cancellabel}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="popupoverlay md-overlay"
          onClick={this.handleCancelClick}
        />
      </div>
    );
  }
}