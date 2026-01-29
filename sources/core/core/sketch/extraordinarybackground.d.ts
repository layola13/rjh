/**
 * 表示曲线的接口（需要具备克隆能力）
 */
interface Curve {
  clone(): Curve;
}

/**
 * 区域定义：包含外边界和内部孔洞
 */
interface Region {
  /** 外边界曲线数组 */
  outer: Curve[];
  /** 孔洞数组，每个孔洞由一组曲线组成 */
  holes: Curve[][];
}

/**
 * 构建器曲线项：包含曲线和拓扑标识
 */
interface BuilderCurveItem {
  /** 曲线对象 */
  curve: Curve;
  /** 拓扑标识符 */
  topo: string;
}

/**
 * 构建器孔洞：曲线项数组
 */
type BuilderHole = BuilderCurveItem[];

/**
 * 构建器区域：用于构建的区域表示
 */
interface BuilderRegion {
  /** 外边界曲线项数组 */
  outer: BuilderCurveItem[];
  /** 孔洞数组，每个孔洞包含多个曲线项 */
  holes: BuilderHole[];
  /** 区域拓扑标识 */
  topo: string;
}

/**
 * 非凡背景类
 * 
 * 管理包含外边界和孔洞的复杂区域集合，支持克隆和转换为构建器格式
 */
export declare class ExtraordinaryBackground {
  private readonly _regions: Region[];

  /**
   * 创建非凡背景实例
   * @param regions - 初始区域数组
   */
  constructor(regions: Region[]);

  /**
   * 获取所有区域的深拷贝
   * @returns 克隆后的区域数组
   */
  get regions(): Region[];

  /**
   * 设置区域数组
   * @param regions - 新的区域数组
   */
  setRegions(regions: Region[]): void;

  /**
   * 将区域转换为构建器格式
   * 
   * 为每条曲线生成唯一的拓扑标识符：
   * - 外边界：`background_outer_{regionIndex}_{curveIndex}`
   * - 孔洞：`background_hole_{regionIndex}_{holeIndex}_{curveIndex}`
   * 
   * @returns 构建器区域数组
   */
  toBuilderRegions(): BuilderRegion[];
}