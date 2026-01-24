/**
 * 404错误页面SVG图标组件模块
 * @module module_558428
 * @packageDocumentation
 */

import type { FC, ReactElement, SVGProps } from 'react';

/**
 * SVG路径元素属性接口
 */
interface SVGPathAttributes {
  /** 填充颜色 */
  fill?: string;
  /** SVG路径数据 */
  d?: string;
  /** 描边颜色 */
  stroke?: string;
  /** 描边宽度 */
  strokeWidth?: string;
  /** 线条端点样式 */
  strokeLinecap?: 'butt' | 'round' | 'square';
  /** 线条连接样式 */
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

/**
 * SVG组元素属性接口
 */
interface SVGGroupAttributes {
  /** 填充颜色 */
  fill?: string;
  /** 填充规则 */
  fillRule?: 'nonzero' | 'evenodd';
  /** 变换属性 */
  transform?: string;
}

/**
 * SVG遮罩元素属性接口
 */
interface SVGMaskAttributes {
  /** 填充颜色 */
  fill?: string;
}

/**
 * SVG根元素属性接口
 */
interface SVGRootAttributes {
  /** SVG宽度 */
  width?: string | number;
  /** SVG高度 */
  height?: string | number;
  /** 视图框 */
  viewBox?: string;
}

/**
 * 404错误页面图标组件
 * 
 * @description 
 * 渲染一个252x294像素的SVG图形，显示404错误页面的插图。
 * 包含蓝色的问号图标、装饰性元素和几何图形。
 * 
 * @returns React SVG元素
 * 
 * @example
 *