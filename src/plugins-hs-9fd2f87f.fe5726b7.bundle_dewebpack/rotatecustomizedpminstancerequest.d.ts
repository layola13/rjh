/**
 * 旋转自定义PM实例的事务请求
 * 用于管理3D模型实例的旋转操作，支持撤销/重做功能
 */

import { HSCore } from './HSCore';

/**
 * 三维旋转角度元组
 * [0]: XZ平面旋转角度
 * [1]: YZ平面旋转角度
 * [2]: XY平面旋转角度
 */
export type RotationTuple = [number, number, number];

/**
 * PM实例接口
 * 定义可旋转的3D模型实例的基本属性
 */
export interface IPMInstance {
  /** XZ平面旋转角度 */
  XRotation: number;
  /** YZ平面旋转角度 */
  YRotation: number;
  /** XY平面旋转角度 */
  ZRotation: number;
}

/**
 * 组合规范返回类型
 * 用于事务合并优化
 */
export type ComposeSpec = [
  instance: IPMInstance,
  oldRotation: RotationTuple,
  newRotation: RotationTuple
];

/**
 * 旋转自定义PM实例请求类
 * 继承自HSCore事务系统，实现可撤销/重做的旋转操作
 * 
 * @extends HSCore.Transaction.Request
 * 
 * @example
 *