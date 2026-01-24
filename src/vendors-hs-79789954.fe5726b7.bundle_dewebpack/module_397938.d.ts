/**
 * 单位类型
 */
type UnitType = 'm' | 'cm';

/**
 * 几何计算容差配置类
 * 
 * 用于配置几何计算中的各种精度容差值，支持米(m)和厘米(cm)两种单位系统。
 * 不同的单位系统会使用不同的容差值以保证计算精度。
 */
declare class ToleranceConfig {
  /**
   * 相等判断容差
   * 用于判断两个数值是否相等的最小差值
   */
  EQUAL_TOLERANCE: number;

  /**
   * 距离容差
   * 用于距离计算的精度容差
   */
  DISTANCE_TOLERENCE: number;

  /**
   * 平面距离容差
   * 用于平面距离计算的精度容差
   */
  PLANE_DISTANCE_TOLERENCE: number;

  /**
   * 距离平方容差
   * 用于距离平方值比较的精度容差
   */
  DISTANCE_SQ_TOLERENCE: number;

  /**
   * 向量相等容差
   * 用于判断两个向量是否相等的容差值
   */
  VECTOR_EQUAL_TOLERANCE: number;

  /**
   * Clipper库最小面积阈值
   * 小于此值的多边形面积将被视为无效
   */
  CLIPPER_MINI_AREA: number;

  /**
   * Clipper库缩放因子
   * 用于将浮点坐标转换为整数坐标的缩放系数
   */
  CLIPPER_SCALE_FACTOR: number;

  /**
   * Clipper库缩放后的最小面积
   * 等于 CLIPPER_MINI_AREA * CLIPPER_SCALE_FACTOR²
   */
  CLIPPER_MINI_AREA_SCALE: number;

  /**
   * KD树最近邻查询的平方距离容差
   * 用于KD树空间索引的近邻搜索精度控制
   */
  KDTREE_SQ_NEAREST_TOL: number;

  /**
   * 全局单例实例
   * 默认使用米作为单位
   */
  static global: ToleranceConfig;

  /**
   * 构造函数
   * 默认使用米(m)作为单位初始化容差配置
   */
  constructor();

  /**
   * 根据单位类型设置容差配置
   * 
   * @param unit - 单位类型，支持 'm'(米) 或 'cm'(厘米)
   */
  setByUnit(unit: UnitType): void;

  /**
   * 使用米作为单位设置容差配置
   * 
   * @private
   */
  private _setByMeter(): void;

  /**
   * 使用厘米作为单位设置容差配置
   * 
   * @private
   */
  private _setByCentiMeter(): void;
}

export = ToleranceConfig;