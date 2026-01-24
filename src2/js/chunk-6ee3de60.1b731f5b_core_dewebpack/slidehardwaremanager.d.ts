import { HardwareManager } from './HardwareManager';
import { HardwareShape, Handle, IndicatorForSlide } from './Hardware';

/**
 * 推拉窗五金件管理器
 * 负责管理推拉窗的锁具、执手和指示器等五金配件
 */
export declare class SlideHardwareManager extends HardwareManager {
  /**
   * 锁具数组（类型1）
   */
  locks: Handle[];

  /**
   * 锁具数组（类型2）
   */
  lock2s: Handle[];

  /**
   * 推拉窗执手
   */
  handleForSlide: Handle;

  /**
   * 推拉窗指示器
   */
  indicatorForSlide: IndicatorForSlide;

  /**
   * 是否启用上提功能
   */
  pullupEnabled: boolean;

  /**
   * 构造函数
   */
  constructor();

  /**
   * 获取所有五金件的集合
   * 包含所有锁具、执手和锁2类型
   * @returns 五金件数组
   */
  get hardwares(): Handle[];

  /**
   * 获取执手类型
   * @returns 执手的五金形状类型
   */
  get handleType(): HardwareShape;

  /**
   * 设置执手类型
   * 根据类型自动创建对应的推拉窗执手
   * @param shape - 五金形状类型
   */
  set handleType(shape: HardwareShape);

  /**
   * 重新创建所有五金件
   * 克隆现有五金件的属性并重新生成实例
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
   * @returns 包含所有五金件数据的JSON对象
   */
  toJSON(): SlideHardwareManagerJSON;

  /**
   * 从JSON数据反序列化
   * @param data - JSON数据对象
   * @returns 当前实例（支持链式调用）
   */
  deserialize(data: SlideHardwareManagerJSON): this;

  /**
   * 绘制五金件
   * @param context - 绘图上下文
   */
  draw(context: unknown): void;

  /**
   * 修复并规范化数据格式
   * 确保数据结构的向后兼容性
   * @param data - 待修复的数据对象
   * @returns 修复后的数据对象
   */
  protected fixData(data: Partial<SlideHardwareManagerJSON>): SlideHardwareManagerJSON;
}

/**
 * 推拉窗五金件管理器的JSON序列化格式
 */
export interface SlideHardwareManagerJSON {
  /**
   * 锁具数据数组（类型1）
   */
  lock: HandleJSON[];

  /**
   * 锁具数据数组（类型2）
   */
  lock2s: HandleJSON[];

  /**
   * 推拉窗执手数据
   */
  handleForSlide: HandleJSON;

  /**
   * 是否启用上提功能
   */
  pullupEnabled: boolean;

  /**
   * 继承自父类的其他属性
   */
  [key: string]: unknown;
}

/**
 * 五金件JSON序列化格式
 */
interface HandleJSON {
  /**
   * 五金形状类型
   */
  hardwareShape: HardwareShape;

  /**
   * 其他五金件属性
   */
  [key: string]: unknown;
}