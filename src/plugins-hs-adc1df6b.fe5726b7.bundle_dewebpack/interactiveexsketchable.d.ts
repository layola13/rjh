/**
 * 草图数据结构
 * 包含背景、面和辅助线信息
 */
interface SketchData {
  /** 草图背景配置 */
  background: unknown;
  /** 草图面集合 */
  faces: unknown[];
  /** 辅助线集合 */
  guidelines: unknown[];
}

/**
 * 交互式可草图化接口
 * 提供草图数据的获取、设置和更新功能
 */
declare class InteractiveExSketchable {
  /**
   * 内部草图数据存储
   * @private
   */
  private _sketchData: SketchData;

  /**
   * 构造函数
   * 初始化草图数据，包含超大背景和空的面/辅助线数组
   */
  constructor();

  /**
   * 获取当前草图数据
   * @returns 完整的草图数据对象
   */
  getSketch(): SketchData;

  /**
   * 设置草图数据
   * @param sketch - 要设置的新草图数据
   */
  setSketch(sketch: SketchData): void;

  /**
   * 更新草图数据
   * 使用浅合并方式更新现有草图数据
   * @param partialSketch - 部分草图数据，将与现有数据合并
   */
  updateSketch(partialSketch: Partial<SketchData>): void;
}

export { InteractiveExSketchable };