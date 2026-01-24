import { CoordinateAxis } from './CoordinateAxis';

/**
 * 扩展坐标轴类，支持基于灯光目标点或实体位置的动态内容定位
 * 
 * @remarks
 * 该类继承自 CoordinateAxis，根据活动上下文中的配置自动选择定位策略：
 * - 当 selectLightTarget 为 true 时，使用灯光目标点坐标 (XTarget, YTarget, ZTarget)
 * - 否则使用实体自身坐标 (x, y, z)
 */
export default class ExtendedCoordinateAxis extends CoordinateAxis {
  /**
   * 创建扩展坐标轴实例
   * 
   * @param arg0 - 第一个构造参数（具体类型取决于父类 CoordinateAxis）
   * @param arg1 - 第二个构造参数
   * @param arg2 - 第三个构造参数
   * @param arg3 - 第四个构造参数
   */
  constructor(arg0: unknown, arg1: unknown, arg2: unknown, arg3: unknown);

  /**
   * 获取内容的三维空间位置
   * 
   * @returns 根据上下文配置返回目标点坐标或实体自身坐标的 THREE.Vector3 对象
   * 
   * @example
   *