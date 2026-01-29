import React from 'react';
import PropTypes from 'prop-types';

interface PopoverConfig {
  placement?: string;
  trigger?: string;
  delay?: number;
  delayOpen?: number;
  delayClose?: number;
  imageUrl?: string;
  videoUrl?: string;
  text?: string;
  showBtn?: boolean;
  onBtnClick?: () => void;
  btnText?: string;
  linkText?: string;
  linkUrl?: string;
}

interface ComponentData {
  tooltip?: string;
  bottomlabel?: string;
  rightlabel?: string;
  popover?: PopoverConfig;
  disabled?: boolean;
  className: string;
  title?: string;
  icon: string;
  onclick?: () => void;
  onmouseover?: () => void;
  onmouseout?: () => void;
}

interface ComponentProps {
  data: ComponentData;
}

export default class ImageLabelComponent extends React.Component<ComponentProps> {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render(): React.ReactNode {
    const { data } = this.props;

    const tooltipElement = data.tooltip ? (
      <div className="imglabel">
        <span className="label">{data.tooltip}:</span>
      </div>
    ) : undefined;

    let labelClassName = "";
    let labelText = "";

    if (data.bottomlabel) {
      labelClassName = "imgBottomLabel";
      labelText = data.bottomlabel;
    }

    if (data.rightlabel) {
      labelClassName = "imgRightLabel";
      labelText = data.rightlabel;
    }

    const popoverConfig = data.popover;
    const statusClassName = data.disabled ? "disable" : "enable";

    const handleClick = (): void | boolean => {
      return !data.disabled && data.onclick ? data.onclick() : false;
    };

    const handleMouseOver = (): void | string => {
      return !data.disabled && data.onmouseover ? data.onmouseover() : "";
    };

    const handleMouseOut = (): void | string => {
      return !data.disabled && data.onmouseout ? data.onmouseout() : "";
    };

    const contentElement = data.rightlabel ? (
      <div
        className={`${statusClassName} ${data.className}`}
        title={data.title}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {tooltipElement}
        <HSApp.UI.Icon icon={data.icon} />
        <div className={labelClassName}>{labelText}</div>
      </div>
    ) : (
      <div
        className={`${statusClassName} ${data.className}`}
        title={data.title}
      >
        {tooltipElement}
        <HSApp.UI.Icon
          icon={data.icon}
          click={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
        <div className={labelClassName}>{labelText}</div>
      </div>
    );

    if (popoverConfig && popoverConfig instanceof Object) {
      return (
        <HSApp.UI.Popover.Heavy
          placement={popoverConfig.placement}
          trigger={popoverConfig.trigger}
          delay={popoverConfig.delay}
          delayOpen={popoverConfig.delayOpen}
          delayClose={popoverConfig.delayClose}
          imageUrl={popoverConfig.imageUrl}
          videoUrl={popoverConfig.videoUrl}
          text={popoverConfig.text}
          showBtn={popoverConfig.showBtn}
          onBtnClick={popoverConfig.onBtnClick}
          btnText={popoverConfig.btnText}
          linkText={popoverConfig.linkText}
          linkUrl={popoverConfig.linkUrl}
        >
          {contentElement}
        </HSApp.UI.Popover.Heavy>
      );
    }

    return contentElement;
  }
}