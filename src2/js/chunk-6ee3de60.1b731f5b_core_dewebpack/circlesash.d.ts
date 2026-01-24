/**
 * 圆形窗扇组件
 * @module CircleSash
 */

import { CirclePushSashHardwareManager } from './hardware-manager';
import { Sash, ShapeType } from './base';

/**
 * 圆形窗扇类
 * 继承自基础窗扇类，提供圆形窗扇的特定实现
 */
export declare class CircleSash extends Sash {
  /**
   * 硬件管理器实例
   * 负责管理圆形推拉窗扇的硬件组件
   */
  hardwareManager: CirclePushSashHardwareManager;

  /**
   * 构造函数
   * @param param1 - 第一个参数（具体类型需根据Sash基类确定）
   * @param param2 - 第二个参数（具体类型需根据Sash基类确定）
   * @param param3 - 第三个参数（具体类型需根据Sash基类确定）
   */
  constructor(param1: unknown, param2: unknown, param3: unknown);
}