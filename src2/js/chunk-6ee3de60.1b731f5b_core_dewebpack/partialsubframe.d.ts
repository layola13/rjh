/**
 * 部分子框架形状类
 * 继承自基础形状类，用于表示窗口中的部分子框架结构
 * @module PartialSubFrame
 */

import { Shape, ShapeType } from './Shape';
import { WinPolygon } from './WinPolygon';
import { SubFrameManager } from './SubFrameManager';

/**
 * 子框架配置接口
 */
export interface SubFrameConfig {
  /** 子框架标识 */
  id?: string;
  /** 子框架参数 */
  [key: string]: unknown;
}

/**
 * 框架条集合接口
 */
export interface FrameBars {
  /** 顶部条 */
  top?: unknown;
  /** 底部条 */
  bottom?: unknown;
  /** 左侧条 */
  left?: unknown;
  /** 右侧条 */
  right?: unknown;
}

/**
 * 部分子框架类
 * 表示窗口系统中的部分子框架，负责管理子框架的几何形状和框架条
 * 
 * @extends Shape
 * @example
 *