/**
 * Dragger 组件模块
 * 提供拖拽上传功能的React组件
 * @module Dragger
 */

import * as React from 'react';
import { CSSProperties, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Dragger 组件的属性接口
 * @interface DraggerProps
 */
export interface DraggerProps {
  /**
   * 组件的自定义样式
   * @type {CSSProperties}
   */
  style?: CSSProperties;

  /**
   * 组件的高度
   * @type {string | number}
   */
  height?: string | number;

  /**
   * 其他可传递给底层上传组件的任意属性
   * 包括但不限于: accept, multiple, disabled, onChange 等
   */
  [key: string]: unknown;
}

/**
 * Dragger 组件引用类型
 * @interface DraggerRef
 */
export interface DraggerRef {
  /**
   * 组件的 DOM 元素引用
   */
  [key: string]: unknown;
}

/**
 * Dragger - 拖拽上传组件
 * 
 * 这是一个支持拖拽文件上传的React组件,继承自基础上传组件的所有功能。
 * 组件内部将 type 属性固定设置为 "drag",提供拖拽区域的交互体验。
 * 
 * @example
 *