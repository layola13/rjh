/**
 * ChromeFields - 颜色选择器字段组件
 * 支持在HEX、RGB、HSL三种颜色模式之间切换
 */

import React from 'react';
import { EditableInput } from './EditableInput';

/** HSL颜色值接口 */
interface HSLColor {
  /** 色相 (0-360) */
  h: number;
  /** 饱和度 (0-1) */
  s: number;
  /** 亮度 (0-1) */
  l: number;
  /** 透明度 (0-1) */
  a: number;
}

/** RGB颜色值接口 */
interface RGBColor {
  /** 红色通道 (0-255) */
  r: number;
  /** 绿色通道 (0-255) */
  g: number;
  /** 蓝色通道 (0-255) */
  b: number;
  /** 透明度 (0-1) */
  a: number;
}

/** 颜色变更事件数据 */
interface ColorChangeData {
  /** 十六进制颜色值 */
  hex?: string;
  /** 红色通道值 */
  r?: number;
  /** 绿色通道值 */
  g?: number;
  /** 蓝色通道值 */
  b?: number;
  /** 色相值 */
  h?: number;
  /** 饱和度值 */
  s?: number;
  /** 亮度值 */
  l?: number;
  /** 透明度值 */
  a?: number;
  /** 变更来源 */
  source?: 'hex' | 'rgb' | 'hsl';
}

/** ChromeFields组件属性 */
export interface ChromeFieldsProps {
  /** 当前HEX颜色值 */
  hex: string;
  /** 当前RGB颜色值 */
  rgb: RGBColor;
  /** 当前HSL颜色值 */
  hsl: HSLColor;
  /** 颜色变更回调函数 */
  onChange: (color: ColorChangeData, event?: React.SyntheticEvent) => void;
  /** 是否禁用透明度通道 */
  disableAlpha?: boolean;
}

/** 组件状态 */
interface ChromeFieldsState {
  /** 当前视图模式: 'hex' | 'rgb' | 'hsl' */
  view: 'hex' | 'rgb' | 'hsl' | '';
}

/**
 * ChromeFields - Chrome风格颜色输入字段组件
 * 提供HEX、RGB、HSL三种颜色格式的输入和切换功能
 */
export declare class ChromeFields extends React.Component<ChromeFieldsProps, ChromeFieldsState> {
  /** 图标DOM引用 */
  icon: HTMLDivElement | null;

  state: ChromeFieldsState;

  /**
   * 组件挂载后的生命周期钩子
   * 根据透明度初始化视图模式
   */
  componentDidMount(): void;

  /**
   * 接收新属性时的生命周期钩子
   * 当透明度变化时切换视图模式
   * @param nextProps - 新的组件属性
   */
  componentWillReceiveProps(nextProps: ChromeFieldsProps): void;

  /**
   * 切换颜色显示模式
   * hex -> rgb -> hsl -> hex (透明度为1时) 或 rgb (透明度<1时)
   */
  toggleViews(): void;

  /**
   * 处理颜色值变更
   * @param colorData - 颜色数据对象
   * @param event - 触发事件
   */
  handleChange(colorData: ColorChangeData, event?: React.SyntheticEvent): void;

  /**
   * 显示高亮效果
   * @param event - 鼠标事件
   */
  showHighlight(event: React.MouseEvent<HTMLElement>): void;

  /**
   * 隐藏高亮效果
   * @param event - 鼠标事件
   */
  hideHighlight(event: React.MouseEvent<HTMLElement>): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}

export default ChromeFields;