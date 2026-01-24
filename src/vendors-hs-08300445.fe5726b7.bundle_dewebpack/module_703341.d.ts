import React from 'react';

/**
 * 评分星星的值类型
 */
export type RateValue = number;

/**
 * 方向类型
 */
export type Direction = 'ltr' | 'rtl';

/**
 * 字符渲染函数类型
 * @param origin - 原始字符元素
 * @param props - 星星属性
 * @returns 渲染后的React节点
 */
export type CharacterRender = (
  origin: React.ReactElement,
  props: StarProps
) => React.ReactNode;

/**
 * 单个星星组件的属性
 */
export interface StarProps {
  /** 星星的索引位置 */
  index: number;
  /** 星星总数 */
  count: number;
  /** 是否禁用 */
  disabled: boolean;
  /** 样式类名前缀 */
  prefixCls: string;
  /** 是否允许半星 */
  allowHalf: boolean;
  /** 当前值 */
  value: RateValue;
  /** 点击事件处理 */
  onClick: (event: React.MouseEvent, index: number) => void;
  /** 悬停事件处理 */
  onHover: (event: React.MouseEvent, index: number) => void;
  /** 显示的字符 */
  character: React.ReactNode;
  /** 字符渲染函数 */
  characterRender?: CharacterRender;
  /** 是否聚焦 */
  focused: boolean;
  /** React ref */
  ref?: React.Ref<any>;
  /** key */
  key?: React.Key;
}

/**
 * Rate评分组件的属性接口
 */
export interface RateProps {
  /** 样式类名前缀，默认 'rc-rate' */
  prefixCls?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 星星总数，默认 5 */
  count?: number;
  /** 当前值（受控） */
  value?: RateValue;
  /** 默认值（非受控），默认 0 */
  defaultValue?: RateValue;
  /** 是否允许半星选择，默认 false */
  allowHalf?: boolean;
  /** 是否允许清除（再次点击相同值时清零），默认 true */
  allowClear?: boolean;
  /** 是否禁用，默认 false */
  disabled?: boolean;
  /** 值变化时的回调函数 */
  onChange?: (value: RateValue) => void;
  /** 悬停值变化时的回调函数 */
  onHoverChange?: (value?: RateValue) => void;
  /** 获得焦点时的回调 */
  onFocus?: () => void;
  /** 失去焦点时的回调 */
  onBlur?: () => void;
  /** 键盘按下时的回调 */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  /** 自定义字符，默认 '★' */
  character?: React.ReactNode;
  /** 自定义字符渲染函数 */
  characterRender?: CharacterRender;
  /** tab键索引，默认 0 */
  tabIndex?: number;
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  /** 组件ID */
  id?: string;
  /** 方向（从左到右/从右到左），默认 'ltr' */
  direction?: Direction;
}

/**
 * Rate组件的内部状态接口
 */
export interface RateState {
  /** 当前值 */
  value: RateValue;
  /** 悬停时的值 */
  hoverValue?: RateValue;
  /** 是否处于聚焦状态 */
  focused: boolean;
  /** 清除操作前的值（用于判断是否是清除点击） */
  cleanedValue: RateValue | null;
}

/**
 * Rate评分组件类声明
 * 
 * @example
 *