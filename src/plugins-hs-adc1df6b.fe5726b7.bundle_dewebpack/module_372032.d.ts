/**
 * 属性栏输入卡片悬浮提示组件
 * Module: module_372032
 * Original ID: 372032
 */

import { CSSProperties, ReactElement } from 'react';

/**
 * 卡片数据配置
 */
export interface CardData {
  /** 图片URL，支持字符串或Promise<string> */
  imgUrl: string | Promise<string>;
  /** 自定义CSS类名 */
  className?: string;
}

/**
 * 组件属性接口
 */
export interface PropertyBarInputCardProps {
  /** 卡片数据配置 */
  data?: CardData;
  /** 触发悬浮的DOM元素 */
  hoverEle?: HTMLElement | null;
  /** 是否处于悬浮状态 */
  isHover: boolean;
}

/**
 * 位置样式类型
 */
export interface PositionStyle {
  top: string;
  left: string;
  transform?: string;
}

/**
 * 属性栏输入卡片悬浮提示组件
 * 
 * @description 根据鼠标悬浮位置动态显示预览卡片，支持异步加载图片
 * 
 * @param props - 组件属性
 * @returns 悬浮卡片React元素，数据为空时返回null
 * 
 * @example
 *