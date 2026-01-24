/**
 * 冷水组件类型定义
 * 该组件用于表示系统中的冷水元素
 */

import { ComponentTypeDump } from './ComponentTypeDump';
import { TreeComp, TreeCompEnum } from './TreeComp';

/**
 * 组件转储数据接口
 * 用于序列化组件状态
 */
interface ColdWaterDumpData {
  /** 组件类型标识 */
  tp: ComponentTypeDump.ColdWater;
}

/**
 * 冷水组件类
 * 继承自TreeComp，表示组件树中的冷水节点
 */
export declare class ColdWaterComp extends TreeComp {
  /**
   * 组件类型常量
   * 用于标识该组件为冷水类型
   */
  static readonly Type: TreeCompEnum.ColdWater;

  /**
   * 内部引用对象
   * 存储组件关联的对象引用
   * @private
   */
  private _referObject: unknown;

  /**
   * 获取组件类型
   * @returns 返回冷水组件的类型标识
   */
  get type(): TreeCompEnum.ColdWater;

  /**
   * 序列化组件数据
   * 将组件状态转换为可持久化的数据结构
   * @returns 包含组件类型的转储数据对象
   */
  dump(): ColdWaterDumpData;

  /**
   * 从数据加载组件实例
   * 静态工厂方法，用于反序列化组件
   * @param data - 序列化的组件数据
   * @param referObject - 关联的引用对象
   * @returns 新创建的ColdWaterComp实例
   */
  static load(data: unknown, referObject: unknown): ColdWaterComp;
}