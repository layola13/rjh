/**
 * 3D差异路线显示组件模块
 * 
 * 该模块提供了在3D场景中显示差异化路线（DiffCW Routes）的功能。
 * 继承自HSApp的基础3D显示对象，用于渲染和管理多条差异路线。
 * 
 * @module DiffCWDisplay3D
 * @version 1.0.0
 */

import { HSApp } from './HSApp';
import { DiffCWRouteDisplay3D } from './DiffCWRouteDisplay3D';

/**
 * 差异路线实体接口
 * 定义单条差异路线的数据结构
 */
export interface DiffCWRouteEntity {
  /** 路线唯一标识符 */
  id: string;
  /** 路线名称（可选） */
  name?: string;
  /** 路线路径数据（可选） */
  path?: Array<{ x: number; y: number; z: number }>;
  /** 其他路线相关属性 */
  [key: string]: unknown;
}

/**
 * 差异路线集合实体接口
 * 包含多条差异路线的容器
 */
export interface DiffCWEntity {
  /** 差异路线数组 */
  diffRoutes: DiffCWRouteEntity[];
  /** 实体标识符（可选） */
  id?: string;
  /** 实体名称（可选） */
  name?: string;
}

/**
 * 3D渲染上下文接口
 * 提供3D场景渲染所需的上下文环境
 */
export interface RenderContext {
  /** 渲染器实例 */
  renderer: unknown;
  /** 场景对象 */
  scene: unknown;
  /** 相机对象 */
  camera: unknown;
  /** 其他上下文属性 */
  [key: string]: unknown;
}

/**
 * 3D场景画布接口
 * 提供显示对象查询和管理功能
 */
export interface Canvas3D {
  /**
   * 根据ID获取显示对象
   * @param id - 显示对象的唯一标识符
   * @returns 找到的显示对象实例，不存在则返回null
   */
  getDisplayObjectByID(id: string): DiffCWRouteDisplay3D | null;
  
  /** 画布宽度 */
  width: number;
  /** 画布高度 */
  height: number;
  /** 其他画布属性 */
  [key: string]: unknown;
}

/**
 * 3D组对象接口
 * Three.js或其他3D引擎的组对象类型
 */
export interface Group3D {
  /** 添加子对象 */
  add(object: unknown): void;
  /** 移除子对象 */
  remove(object: unknown): void;
  /** 子对象数组 */
  children: unknown[];
  /** 其他组属性 */
  [key: string]: unknown;
}

/**
 * 可见状态配置接口
 * 用于控制路线显示的可见性参数
 */
export interface VisibleStatusConfig {
  /** 是否可见 */
  visible?: boolean;
  /** 透明度 (0-1) */
  opacity?: number;
  /** 缩放级别 */
  zoomLevel?: number;
  /** 其他可见性相关配置 */
  [key: string]: unknown;
}

/**
 * 3D差异路线显示组件类
 * 
 * 负责在3D场景中渲染和管理差异化路线集合。
 * 继承自HSApp框架的基础Display3D类，提供路线的初始化、更新和可见性控制。
 * 
 * @class DiffCWDisplay3D
 * @extends {HSApp.View.T3d.Base.Display3D}
 * 
 * @example
 *