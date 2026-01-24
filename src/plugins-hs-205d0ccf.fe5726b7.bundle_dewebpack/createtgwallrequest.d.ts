/**
 * 创建墙体请求类
 * 用于处理墙体创建的事务请求，包括墙体的几何信息、宽度、模式和承重属性
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 墙体模式枚举
 */
export enum WallMode {
  /** 普通墙体 */
  Normal = 0,
  /** 幕墙 */
  Curtain = 1,
  /** 其他类型 */
  Other = 2
}

/**
 * 曲线接口 - 表示墙体的几何路径
 */
export interface ICurve {
  /** 起点坐标 */
  startPoint: IPoint;
  /** 终点坐标 */
  endPoint: IPoint;
  /** 控制点集合（用于曲线） */
  controlPoints?: IPoint[];
}

/**
 * 点坐标接口
 */
export interface IPoint {
  x: number;
  y: number;
  z?: number;
}

/**
 * 图层接口
 */
export interface ILayer {
  /** 图层高度 */
  height: number;
  /** 添加子元素 */
  addChild(child: unknown): void;
}

/**
 * 墙体对象接口
 */
export interface IWall {
  /** 墙体曲线 */
  curve: ICurve;
  /** 墙体宽度 */
  width: number;
  /** 墙体高度 */
  height: number;
  /** 是否承重墙 */
  isBearing: boolean;
  /** 墙体模式 */
  mode: WallMode;
}

/**
 * 创建墙体请求类
 * 继承自状态请求基类，用于在场景中创建新的墙体元素
 * 
 * @extends HSCore.Transaction.Common.StateRequest
 * 
 * @example
 *