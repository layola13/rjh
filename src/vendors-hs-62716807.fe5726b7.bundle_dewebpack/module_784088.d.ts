/**
 * 空状态默认图标组件类型定义
 * 用于在数据为空时显示默认的SVG插图
 * 
 * @module EmptyDefaultImage
 */

import type { FC, SVGProps } from 'react';

/**
 * 配置上下文接口
 * 提供获取组件CSS前缀的功能
 */
export interface ConfigContextValue {
  /**
   * 获取带前缀的CSS类名
   * @param suffix - 类名后缀
   * @returns 完整的CSS类名
   */
  getPrefixCls: (suffix: string) => string;
}

/**
 * 配置上下文
 */
export declare const ConfigContext: React.Context<ConfigContextValue>;

/**
 * 空状态默认图标组件属性
 * 继承SVG元素的所有标准属性
 */
export interface EmptyDefaultImageProps extends SVGProps<SVGSVGElement> {
  /**
   * 自定义CSS类名
   */
  className?: string;
}

/**
 * 空状态默认图标组件
 * 
 * 渲染一个184x152的SVG图标,展示空盒子和消息气泡的插图
 * 通常用于列表、表格等数据为空时的占位显示
 * 
 * @example
 *