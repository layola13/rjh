import { PushSashHardwareManager } from './PushSashHardwareManager';
import { HardwareShape, KfcHandle } from './hardware-types';
import { Sash } from './sash-types';

/**
 * KFC推拉窗五金件管理器
 * 继承自PushSashHardwareManager，提供KFC特定的五金件创建和中梃生成逻辑
 */
export declare class KfcSashHardwareManager extends PushSashHardwareManager {
  /**
   * 铰链类型
   */
  hingeType?: HardwareShape;

  /**
   * 窗扇对象引用
   */
  sash: Sash;

  /**
   * 根据五金件类型创建对应的把手实例
   * @param hardwareShape - 五金件形状类型
   * @returns 创建的把手对象实例
   */
  createHandle(hardwareShape: HardwareShape): KfcHandle | ReturnType<PushSashHardwareManager['createHandle']>;

  /**
   * 根据五金件类型生成对应的中梃（mullion）结构
   * - 当类型为KfcHandle且无分割线时，在窗扇中心添加垂直中梃
   * - 当类型非KfcHandle时，清空所有分割线并更新多边形
   * @param hardwareShape - 五金件形状类型
   */
  generateMullionByType(hardwareShape: HardwareShape): void;
}