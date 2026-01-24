import React, { useContext } from 'react';
import { ConfigContext } from './ConfigContext';

/**
 * SVG属性接口
 */
interface SVGElementProps {
  className: string;
  width: string;
  height: string;
  viewBox: string;
  xmlns: string;
}

/**
 * SVG图形组属性接口
 */
interface SVGGroupProps {
  transform?: string;
  fill?: string;
  fillRule?: 'evenodd' | 'nonzero';
  className?: string;
}

/**
 * 椭圆属性接口
 */
interface EllipseProps {
  className: string;
  cx: string;
  cy: string;
  rx: string;
  ry: string;
}

/**
 * 路径属性接口
 */
interface PathProps {
  d: string;
  className?: string;
}

/**
 * 简单空状态图标组件
 * 
 * 渲染一个64x41的SVG空状态插图，通常用于展示空列表或无数据状态。
 * 该组件使用ConfigContext获取CSS类名前缀以支持主题定制。
 * 
 * @returns React SVG元素
 * 
 * @example
 *