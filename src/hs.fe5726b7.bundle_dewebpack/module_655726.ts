import React from 'react';
import PropTypes from 'prop-types';
import defaultIconSrc from './icon-path'; // 假设 841223 是图标路径

type PopoverTrigger = 'click' | 'hover' | 'manual';
type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left';

interface HelpTipData {
  imageUrl?: string;
}

interface HelpTipProps {
  trigger?: PopoverTrigger;
  delay?: number;
  placement?: PopoverPlacement;
  imageUrl?: string;
  videoUrl?: string;
  text?: string;
  showBtn?: boolean;
  onBtnClick?: () => void;
  btnText?: string;
  linkText?: string;
  linkUrl?: string;
  data?: HelpTipData;
  className?: string;
  src?: string;
  support_oldWidget?: boolean;
  isHeavy?: boolean;
}

interface HelpTipState {
  hover: boolean;
}

class HelpTip extends React.Component<HelpTipProps, HelpTipState> {
  static propTypes = {
    trigger: PropTypes.oneOf(['click', 'hover', 'manual']),
    delay: PropTypes.number,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    imageUrl: PropTypes.string,
    videoUrl: PropTypes.string,
    text: PropTypes.string,
    showBtn: PropTypes.bool,
    onBtnClick: PropTypes.func,
    btnText: PropTypes.string,
    linkText: PropTypes.string,
    linkUrl: PropTypes.string,
  };

  static defaultProps: Partial<HelpTipProps> = {
    data: {},
  };

  constructor(props: HelpTipProps) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  private createPopover(element: React.ReactElement): React.ReactElement {
    const {
      text,
      imageUrl,
      videoUrl,
      showBtn,
      linkUrl,
      data,
      placement = 'right',
      trigger = 'hover',
      delay = 200,
      isHeavy,
      onBtnClick,
      btnText,
      linkText,
    } = this.props;

    const hasHeavyContent =
      !text || imageUrl || videoUrl || showBtn || linkUrl || data?.imageUrl;

    if (hasHeavyContent) {
      return React.createElement(HSApp.UI.Popover.Heavy, {
        placement,
        trigger,
        delay,
        imageUrl: imageUrl || data?.imageUrl,
        videoUrl,
        text,
        showBtn,
        onBtnClick,
        btnText,
        linkText,
        linkUrl,
      }, element);
    }

    if (isHeavy) {
      return React.createElement(HSApp.UI.Popover.Heavy, {
        placement,
        trigger,
        text,
        delay,
      }, element);
    }

    return React.createElement(HSApp.UI.Popover.Tooltip, {
      trigger,
      title: text,
      placement,
      delay,
    }, element);
  }

  private onMouseover = (): void => {
    this.setState({ hover: true });
  };

  private onMouseOut = (): void => {
    this.setState({ hover: false });
  };

  render(): React.ReactElement {
    const { support_oldWidget, className = '', src, text } = this.props;

    if (support_oldWidget) {
      const { hover } = this.state;

      return React.createElement(
        'span',
        {
          className: `helptipContainer ${className}`,
          onMouseOver: this.onMouseover,
          onMouseOut: this.onMouseOut,
        },
        React.createElement(
          'span',
          { className: 'imageButton' },
          React.createElement('img', { src })
        ),
        React.createElement(
          'div',
          {
            className: 'tooltipContainer',
            style: { display: hover ? 'block' : 'none' },
          },
          React.createElement('p', { className: 'tooltipStyle' }, text),
          React.createElement('div', { className: 'tipArrow' })
        )
      );
    }

    const iconElement = React.createElement(
      'span',
      { className: 'imageButton' },
      React.createElement('img', { src: defaultIconSrc })
    );

    const popover = this.createPopover(iconElement);

    return React.createElement(
      'span',
      { className: `helptipContainer ${className}` },
      popover
    );
  }
}

export default HelpTip;