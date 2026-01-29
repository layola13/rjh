import React, { Component, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import { HSCore } from 'path-to-hscore';
import { IconfontView } from 'path-to-iconfont';

interface PopupWindowState {
  isHovering: boolean;
}

interface PopupWindowProps {
  submitcall: (...args: unknown[]) => void;
  windowname: string;
  winwidth: string;
  oklabel?: string;
  cancellable?: string;
  headername: string;
  contents: React.ReactNode;
}

class PopupWindow extends Component<PopupWindowProps, PopupWindowState> {
  public signalPopupSubmitted: HSCore.Util.Signal<PopupWindow>;

  constructor(props: PopupWindowProps) {
    super(props);
    
    this.signalPopupSubmitted = new HSCore.Util.Signal(this);
    
    this.state = {
      isHovering: false
    };

    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleOkClick = this.handleOkClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  componentDidMount(): void {
    this.signalPopupSubmitted.listen(this.props.submitcall, this);
  }

  componentWillUnmount(): void {
    this.signalPopupSubmitted.unlisten(this.props.submitcall, this);
  }

  handleMouseOver(): void {
    this.setState({
      isHovering: true
    });
  }

  handleMouseOut(): void {
    this.setState({
      isHovering: false
    });
  }

  private _closePopup(): void {
    const popupContainer = document.querySelector('.popupcontainer');
    if (popupContainer) {
      ReactDOM.unmountComponentAtNode(popupContainer);
    }
  }

  handleCancelClick = (): boolean => {
    this._closePopup();
    return false;
  };

  handleOkClick(event: MouseEvent<HTMLButtonElement>): boolean {
    if (event?.stopPropagation) {
      event.stopPropagation();
    } else {
      (window.event as Event).cancelBubble = true;
    }
    
    event.preventDefault();
    this.signalPopupSubmitted.dispatch();
    this._closePopup();
    
    return false;
  }

  render(): JSX.Element {
    const hoverClass = this.state.isHovering ? ' hover' : ' ';
    const windowStyle = {
      width: this.props.winwidth
    };
    const okButtonVisibility = this.props.oklabel ? ' ' : ' hidden ';
    const cancelButtonVisibility = this.props.cancellable ? ' ' : ' hidden ';

    return (
      <div className={this.props.windowname}>
        <div
          style={windowStyle}
          ref="popupwindow"
          className="popupwindows md-modal md-show"
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
                  customStyle={{
                    fontSize: '20px'
                  }}
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
                  className={`btn btn-primary${okButtonVisibility}${hoverClass}`}
                >
                  {this.props.oklabel}
                </button>
                <button
                  type="button"
                  onClick={this.handleCancelClick}
                  className={`btn btn-default${cancelButtonVisibility}`}
                >
                  {this.props.cancellable}
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

export default PopupWindow;