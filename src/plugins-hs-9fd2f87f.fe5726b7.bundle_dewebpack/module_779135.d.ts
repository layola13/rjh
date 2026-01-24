/**
 * 属性栏控件类型枚举
 * 定义了所有可用的控件类型
 */
declare enum PropertyBarControlTypeEnum {
  label = "label",
  divider = "divider",
  slider = "slider",
  numberinput = "numberinput",
  checkbox = "checkbox",
  button = "button",
  imageButton = "imageButton"
}

/**
 * 复选框组件的状态枚举
 */
declare namespace CCheckBox {
  enum StatusEnum {
    checked = "checked",
    unchecked = "unchecked",
    indeterminate = "indeterminate"
  }
}

/**
 * 资源管理器接口
 * 用于获取国际化字符串资源
 */
declare interface ResourceManager {
  /**
   * 根据资源键获取本地化字符串
   * @param key 资源键
   * @returns 本地化的字符串
   */
  getString(key: string): string;
}

/**
 * 数值范围配置
 */
interface RangeConfig {
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
}

/**
 * 滑块控件选项配置
 */
interface SliderOptions {
  /** 尺寸显示配置 */
  dimension?: {
    /** 是否显示尺寸标签 */
    show: boolean;
  };
  /** 是否显示范围线 */
  showRangeline?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 滑块控件配置参数
 */
interface SliderConfig {
  /** 数值范围，默认 {min: 6, max: 20} */
  range?: RangeConfig;
  /** 滑块选项 */
  options?: SliderOptions;
}

/**
 * 数字输入框配置参数
 */
interface NumberInputConfig {
  /** 是否只读，默认 false */
  readOnly?: boolean;
  /** 是否仅允许数字，默认 true */
  numberOnly?: boolean;
  /** 数值范围，默认 {min: 6, max: 20} */
  range?: RangeConfig;
}

/**
 * 复选框气泡提示配置
 */
interface CheckBoxPopover {
  [key: string]: unknown;
}

/**
 * 复选框配置参数
 */
interface CheckBoxConfig {
  /** 复选框状态，默认为 checked */
  status?: CCheckBox.StatusEnum;
  /** 是否禁用，默认 false */
  disable?: boolean;
  /** 气泡提示配置 */
  popover?: CheckBoxPopover;
}

/**
 * 按钮配置参数
 */
interface ButtonConfig {
  /** 是否禁用，默认 false */
  disabled?: boolean;
  /** 按钮样式类型，默认 "btn-default" */
  primary?: string;
}

/**
 * 图片按钮配置参数
 */
interface ImgButtonConfig {
  /** 图片源路径 */
  src: string;
  /** 按钮颜色，默认 0xFFFFFF (白色) */
  color?: number;
  /** 是否禁用，默认 true */
  disable?: boolean;
}

/**
 * 标签控件数据
 */
interface LabelControlData {
  /** 显示的文本内容 */
  text: string;
}

/**
 * 分隔线控件数据
 */
interface DividerControlData {
  /** CSS 类名 */
  className: string;
}

/**
 * 滑块控件数据
 */
interface SliderControlData {
  /** 数值范围 */
  range: RangeConfig;
  /** 滑块选项 */
  options: SliderOptions;
  /** 当前值 */
  value: number | undefined;
  /** 值变化时的回调 */
  onValueChange: ((value: number) => void) | undefined;
  /** 值变化结束时的回调 */
  onValueChangeEnd: ((value: number) => void) | undefined;
}

/**
 * 数字输入框控件数据
 */
interface NumberInputControlData {
  /** 标签文本 */
  label: string;
  /** 当前值 */
  value: number | undefined;
  /** 是否只读 */
  readOnly: boolean;
  /** 是否仅允许数字 */
  numberOnly: boolean;
  /** 数值范围 */
  range: RangeConfig;
  /** 值变化结束时的回调 */
  onValueChangeEnd: ((value: number) => void) | undefined;
}

/**
 * 复选框控件数据
 */
interface CheckBoxControlData {
  /** 工具提示文本 */
  tooltip: string;
  /** 显示文本 */
  text: string;
  /** 复选框状态 */
  status: CCheckBox.StatusEnum;
  /** 是否禁用 */
  disabled: boolean;
  /** 点击事件回调 */
  onclick: (() => void) | undefined;
  /** 气泡提示配置 */
  popover?: CheckBoxPopover;
}

/**
 * 按钮控件数据
 */
interface ButtonControlData {
  /** 按钮文本 */
  text: string;
  /** 是否禁用 */
  disabled: boolean;
  /** 按钮样式类型 */
  primary: string;
  /** 点击事件回调 */
  onclick: (() => void) | undefined;
}

/**
 * 图片按钮控件数据
 */
interface ImgButtonControlData {
  /** 按钮名称 */
  name: string;
  /** 图片源路径 */
  src: string;
  /** 按钮颜色 */
  color: number;
  /** 是否禁用 */
  disable: boolean;
  /** 工具提示文本 */
  tooltip: string;
  /** 点击事件回调 */
  onclick: (() => void) | undefined;
}

/**
 * 属性栏控件基础接口
 */
interface PropertyBarControl<T extends PropertyBarControlTypeEnum, D> {
  /** 控件唯一标识 */
  id?: string;
  /** 控件类型 */
  type: T;
  /** 控件数据 */
  data: D;
}

/**
 * 标签控件
 */
type LabelControl = PropertyBarControl<PropertyBarControlTypeEnum.label, LabelControlData>;

/**
 * 分隔线控件
 */
type DividerControl = PropertyBarControl<PropertyBarControlTypeEnum.divider, DividerControlData>;

/**
 * 滑块控件
 */
type SliderControl = PropertyBarControl<PropertyBarControlTypeEnum.slider, SliderControlData>;

/**
 * 数字输入框控件
 */
type NumberInputControl = PropertyBarControl<PropertyBarControlTypeEnum.numberinput, NumberInputControlData>;

/**
 * 复选框控件
 */
type CheckBoxControl = PropertyBarControl<PropertyBarControlTypeEnum.checkbox, CheckBoxControlData>;

/**
 * 按钮控件
 */
type ButtonControl = PropertyBarControl<PropertyBarControlTypeEnum.button, ButtonControlData>;

/**
 * 图片按钮控件
 */
type ImgButtonControl = PropertyBarControl<PropertyBarControlTypeEnum.imageButton, ImgButtonControlData>;

/**
 * 属性栏控件工具类
 * 提供创建各种属性栏控件的工厂方法
 */
declare const PropertyBarControlFactory: {
  /**
   * 创建标签控件
   * @param id 控件唯一标识
   * @param textKey 文本资源键
   * @returns 标签控件配置对象
   */
  createLabel(id: string, textKey: string): LabelControl;

  /**
   * 创建分隔线控件
   * @returns 分隔线控件配置对象
   */
  createDivider(): DividerControl;

  /**
   * 创建滑块控件
   * @param id 控件唯一标识
   * @param config 滑块配置参数
   * @returns 滑块控件配置对象
   */
  createSlider(id: string, config: SliderConfig): SliderControl;

  /**
   * 创建数字输入框控件
   * @param id 控件唯一标识
   * @param config 数字输入框配置参数
   * @returns 数字输入框控件配置对象
   */
  createNumberInput(id: string, config: NumberInputConfig): NumberInputControl;

  /**
   * 创建复选框控件
   * @param id 控件唯一标识
   * @param tooltipKey 工具提示文本资源键
   * @param textKey 显示文本资源键
   * @param config 复选框配置参数
   * @returns 复选框控件配置对象
   */
  createCheckBox(id: string, tooltipKey: string, textKey: string, config: CheckBoxConfig): CheckBoxControl;

  /**
   * 创建按钮控件
   * @param id 控件唯一标识
   * @param textKey 按钮文本资源键
   * @param config 按钮配置参数
   * @returns 按钮控件配置对象
   */
  createButton(id: string, textKey: string, config: ButtonConfig): ButtonControl;

  /**
   * 创建图片按钮控件
   * @param id 控件唯一标识
   * @param name 按钮名称
   * @param tooltipKey 工具提示文本资源键
   * @param config 图片按钮配置参数
   * @returns 图片按钮控件配置对象
   */
  createImgButton(id: string, name: string, tooltipKey: string, config: ImgButtonConfig): ImgButtonControl;

  /**
   * 在属性面板中查找输入框元素
   * @param id 控件元素的 ID
   * @returns 找到的 input 元素，未找到则返回 undefined
   */
  findInputInPropertyPlane(id: string): HTMLInputElement | undefined;
};

export default PropertyBarControlFactory;