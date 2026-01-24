/**
 * 房间名称输入组件
 * 提供可编辑的房间名称输入框，支持自动选中、长度验证等功能
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * 租户类型
 */
type TenantType = 'fp' | string;

/**
 * 应用参数接口
 */
interface AppParams {
  tenant: TenantType;
}

/**
 * 应用实例接口
 */
interface App {
  appParams: AppParams;
}

/**
 * 全局HSApp接口
 */
declare global {
  const HSApp: {
    App: {
      getApp(): App;
    };
  };
  const ResourceManager: {
    getString(key: string): string;
  };
}

/**
 * 组件Props接口
 */
interface RoomNameInputProps {
  /** 数据对象 */
  data?: Record<string, unknown>;
  /** 输入框当前值 */
  value?: string;
  /** 名称变更回调函数 */
  onChangeName?: (keyType: string, value: string) => void;
  /** 是否只读模式 */
  isReadOnly?: boolean;
  /** 键类型标识 */
  keyType?: string;
  /** 默认占位符文本 */
  defaultHolder?: string;
  /** 按键按下回调 */
  onKeyDown?: () => void;
}

/**
 * 组件State接口
 */
interface RoomNameInputState {
  /** 当前输入值 */
  value: string;
  /** 名称变更回调函数引用 */
  onChangeName?: (keyType: string, value: string) => void;
  /** 占位符值对象 */
  placeHolderValue: string;
}

/**
 * 房间名称输入组件类定义
 */
export default class RoomNameInput extends React.Component<RoomNameInputProps, RoomNameInputState> {
  /** PropTypes类型验证 */
  static propTypes = {
    data: PropTypes.object,
    value: PropTypes.string,
    onChangeName: PropTypes.func,
    isReadOnly: PropTypes.bool,
    keyType: PropTypes.string,
    defaultHolder: PropTypes.string,
    onKeyDown: PropTypes.func,
  };

  /** 默认Props */
  static defaultProps: Required<RoomNameInputProps> = {
    data: {},
    value: '',
    onChangeName: () => {},
    isReadOnly: false,
    keyType: '',
    defaultHolder: '',
    onKeyDown: () => {},
  };

  /** 输入框DOM引用 */
  private nameInput: HTMLInputElement | null = null;

  constructor(props: RoomNameInputProps) {
    super(props);
    this.state = {
      value: props.value || '',
      onChangeName: props.onChangeName,
      placeHolderValue: props.value || '',
    };
  }

  /**
   * Props更新生命周期（已废弃但保留兼容）
   * @param nextProps 新的Props
   */
  UNSAFE_componentWillReceiveProps(nextProps: RoomNameInputProps): void {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value || '',
        placeHolderValue: nextProps.value || '',
      });
    }
  }

  /**
   * 获取最大名称长度限制
   * @returns 根据租户类型返回50或10
   */
  private getMaxNameLength(): number {
    const MAX_LENGTH_FP = 50;
    const MAX_LENGTH_DEFAULT = 10;
    return HSApp.App.getApp().appParams.tenant === 'fp' 
      ? MAX_LENGTH_FP 
      : MAX_LENGTH_DEFAULT;
  }

  /**
   * 验证输入值是否有效
   * @param value 待验证的值
   * @returns 值是否有效
   */
  private isValidValue(value: string): boolean {
    return !!(value && value.trim() && value.length <= this.getMaxNameLength());
  }

  /**
   * 获取焦点事件处理
   */
  private onfocus = (): void => {
    this.nameInput?.select();
  };

  /**
   * 失去焦点事件处理
   */
  private onblur = (): void => {
    const { value } = this.state;
    
    if (this.isValidValue(value)) {
      this.state.onChangeName?.(this.props.keyType || '', value);
    } else {
      const fallbackValue = this.state.placeHolderValue;
      this.setState({ value: fallbackValue });
    }
  };

  /**
   * 键盘按下事件处理
   * @param event 键盘事件
   */
  private keydown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const ENTER_KEY_CODE = 13;
    
    if (event.keyCode === ENTER_KEY_CODE) {
      this.onblur();
      this.props.onKeyDown?.();
    }
  };

  /**
   * 输入变更事件处理
   * @param event 输入事件
   */
  private handelChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!this.props.isReadOnly) {
      const newValue = event.target.value;
      this.setState({ value: newValue });
    }
  };

  /**
   * 设置输入框的值
   * @param value 新值
   */
  setValue(value: string): void {
    this.setState({
      value,
      placeHolderValue: value,
    });
  }

  /**
   * 渲染组件
   */
  render(): React.ReactElement {
    const { isReadOnly, defaultHolder } = this.props;
    const { value } = this.state;
    
    const hasError = !this.isValidValue(value);
    const errorClassName = hasError ? ' error' : '';
    const placeholder = defaultHolder || ResourceManager.getString('plugin_right_propertybar_room_name');

    if (isReadOnly) {
      return (
        <input
          ref={(ref) => { this.nameInput = ref; }}
          className="roomNameInput readonly"
          readOnly
          value={placeholder}
        />
      );
    }

    return (
      <input
        ref={(ref) => { this.nameInput = ref; }}
        className={`roomNameInput${errorClassName}`}
        placeholder={this.state.placeHolderValue || placeholder}
        defaultValue={value}
        value={value}
        onFocus={this.onfocus}
        onChange={this.handelChange}
        onBlur={this.onblur}
        onKeyDown={this.keydown}
      />
    );
  }
}