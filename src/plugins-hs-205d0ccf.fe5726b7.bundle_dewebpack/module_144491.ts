interface BadgeConfig {
  tooltip?: string;
  icon: string;
  onclick?: () => void;
}

interface PopoverConfig {
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
  trigger: string;
  title: string;
  delay?: number;
  delayOpen?: number;
  delayClose?: number;
}

interface SignalData {
  enable: boolean;
  isPressed: boolean;
}

interface SignalEvent {
  data: SignalData;
}

interface ToolItemProps {
  visible: boolean;
  enable: boolean;
  label?: string;
  icon: string;
  iconhover?: string;
  tooltip?: string | TooltipConfig;
  onclick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  path: string;
  signalChanged?: object;
  isPressed?: boolean;
  badge?: BadgeConfig;
  hotkey?: string | object;
  index: number;
  popover?: PopoverConfig;
}

interface ToolItemState {
  hover: boolean;
  enable: boolean;
  isPressed: boolean;
}

class ToolItem extends React.Component<ToolItemProps, ToolItemState> {
  private triggerInst: any = null;
  private _refIconImage?: HTMLImageElement | null;
  private _refIconHoverImage?: HTMLImageElement | null;
  private _refBadgeImage?: HTMLImageElement | null;
  private _signalHook: any;

  constructor(props: ToolItemProps) {
    super(props);
    
    this.state = {
      hover: false,
      enable: props.enable,
      isPressed: props.isPressed ?? false
    };

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onPopverOpen = this._onPopverOpen.bind(this);
    this._onPopoverClose = this._onPopoverClose.bind(this);
    this._onClick = this._onClick.bind(this);

    this._signalHook = new HSCore.Util.SignalHook(this);
    
    if (props.signalChanged) {
      this._signalHook.listen(props.signalChanged, (event: SignalEvent) => {
        this.props.enable = event.data.enable;
        this.props.isPressed = event.data.isPressed;
        this.setState({
          enable: event.data.enable,
          isPressed: event.data.isPressed
        });
      });
    }
  }

  componentDidMount(): void {
    const { icon, iconhover, badge } = this.props;
    
    if (icon) {
      ResourceManager.injectSVGImage(this._refIconImage);
    }
    if (iconhover) {
      ResourceManager.injectSVGImage(this._refIconHoverImage);
    }
    if (badge) {
      ResourceManager.injectSVGImage(this._refBadgeImage);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: ToolItemProps): void {
    if (this.state.hover && this._isPropChanged(nextProps, 'enable')) {
      this.setState({ hover: false });
    }
  }

  componentDidUpdate(prevProps: ToolItemProps): void {
    if (this._isPropChanged(prevProps, 'badge')) {
      ResourceManager.injectSVGImage(this._refBadgeImage);
    }
  }

  private _isPropChanged(prevProps: ToolItemProps, propName: keyof ToolItemProps): boolean {
    return prevProps[propName] !== this.props[propName];
  }

  private _isEnabled(): boolean {
    return this.props.enable;
  }

  private _onMouseEnter(): void {
    if (this._isEnabled()) {
      this.setState({ hover: true });
      if (!this.triggerInst) {
        this.props.onMouseEnter();
      }
    }
  }

  private _onMouseLeave(): void {
    if (this._isEnabled()) {
      this.setState({ hover: false });
      if (!this.triggerInst) {
        this.props.onMouseLeave();
      }
    }
  }

  private _onPopverOpen(): void {
    this.props.onMouseEnter();
  }

  private _onPopoverClose(): void {
    this.props.onMouseLeave();
  }

  private _onClick(event: React.MouseEvent): void {
    if (this._isEnabled()) {
      this.props.onclick();
    } else {
      event.stopPropagation();
    }
  }

  private _getHotkeyDisplay(hotkey?: string | object): string {
    const hotkeyString = HSApp.Util.Hotkey.getHotkeyDisplayString(hotkey);
    return hotkeyString.length ? `(${hotkeyString})` : '';
  }

  render(): JSX.Element {
    const {
      visible,
      enable,
      path,
      label,
      icon,
      iconhover,
      tooltip,
      isPressed,
      badge,
      hotkey,
      popover,
      index
    } = this.props;
    
    const { hover } = this.state;

    const classNames: string[] = ['toolitem'];
    if (!visible) classNames.push('hidden');
    if (!enable) classNames.push('disabled');
    if (hover || isPressed) classNames.push('hover');

    const hoverImageClass = 'hover-image';
    const isHoverState = hover || isPressed;

    const toolContent = (
      <div className="toolbar_popover">
        <div className="toolicon" data-content={tooltip} data-toggle="popover">
          <div className={`tool-icon-img-wrapper ${isHoverState ? hoverImageClass : ''}`}>
            <img className="tool-icon-img" src={icon} />
          </div>
          <div className={`tool-icon-img-wrapper ${isHoverState ? '' : hoverImageClass}`}>
            <img className="tool-icon-img" src={iconhover || icon} />
          </div>
        </div>
        <div className="tooltext">
          <span className="toolname">{label}</span>
          <span className="hotkey">{this._getHotkeyDisplay(hotkey)}</span>
        </div>
      </div>
    );

    let wrappedContent: JSX.Element = toolContent;
    const placement = index % 2 === 0 ? 'leftT' : 'rightT';

    if (popover && typeof popover === 'object') {
      wrappedContent = (
        <HSApp.UI.Popover.Heavy
          ref={(inst: any) => { this.triggerInst = inst; }}
          placement={placement}
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
          onOpen={this._onPopverOpen}
          onClose={this._onPopoverClose}
        >
          {toolContent}
        </HSApp.UI.Popover.Heavy>
      );
    } else if (tooltip && typeof tooltip === 'string') {
      wrappedContent = (
        <HSApp.UI.Popover.Tooltip
          ref={(inst: any) => { this.triggerInst = inst; }}
          placement={placement}
          trigger="hover"
          title={tooltip}
          onOpen={this._onPopverOpen}
          onClose={this._onPopoverClose}
        >
          {toolContent}
        </HSApp.UI.Popover.Tooltip>
      );
    } else if (tooltip && typeof tooltip === 'object') {
      wrappedContent = (
        <HSApp.UI.Popover.Tooltip
          ref={(inst: any) => { this.triggerInst = inst; }}
          placement={placement}
          trigger={tooltip.trigger}
          title={tooltip.title}
          delay={tooltip.delay}
          delayOpen={tooltip.delayOpen}
          delayClose={tooltip.delayClose}
          onOpen={this._onPopverOpen}
          onClose={this._onPopoverClose}
        >
          {toolContent}
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
        {wrappedContent}
        {badge && (
          <div
            title={badge.tooltip || ''}
            className="texticon"
            onClick={() => {
              badge.onclick?.();
            }}
          >
            <img
              alt={badge.tooltip || ''}
              data-src={badge.icon}
              ref={(img: HTMLImageElement | null) => { this._refBadgeImage = img; }}
            />
          </div>
        )}
      </li>
    );
  }
}

export default ToolItem;