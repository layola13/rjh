/**
 * 小型主要按钮组件
 * 基于基础按钮组件的预设样式封装
 */

import type { ComponentType, ReactElement } from 'react';

/**
 * 按钮尺寸类型
 */
type ButtonSize = 'small' | 'medium' | 'large';

/**
 * 按钮类型
 */
type ButtonType = 'primary' | 'secondary' | 'default' | 'link' | 'text';

/**
 * 基础按钮组件的属性接口
 */
interface BaseButtonProps {
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 按钮类型 */
  type?: ButtonType;
  /** 按钮文本内容 */
  children?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** HTML button type */
  htmlType?: 'button' | 'submit' | 'reset';
  [key: string]: any;
}

/**
 * 小型主要按钮组件属性
 * 继承基础按钮属性，但排除 size 和 type（因为已预设）
 */
type SmallPrimaryButtonProps = Omit<BaseButtonProps, 'size' | 'type'> & {
  /** 尺寸（已预设为 small，可选覆盖） */
  size?: ButtonSize;
  /** 类型（已预设为 primary，可选覆盖） */
  type?: ButtonType;
};

/**
 * 基础按钮组件
 */
declare const BaseButton: ComponentType<BaseButtonProps>;

/**
 * 创建小型主要按钮组件
 * 默认配置：size="small", type="primary"
 * 
 * @param props - 按钮属性（可覆盖默认配置）
 * @returns React 元素
 * 
 * @example
 *