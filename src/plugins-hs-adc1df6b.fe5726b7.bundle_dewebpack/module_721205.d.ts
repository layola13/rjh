import React from 'react';
import PropTypes from 'prop-types';

/**
 * Props for the HelpItem component
 */
export interface HelpItemProps {
  /** Whether the help item is visible */
  visible: boolean;
  /** Whether the help item is enabled/clickable */
  enable: boolean;
  /** Display label text for the help item */
  label: string;
  /** Click handler callback */
  onclick: () => void;
  /** Whether the item is in pressed/active state */
  isPressed?: boolean;
  /** Hotkey configuration, can be a string or object */
  hotkey?: string | Record<string, unknown>;
  /** Whether to show a red notification dot */
  showRedDot?: boolean;
  /** Count number to display (takes precedence over red dot and new badge) */
  countNumber?: number;
  /** Whether to show "new" badge */
  showNew?: boolean;
  /** Icon component or element (currently unused in implementation) */
  icon?: React.ReactNode;
}

/**
 * State for the HelpItem component
 */
interface HelpItemState {
  /** Whether mouse is hovering over the item */
  hover: boolean;
  /** Whether the item is enabled */
  enable: boolean;
  /** Whether the item is in pressed state */
  isPressed: boolean;
}

/**
 * HelpItem component - Renders an interactive help menu item with hover states,
 * hotkey display, notification badges, and count indicators.
 */
export default class HelpItem extends React.Component<HelpItemProps, HelpItemState> {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    enable: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onclick: PropTypes.func.isRequired,
    isPressed: PropTypes.bool,
    hotkey: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    showRedDot: PropTypes.bool,
  };

  static defaultProps: Partial<HelpItemProps> = {
    visible: true,
    isPressed: false,
    hotkey: undefined,
  };

  constructor(props: HelpItemProps) {
    super(props);
    
    this.state = {
      hover: false,
      enable: props.enable,
      isPressed: props.isPressed ?? false,
    };

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  /**
   * Check if the help item is currently enabled
   */
  private _isEnabled(): boolean {
    return this.props.enable;
  }

  /**
   * Handle mouse enter event - set hover state if enabled
   */
  private _onMouseEnter(): void {
    if (this._isEnabled()) {
      this.setState({ hover: true });
    }
  }

  /**
   * Handle mouse leave event - clear hover state
   */
  private _onMouseLeave(): void {
    if (this.state.hover) {
      this.setState({ hover: false });
    }
  }

  /**
   * Handle click event - trigger onclick callback if enabled
   * @param event - React mouse event
   */
  private _onClick(event: React.MouseEvent<HTMLLIElement>): void {
    event.stopPropagation();
    if (this._isEnabled()) {
      this.props.onclick();
    }
  }

  render(): React.ReactElement {
    const {
      visible,
      enable,
      label,
      isPressed,
      hotkey,
      showRedDot: initialShowRedDot,
      countNumber,
      showNew: initialShowNew,
    } = this.props;

    const { hover } = this.state;

    // Build CSS class list based on component state
    const classNames: string[] = ['helpitem'];
    
    if (!visible) {
      classNames.push('hidden');
    }
    if (!enable) {
      classNames.push('disabled');
    }
    if (hover) {
      classNames.push('hover');
    }
    if (isPressed) {
      classNames.push('actived');
    }

    // Count number takes precedence over red dot and new badge
    let showRedDot = initialShowRedDot;
    let showNew = initialShowNew;
    if (countNumber) {
      showRedDot = false;
      showNew = false;
    }

    return (
      <li
        className={classNames.join(' ')}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onClick}
      >
        <div className="helptext">
          <span className="textonly">{label}</span>
          <span className="hotkey">
            {HSApp.Util.Hotkey.getHotkeyDisplayString(hotkey)}
          </span>
          {showRedDot && <span className="help-red-dot" />}
          {countNumber && (
            <span className="count-number">{countNumber}</span>
          )}
          {!countNumber && showNew && (
            <img className="help-new" src={require('./new-badge-icon.svg')} />
          )}
        </div>
      </li>
    );
  }
}

/**
 * Global HSApp utility type declaration
 */
declare global {
  const HSApp: {
    Util: {
      Hotkey: {
        getHotkeyDisplayString(hotkey: string | Record<string, unknown> | undefined): string;
      };
    };
  };
}