import React from 'react';
import PropTypes from 'prop-types';

interface RadioToolItemProps {
  visible: boolean;
  enable: boolean;
  label: string;
  icon: string;
  isChecked: boolean;
  tooltip: string;
  groupId: string;
  onclick: () => void;
  path: string;
  signalChanged?: HSCore.Util.SignalHook.Signal;
  hotkey?: string | object;
}

interface RadioToolItemState {
  hover: boolean;
  isChecked: boolean;
}

interface SignalChangedData {
  data: {
    isChecked: boolean;
  };
}

declare global {
  const ResourceManager: {
    injectSVGImage: (element: HTMLElement | null) => void;
  };
  
  namespace HSCore {
    namespace Util {
      class SignalHook<T = unknown> {
        constructor(context: T);
        listen(signal: SignalHook.Signal, callback: (data: SignalChangedData) => void): void;
        unlistenAll(): void;
      }
      
      namespace SignalHook {
        interface Signal {}
      }
    }
  }
  
  namespace HSApp {
    namespace Util {
      namespace Hotkey {
        function getHotkeyDisplayString(hotkey?: string | object): string;
      }
    }
  }
}

export default class RadioToolItem extends React.Component<RadioToolItemProps, RadioToolItemState> {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    enable: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    tooltip: PropTypes.string.isRequired,
    groupId: PropTypes.string.isRequired,
    onclick: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    signalChanged: PropTypes.object,
    hotkey: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  };

  private _refIconImage: HTMLImageElement | null = null;
  private _signalHook: HSCore.Util.SignalHook<this>;

  constructor(props: RadioToolItemProps) {
    super(props);
    
    this.state = {
      hover: false,
      isChecked: props.isChecked
    };

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onClick = this._onClick.bind(this);
    
    this._signalHook = new HSCore.Util.SignalHook(this);
    
    if (props.signalChanged) {
      this._signalHook.listen(props.signalChanged, (event: SignalChangedData) => {
        this.props.isChecked = event.data.isChecked;
        this.setState({
          isChecked: event.data.isChecked
        });
      });
    }
  }

  private _isEnabled(): boolean {
    return this.props.enable;
  }

  private _onMouseEnter(): void {
    if (this._isEnabled()) {
      this.setState({
        hover: true
      });
    }
  }

  private _onMouseLeave(): void {
    if (this._isEnabled()) {
      this.setState({
        hover: false
      });
    }
  }

  private _onClick(event: React.MouseEvent): void {
    event.stopPropagation();
    if (this._isEnabled()) {
      this.props.onclick();
    }
  }

  componentDidMount(): void {
    if (this.props.icon) {
      ResourceManager.injectSVGImage(this._refIconImage);
    }
  }

  componentWillUnmount(): void {
    this._signalHook.unlistenAll();
  }

  render(): React.ReactElement {
    const { visible, enable, path, label, isChecked, groupId, hotkey, icon } = this.props;
    const { hover } = this.state;

    const toolItemClasses: string[] = ['toolitem'];
    if (!visible) toolItemClasses.push('hidden');
    if (!enable) toolItemClasses.push('disabled');
    if (hover) toolItemClasses.push('hover');

    const radioInputClasses: string[] = ['radio_input'];
    if (isChecked) radioInputClasses.push('radio_input_isChecked');

    const containerClasses: string[] = [];
    if (icon) {
      radioInputClasses.push('radio_input_left');
      containerClasses.push('div_icon_right');
    }

    return (
      <li
        className={toolItemClasses.join(' ')}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onClick}
        data-toolbar-path={path}
      >
        <div className="radio">
          <div className={containerClasses.join(' ')}>
            <span className={radioInputClasses.join(' ')}>
              <span className="radio_input_inner" />
            </span>
            <input
              type="checkbox"
              checked={isChecked}
              name={groupId}
              readOnly={true}
              className="hiddenCheckboxIcon"
            />
            {icon && (
              <div className="tooltext">
                <img
                  alt=""
                  data-src={icon}
                  ref={(element) => {
                    this._refIconImage = element;
                  }}
                />
              </div>
            )}
            <span className={icon ? 'textonly' : ''}>
              {label}
            </span>
            <span className="hotkey">
              {HSApp.Util.Hotkey.getHotkeyDisplayString(hotkey)}
            </span>
          </div>
        </div>
      </li>
    );
  }
}