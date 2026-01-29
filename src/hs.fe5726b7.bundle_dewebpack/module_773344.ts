import React from 'react';
import PropTypes from 'prop-types';

interface RoomNameInputProps {
  data?: Record<string, unknown>;
  value?: string;
  onChangeName?: (keyType: string, value: string) => void;
  isReadOnly?: boolean;
  keyType?: string;
  defaultHolder?: string;
  onKeyDown?: () => void;
}

interface RoomNameInputState {
  value: string;
  onChangeName?: (keyType: string, value: string) => void;
  placeHolderValue: string;
}

const MAX_LENGTH_FP = 50;
const MAX_LENGTH_DEFAULT = 10;
const ENTER_KEY_CODE = 13;

class RoomNameInput extends React.Component<RoomNameInputProps, RoomNameInputState> {
  static propTypes = {
    data: PropTypes.object,
    value: PropTypes.string,
    onChangeName: PropTypes.func,
    isReadOnly: PropTypes.bool,
    keyType: PropTypes.string,
    defaultHolder: PropTypes.string,
    onKeyDown: PropTypes.func
  };

  static defaultProps: RoomNameInputProps = {
    data: {},
    value: '',
    onChangeName: undefined,
    isReadOnly: false,
    keyType: '',
    defaultHolder: '',
    onKeyDown: () => {}
  };

  private nameInput: HTMLInputElement | null = null;

  constructor(props: RoomNameInputProps) {
    super(props);
    
    this.state = {
      value: props.value ?? '',
      onChangeName: props.onChangeName,
      placeHolderValue: props.value ?? ''
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: RoomNameInputProps): void {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value ?? '',
        placeHolderValue: nextProps.value ?? ''
      });
    }
  }

  setValue(value: string): void {
    this.setState({
      value,
      placeHolderValue: value
    });
  }

  private getMaxLength(): number {
    const tenant = (window as any).HSApp?.App?.getApp()?.appParams?.tenant;
    return tenant === 'fp' ? MAX_LENGTH_FP : MAX_LENGTH_DEFAULT;
  }

  private onfocus = (): void => {
    this.nameInput?.select();
  };

  private onblur = (): void => {
    const trimmedValue = this.state.value?.trim();
    const maxLength = this.getMaxLength();

    if (trimmedValue && trimmedValue.length <= maxLength) {
      this.state.onChangeName?.(this.props.keyType ?? '', this.state.value);
    } else {
      this.setState({
        value: this.state.placeHolderValue
      });
    }
  };

  private keydown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.onblur();
      this.props.onKeyDown?.();
    }
  };

  private handelChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!this.props.isReadOnly) {
      const value = event.target.value;
      this.setState({ value });
    }
  };

  render(): React.ReactElement {
    const { isReadOnly, defaultHolder } = this.props;
    const trimmedValue = this.state.value?.trim();
    const maxLength = this.getMaxLength();
    const hasError = !trimmedValue || trimmedValue.length > maxLength;
    const errorClass = hasError ? ' error' : '';
    const placeholder = defaultHolder ?? (window as any).ResourceManager?.getString('plugin_right_propertybar_room_name');

    if (isReadOnly) {
      return (
        <input
          ref={(input) => { this.nameInput = input; }}
          className="roomNameInput readonly"
          readOnly={true}
          value={placeholder}
        />
      );
    }

    return (
      <input
        ref={(input) => { this.nameInput = input; }}
        className={`roomNameInput${errorClass}`}
        placeholder={this.state.placeHolderValue || placeholder}
        defaultValue={this.state.value}
        value={this.state.value}
        onFocus={this.onfocus}
        onChange={this.handelChange}
        onBlur={this.onblur}
        onKeyDown={this.keydown}
      />
    );
  }
}

export default RoomNameInput;