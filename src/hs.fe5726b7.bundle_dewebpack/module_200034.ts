import React from 'react';
import ReactDOM from 'react-dom';
import { IconfontView } from './IconfontView';

interface PopupWindowProps {
  submitcall?: () => void;
  cancelcall?: () => void;
  classname?: string;
  oklabel?: string;
  cancellabel?: string;
  headername?: string;
  contents?: React.ReactElement;
  winwidth?: number;
  winheight?: number;
}

interface PopupWindowState {
  isHovering: boolean;
}

interface ShowWindowOptions {
  contents?: React.ReactElement;
  headerName?: string;
  className?: string;
  submitcall?: () => void;
  cancelcall?: () => void;
  winwidth?: number;
  winheight?: number;
  oklabel?: string;
  cancellabel?: string;
}

class PopupWindowComponent extends React.Component<PopupWindowProps, PopupWindowState> {
  constructor(props: PopupWindowProps) {
    super(props);
    this.state = {
      isHovering: false
    };
  }

  componentDidMount(): void {
  }

  componentDidUpdate(): void {
  }

  componentWillUnmount(): void {
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

  handleCancelClick = (event?: React.MouseEvent): boolean => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.cancel();
    return false;
  };

  submit = (): void => {
    if (this.props.submitcall) {
      this.props.submitcall();
    }
  };

  cancel = (): void => {
    if (this.props.cancelcall) {
      this.props.cancelcall();
    }
  };

  show = (): void => {
    const container = document.querySelector('.popupcontainer');
    if (container) {
      ReactDOM.render(this as any, container);
    }
  };

  close = (): void => {
    try {
      const container = document.querySelector('.popupcontainer');
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
      }
    } catch (error) {
      const errorMessage = 'Close Popupwindow err';
      console.error(errorMessage, error);
      
      if (typeof HSApp !== 'undefined' && HSApp.App) {
        HSApp.App.getApp().errorLogger.push(errorMessage, {
          errorStack: new Error(errorMessage),
          description: errorMessage,
          errorInfo: {
            info: error,
            path: {
              file: 'homestyler-tools-web/web/ui/widgets/popupwindow/popupwindow.js',
              functionName: 'close()'
            }
          }
        });
      }
    }
  };

  handleOkClick = (event: React.MouseEvent): boolean => {
    event.stopPropagation();
    event.preventDefault();
    this.submit();
    return false;
  };

  render(): React.ReactElement {
    const hoverClass = this.state.isHovering ? ' hover' : ' ';
    const windowStyle: React.CSSProperties = {
      width: this.props.winwidth,
      left: this.props.winwidth 
        ? (document.body.clientWidth - this.props.winwidth) / 2 
        : undefined
    };

    if (this.props.winheight) {
      windowStyle.height = this.props.winheight;
      windowStyle.top = (window.innerHeight - this.props.winheight) / 2;
    }

    const okButtonClass = this.props.oklabel ? ' ' : ' hidden ';
    const cancelButtonClass = this.props.cancellabel ? ' ' : ' hidden ';

    return (
      <div className={`popupWindowOuter ${this.props.classname ?? ''}`}>
        <div
          style={windowStyle}
          className="popupwindows md-modal md-effect-1 md-show"
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
                    fontSize: '22px',
                    fontWeight: 'bold'
                  }}
                  clickColor="#396EFE"
                  hoverBgColor="#f5f5f5"
                  bgExtendSize={10}
                />
              </span>
            </div>
            <div className="windowContents">
              <div className="contentsWrapper">
                {this.props.contents}
              </div>
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

const PopupWindow = {
  showWindow(options: ShowWindowOptions): React.Component | null {
    const {
      contents,
      headerName,
      className,
      submitcall,
      cancelcall,
      winwidth,
      winheight,
      oklabel,
      cancellabel
    } = options;

    const popupElement = React.createElement(PopupWindowComponent, {
      classname: className,
      headername: headerName,
      contents,
      winwidth,
      winheight,
      submitcall,
      cancelcall,
      oklabel,
      cancellabel
    });

    const container = document.querySelector('.popupcontainer');
    if (container) {
      return ReactDOM.render(popupElement, container);
    }
    return null;
  }
};

export default PopupWindow;