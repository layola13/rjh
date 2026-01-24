import { State } from './State';
import { Arc2DState } from './Arc2DState';
import { Point2DState } from './Point2DState';
import { PointState } from './PointState';
import { Entity } from './Entity';

/**
 * 2D/3D点坐标接口
 */
interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

/**
 * 数组状态初始化配置
 */
interface ArrayStateConfig {
  /** 本地标识符 */
  localId: string;
  /** 描述信息 */
  _des?: string;
  /** 是否可编辑 */
  isEditable: boolean;
  /** 子状态ID数组 */
  value: string[];
}

/**
 * 状态转储选项
 */
interface DumpOptions {
  [key: string]: unknown;
}

/**
 * 状态加载选项
 */
interface LoadOptions {
  [key: string]: unknown;
}

/**
 * 转储后的状态数据
 */
interface DumpedStateData {
  /** 子元素ID列表 */
  children?: string[];
  [key: string]: unknown;
}

/**
 * 数组状态类 - 管理状态对象集合（如点、弧等几何元素）
 * 
 * @remarks
 * ArrayState用于管理一组相关的状态对象，支持动态添加/删除子状态，
 * 并能将子状态序列化为路径（Path）或点数组。
 * 常用于几何图形的顶点、边界等场景。
 * 
 * @example
 *