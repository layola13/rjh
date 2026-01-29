import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from './BaseComponent';
import Button from './Button';

interface PopoverProps {
  className?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  positionLeft?: number;
  positionTop?: number;
  showBtn?: boolean;
  onBtnClick?: () => void;
  btnText?: string;
  linkText?: string;
  linkUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  text?: string;
  onMediaLoaded?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  showConfirm?: boolean;
  cancelText?: string;
  okText?: string;
  onOk?: (event: React.MouseEvent) => void;
  onCancel?: (event: React.MouseEvent) => void;
  popover?: {
    props: PopoverProps;
  };
}

interface PopoverState {
  left: number;
  top: number;
}

class Popover extends BaseComponent<PopoverProps, PopoverState> {
  static propTypes = {
    className: PropTypes.string,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    positionLeft: PropTypes.number,
    positionTop: PropTypes.number,
    showBtn: PropTypes.bool,
    onBtnClick: PropTypes.func,
    btnText: PropTypes.string,
    linkText: PropTypes.string,
    linkUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    videoUrl: PropTypes.string,
    text: PropTypes.string,
    onMediaLoaded: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    showConfirm: PropTypes.bool,
    cancelText: PropTypes.string,
    okText: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
  };

  static defaultProps: PopoverProps = {
    className: '',
    placement: 'top',
    positionLeft: 0,
    positionTop: 0,
    showBtn: false,
    onBtnClick: () => {},
    btnText: ResourceManager.getString('toolBar_tip_I_know'),
    linkText: '视频教程',
    onMediaLoaded: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    showConfirm: false,
    okText: ResourceManager.getString('confirm'),
    cancelText: ResourceManager.getString('cancel'),
    onOk: null,
    onCancel: null
  };

  constructor(props: PopoverProps) {
    super(props);
  }

  render(): React.ReactElement {
    const classNamePrefix = 'hs-popover';
    const style: React.CSSProperties = {
      left: this.state.left,
      top: this.state.top,
      display: 'block'
    };

    const popoverProps = this.props.popover ? this.props.popover.props : this.props;
    const placementClassName = `${classNamePrefix}-${popoverProps.placement}`;

    let linkElement: React.ReactElement | null = null;
    let buttonElement: React.ReactElement | null = null;
    let bottomElement: React.ReactElement | null = null;
    let imageElement: React.ReactElement | null = null;
    let videoElement: React.ReactElement | null = null;
    let textElement: React.ReactElement | null = null;
    let confirmElement: React.ReactElement | null = null;

    if (this.props.imageUrl) {
      imageElement = (
        <div className={`${classNamePrefix}-image`}>
          <img
            onLoad={() => {
              this.props.onMediaLoaded?.();
            }}
            src={this.props.imageUrl}
            alt=""
          />
        </div>
      );
    } else if (this.props.videoUrl) {
      videoElement = (
        <div className={`${classNamePrefix}-video`}>
          <video
            onLoad={() => {
              this.props.onMediaLoaded?.();
            }}
            src={this.props.videoUrl}
            autoPlay={true}
            controls={true}
          />
        </div>
      );
    }

    const mediaElement = imageElement || videoElement;

    if (this.props.text) {
      textElement = (
        <div
          className={`${classNamePrefix}-text`}
          dangerouslySetInnerHTML={{ __html: this.props.text }}
        />
      );
    }

    if (this.props.linkUrl) {
      linkElement = (
        <div className={`${classNamePrefix}-link`}>
          <i className="iconfont icon-bofang-o-uncheck" />
          <a href={this.props.linkUrl} target="_blank">
            <span>{this.props.linkText}</span>
          </a>
        </div>
      );
    }

    if (this.props.showBtn) {
      buttonElement = (
        <div className={`${classNamePrefix}-btn`}>
          <Button
            type="pop"
            size="small"
            onClick={() => {
              this.props.onBtnClick?.();
            }}
          >
            {this.props.btnText}
          </Button>
        </div>
      );
    }

    if (linkElement || buttonElement) {
      bottomElement = (
        <div className={`${classNamePrefix}-bottom`}>
          {linkElement}
          {buttonElement}
        </div>
      );
    }

    if (this.props.showConfirm) {
      confirmElement = (
        <div className={`${classNamePrefix}-button-container`}>
          <div
            className={`${classNamePrefix}-button ${classNamePrefix}-ok-button`}
            onClick={(event) => this.props.onOk?.(event)}
          >
            {' '}
            {this.props.okText || ResourceManager.getString('confirm')}{' '}
          </div>
          <div
            className={`${classNamePrefix}-button ${classNamePrefix}-cancel-button`}
            onClick={(event) => this.props.onCancel?.(event)}
          >
            {' '}
            {this.props.cancelText || ResourceManager.getString('cancel')}{' '}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`${classNamePrefix}-heavy ${this.props.className} ${placementClassName} hs-popover-shadow`}
        style={style}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <div className={`${classNamePrefix}-context-heavy`}>
          {mediaElement}
          {textElement}
          {confirmElement}
          {bottomElement}
        </div>
        <div className={`${classNamePrefix}-caret`} />
      </div>
    );
  }
}

export default Popover;