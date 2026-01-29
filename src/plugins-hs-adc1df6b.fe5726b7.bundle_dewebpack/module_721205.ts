import React from 'react';
import PropTypes from 'prop-types';
import helpNewIcon from './help-new-icon';

interface HelpItemProps {
  visible: boolean;
  enable: boolean;
  label: string;
  onclick: () => void;
  isPressed?: boolean;
  hotkey?: string | object;
  showRedDot?: boolean;
  countNumber?: number;
  showNew?: boolean;
  icon?: string;
}

interface HelpItemState {
  hover: boolean;
  enable: boolean;
  isPressed: boolean;
}

class HelpItem extends React.Component<HelpItemProps, HelpItemState> {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    enable: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onclick: PropTypes.func.isRequired,
    isPressed: PropTypes.bool,
    hotkey: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    showRedDot: PropTypes.bool
  };

  static defaultProps = {
    visible: true,
    isPressed: false,
    hotkey: undefined
  };

  constructor(props: HelpItemProps) {
    super(props);
    
    this.state = {
      hover: false,
      enable: props.enable,
      isPressed: props.isPressed ?? false
    };

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  private _isEnabled(): boolean {
    return this.props.enable;
  }

  private _onMouseEnter(): void {
    if (this._isEnabled()) {
      this.setState({ hover: true });
    }
  }

  private _onMouseLeave(): void {
    if (this.state.hover) {
      this.setState({ hover: false });
    }
  }

  private _onClick(event: React.MouseEvent): void {
    event.stopPropagation();
    
    if (this._isEnabled()) {
      this.props.onclick();
    }
  }

  render(): React.ReactNode {
    const { visible, enable, label, isPressed, hotkey, showNew } = this.props;
    let { showRedDot, countNumber } = this.props;
    const { hover } = this.state;

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

    if (countNumber) {
      showRedDot = false;
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
          {!!countNumber && <span className="count-number">{countNumber}</span>}
          {!countNumber && showNew && (
            <img className="help-new" src={helpNewIcon} />
          )}
        </div>
      </li>
    );
  }
}

export default HelpItem;