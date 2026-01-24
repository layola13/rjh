import { PushableHardwareManager, OpenDirection } from './PushableHardwareManager';
import { HingeOnCircle, HandleOnCircle, HardwareShape } from './Hardware';

/**
 * 圆弧推拉扇五金件管理器
 * 管理圆弧形状窗扇的铰链和把手等五金配件
 */
export interface CirclePushSashHardwareManager extends PushableHardwareManager {
  /**
   * 开启方向，默认向上
   */
  _openDirection: OpenDirection;

  /**
   * 铰链数组，通常包含2个铰链
   */
  hinges: HingeOnCircle[];

  /**
   * 圆弧窗扇上的把手
   */
  handle: HandleOnCircle;

  /**
   * 获取所有五金件（铰链和把手的组合）
   * @readonly
   */
  readonly hardwares: Array<HingeOnCircle | HandleOnCircle>;

  /**
   * 创建五金件
   * 初始化2个铰链和1个把手
   * @returns 当前管理器实例
   */
  create(): this;

  /**
   * 重新创建五金件
   * 克隆现有铰链和把手，重新生成几何形状
   */
  recreate(): void;

  /**
   * 更新所有五金件的多边形几何数据
   */
  updatePoly(): void;

  /**
   * 平移所有五金件
   * @param offset - 平移向量
   */
  translate(offset: unknown): void;

  /**
   * 序列化为JSON对象
   * @returns 包含五金件数据的JSON对象
   */
  toJSON(): CirclePushSashHardwareData;

  /**
   * 从JSON数据反序列化
   * @param data - 序列化的五金件数据
   * @returns 当前管理器实例
   */
  deserialize(data: CirclePushSashHardwareData): this;

  /**
   * 修复和规范化数据
   * 确保必要字段存在默认值
   * @param data - 待修复的数据
   * @returns 修复后的数据
   */
  fixData(data: Partial<CirclePushSashHardwareData>): CirclePushSashHardwareData;
}

/**
 * 圆弧推拉扇五金件序列化数据结构
 */
export interface CirclePushSashHardwareData {
  /**
   * 把手数据
   */
  handle: {
    /**
     * 五金件形状类型
     */
    hardwareShape: HardwareShape;
    [key: string]: unknown;
  };

  /**
   * 铰链数据数组
   */
  hinges: Array<Record<string, unknown>>;

  [key: string]: unknown;
}

/**
 * 圆弧推拉扇五金件管理器构造函数
 */
export interface CirclePushSashHardwareManagerConstructor {
  new (): CirclePushSashHardwareManager;
  prototype: CirclePushSashHardwareManager;
}

export const CirclePushSashHardwareManager: CirclePushSashHardwareManagerConstructor;