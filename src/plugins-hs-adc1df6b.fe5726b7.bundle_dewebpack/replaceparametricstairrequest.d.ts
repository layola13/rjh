/**
 * Module: ReplaceParametricStairRequest
 * 用于替换参数化楼梯的事务请求类
 */

import { HSCore } from 'path-to-hscore-types';

/**
 * 位置坐标接口
 */
interface Position {
  x: number;
  y: number;
  z: number;
}

/**
 * 旋转角度接口
 */
interface Rotation {
  x: number;
  y: number;
  z: number;
}

/**
 * 元数据用户自由数据接口
 */
interface UserFreeData {
  parametricMeta?: string;
  [key: string]: unknown;
}

/**
 * 楼梯元数据接口
 */
interface StairMeta {
  userFreeData: UserFreeData;
  [key: string]: unknown;
}

/**
 * 参数化楼梯模型接口
 */
interface ParametricStairsModel {
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  getUniqueParent(): HSCore.Model.Layer | HSCore.Model.Content;
  [key: string]: unknown;
}

/**
 * 替换参数化楼梯的事务请求
 * 继承自 StateRequest，用于处理参数化楼梯的替换操作
 */
declare class ReplaceParametricStairRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 元数据信息
   * @private
   */
  private _meta: StairMeta;

  /**
   * 原有的楼梯模型
   */
  old: ParametricStairsModel;

  /**
   * 新创建的楼梯模型
   */
  new?: HSCore.Model.NCustomizedParametricStairs;

  /**
   * 构造函数
   * @param oldStair - 需要被替换的旧楼梯模型
   * @param meta - 新楼梯的元数据配置
   */
  constructor(oldStair: ParametricStairsModel, meta: StairMeta);

  /**
   * 提交事务时执行的方法
   * 创建新的楼梯内容并返回
   * @returns 返回新创建的楼梯模型，如果创建失败则返回 undefined
   */
  onCommit(): Promise<HSCore.Model.NCustomizedParametricStairs | undefined>;

  /**
   * 创建楼梯内容的内部方法
   * @private
   * @returns 返回新创建的楼梯模型，如果创建失败则返回 undefined
   */
  private _createContent(): Promise<HSCore.Model.NCustomizedParametricStairs | undefined>;

  /**
   * 判断字段是否可以进行事务处理
   * @returns 始终返回 true
   */
  canTransactField(): boolean;
}

export { ReplaceParametricStairRequest };