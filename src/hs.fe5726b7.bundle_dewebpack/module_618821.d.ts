/**
 * jQuery UI Number Input Widget - TypeScript 类型定义
 * 提供数字输入控件，支持验证、微调器、范围限制等功能
 */

/**
 * 数字输入范围配置
 */
export interface NumberInputRange {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
}

/**
 * 数字输入控件配置选项
 */
export interface NumberInputWidgetOptions {
  /** 控件唯一标识符 */
  id?: string;
  
  /** 输入框标签文本 */
  label?: string;
  
  /** 初始值 */
  value?: number;
  
  /** 是否只读 */
  readOnly?: boolean;
  
  /** 数值范围限制 */
  range?: NumberInputRange | null;
  
  /** 是否显示微调器（上下箭头） */
  hasSpinner?: boolean;
  
  /** 微调步进值 */
  step?: number;
  
  /** 是否显示错误消息 */
  showErrorMsg?: boolean;
  
  /** 错误提示文本 */
  errorMsg?: string;
  
  /** 占位符文本 */
  placeholder?: string;
  
  /** 是否启用自动连续调整（长按箭头） */
  autoTunning?: boolean;
  
  /** 值变化结束时的回调 */
  onValueChangeEnd?: (value: number | string) => void;
  
  /** 值变化开始时的回调 */
  onValueChangeStart?: () => void;
  
  /** 值变化时的回调 */
  onValueChange?: (value: number) => void;
  
  /** 输入无效时的回调 */
  onInvalidInput?: () => void;
}

/**
 * jQuery UI Widget 实例接口
 */
export interface JQueryNumberInputWidget {
  cnumberinputwidget(method: 'isValid'): boolean;
  cnumberinputwidget(method: 'setErrorStatus'): void;
  cnumberinputwidget(method: 'onInputTextChanged', value: string | number): void;
  cnumberinputwidget(method: 'destroy'): void;
  cnumberinputwidget(method: 'onDisableStateChanged', disabled: boolean): void;
  cnumberinputwidget(method: 'onMinValueChanged', min: number): void;
  cnumberinputwidget(method: 'onMaxValueChanged', max: number): void;
  cnumberinputwidget(options: NumberInputWidgetOptions): JQueryNumberInputWidget;
}

/**
 * 数字输入控件包装类
 * 提供对 jQuery UI cnumberinputwidget 的类型安全封装
 */
export default class NumberInputWidget {
  /**
   * jQuery UI Widget 实例
   */
  instance: JQueryNumberInputWidget;

  /**
   * 构造函数
   * @param element - DOM 元素或 jQuery 选择器
   * @param options - 控件配置选项
   */
  constructor(element: HTMLElement | string, options?: NumberInputWidgetOptions);

  /**
   * 工厂方法：创建新的数字输入控件实例
   * @param element - DOM 元素或 jQuery 选择器
   * @param options - 控件配置选项
   * @returns 控件实例
   */
  static create(element: HTMLElement | string, options?: NumberInputWidgetOptions): NumberInputWidget;

  /**
   * 验证当前输入值是否有效
   * @returns 如果输入有效返回 true，否则返回 false
   */
  isValid(): boolean;

  /**
   * 设置控件为错误状态（显示错误样式和消息）
   */
  setErrorStatus(): void;

  /**
   * 设置控件的值
   * @param value - 要设置的数值
   */
  setValue(value: string | number): void;

  /**
   * 销毁控件，清理事件监听器和 DOM 元素
   */
  destroy(): void;

  /**
   * 设置控件的禁用状态
   * @param disabled - true 表示禁用，false 表示启用
   */
  setDisable(disabled: boolean): void;

  /**
   * 更新允许的最小值
   * @param min - 新的最小值
   */
  updateMinValue(min: number): void;

  /**
   * 更新允许的最大值
   * @param max - 新的最大值
   */
  updateMaxValue(max: number): void;
}

/**
 * jQuery 插件扩展
 */
declare global {
  interface JQuery {
    cnumberinputwidget(options?: NumberInputWidgetOptions): JQueryNumberInputWidget;
    cnumberinputwidget(method: 'isValid'): boolean;
    cnumberinputwidget(method: 'setErrorStatus'): void;
    cnumberinputwidget(method: 'onInputTextChanged', value: string | number): void;
    cnumberinputwidget(method: 'destroy'): void;
    cnumberinputwidget(method: 'onDisableStateChanged', disabled: boolean): void;
    cnumberinputwidget(method: 'onMinValueChanged', min: number): void;
    cnumberinputwidget(method: 'onMaxValueChanged', max: number): void;
  }
}