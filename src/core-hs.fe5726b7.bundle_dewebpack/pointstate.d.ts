/**
 * PointState - 表示三维空间中点的状态管理类
 * 
 * @remarks
 * 该类继承自 State 基类，用于管理和持久化三维坐标点（x, y, z）。
 * 支持状态验证、序列化（dump）和反序列化（load）操作。
 * 
 * @module PointState
 */

import { State, StateField } from './State';
import { Entity } from './Entity';

/**
 * 点状态初始化数据接口
 */
export interface PointStateInitData {
  /** 本地唯一标识符 */
  localId: string;
  /** 描述信息 */
  _des: string;
  /** 是否可编辑 */
  isEditable: boolean;
  /** 坐标值引用 */
  value: {
    x: string;
    y: string;
    z: string;
  };
}

/**
 * 状态字典类型，用于通过ID查找状态对象
 */
export interface StateRegistry {
  [id: string]: State;
}

/**
 * 序列化选项配置
 */
export interface DumpOptions {
  [key: string]: unknown;
}

/**
 * 序列化后的点状态数据结构
 */
export interface DumpedPointData {
  x: string;
  y: string;
  z: string;
  [key: string]: unknown;
}

/**
 * 回调函数类型定义
 */
export type DumpCallback = (result: unknown[], state: PointState) => void;

/**
 * PointState 类
 * 
 * @description
 * 管理三维空间点的状态类，每个坐标轴（x, y, z）都关联一个独立的 State 对象。
 * 提供完整的生命周期管理，包括初始化、验证、序列化和反序列化。
 * 
 * @example
 *