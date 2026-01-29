import React from 'react';
import { IconfontView } from './IconfontView';
import { Tooltip } from './Tooltip';

interface Signal<T = unknown> {
  listen(callback: (data: T) => void, context: unknown): void;
  unlisten(callback: (data: T) => void, context: unknown): void;
}

interface SignalData {
  data?: {
    isActive?: boolean;
  };
}

interface ImageButtonData {
  className?: string;
  tooltipClassName?: string;
  tooltipColor?: 'light' | 'dark';
  tooltip?: string;
  hasBottomTriangle?: boolean;
  keepClickStatus?: boolean;
  imgShowType?: string;
  getImageShowType?: () => string;
  imgNormalColor?: string;
  imgHoverColor?: string;
  imgClickColor?: string;
  keepHoverStatus?: boolean;
  disable?: boolean;
  isActive?: boolean;
  showRedDot?: boolean;
  onclick?: (event: React.MouseEvent) => void;
  signal?: Signal<SignalData>;
}

interface ImageButtonProps {
  data: ImageButtonData;
}

interface ImageButtonState {
  isHover: boolean;
  isActive: boolean;
  showRedDot?: boolean;
}

export default class ImageButton extends React.Component<ImageButtonProps, ImageButtonState> {
  static defaultProps: ImageButtonProps = {
    data: {
      className: '',
      imgShowType: '',
      getImageShowType: () => '',
      imgNormalColor: '',
      imgHoverColor: '',
      imgClickColor: '',
      isActive: false,
      tooltip: '',
      hasBottomTriangle: false,
      onclick: () => {},
      signal: undefined,
      keepClickStatus: false,
    },
  };

  private signal?: Signal<SignalData>;
  private imageButtonToolTip?: { close: () => void };

  constructor(props: ImageButtonProps) {
    super(props);

    const { data } = props;
    const isActive = data.isActive ?? false;
    const showRedDot = data.showRedDot;

    this.signal = data.signal;
    if (this.signal) {
      this.signal.listen(this.update, this);
    }

    this.state = {
      isHover: false,
      isActive,
      showRedDot,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: ImageButtonProps): void {
    const isActive = nextProps.data.isActive ?? false;
    const signal = nextProps.data.signal;

    if (signal) {
      this.signal = signal;
      this.signal.listen(this.update, this);
    }

    this.setState({ isActive });
  }

  componentWillUnmount(): void {
    if (this.signal) {
      this.signal.unlisten(this.update, this);
    }
    if (this.imageButtonToolTip) {
      this.imageButtonToolTip.close();
    }
  }

  private onclick = (event: React.MouseEvent): void => {
    const { data } = this.props;
    if (data.onclick) {
      data.onclick(event);
    }

    const { isActive } = this.state;
    this.setState({
      isActive: !isActive,
      showRedDot: false,
    });
  };

  private onmouseenter = (): void => {
    this.setState({ isHover: true });
  };

  private onmouseleave = (): void => {
    this.setState({ isHover: false });
  };

  private update = (signalData: SignalData): void => {
    if (signalData?.data?.isActive !== undefined) {
      this.setState({ isActive: signalData.data.isActive });
    }
  };

  render(): React.ReactElement {
    const { data } = this.props;
    const {
      className,
      tooltipClassName,
      tooltipColor,
      tooltip,
      hasBottomTriangle = false,
      keepClickStatus = false,
      imgShowType,
      getImageShowType,
      imgNormalColor = '#1C1C1C',
      imgHoverColor = '#1C1C1C',
      imgClickColor = '#396EFE',
      keepHoverStatus = true,
      disable,
    } = data;

    let wrapperClassName = 'imagebutton-wrapper ';
    if (className) {
      wrapperClassName += className;
    }
    if (disable) {
      wrapperClassName += ' disable';
    }

    let currentColor = imgNormalColor;
    const { isHover, isActive, showRedDot } = this.state;
    let currentTooltip = tooltip;

    if (isActive && keepClickStatus) {
      currentColor = imgClickColor;
      if (!keepHoverStatus) {
        currentTooltip = undefined;
      }
    } else if (isHover) {
      currentColor = imgHoverColor;
    }

    let triangleClassName = 'imagebutton-triangle ';
    if (!hasBottomTriangle) {
      triangleClassName += 'hide ';
    }

    const buttonElement = (
      <div
        className={wrapperClassName}
        onMouseEnter={this.onmouseenter}
        onClick={this.onclick}
        onMouseLeave={this.onmouseleave}
      >
        <div className="imagebutton-center">
          <IconfontView
            showType={imgShowType || (getImageShowType && getImageShowType())}
            customStyle={{
              color: currentColor,
              fontSize: '20px',
            }}
            clickColor={imgClickColor}
          />
          {showRedDot && <span className="statusbar-new-func-dot" />}
          <div className={triangleClassName}>
            <IconfontView
              showType="hs_xiao_shijiantou_tuozhan"
              customStyle={{
                color: currentColor,
                fontSize: '6px',
              }}
              bgExtendSize={0}
            />
          </div>
        </div>
      </div>
    );

    if (currentTooltip && !disable) {
      return (
        <Tooltip
          overlayClassName={tooltipClassName}
          placement="top"
          delayOpen="200"
          delayClose="200"
          color={tooltipColor || 'light'}
          title={currentTooltip}
          ref={(ref) => {
            this.imageButtonToolTip = ref;
          }}
        >
          {buttonElement}
        </Tooltip>
      );
    }

    return buttonElement;
  }
}