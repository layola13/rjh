/**
 * 滑块事件枚举
 * 定义滑块组件支持的所有事件类型
 */
declare enum SliderEventsEnum {
  /** 值开始变化时触发 */
  valueChangeStart = "valuechangestart",
  /** 值变化过程中触发 */
  valueChanged = "valuechanged",
  /** 值变化结束时触发 */
  valueChangeEnd = "valuechangeend"
}

/**
 * 滑块范围配置
 * 定义滑块的最小值和最大值
 */
interface SliderRange {
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
}

/**
 * 滑块尺寸显示配置
 */
interface SliderDimensionConfig {
  /** 是否显示尺寸标注 */
  show: boolean;
  /** 单位（如 px, %, em 等） */
  unit?: string;
}

/**
 * 气泡提示配置
 */
interface SliderPopoverConfig {
  /** 气泡位置 */
  placement: string;
  /** 触发方式 */
  trigger: string;
  /** 提示文本资源键 */
  text: string;
}

/**
 * 滑块选项配置
 */
interface SliderOptions {
  /** 初始值 */
  value?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸显示配置 */
  dimension?: SliderDimensionConfig;
  /** 是否显示范围线 */
  showRangeline?: boolean;
  /** 气泡提示配置 */
  popover?: SliderPopoverConfig;
}

/**
 * 自定义事件详情
 */
interface SliderEventDetail {
  /** 滑块实例引用 */
  input: Slider;
  /** 当前值（仅在 valueChanged 和 valueChangeEnd 事件中存在） */
  value?: number;
}

/**
 * 范围线内部状态
 */
interface RangeLineState {
  /** 是否显示范围线 */
  show?: boolean;
  /** 起始位置值 */
  startPos?: number;
}

/**
 * 滑块组件类
 * 提供可交互的数值选择滑块功能
 */
declare class Slider {
  /** 滑块容器 DOM 元素 */
  domElement: HTMLElement;
  
  /** 父容器元素 */
  parentElement: HTMLElement | JQuery<HTMLElement>;
  
  /** jQuery UI 滑块元素 */
  private _sliderElement: HTMLElement;
  
  /** 范围线状态 */
  private _rangeLine: RangeLineState;
  
  /** 最小值 */
  private _min: number;
  
  /** 最大值 */
  private _max: number;
  
  /** 当前值 */
  private _value: number;

  /**
   * 构造函数
   * @param selector - CSS 选择器或 DOM 元素，指定滑块的父容器
   * @param range - 滑块的值范围配置
   * @param options - 滑块选项配置
   */
  constructor(selector: string | HTMLElement, range: SliderRange, options?: SliderOptions);

  /**
   * 静态工厂方法
   * @param selector - CSS 选择器或 DOM 元素
   * @param range - 值范围配置
   * @param options - 选项配置
   * @returns 新的 Slider 实例
   */
  static create(selector: string | HTMLElement, range: SliderRange, options?: SliderOptions): Slider;

  /**
   * 设置滑块的当前值
   * @param value - 要设置的值
   */
  setValue(value: number): void;

  /**
   * 获取滑块的当前值
   * @returns 当前值
   */
  getValue(): number;

  /**
   * 设置滑块的禁用状态
   * @param disabled - true 为禁用，false 为启用
   */
  setDisable(disabled: boolean): void;

  /**
   * 添加事件监听器
   * @param eventType - 事件类型（使用 SliderEventsEnum 中的值）
   * @param handler - 事件处理函数
   * @param options - 事件监听选项
   */
  addEventListener(
    eventType: SliderEventsEnum | string,
    handler: EventListener,
    options?: boolean | AddEventListenerOptions
  ): void;

  /**
   * 移除事件监听器
   * @param eventType - 事件类型
   * @param handler - 事件处理函数
   * @param options - 事件监听选项
   */
  removeEventListener(
    eventType: SliderEventsEnum | string,
    handler: EventListener,
    options?: boolean | EventListenerOptions
  ): void;

  /**
   * 派发自定义事件
   * @param eventType - 事件类型
   * @param detail - 事件详情数据
   * @private
   */
  private _dispatchEvent(eventType: string, detail: Partial<SliderEventDetail>): void;

  /**
   * 滑块开始拖动时的回调
   * @param event - jQuery UI 事件对象
   * @private
   */
  private _onSliderStart(event: Event): void;

  /**
   * 滑块拖动过程中的回调
   * @param event - jQuery UI 事件对象
   * @param ui - jQuery UI 对象，包含当前值
   * @private
   */
  private _onSlider(event: Event, ui: { value: number }): void;

  /**
   * 滑块停止拖动时的回调
   * @param event - jQuery UI 事件对象
   * @param ui - jQuery UI 对象，包含当前值
   * @private
   */
  private _onSliderStop(event: Event, ui: { value: number }): void;

  /**
   * 初始化滑块 DOM 结构和 jQuery UI 组件
   * @param selector - 父容器选择器或元素
   * @param range - 值范围
   * @param options - 选项配置
   * @private
   */
  private _init(selector: string | HTMLElement, range: SliderRange, options: SliderOptions): void;

  /**
   * 初始化滑块的内部值状态
   * @param range - 值范围
   * @param options - 选项配置
   * @private
   */
  private _initValue(range: SliderRange, options: SliderOptions): void;

  /**
   * 将值限制在有效范围内
   * @param value - 输入值
   * @returns 限制后的有效值
   * @private
   */
  private _fitValue(value: number): number;

  /**
   * 更新范围线的显示位置和宽度
   * @private
   */
  private _updateRangeLine(): void;
}

/**
 * 全局声明
 */
declare global {
  interface Window {
    /** 滑块事件枚举 */
    SliderEventsEnum: typeof SliderEventsEnum;
    /** 滑块类 */
    Slider: typeof Slider;
  }
}

export { Slider, SliderEventsEnum, SliderRange, SliderOptions, SliderEventDetail };