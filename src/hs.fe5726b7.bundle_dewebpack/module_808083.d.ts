/**
 * SVG图标组件类型定义
 * 用于动态加载和注入SVG图标资源
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * SVG图标组件的Props接口
 */
export interface SvgIconProps {
  /**
   * SVG图标的资源路径
   * @required
   */
  src: string;
}

/**
 * SVG图标组件的Refs接口
 */
interface SvgIconRefs {
  /**
   * SVG图标包装容器的引用
   */
  svgIconWrap: HTMLDivElement;
}

/**
 * 全局资源管理器接口
 */
declare global {
  const ResourceManager: {
    /**
     * 将SVG图标注入到指定的DOM元素中
     * @param element - 目标DOM元素
     */
    injectSVGImage(element: Element): void;
  };
}

/**
 * SVG图标组件类
 * 继承自React组件，负责动态加载和渲染SVG图标
 * 
 * @example
 *