import React from 'react';
import ReactDOM from 'react-dom';
import { CatalogInput, InputTypeEnum } from './CatalogInput';
import { IconfontView } from './IconfontView';

/**
 * Props for the PopupWindow component
 */
interface PopupWindowProps {
  /** Unique identifier for the popup window */
  windowname: string;
  /** Title displayed in the popup header */
  headername: string;
  /** Content to be rendered inside the popup body */
  contents: React.ReactNode;
  /** Width of the popup window in pixels */
  winwidth: number;
  /** Optional height of the popup window in pixels */
  winheight?: number;
  /** Callback function invoked when the OK button is clicked */
  submitcall: (this: PopupWindow) => void;
  /** Optional callback function invoked when the Cancel button is clicked */
  cancelcall?: (this: PopupWindow) => void;
  /** Label text for the OK button. If empty, button is hidden */
  oklabel?: string;
  /** Label text for the Cancel button. If empty, button is hidden */
  cancellabel?: string;
  /** Whether clicking the overlay mask closes the popup */
  maskClosable?: boolean;
  /** Whether to show a help icon with tooltip */
  hasHelp?: boolean;
  /** Tooltip text for the help icon */
  tooltip?: string;
  /** Popover content for the help icon */
  popover?: string;
}

/**
 * State for the PopupWindow component
 */
interface PopupWindowState {
  /** Whether the OK button is being hovered */
  isHovering: boolean;
  /** Whether the close icon is being hovered */
  isCloseIconHover: boolean;
  /** Whether the popup is visible */
  visible: boolean;
}

/**
 * A modal popup window component with customizable content and actions
 */
export class PopupWindow extends React.Component<PopupWindowProps, PopupWindowState> {
  /** Signal dispatched when the popup is submitted (OK clicked) */
  private signalPopupSubmitted?: HSCore.Util.Signal<PopupWindow>;
  
  /** Signal dispatched when the popup is canceled */
  private signalPopupCanceled?: HSCore.Util.Signal<PopupWindow>;
  
  /** Reference to the tooltip container element */
  private readonly refs: {
    tooltipContainer?: HTMLDivElement;
    popupwindow?: HTMLDivElement;
  };

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
    this.refs = {};
  }

  componentDidMount(): void {
    this.signalPopupSubmitted?.listen(this.props.submitcall, this);
    
    if (this.props.cancelcall) {
      this.signalPopupCanceled?.listen(this.props.cancelcall, this);
    }

    if (this.props.hasHelp && this.refs.tooltipContainer) {
      // Assuming TooltipHelper.create is available
      (window as any).TooltipHelper?.create(this.refs.tooltipContainer, {
        src: 'plugin/commonUI/res/question.svg',
        tooltip: this.props.tooltip,
        popover: this.props.popover
      });
    }
  }

  componentWillUnmount(): void {
    this.signalPopupSubmitted?.unlisten(this.props.submitcall, this);
    
    if (this.props.cancelcall) {
      this.signalPopupCanceled?.unlisten(this.props.cancelcall, this);
    }
  }

  /** Handler for mouse entering the OK button */
  private handleMouseOver(): void {
    this.setState({ isHovering: true });
  }

  /** Handler for mouse leaving the OK button */
  private handleMouseOut(): void {
    this.setState({ isHovering: false });
  }

  /** Handler for mouse entering the close icon */
  private handleCloseIconMouseOver(): void {
    this.setState({ isCloseIconHover: true });
  }

  /** Handler for mouse leaving the close icon */
  private handleCloseIconMouseOut(): void {
    this.setState({ isCloseIconHover: false });
  }

  /**
   * Handler for cancel button click or overlay click
   * @param event - Mouse event from the click
   * @returns false to prevent default behavior
   */
  private handleCancelClick(event?: React.MouseEvent): boolean {
    if (!this.props.maskClosable) {
      if (event?.stopPropagation) {
        event.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true;
      }

      event?.preventDefault();
      this.signalPopupCanceled?.dispatch();
      this._closePopup();
    }
    
    return false;
  }

  /**
   * Sets the visibility state of the popup
   * @param visible - Whether the popup should be visible
   */
  public setVisible(visible: boolean): void {
    this.setState({ visible });
  }

  /** Closes and unmounts the popup from the DOM */
  private _closePopup(): void {
    try {
      const container = document.querySelector('.popupcontainer');
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Handler for OK button click
   * @param event - Mouse event from the click
   * @returns false to prevent default behavior
   */
  private handleOkClick(event: React.MouseEvent): boolean {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }

    event.preventDefault();
    this.signalPopupSubmitted?.dispatch();
    this._closePopup();
    
    return false;
  }

  render(): React.ReactElement {
    const hoverClass = this.state.isHovering ? ' hover' : ' ';
    
    const windowStyle: React.CSSProperties = {
      width: this.props.winwidth
    };
    
    if (this.props.winheight) {
      windowStyle.height = this.props.winheight;
    }

    const okButtonClass = this.props.oklabel ? ' ' : ' hidden ';
    const cancelButtonClass = this.props.cancellabel ? ' ' : ' hidden ';

    return (
      <div
        className={`${this.props.windowname} popupwindows-wrapper`}
        style={{
          display: this.state.visible ? 'block' : 'none',
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
              <span className="popupwindow-close-btn" onClick={this.handleCancelClick}>
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
        <div className="popupoverlay md-overlay" onClick={this.handleCancelClick} />
      </div>
    );
  }
}

/**
 * Shows a popup dialog for creating a new wishlist
 * @param submitCallback - Callback function invoked when the wishlist is created
 */
export function showPopup(submitCallback: (this: PopupWindow) => void): void {
  const inputContent = (
    <p>
      <CatalogInput
        inputtype={InputTypeEnum.Text}
        className="wishlistname"
        placeholder="Name this wish list"
      />
    </p>
  );

  const popupElement = (
    <div className="popup">
      <PopupWindow
        windowname="createnewwishlist"
        headername={ResourceManager.getString('create_wish_list')}
        contents={inputContent}
        winwidth={500}
        submitcall={submitCallback}
        oklabel={ResourceManager.getString('wish_list_add_text')}
        cancellabel={ResourceManager.getString('cancel')}
      />
    </div>
  );

  const container = document.querySelector('.popupcontainer');
  if (container) {
    ReactDOM.render(popupElement, container);
  }
}

/**
 * Global namespace for HSCore utilities
 */
declare global {
  const ResourceManager: {
    getString(key: string): string;
  };

  namespace HSCore {
    namespace Util {
      class Signal<T> {
        constructor(context: T);
        listen(callback: (this: T) => void, context: T): void;
        unlisten(callback: (this: T) => void, context: T): void;
        dispatch(): void;
      }
    }
  }

  interface Window {
    event: any;
  }
}