import React from 'react';
import PropTypes from 'prop-types';
import { IconfontView } from './IconfontView';
import { Tooltip, SmartText } from './Tooltip';

interface BadgeConfig {
  tooltip?: string;
  icon: string;
  onclick?: () => void;
}

interface PopoverConfig {
  placement: string;
  trigger: string;
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

interface TooltipConfig {
  placement?: string;
  trigger?: string;
  title?: string;
  delay?: number;
  delayOpen?: number;
  delayClose?: number;
  className?: string;
  offset?: { x: number; y: number };
  isParentLocation?: boolean;
  imgUrl?: string;
  textKey?: string;
}

interface InfoIconConfig {
  icon: string;
  hoverIcon?: string;
  fontSize?: string;
  tooltip?: TooltipConfig;
}

interface SignalData {
  enable: boolean;
  isPressed: boolean;
}

interface Signal {
  dispatch(data: { isHover: boolean }): void;
}

interface SignalChanged {
  data: SignalData;
}

interface ToolbarButtonProps {
  isTopLevel?: boolean;
  visible: boolean;
  enable: boolean;
  label: string;
  icon: string;
  iconhover?: string;
  tooltip?: string | TooltipConfig;
  onclick: () => void;
  width?: number;
  isPressed?: boolean;
  badge?: BadgeConfig;
  path: string;
  hotkey?: string | object;
  signalChanged?: any;
  onButtonMouseEnter?: (event: React.MouseEvent) => void;
  onButtonMouseLeave?: (event: React.MouseEvent) => void;
  isShowIcon?: boolean;
  lineType?: boolean;
  hiddenIcon?: boolean;
  isCatagory?: boolean;
  count?: number;
  hasDot?: boolean;
  guidetip?: boolean;
  styleName?: string;
  showNew?: boolean;
  showNewCallBack?: () => boolean;
  infoIcon?: InfoIconConfig;
  popover?: PopoverConfig;
  signalToolbarHover?: Signal;
  getBenefitAmount?: () => number;
  showMarketModal?: () => void;
}

interface ToolbarButtonState {
  hover: boolean;
  infoIconhover: boolean;
  showDisplay: string;
  enable: boolean;
  isPressed: boolean;
}

class ToolbarButton extends React.Component<ToolbarButtonProps, ToolbarButtonState> {
  static propTypes = {
    isTopLevel: PropTypes.bool,
    visible: PropTypes.bool.isRequired,
    enable: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    onclick: PropTypes.func.isRequired,
    width: PropTypes.number,
    isPressed: PropTypes.bool,
    badge: PropTypes.object,
    path: PropTypes.string.isRequired,
    hotkey: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    signalChanged: PropTypes.object,
    onButtonMouseEnter: PropTypes.func,
    onButtonMouseLeave: PropTypes.func,
  };

  static defaultProps: Partial<ToolbarButtonProps> = {
    isTopLevel: false,
    isPressed: false,
    badge: undefined,
    hotkey: undefined,
    onButtonMouseEnter: () => null,
    onButtonMouseLeave: () => null,
  };

  private _refIconContainer: HTMLDivElement | null = null;
  private _refBadgeImage: HTMLImageElement | null = null;
  private _guideTipRef: any = null;
  private _signalHook: any;
  private _showGuideTip: boolean;

  constructor(props: ToolbarButtonProps) {
    super(props);

    const displayMode = HSApp.Config.IS_TOOLBAR_SHOW_TOOLTIP === true ? 'inline' : 'none';

    this.state = {
      hover: false,
      infoIconhover: false,
      showDisplay: displayMode,
      enable: props.enable,
      isPressed: props.isPressed ?? false,
    };

    this._showGuideTip = !window.localStorage.getItem('toolBarRenderUserTip');
    this._signalHook = new HSCore.Util.SignalHook(this);

    if (props.signalChanged) {
      this._signalHook.listen(props.signalChanged, (signal: SignalChanged) => {
        this.setState({
          enable: signal.data.enable,
          isPressed: signal.data.isPressed,
        });
      });
    }
  }

  componentDidMount(): void {
    if (this.props.badge && this._refBadgeImage) {
      ResourceManager.injectSVGImage(this._refBadgeImage);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: ToolbarButtonProps): void {
    if (this.state.hover && this._isPropChanged(nextProps, 'enable')) {
      this.setState({ hover: false });
    }
  }

  componentDidUpdate(prevProps: ToolbarButtonProps): void {
    if (this._isPropChanged(prevProps, 'badge') && this._refBadgeImage) {
      ResourceManager.injectSVGImage(this._refBadgeImage);
    }
    this._isPropChanged(prevProps, 'tooltip');
  }

  componentWillUnmount(): void {
    this._signalHook.unlistenAll();
  }

  private _isPropChanged(prevProps: ToolbarButtonProps, propName: keyof ToolbarButtonProps): boolean {
    return prevProps[propName] !== this.props[propName];
  }

  private _isEnabled(): boolean {
    return this.props.enable;
  }

  private _onMouseEnter = (event: React.MouseEvent): void => {
    if (this._isEnabled()) {
      this.props.onButtonMouseEnter?.(event);
      this.setState({ hover: true });
    }
  };

  private _onMouseLeave = (event: React.MouseEvent): void => {
    this.props.onButtonMouseLeave?.(event);
    if (this.state.hover) {
      this.setState({ hover: false });
    }
  };

  private _infoIconOnMouseEnter = (): void => {
    this.setState({ infoIconhover: true });
  };

  private _infoIconOnMouseLeave = (): void => {
    this.setState({ infoIconhover: false });
  };

  private _onClick = (event: React.MouseEvent): void => {
    if (this._isEnabled()) {
      event.stopPropagation();
      this.props.signalToolbarHover?.dispatch({ isHover: false });
      this.props.onclick();
    }
  };

  private _closeGuideTip = (): void => {
    if (this._guideTipRef) {
      this._guideTipRef.close();
    }
    window.localStorage.setItem('toolBarRenderUserTip', 'true');
    this._showGuideTip = false;
  };

  private _showMarketModal = (event: React.MouseEvent): void => {
    const { showMarketModal } = this.props;
    if (showMarketModal) {
      showMarketModal();
      event.stopPropagation();
    }
  };

  private renderLabel = (iconElement: React.ReactNode): React.ReactNode => {
    const { tooltip, label, count, infoIcon, getBenefitAmount } = this.props;
    const benefitAmount = getBenefitAmount?.();

    let labelContent = (
      <span className="textonly">
        {label}
        {benefitAmount && benefitAmount > 0 ? (
          <span className="freeTrialItem" onClick={this._showMarketModal}>
            {benefitAmount} {ResourceManager.getString('plugin_structure_free_trial')}
          </span>
        ) : benefitAmount === 0 ? (
          <span className="vipIcon" onClick={this._showMarketModal}>
            <img src="https://img.alicdn.com/imgextra/i1/O1CN01WLxnTI1iQSY9ncMiX_!!6000000004407-2-tps-44-36.png" />
          </span>
        ) : null}
        {infoIcon?.icon && iconElement}
        {count && <div className="count-badge" />}
      </span>
    );

    if (tooltip) {
      labelContent = (
        <Tooltip
          stopPropagation={!this._isEnabled()}
          preventDefault={!this._isEnabled()}
          color="dark"
          trigger="move"
          title={tooltip}
        >
          {labelContent}
        </Tooltip>
      );
    }

    return labelContent;
  };

  render(): React.ReactNode {
    const {
      isTopLevel,
      visible,
      enable,
      isShowIcon,
      label,
      lineType,
      icon,
      width,
      isPressed,
      badge,
      path,
      hotkey,
      popover,
      tooltip,
      hasDot,
      guidetip,
      styleName,
      showNew,
      showNewCallBack,
      infoIcon,
    } = this.props;

    const { hover } = this.state;

    const classNames: string[] = ['toolitem'];
    if (styleName) classNames.push(styleName);
    if (!visible) classNames.push('hidden');
    if (!enable) classNames.push('disabled');
    if (hover) classNames.push('hover');
    if (isPressed) classNames.push('pressed');
    if (lineType) {
      classNames.push('toolitem-lineone');
      classNames.push('buttonitem');
    }
    if (isShowIcon) classNames.push('icon-image-btn');

    let iconElement = (
      <IconfontView
        showType={icon}
        customStyle={{ fontSize: '20px', ...(isPressed && { color: '#396efe' }) }}
        customClass="tool-icon-img-wrapper"
      />
    );

    const iconStyle: React.CSSProperties = {};
    if (width) {
      iconStyle.width = `${width}px`;
    }

    const guideTipContent = (
      <div className="tool-tip-area">
        <div className="tool-tip-title-wrapper">
          <span className="tool-tip-title">{ResourceManager.getString('toolBar_render_tip')}</span>
        </div>
        <IconfontView
          showType="hs_xian_guanbi"
          iconOnclick={this._closeGuideTip}
          customStyle={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.3)' }}
        />
      </div>
    );

    let iconContainer: React.ReactNode = (
      <div className="toolicon" ref={(ref) => (this._refIconContainer = ref)} style={iconStyle}>
        {iconElement}
        {hasDot && <div className="notificationdot" />}
      </div>
    );

    if (popover && typeof popover === 'object') {
      iconContainer = (
        <HSApp.UI.Popover.Heavy
          placement={popover.placement}
          trigger={popover.trigger}
          delay={popover.delay}
          delayOpen={popover.delayOpen}
          delayClose={popover.delayClose}
          imageUrl={popover.imageUrl}
          videoUrl={popover.videoUrl}
          text={popover.text}
          showBtn={popover.showBtn}
          onBtnClick={popover.onBtnClick}
          btnText={popover.btnText}
          linkText={popover.linkText}
          linkUrl={popover.linkUrl}
        >
          <div>
            <div className="toolicon" style={iconStyle}>
              {iconElement}
              {hasDot && <div className="notificationdot" />}
            </div>
            <div style={{ position: 'relative', top: 10 }} />
          </div>
        </HSApp.UI.Popover.Heavy>
      );
    } else if (tooltip && typeof tooltip === 'string') {
      iconContainer = (
        <HSApp.UI.Popover.Tooltip
          placement="bottom"
          trigger="hover"
          title={tooltip}
          className="toolbar-tooltip-title"
        >
          <div>
            <div className="toolicon" style={iconStyle}>
              {iconElement}
              {hasDot && <div className="notificationdot" />}
            </div>
            <div style={{ position: 'relative', top: 10 }} />
          </div>
        </HSApp.UI.Popover.Tooltip>
      );
    } else if (tooltip && typeof tooltip === 'object') {
      iconContainer = (
        <HSApp.UI.Popover.Tooltip
          placement={tooltip.placement}
          trigger={tooltip.trigger}
          title={tooltip.title}
          delay={tooltip.delay}
          delayOpen={tooltip.delayOpen}
          delayClose={tooltip.delayClose}
        >
          <div>
            <div className="toolicon" style={iconStyle}>
              {iconElement}
              {hasDot && <div className="notificationdot" />}
            </div>
            <div style={{ position: 'relative', top: 10 }} />
          </div>
        </HSApp.UI.Popover.Tooltip>
      );
    } else if (guidetip && typeof tooltip === 'string') {
      iconContainer = (
        <Tooltip
          overlayClassName="tool-bar-guide-tooltip"
          placement="bottom"
          trigger={this._showGuideTip ? 'new' : undefined}
          title={guideTipContent}
          ref={(ref) => (this._guideTipRef = ref)}
          getPopupContainer={(element) => element?.parentElement?.parentElement ?? document.body}
        >
          <div>
            <div className="toolicon" style={iconStyle}>
              {iconElement}
              {hasDot && <div className="notificationdot" />}
            </div>
            <div style={{ position: 'relative', top: 10 }} />
          </div>
        </Tooltip>
      );
    } else if (infoIcon?.icon && infoIcon.tooltip && typeof infoIcon.tooltip === 'object') {
      const tooltipConfig = infoIcon.tooltip;
      iconContainer = (
        <HSApp.UI.Popover.Tooltip
          placement={tooltipConfig.placement ?? 'top'}
          trigger={tooltipConfig.trigger ?? 'hover'}
          className={tooltipConfig.className ?? 'info-tooltip-popover'}
          offset={tooltipConfig.offset ?? { x: 0, y: 0 }}
          isParentLocation={tooltipConfig.isParentLocation ?? false}
          title={
            <div className="image" style={{ width: 234 }}>
              <img
                style={{ width: 234, height: 148, borderRadius: '4px' }}
                src={tooltipConfig.imgUrl}
              />
              <div className="tool-info-icon-text">
                {ResourceManager.getString(tooltipConfig.textKey ?? '')}
              </div>
            </div>
          }
          delay={tooltipConfig.delay}
          delayOpen={tooltipConfig.delayOpen}
          delayClose={tooltipConfig.delayClose}
        >
          <div>
            <IconfontView
              showType={this.state.infoIconhover ? infoIcon.hoverIcon : infoIcon.icon}
              customStyle={{ fontSize: infoIcon.fontSize ?? '16px' }}
              customClass="tool-info-icon"
              onMouseEnter={this._infoIconOnMouseEnter}
              onMouseLeave={this._infoIconOnMouseLeave}
            />
          </div>
        </HSApp.UI.Popover.Tooltip>
      );
    }

    return (
      <li
        className={classNames.join(' ')}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onClick}
        data-toolbar-path={path}
      >
        {isTopLevel && iconContainer}
        {isTopLevel && (
          <div
            className={isPressed ? 'topLevelLabel topLevelLabelActive' : 'topLevelLabel'}
            style={{ display: this.state.showDisplay }}
          >
            <SmartText className="topLevelLabel-smart-text">{label}</SmartText>
          </div>
        )}
        {!isTopLevel && (
          <div className="tooltext">
            {isShowIcon && icon && (
              <IconfontView
                showType={icon}
                customStyle={{ fontSize: '20px' }}
                customClass="tool-icon-img-wrapper"
              />
            )}
            {this.renderLabel(iconContainer)}
            <span className="hotkey">{HSApp.Util.Hotkey.getHotkeyDisplayString(hotkey)}</span>
          </div>
        )}
        {badge && (
          <div
            title={badge.tooltip ?? ''}
            className="texticon"
            onClick={() => badge.onclick?.()}
          >
            <img
              alt={badge.tooltip ?? ''}
              data-src={badge.icon}
              ref={(ref) => (this._refBadgeImage = ref)}
            />
          </div>
        )}
        {(showNew || showNewCallBack?.()) && <div className="new-badge">NEW</div>}
      </li>
    );
  }
}

export default ToolbarButton;