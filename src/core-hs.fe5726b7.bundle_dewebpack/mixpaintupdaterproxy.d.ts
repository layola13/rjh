/**
 * 混合绘制更新器代理接口
 * 用于管理和代理绘制数据的更新操作
 */
export interface IMixPaintUpdater {
  /**
   * 从转储数据更新
   * @param data - 转储数据
   * @param target - 目标对象
   * @param options - 更新选项
   */
  updateFromDump(data: unknown, target: unknown, options: unknown): void;

  /**
   * 从绘制数据更新
   * @param paintData - 绘制数据
   * @param target - 目标对象
   * @param options - 更新选项
   */
  updateFromPaintData(paintData: unknown, target: unknown, options: unknown): void;

  /**
   * 平面图更新后的后置处理
   * @param floorplan - 平面图数据
   * @param context - 上下文信息
   */
  postUpdateFloorplan(floorplan: unknown, context: unknown): void;
}

/**
 * 混合绘制更新器构造函数类型
 */
export type MixPaintUpdaterConstructor = new () => IMixPaintUpdater;

/**
 * 混合绘制更新器代理类
 * 单例模式，用于注册和管理绘制更新器的生命周期
 */
export declare class MixPaintUpdaterProxy {
  /**
   * 单例实例
   */
  private static _ins?: MixPaintUpdaterProxy;

  /**
   * 更新器构造函数
   */
  private _updaterConstructor?: MixPaintUpdaterConstructor;

  /**
   * 更新器实例缓存
   */
  private _updater?: IMixPaintUpdater;

  /**
   * 获取单例实例
   * @returns 代理实例
   */
  static getInstance(): MixPaintUpdaterProxy;

  /**
   * 注册更新器构造函数
   * @param constructor - 更新器构造函数
   */
  static registerUpdater(constructor: MixPaintUpdaterConstructor): void;

  /**
   * 获取或创建更新器实例
   * @returns 更新器实例，如果未注册则返回 undefined
   */
  getUpdater(): IMixPaintUpdater | undefined;

  /**
   * 从转储数据更新
   * @param data - 转储数据
   * @param target - 目标对象
   * @param options - 更新选项
   */
  updateFromDump(data: unknown, target: unknown, options: unknown): void;

  /**
   * 从绘制数据更新
   * @param paintData - 绘制数据
   * @param target - 目标对象
   * @param options - 更新选项
   */
  updateFromPaintData(paintData: unknown, target: unknown, options: unknown): void;

  /**
   * 平面图更新后的后置处理
   * @param floorplan - 平面图数据
   * @param context - 上下文信息
   */
  postUpdateFloorplan(floorplan: unknown, context: unknown): void;
}