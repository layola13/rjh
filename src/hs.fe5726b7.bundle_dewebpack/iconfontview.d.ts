/**
 * Iconfont 图标视图组件模块
 * 提供可交互的图标显示功能，支持悬停、点击等交互效果
 */

import { CSSProperties, MouseEvent } from 'react';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

/**
 * Ant Design Icon 组件类型
 * 通过 iconfont 脚本 URL 创建的自定义图标组件
 */
export declare const Icons: React.ComponentType<IconComponentProps>;

/**
 * 默认图标样式配置
 */
export declare const defaultStyle: CSSProperties;

/**
 * 默认背景样式配置
 */
export declare const defaultBgStyle: CSSProperties;

/**
 * IconfontView 组件属性接口
 */
export interface IconfontViewProps {
  /**
   * 图标类型或图片路径
   * 当 isImg 为 true 时，作为图片 src；否则作为 iconfont 图标类型
   */
  showType: string;

  /**
   * 悬停时的背景颜色
   * @example "#f0f0f0"
   */
  hoverBgColor?: string;

  /**
   * 悬停时切换的图标类型
   * 如果提供，悬停时会切换到此图标类型
   */
  hoverType?: string;

  /**
   * 悬停时的图标颜色
   * @example "#1890ff"
   */
  hoverColor?: string;

  /**
   * 点击时的图标颜色
   * @example "#ff4d4f"
   */
  clickColor?: string;

  /**
   * 图标点击事件处理函数
   * @param event - 鼠标事件对象
   */
  iconOnclick?: (event: MouseEvent<HTMLDivElement>) => void;

  /**
   * 鼠标进入事件处理函数
   */
  onMouseEnter?: () => void;

  /**
   * 鼠标离开事件处理函数
   */
  onMouseLeave?: () => void;

  /**
   * 自定义 CSS 类名
   * @default ""
   */
  customClass?: string;

  /**
   * 自定义图标样式
   * @default defaultStyle
   */
  customStyle?: CSSProperties;

  /**
   * 自定义背景容器样式
   * @default defaultBgStyle
   */
  customBgStyle?: CSSProperties;

  /**
   * 背景扩展尺寸（相对于图标字体大小的额外像素）
   * 用于计算悬停背景圆形区域的大小
   * @default 7
   */
  bgExtendSize?: number;

  /**
   * 是否为图片模式
   * true: 使用 img 标签渲染
   * false: 使用 iconfont 图标渲染
   * @default false
   */
  isImg?: boolean;
}

/**
 * Iconfont 图标视图组件
 * 
 * 功能特性：
 * - 支持 iconfont 图标和图片两种显示模式
 * - 可配置悬停、点击等交互状态的颜色和图标切换
 * - 支持自定义样式和背景效果
 * - 提供完整的鼠标事件回调
 * 
 * @param props - 组件属性
 * @returns React 功能组件
 * 
 * @example
 *