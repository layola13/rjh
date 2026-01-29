import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TooltipHelper from './tooltipHelper';
import Logger from './logger';

interface DragPopupWindowProps {
  submitcall?: (this: DragPopupWindow) => void;
  cancelcall?: (this: DragPopupWindow) => void;
  cancelCmd?: () => void;
  windowname?: string;
  oklabel?: string;
  cancellabel?: string;
  headername?: string;
  contents?: React.ReactElement;
  winwidth: number;
  winright?: number;
  winleft?: number;
  wintop?: number;
  winheight?: number;
  winMaxheight?: number;
  hasHelp?: boolean;
  tooltip?: string;
  popover?: string;
}

interface DragPopupWindowState {
  isHovering: boolean;
}

interface Signal<T> {
  listen(callback: (this: T) => void, context: T): void;
  unlisten(callback: (this: T) => void, context: T): void;
  dispatch(): void;
}

declare global {
  namespace HSCore.Util {
    class Signal<T> {
      constructor(context: T);
      listen(callback: (this: T) => void, context: T): void;
      unlisten(callback: (this: T) => void, context: T): void;
      dispatch(): void;
    }
  }
  
  namespace HSApp {
    interface App {
      errorLogger: {
        push(message: string, details: ErrorDetails): void;
      };
    }
    
    namespace App {
      function getApp(): App;
    }
  }

  interface ErrorDetails {
    errorStack: Error;
    description: string;
    errorInfo: {
      info: unknown;
      path: {
        file: string;
        functionName: string;
      };
    };
  }
}

class DragPopupWindow extends React.Component<DragPopupWindowProps, DragPopupWindowState> {
  static propTypes = {
    submitcall: PropTypes.func,
    cancelcall: PropTypes.func,
    cancelCmd: PropTypes.func,
    windowname: PropTypes.string,
    oklabel: PropTypes.string,
    cancellabel: PropTypes.string,
    headername: PropTypes.string,
    contents: PropTypes.element,
    winwidth: PropTypes.number,
    winleft: PropTypes.number,
    winheight: PropTypes.number,
    hasHelp: PropTypes.bool
  };

  private x: number;
  private y: number;
  private signalPopupSubmitted: Signal<DragPopupWindow>;
  private signalPopupCanceled: Signal<DragPopupWindow>;
  private moving: boolean;
  private lastX: number | null;
  private lastY: number | null;
  private beginX?: number;
  private beginY?: number;
  private refs: {
    dragPopupWindow: HTMLDivElement;
    tooltipContainer: HTMLDivElement;
  };

  constructor(props: DragPopupWindowProps) {
    super(props);
    
    this.state = {
      isHovering: false
    };
    
    this.x = props.winright ?? 0;
    this.y = props.wintop ?? 0;
    this.signalPopupSubmitted = new HSCore.Util.Signal(this);
    this.signalPopupCanceled = new HSCore.Util.Signal(this);
    this.moving = false;
    this.lastX = null;
    this.lastY = null;
    
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleOkClick = this.handleOkClick.bind(this);
    
    document.onmouseup = (e: MouseEvent) => this.onMouseUp(e);
    document.onmousemove = (e: MouseEvent) => this.onMouseMove(e);
  }

  componentDidMount(): void {
    if (this.props.submitcall) {
      this.signalPopupSubmitted.listen(this.props.submitcall, this);
    }
    
    if (this.props.cancelcall) {
      this.signalPopupCanceled.listen(this.props.cancelcall, this);
    }
    
    if (this.props.hasHelp) {
      TooltipHelper.create(this.refs.tooltipContainer, {
        src: 'plugin/commonUI/res/question.svg',
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

  onMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    this.moving = true;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.beginX = this.x;
    this.beginY = this.y;
  };

  onMouseUp = (): void => {
    this.moving = false;
    this.lastX = null;
    this.lastY = null;
  };

  onMouseMove = (e: MouseEvent): void => {
    e.stopPropagation();
    if (this.moving) {
      this.onMove(e);
    }
  };

  onMove = (e: MouseEvent): void => {
    if (this.lastX === null || this.lastY === null || this.beginX === undefined || this.beginY === undefined) {
      return;
    }
    
    const deltaX = e.clientX - this.lastX;
    const deltaY = e.clientY - this.lastY;
    
    this.x = this.beginX - deltaX;
    this.y = this.beginY + deltaY;
    
    this.refs.dragPopupWindow.style.right = `${this.x}px`;
    this.refs.dragPopupWindow.style.top = `${this.y}px`;
  };

  handleCancelClick = (e?: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>, skipCmd?: boolean): boolean => {
    if (e?.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
    
    e?.preventDefault();
    
    if (!skipCmd && this.props.cancelCmd) {
      this.props.cancelCmd();
    }
    
    this.signalPopupCanceled.dispatch();
    this._closePopup();
    
    return false;
  };

  private _closePopup(): void {
    try {
      const popupContainer = document.querySelector('.popupcontainer');
      if (popupContainer) {
        ReactDOM.unmountComponentAtNode(popupContainer);
      }
    } catch (error) {
      Logger.logger.error(error);
      
      const errorMessage = 'Close dragPopup window error';
      HSApp.App.getApp().errorLogger.push(errorMessage, {
        errorStack: new Error(errorMessage),
        description: errorMessage,
        errorInfo: {
          info: error,
          path: {
            file: 'homestyler-tools-web/web/plugin/commonUI/widgets/newdragpopupwindow.js',
            functionName: '_closePopup()'
          }
        }
      });
    }
  }

  handleOkClick = (e: React.MouseEvent<HTMLButtonElement>): boolean => {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
    
    e.preventDefault();
    
    this.signalPopupSubmitted.dispatch();
    this._closePopup();
    
    return false;
  };

  render(): React.ReactElement {
    const hoverClass = this.state.isHovering ? ' hover' : ' ';
    
    const windowStyle: React.CSSProperties = {
      width: this.props.winwidth,
      right: this.props.winright ?? (document.body.clientWidth - this.props.winwidth) / 2,
      top: this.props.wintop ?? 0
    };
    
    if (this.props.winheight) {
      windowStyle.height = this.props.winheight;
    }
    
    if (this.props.winMaxheight) {
      windowStyle.maxHeight = this.props.winMaxheight;
    }
    
    const okButtonClass = this.props.oklabel ? ' ' : ' hidden ';
    const cancelButtonClass = this.props.cancellabel ? ' ' : ' hidden ';
    
    return (
      <div className={this.props.windowname}>
        <div
          style={windowStyle}
          ref="dragPopupWindow"
          className="DragPopupWindows md-modal-c md-effect-1 md-show"
        >
          <div className="windowWrapper popup-window">
            <div
              className="windowHeader window-header"
              ref="tooltipContainer"
              onMouseDown={this.onMouseDown}
            >
              <h2 className="title">{this.props.headername}</h2>
            </div>
            <div className="windowContents window-contents">
              <div className="contentsWrapper">{this.props.contents}</div>
            </div>
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
        <div className="popupoverlay md-overlay" onClick={this.handleCancelClick} />
      </div>
    );
  }
}

export default DragPopupWindow;