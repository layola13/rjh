import React, { Component, ReactNode, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { CatalogInput, InputTypeEnum } from './CatalogInput';
import { IconfontView } from './IconfontView';

interface PopupWindowProps {
  windowname: string;
  headername: string;
  contents: ReactNode;
  winwidth: number;
  winheight?: number;
  submitcall: (context: PopupWindow) => void;
  cancelcall?: (context: PopupWindow) => void;
  oklabel?: string;
  cancellabel?: string;
  maskClosable?: boolean;
  hasHelp?: boolean;
  tooltip?: string;
  popover?: string;
}

interface PopupWindowState {
  isHovering: boolean;
  isCloseIconHover: boolean;
  visible: boolean;
}

declare const HSCore: {
  Util: {
    Signal: new (context: unknown) => {
      listen: (callback: Function, context: unknown) => void;
      unlisten: (callback: Function, context: unknown) => void;
      dispatch: () => void;
    };
  };
};

declare const ResourceManager: {
  getString: (key: string) => string;
};

interface TooltipHelper {
  create: (container: Element, config: {
    src: string;
    tooltip?: string;
    popover?: string;
  }) => void;
}

declare const TooltipHelper: TooltipHelper;

interface Logger {
  error: (error: unknown) => void;
}

declare const Logger: {
  logger: () => Logger;
};

export class PopupWindow extends Component<PopupWindowProps, PopupWindowState> {
  private signalPopupSubmitted: {
    listen: (callback: Function, context: unknown) => void;
    unlisten: (callback: Function, context: unknown) => void;
    dispatch: () => void;
  };
  
  private signalPopupCanceled: {
    listen: (callback: Function, context: unknown) => void;
    unlisten: (callback: Function, context: unknown) => void;
    dispatch: () => void;
  };

  private refs: {
    tooltipContainer?: Element;
  } = {};

  constructor(props: PopupWindowProps) {
    super(props);
    
    this.state = {
      isHovering: false,
      isCloseIconHover: false,
      visible: true
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleCloseIconMouseOver = this.handleCloseIconMouseOver.bind(this);
    this.handleCloseIconMouseOut = this.handleCloseIconMouseOut.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleOkClick = this.handleOkClick.bind(this);

    this.signalPopupSubmitted = new HSCore.Util.Signal(this);
    this.signalPopupCanceled = new HSCore.Util.Signal(this);
  }

  componentDidMount(): void {
    this.signalPopupSubmitted.listen(this.props.submitcall, this);
    
    if (this.props.cancelcall) {
      this.signalPopupCanceled.listen(this.props.cancelcall, this);
    }

    if (this.props.hasHelp && this.refs.tooltipContainer) {
      TooltipHelper.create(this.refs.tooltipContainer, {
        src: "plugin/commonUI/res/question.svg",
        tooltip: this.props.tooltip,
        popover: this.props.popover
      });
    }
  }

  componentWillUnmount(): void {
    this.signalPopupSubmitted.unlisten(this.props.submitcall, this);
    
    if (this.props.cancelcall) {
      this.signalPopupCanceled.unlisten(this.props.cancelcall, this);
    }
  }

  handleMouseOver(): void {
    this.setState({ isHovering: true });
  }

  handleMouseOut(): void {
    this.setState({ isHovering: false });
  }

  handleCloseIconMouseOver(): void {
    this.setState({ isCloseIconHover: true });
  }

  handleCloseIconMouseOut(): void {
    this.setState({ isCloseIconHover: false });
  }

  handleCancelClick(event?: React.MouseEvent): boolean {
    if (!this.props.maskClosable) {
      if (event?.stopPropagation) {
        event.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true;
      }

      event?.preventDefault();
      this.signalPopupCanceled.dispatch();
      this.closePopup();
    }
    return false;
  }

  setVisible(visible: boolean): void {
    this.setState({ visible });
  }

  private closePopup(): void {
    try {
      const container = document.querySelector(".popupcontainer");
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
      }
    } catch (error) {
      Logger.logger().error(error);
    }
  }

  handleOkClick(event: React.MouseEvent): boolean {
    if (event?.stopPropagation) {
      event.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }

    event.preventDefault();
    this.signalPopupSubmitted.dispatch();
    this.closePopup();
    return false;
  }

  render(): ReactNode {
    const hoverClass = this.state.isHovering ? " hover" : " ";
    
    const windowStyle: CSSProperties = {
      width: this.props.winwidth
    };

    if (this.props.winheight) {
      windowStyle.height = this.props.winheight;
    }

    const okButtonClass = this.props.oklabel ? " " : " hidden ";
    const cancelButtonClass = this.props.cancellabel ? " " : " hidden ";

    return (
      <div
        className={`${this.props.windowname} popupwindows-wrapper`}
        style={{
          display: this.state.visible ? "block" : "none",
          paddingTop: 15
        }}
      >
        <div
          style={windowStyle}
          ref="popupwindow"
          className="popupwindows md-modal md-effect-1 md-show"
        >
          <div className="windowWrapper">
            <div className="windowHeader" ref="tooltipContainer">
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
            <div className="windowContents">
              <div className="contentsWrapper">{this.props.contents}</div>
              <div className="footerbuttons">
                <button
                  type="button"
                  onClick={this.handleCancelClick}
                  className={`btn btn-default${cancelButtonClass}`}
                >
                  {this.props.cancellabel}
                </button>
                <button
                  type="button"
                  onClick={this.handleOkClick}
                  onMouseOver={this.handleMouseOver}
                  onMouseOut={this.handleMouseOut}
                  className={`btn btn-primary${okButtonClass}${hoverClass}`}
                >
                  {this.props.oklabel}
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

export function showPopup(submitCallback: (context: PopupWindow) => void): void {
  const inputContent = (
    <p>
      <CatalogInput
        inputtype={InputTypeEnum.Text}
        className="wishlistname"
        placeholder="Name this wish list"
      />
    </p>
  );

  const popup = (
    <div className="popup">
      <PopupWindow
        windowname="createnewwishlist"
        headername={ResourceManager.getString("create_wish_list")}
        contents={inputContent}
        winwidth={500}
        submitcall={submitCallback}
        oklabel={ResourceManager.getString("wish_list_add_text")}
        cancellabel={ResourceManager.getString("cancel")}
      />
    </div>
  );

  const container = document.querySelector(".popupcontainer");
  if (container) {
    ReactDOM.render(popup, container);
  }
}