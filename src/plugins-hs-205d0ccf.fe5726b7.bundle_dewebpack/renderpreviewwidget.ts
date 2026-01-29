import React from 'react';
import { Modal, Popover } from 'antd';
import closeIcon from './assets/close-icon.png';
import loadingIcon from './assets/loading-icon.png';

interface Signal<T = any> {
  listen(callback: (data: T) => void, context: any): void;
  unlisten(callback: (data: T) => void, context: any): void;
}

interface RenderPreviewData {
  isActive?: boolean;
  className?: string;
  tooltipClassName?: string;
  tooltip?: string;
  hasBottomTriangle?: boolean;
  keepClickStatus?: boolean;
  imgNormalSrc: string;
  imgHoverSrc?: string;
  imgClickSrc?: string;
  onclick?: (event: React.MouseEvent) => void;
  onmouseenter?: () => void;
  onmouseleave?: () => void;
  signalRenderPreviewCompleted?: Signal<{ data: string }>;
  signalRenderPreviewWillStart?: Signal;
}

interface RenderPreviewWidgetProps {
  data: RenderPreviewData;
}

interface RenderPreviewWidgetState {
  isHover: boolean;
  isActive: boolean;
  showPreviewDialog: boolean;
  url: string;
  showPreviewTips: boolean;
}

export class RenderPreviewWidget extends React.Component<
  RenderPreviewWidgetProps,
  RenderPreviewWidgetState
> {
  private signalRenderPreviewCompleted?: Signal<{ data: string }>;
  private signalRenderPreviewWillStart?: Signal;
  private imageButtonToolTip?: any;

  constructor(props: RenderPreviewWidgetProps) {
    super(props);

    const { data } = props;
    const isActive = data.isActive ?? false;

    this.signalRenderPreviewCompleted = data.signalRenderPreviewCompleted;
    this.signalRenderPreviewWillStart = data.signalRenderPreviewWillStart;

    this.signalRenderPreviewCompleted?.listen(
      this.renderpreviewCompleted,
      this
    );
    this.signalRenderPreviewWillStart?.listen(
      this.renderpreviewWillStart,
      this
    );

    this.state = {
      isHover: false,
      isActive,
      showPreviewDialog: false,
      url: '',
      showPreviewTips: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: RenderPreviewWidgetProps): void {
    const isActive = nextProps.data.isActive ?? false;
    this.setState({ isActive });
  }

  componentWillUnmount(): void {
    this.signalRenderPreviewCompleted?.unlisten(
      this.renderpreviewCompleted,
      this
    );
    this.signalRenderPreviewWillStart?.unlisten(
      this.renderpreviewWillStart,
      this
    );
    this.imageButtonToolTip?.close();
  }

  private hidePreviewDialog = (): void => {
    this.setState({
      showPreviewDialog: false,
      url: '',
    });
  };

  private onclick = (event: React.MouseEvent): void => {
    this.props.data.onclick?.(event);
    const { isActive } = this.state;
    this.setState({
      isActive: !isActive,
      showPreviewTips: true,
    });
  };

  private onmouseenter = (): void => {
    this.setState({ isHover: true });
    this.props.data.onmouseenter?.();
  };

  private onmouseleave = (): void => {
    this.setState({ isHover: false });
    this.props.data.onmouseleave?.();
  };

  private renderpreviewCompleted = (payload: { data: string }): void => {
    const { data } = payload;
    if (this.state.showPreviewTips) {
      this.setState({ url: data });
    }
  };

  private renderpreviewWillStart = (): void => {
    this.setState({
      showPreviewTips: true,
      url: loadingIcon,
    });
  };

  private showPopover = (): React.ReactElement => {
    return (
      <div className="render-preview-tips-img-container">
        <div className="render-preview-tips-img-padding">
          <img
            className="render-preview-tips-img"
            src={this.state.url}
            alt=""
            onClick={() => {
              this.setState({
                showPreviewDialog: true,
                showPreviewTips: false,
              });
            }}
          />
          <img
            className="render-preview-tips-close"
            onClick={() => {
              this.setState({
                showPreviewTips: false,
                url: '',
              });
            }}
            src={closeIcon}
          />
        </div>
      </div>
    );
  };

  render(): React.ReactElement {
    const { data } = this.props;
    const {
      className,
      tooltipClassName,
      tooltip,
      hasBottomTriangle = false,
      keepClickStatus = false,
      imgNormalSrc,
      imgHoverSrc,
      imgClickSrc,
    } = data;

    let wrapperClassName = 'renderpreviewwidget-wrapper ';
    if (className) {
      wrapperClassName += className;
    }

    let imageSrc = imgNormalSrc;
    const { isHover, isActive } = this.state;

    if (isActive && keepClickStatus) {
      imageSrc = imgClickSrc ?? imgHoverSrc ?? imgNormalSrc;
    } else if (isHover) {
      imageSrc = imgHoverSrc ?? imgNormalSrc;
    }

    let triangleClassName = 'renderpreviewwidget-triangle ';
    if (!hasBottomTriangle) {
      triangleClassName += 'hide ';
    }

    return (
      <Popover
        overlayClassName="render-component-button-popover render-submit-preview-tips"
        content={this.showPopover()}
        title={false}
        placement="top"
        arrowPointAtCenter={true}
        autoAdjustOverflow={false}
        visible={this.state.showPreviewTips}
      >
        <div className={wrapperClassName}>
          <HSApp.UI.Popover.Tooltip
            className={tooltipClassName}
            placement="top"
            trigger="hover"
            delay={200}
            title={tooltip}
            ref={(ref: any) => {
              this.imageButtonToolTip = ref;
            }}
          >
            <div
              className="renderpreviewwidget-center"
              onMouseEnter={this.onmouseenter}
              onClick={this.onclick}
              onMouseLeave={this.onmouseleave}
            >
              <img
                src={imageSrc}
                alt="img"
                className="renderpreviewwidget-image"
              />
              <div className={triangleClassName} />
            </div>
          </HSApp.UI.Popover.Tooltip>
          <Modal
            title={ResourceManager.getString('plugin_render_preview_dialog_title')}
            wrapClassName="render-preview-dialog"
            visible={this.state.showPreviewDialog}
            width="800"
            centered={true}
            footer={null}
            onCancel={this.hidePreviewDialog}
          >
            <div className="render-preview-dialog-content">
              <div className="render-preview-dialog-img-container">
                <img
                  className="render-preview-dialog-img"
                  src={this.state.url}
                  alt=""
                />
              </div>
            </div>
          </Modal>
        </div>
      </Popover>
    );
  }
}