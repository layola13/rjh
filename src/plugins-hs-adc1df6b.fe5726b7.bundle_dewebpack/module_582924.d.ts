/**
 * 颜色选择器组件的类型定义
 */

/**
 * 颜色格式类型
 */
type ColorFormat = 10 | 16;

/**
 * 标签类型
 */
type LabelType = 'switch' | 'default';

/**
 * 组件状态
 */
type ComponentStatus = 'checked' | 'unchecked';

/**
 * 颜色值类型（支持十进制、十六进制字符串）
 */
type ColorValue = number | string;

/**
 * 预设颜色配置
 */
interface PresetColor {
  label?: string;
  colors: string[];
}

/**
 * 颜色选择器组件的数据属性
 */
interface ColorPickerData {
  /** 当前颜色值 */
  value: ColorValue;
  
  /** 自定义CSS类名 */
  classname?: string;
  
  /** 工具提示文本 */
  tooltip?: string;
  
  /** 颜色格式：10进制或16进制，默认16 */
  format?: ColorFormat;
  
  /** 显示标签文本 */
  label?: string;
  
  /** 标签类型：switch模式或默认模式 */
  labelType?: LabelType;
  
  /** 组件状态 */
  status?: ComponentStatus;
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 预设颜色列表 */
  presetColors?: PresetColor[];
  
  /** 关闭时的回调函数 */
  onClose?: () => void;
  
  /** 颜色值变化时的回调函数 */
  onValueChange?: (value: ColorValue) => void;
  
  /** 状态变化时的回调函数（用于switch模式） */
  onStatusChange?: (checked: boolean) => void;
}

/**
 * 颜色选择器组件的Props
 */
interface ColorPickerProps {
  /** 组件数据配置 */
  data: ColorPickerData;
}

/**
 * 颜色选择器组件
 * 
 * @description 支持两种模式：
 * 1. 默认模式：单独的颜色选择器
 * 2. Switch模式：带开关的颜色选择器
 * 
 * @param props - 组件属性
 * @returns React组件
 * 
 * @example
 *