/**
 * 单位输入小部件模块
 * 提供带单位的数值输入控件，支持验证、微调和状态管理
 */

/**
 * NaN值的显示字符串
 */
export const NaNDisplayString = "--";

/**
 * 单位输入小部件的状态枚举
 * 使用位掩码支持多状态组合
 */
export declare enum UnitInputWidgetStateEnum {
  /** 获得焦点状态 */
  focus = 1,
  /** 禁用状态 */
  disabled = 2,
  /** 错误：输入不是数字 */
  errorNotNumber = 4,
  /** 错误：输入不是正数 */
  errorNotPositive = 8,
  /** 错误：输入超出范围 */
  errorOutOfRange = 16,
  /** 错误：自定义错误 */
  errorCustom = 32,
  /** 错误：输入不是整数 */
  errorNotInt = 64
}

/**
 * 单位输入小部件的事件枚举
 */
export declare enum UnitInputWidgetEventsEnum {
  /** 值开始变化 */
  valueChangeStart = "valuechangestart",
  /** 值正在变化 */
  valueChanging = "valuechanging",
  /** 值已变化 */
  valueChanged = "valuechanged",
  /** 值变化结束 */
  valueChangeEnd = "valuechangeend",
  /** 状态已变化 */
  stateChanged = "statechanged"
}

/**
 * 单位输入小部件值变化的原因枚举
 */
export declare enum UnitInputWidgetChangeReasonEnum {
  /** 通过键盘输入 */
  typing = "typing",
  /** 通过热键微调 */
  tunningHotkey = "tunninghotkey",
  /** 通过按钮微调 */
  tunningButton = "tunningbutton"
}

/**
 * 输入验证规则
 */
export interface UnitInputRules {
  /** 是否只允许正数 */
  positiveOnly?: boolean;
  /** 数值范围限制 */
  range?: {
    /** 最小值 */
    min?: number;
    /** 最大值 */
    max?: number;
  };
}

/**
 * 气泡提示配置
 */
export interface PopoverOptions {
  /** 气泡位置 */
  placement: string;
  /** 触发方式 */
  trigger: string;
  /** 提示文本 */
  text: string;
}

/**
 * 单位输入小部件初始化选项
 */
export interface UnitInputWidgetOptions {
  /** 验证规则 */
  rules?: UnitInputRules;
  /** 是否启用焦点 */
  enableFocus?: boolean;
  /** 是否包含单位显示 */
  includeUnit?: boolean;
  /** 是否允许NaN值 */
  nanAllowed?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否只允许整数 */
  intOnly?: boolean;
  /** 是否显示微调按钮 */
  showTunningButtons?: boolean;
  /** 气泡提示配置 */
  popover?: PopoverOptions;
  /** 是否禁用 */
  disabled?: boolean;
  /** 固定单位类型 */
  fixedUnitType?: string;
  /** 固定显示精度 */
  fixedDisplayDigits?: number;
}

/**
 * 事件详情对象
 */
export interface UnitInputEventDetail {
  /** 触发事件的输入控件实例 */
  input: UnitInputWidget;
  /** 当前状态 */
  state?: UnitInputWidgetStateEnum;
  /** 旧值 */
  oldValue?: number;
  /** 当前值 */
  value?: number;
  /** 变化原因 */
  reason?: UnitInputWidgetChangeReasonEnum;
}

/**
 * 值处理器接口
 */
export interface UnitInputHandler {
  /**
   * 修正输入值
   * @param value - 原始值
   * @returns 修正后的值
   */
  correctValue(value: number): number;
}

/**
 * 单位输入小部件类
 * 提供带单位的数值输入控件，支持验证、微调、状态管理和事件分发
 */
export declare class UnitInputWidget {
  /** 父容器元素 */
  protected parentElement: HTMLElement;
  /** 输入框元素 */
  protected inputElement: HTMLInputElement;
  /** 单位类型显示元素 */
  protected unitTypeElement?: HTMLElement;
  /** 数据库存储值 */
  protected dataBaseValue: number;
  /** 当前状态 */
  protected state: UnitInputWidgetStateEnum;
  /** 是否自动获取焦点 */
  protected openFocus: boolean;
  /** 验证规则 */
  protected rules: UnitInputRules;
  /** 是否启用焦点 */
  protected enableFocus?: boolean;
  /** 是否包含单位 */
  protected includeUnit?: boolean;
  /** 是否允许NaN */
  protected nanAllowed?: boolean;
  /** 是否只读 */
  protected isReadOnly?: boolean;
  /** 是否只允许整数 */
  protected isIntOnly?: boolean;
  /** 是否显示箭头按钮 */
  protected showArrow?: boolean;
  /** 单位类型 */
  protected unitType: string;
  /** 显示精度 */
  protected displayDigits: number;
  /** 单位和精度是否固定 */
  protected isUnitTypeAndDigitsFixed: boolean;
  /** 文本表达式 */
  protected textExpression: string;
  /** 微调步长 */
  protected tunningStep: number;
  /** 是否有未提交的值 */
  protected _isValueNotCommitted: boolean;
  /** 旧值（用于撤销） */
  protected _oldValue?: number;
  /** 微调定时器 */
  protected _tunningTimer?: number;
  /** 是否忽略下次鼠标抬起事件 */
  protected _ignoreNextMouseUp: boolean;
  /** 信号钩子 */
  protected _signalHook: any;
  /** 上下文信号钩子 */
  protected _contextSignalHook: any;
  /** 值处理器 */
  protected _handler?: UnitInputHandler;

  /**
   * 构造函数
   * @param element - 父容器元素或选择器
   * @param name - 输入框名称
   * @param options - 初始化选项
   * @param initialValue - 初始值
   * @param disabled - 是否禁用
   * @param handler - 值处理器
   */
  constructor(
    element: string | HTMLElement,
    name: string,
    options?: UnitInputWidgetOptions,
    initialValue?: number,
    disabled?: boolean,
    handler?: UnitInputHandler
  );

  /**
   * 销毁控件，释放资源
   */
  destroy(): void;

  /**
   * @deprecated 使用 destroy() 代替
   */
  destory(): void;

  /**
   * 获取输入框名称
   */
  getName(): string;

  /**
   * 获取当前值
   */
  getValue(): number;

  /**
   * 设置值并更新显示
   * @param value - 新值
   */
  setValue(value: number): void;

  /**
   * 设置文本内容
   * @param text - 文本内容
   * @param isSpecialChar - 是否为特殊字符（+、-、≠）
   */
  setText(text: string, isSpecialChar?: boolean): void;

  /**
   * 获取当前状态
   */
  getState(): UnitInputWidgetStateEnum;

  /**
   * 设置状态
   * @param state - 新状态
   */
  setState(state: UnitInputWidgetStateEnum): void;

  /**
   * 更新状态（位操作）
   * @param stateMask - 状态掩码
   * @param enable - 是否启用该状态
   */
  updateState(stateMask: UnitInputWidgetStateEnum, enable: boolean): void;

  /**
   * 设置固定的单位类型和显示精度
   * @param unitType - 单位类型
   * @param digits - 显示精度
   */
  setFixedUnitTypeAndDigits(unitType: string, digits: number): void;

  /**
   * 清除固定的单位类型和精度，从文档恢复
   */
  clearFixedUnitTypeAndDigits(): void;

  /**
   * 更新选项
   * @param options - 新选项
   */
  updateOptions(options: Partial<UnitInputWidgetOptions>): void;

  /**
   * 检查输入是否符合规则
   */
  isInputsMatchTheRules(): boolean;

  /**
   * 添加事件监听器
   * @param event - 事件名称
   * @param listener - 监听函数
   * @param options - 事件选项
   */
  addEventListener(
    event: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;

  /**
   * 移除事件监听器
   * @param event - 事件名称
   * @param listener - 监听函数
   * @param options - 事件选项
   */
  removeEventListener(
    event: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;

  /**
   * 初始化控件
   * @protected
   */
  protected _init(
    element: string | HTMLElement,
    name: string,
    options: UnitInputWidgetOptions,
    initialValue: number,
    disabled?: boolean
  ): void;

  /**
   * 绑定楼层图事件
   * @protected
   */
  protected _bindEvents(floorplan: any): void;

  /**
   * 解绑事件
   * @protected
   */
  protected _unbindEvents(): void;

  /**
   * 绑定输入框事件
   * @protected
   */
  protected _hookupInputEvents(): void;

  /**
   * 绑定箭头按钮事件
   * @protected
   */
  protected _hookupArrowEvents(): void;

  /**
   * 分发自定义事件
   * @protected
   */
  protected _dispatchEvent(
    eventName: string,
    detail?: Partial<UnitInputEventDetail>
  ): void;

  /**
   * 更新输入框显示文本
   * @protected
   */
  protected _updateInputText(): void;

  /**
   * 开始微调（增减值）
   * @protected
   */
  protected _startFineTuning(
    isIncrease: boolean,
    reason: UnitInputWidgetChangeReasonEnum
  ): void;

  /**
   * 停止微调
   * @protected
   */
  protected _stopFineTuning(): void;

  /**
   * 执行微调操作
   * @protected
   */
  protected _fineTuning(
    isIncrease: boolean,
    reason: UnitInputWidgetChangeReasonEnum
  ): void;

  /**
   * 输入文本变化处理
   * @protected
   */
  protected _onInputTextChanged(): void;

  /**
   * 提交输入值
   * @protected
   */
  protected _commitInput(reason: UnitInputWidgetChangeReasonEnum): void;

  /**
   * 检查值是否符合规则
   * @protected
   */
  protected _isValueMatchRules(value: number): boolean;

  /**
   * 检查值是否在范围内
   * @protected
   */
  protected _isValueInRange(value: number): boolean;

  /**
   * 验证错误状态
   * @protected
   */
  protected _verifyErrorState(isInputting?: boolean): void;

  /**
   * 检查是否为整数类型
   * @protected
   */
  protected _isIntType(value: number): boolean;

  /**
   * 楼层图设置变化处理
   * @protected
   */
  protected _onFloorplanSettingsChanged(event: any): void;

  /**
   * 根据输入文本和单位获取数据库值
   * @abstract
   * @protected
   */
  protected _getDBValueByInput(text: string, unitType: string): number;

  /**
   * 将数据库值转换为显示字符串
   * @abstract
   * @protected
   */
  protected _toDisplayString(
    value: number,
    unitType: string,
    digits: number,
    includeUnit?: boolean
  ): void;

  /**
   * 从文档更新显示单位和精度
   * @abstract
   * @protected
   */
  protected _updateDisplayUnitAndDigitsFromDoc(): void;

  /**
   * 显示单位或精度变化处理
   * @abstract
   * @protected
   */
  protected _onDisplayUnitOrDigitsChanged(): void;

  /**
   * 检查是否为纯数字
   * @protected
   */
  protected _isPureNumber(text: string): boolean;
}