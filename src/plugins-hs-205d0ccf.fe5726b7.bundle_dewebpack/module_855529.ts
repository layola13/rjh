import React from 'react';
import { SmartText } from './SmartText';

interface CheckboxToolItemProps {
  visible: boolean;
  enable: boolean;
  label: string;
  isChecked: boolean;
  tooltip: string;
  onclick: () => void;
  path: string;
  hotkey?: string;
  signalChanged?: HSCore.Util.ISignal;
  checkHalfStatus?: () => 'all' | 'none' | 'half';
  changeDataOnly?: (data: { isChecked: boolean }) => void;
}

interface CheckboxToolItemState {
  hover: boolean;
  isChecked: boolean;
}

interface SignalEventData {
  data: {
    isChecked: boolean;
  };
}

export default class CheckboxToolItem extends React.Component<CheckboxToolItemProps, CheckboxToolItemState> {
  private _signalHook: HSCore.Util.SignalHook;

  constructor(props: CheckboxToolItemProps) {
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
      this._signalHook.listen(props.signalChanged, (event: SignalEventData) => {
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
    const { onclick } = this.props;
    event.stopPropagation();

    if (this._isEnabled()) {
      onclick();
    }
  }

  componentWillUnmount(): void {
    this._signalHook.unlistenAll();
  }

  render(): React.ReactElement {
    const {
      visible,
      enable,
      path,
      isChecked,
      label,
      hotkey,
      checkHalfStatus,
      changeDataOnly
    } = this.props;

    const { hover } = this.state;

    const toolitemClasses: string[] = ['toolitem'];
    if (!visible) {
      toolitemClasses.push('hidden');
    }
    if (!enable) {
      toolitemClasses.push('disabled');
    }
    if (hover) {
      toolitemClasses.push('hover');
    }

    const checkboxInputClasses: string[] = ['checkbox_input'];
    let checkedState = isChecked;

    if (checkHalfStatus && changeDataOnly) {
      const halfStatus = checkHalfStatus();

      if (halfStatus === 'all') {
        changeDataOnly({ isChecked: true });
        checkedState = true;
      } else if (halfStatus === 'none') {
        changeDataOnly({ isChecked: false });
        checkedState = false;
      } else if (halfStatus === 'half') {
        changeDataOnly({ isChecked: false });
        checkedState = false;
        checkboxInputClasses.push('checkbox_input_isChecked_half');
      }
    }

    if (checkedState) {
      checkboxInputClasses.push('checkbox_input_isChecked');
    }

    return (
      <li
        className={toolitemClasses.join(' ')}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onClick}
        data-toolbar-path={path}
      >
        <div className="checkbox">
          <div>
            <span className={checkboxInputClasses.join(' ')}>
              <span className="checkbox_input_inner" />
            </span>
            <input
              type="checkbox"
              checked={checkedState}
              readOnly={true}
              className="hiddenCheckboxIcon"
            />
            <span>
              <SmartText>{label}</SmartText>
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