import { HSCore } from './635589';
import { Tooltip } from './500992';
import React from 'react';
import IconfontView from './189947';

interface ImageButtonProps {
  label?: string;
  icon: string;
  iconHover?: string;
  hotkey?: string;
  remarks?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  type?: string;
  iconfontStyle?: React.CSSProperties;
  hoverColor?: string;
  disable?: boolean;
  disableTooltip?: string;
  isBeta?: boolean;
  showNewCallBack?: () => boolean;
  draggable?: boolean;
  onDragStart?: (event: MouseEvent) => void;
  onDrag?: (event: MouseEvent) => void;
  onDragEnd?: (event: MouseEvent & { isMouseMove?: boolean }) => void;
  commandValidate?: (cmd: unknown) => boolean;
  registerHotkey?: boolean;
}

interface ImageButtonState {
  hover: boolean;
  active: boolean;
}

interface CommandEvent {
  data: {
    cmd: unknown;
  };
}

export default class ImageButton extends React.Component<ImageButtonProps, ImageButtonState> {
  private signalHook?: HSCore.Util.SignalHook;
  private mouseMove?: (event: MouseEvent) => void;
  private mouseUp?: (event: MouseEvent & { isMouseMove?: boolean }) => void;

  constructor(props: ImageButtonProps) {
    super(props);

    this.state = {
      hover: false,
      active: false
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.signalHook = new HSCore.Util.SignalHook(this);
  }

  componentDidMount(): void {
    this.registerHotkeyInternal();

    if (this.props.commandValidate) {
      const commandManager = HSApp.App.getApp().cmdManager;
      this.signalHook
        ?.listen(commandManager.signalCommandStarted, this.onCommandStart)
        .listen(commandManager.signalCommandTerminated, this.onCommandEnd);
    }
  }

  componentWillUnmount(): void {
    this.signalHook?.dispose();
    this.signalHook = undefined;

    if (this.mouseMove) {
      document.removeEventListener('mousemove', this.mouseMove);
    }
    if (this.mouseUp) {
      document.removeEventListener('mouseup', this.mouseUp);
    }
  }

  private onCommandEnd = (event: CommandEvent): void => {
    if (this.props.commandValidate) {
      const cmd = event.data.cmd;
      if (this.props.commandValidate(cmd)) {
        this.setState({ active: false });
      }
    }
  };

  private onCommandStart = (event: CommandEvent): void => {
    if (this.props.commandValidate) {
      const cmd = event.data.cmd;
      if (this.props.commandValidate(cmd)) {
        this.setState({ active: true });
      }
    }
  };

  private onMouseEnter(event: React.MouseEvent<HTMLDivElement>): void {
    this.setState({ hover: true });
    this.props.onMouseEnter?.(event);
  }

  private onMouseLeave(event: React.MouseEvent<HTMLDivElement>): void {
    if (this.state.hover) {
      this.setState({ hover: false });
    }
    this.props.onMouseLeave?.(event);
  }

  private onMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
    this.props.onMouseDown?.();

    const { draggable, onDragStart, onDrag, onDragEnd } = this.props;

    if (draggable && onDragStart && onDrag && onDragEnd) {
      let isMouseMove = false;
      onDragStart(event.nativeEvent);

      this.mouseMove = (mouseMoveEvent: MouseEvent): void => {
        isMouseMove = true;
        onDrag(mouseMoveEvent);
      };

      this.mouseUp = (mouseUpEvent: MouseEvent): void => {
        if (this.mouseMove) {
          document.removeEventListener('mousemove', this.mouseMove);
        }
        if (this.mouseUp) {
          document.removeEventListener('mouseup', this.mouseUp);
        }
        const eventWithFlag = mouseUpEvent as MouseEvent & { isMouseMove?: boolean };
        eventWithFlag.isMouseMove = isMouseMove;
        onDragEnd(eventWithFlag);
      };

      document.addEventListener('mousemove', this.mouseMove);
      document.addEventListener('mouseup', this.mouseUp);
    }
  };

  private registerHotkeyInternal(): void {
    if (this.props.hotkey && this.props.registerHotkey !== false && this.props.onClick) {
      HSApp.App.getApp().hotkey.registerHotkey(this.props.hotkey, this.props.onClick);
    }
  }

  render(): React.ReactNode {
    const {
      label,
      icon,
      iconHover,
      hotkey,
      remarks,
      onClick,
      type,
      iconfontStyle,
      hoverColor,
      disable,
      disableTooltip,
      isBeta,
      showNewCallBack
    } = this.props;

    const { hover, active } = this.state;

    const classNames = ['catalog-image-button'];
    if (type) classNames.push(type);
    if (hover) classNames.push('hover');
    if (active) classNames.push('active');
    if (disable) classNames.push('catalog-image-button-disable');

    const displayIcon = !active && !hover || disable ? icon : (iconHover ?? icon);

    const iconStyle = active || hover
      ? { ...iconfontStyle, color: hoverColor ?? iconfontStyle?.color }
      : iconfontStyle;

    const content = (
      <div
        className={classNames.join(' ')}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={onClick}
        onMouseDown={this.onMouseDown}
      >
        <div className="iconfont-area">
          <IconfontView showType={displayIcon} customStyle={iconStyle} />
          {isBeta && (
            <IconfontView
              customClass="catalog-image-button-beta-icon"
              customStyle={{ fontSize: '25px' }}
              showType="hs_biaoqian_beta"
            />
          )}
          {!isBeta && showNewCallBack?.() && (
            <div className="catalog-image-new-icon">
              <img src={require('./321352')} />
            </div>
          )}
        </div>
        {label && <span className="text-description">{label}</span>}
        {remarks && <span className="text-description-shortcut"> {remarks}</span>}
        {hotkey && (
          <span className="text-description-shortcut">
            {' '}
            {HSApp.Util.Hotkey.getHotkeyDisplayString(hotkey)}
          </span>
        )}
      </div>
    );

    if (disable && disableTooltip) {
      return (
        <Tooltip title={disableTooltip} placement="top" color="dark">
          {content}
        </Tooltip>
      );
    }

    return content;
  }
}