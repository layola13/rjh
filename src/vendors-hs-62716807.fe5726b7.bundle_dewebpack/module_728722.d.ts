import type { FC, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * InputNumber组件的属性接口
 */
export interface InputNumberProps {
  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 输入框大小
   * @default 'default'
   */
  size?: 'large' | 'small' | 'default';

  /**
   * 自定义前缀类名
   */
  prefixCls?: string;

  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;

  /**
   * 每次改变步数
   * @default 1
   */
  step?: number;

  /**
   * 最小值
   */
  min?: number;

  /**
   * 最大值
   */
  max?: number;

  /**
   * 当前值
   */
  value?: number;

  /**
   * 默认值
   */
  defaultValue?: number;

  /**
   * 变化回调
   */
  onChange?: (value: number | null) => void;

  /**
   * 失焦回调
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * 获焦回调
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 数值精度
   */
  precision?: number;

  /**
   * 格式化展示
   */
  formatter?: (value: number | string | undefined) => string;

  /**
   * 解析格式化的值
   */
  parser?: (displayValue: string | undefined) => number | string;
}

/**
 * 数字输入框组件
 * 
 * 通过鼠标或键盘输入数字，支持增减按钮控制
 * 
 * @example
 *