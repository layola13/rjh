/**
 * 屋顶环位置类型枚举
 * 用于描述屋顶轮廓环的有效性状态
 */
export enum EnRoofLoopPositionType {
  /** 有效的屋顶环 */
  Valid = "valid",
  /** 隐藏的屋顶环 */
  Hide = "hide",
  /** 与其他屋顶相交的环 */
  Intersect = "intersect"
}

/**
 * 屋顶环类型枚举
 * 用于分类不同几何特征的屋顶轮廓
 */
export enum EnRoofLoopType {
  /** 普通多边形 */
  NORMAL = "normal",
  /** 包含圆弧的轮廓 */
  INCLUDE_ARC = "include_arc",
  /** 矩形轮廓 */
  RECT = "rect",
  /** 凸多边形 */
  CONVEX_POLY = "convex_poly"
}

/**
 * 屋顶面信息
 */
export interface IRoofFaceInfo {
  /** 屋顶实体 */
  roof: unknown;
  /** 轮廓环 */
  loop: unknown;
}

/**
 * 带位置信息的屋顶环
 */
export interface IRoofLoopWithPosition {
  /** 楼层层级 */
  level: number;
  /** 轮廓环 */
  loop: unknown;
  /** 位置类型 */
  roofLoopPostionType: EnRoofLoopPositionType;
}

/**
 * 全局路径信息
 */
export interface IGlobalPathInfo {
  /** 路径数据 */
  path: unknown[];
  /** 关联的墙体ID列表 */
  linkWallIds?: string[];
}

/**
 * 带类型的轮廓环信息
 */
export interface ILoopInfo {
  /** 轮廓环 */
  loop: unknown;
  /** 关联的墙体ID列表 */
  linkWallIds?: string[];
  /** 环类型 */
  type: EnRoofLoopType;
}

/**
 * 障碍物基础参数
 */
export interface IObstacleBaseParams {
  /** 开口实体 */
  opening: unknown;
  /** BRep面 */
  brepFace: unknown;
  /** 坐标系 */
  coord: unknown;
  /** 基准高度 */
  baseHeight: number;
  /** 拉伸高度 */
  extruderHeight: number;
}

/**
 * 障碍物信息
 */
export interface IObstacleInfo {
  /** 坐标系 */
  coord: unknown;
  /** 轮廓环 */
  loop: unknown;
  /** 拉伸高度 */
  extruderHeight: number;
  /** 基准坐标系 */
  baseCoord?: unknown;
}

/**
 * 屋顶工具类
 * 提供屋顶几何计算、面配对、轮廓提取等核心功能
 */
export declare class RoofUtil {
  /**
   * 获取配对面中的另一个面
   * @param roof - 屋顶实体
   * @param faceTag - 面标签
   * @returns 配对的另一个面，如果未找到返回undefined
   */
  static getAnotherFaceInPair(roof: unknown, faceTag: string): unknown | undefined;

  /**
   * 获取所有地上楼层的屋顶
   * @returns 屋顶实体数组
   */
  static getAllRoofs(): unknown[];

  /**
   * 获取点在屋顶面上的投影点
   * @param roof - 屋顶实体
   * @param face - 屋顶面
   * @param point - 待投影的点
   * @param thicknessRatio - 厚度比例系数，默认0.5
   * @returns 投影后的点坐标
   */
  static getProjectedPtOnRoof(
    roof: unknown,
    face: unknown,
    point: unknown,
    thicknessRatio?: number
  ): unknown;

  /**
   * 计算开口在屋顶面上的旋转角度
   * @param roof - 屋顶实体
   * @param face - 屋顶面
   * @param direction - 参考方向向量，默认为Y轴负方向
   * @returns 欧拉角旋转
   */
  static getOpeningRotationOnRoofFace(
    roof: unknown,
    face: unknown,
    direction?: unknown
  ): unknown;

  /**
   * 获取屋顶的障碍物信息（门窗开口等）
   * @param roof - 屋顶实体
   * @returns 面标签到障碍物列表的映射
   */
  static getRoofObstacleInfos(roof: unknown): Map<string, IObstacleInfo[]>;

  /**
   * 获取带位置类型的屋顶生成环
   * @param layer - 楼层实体，可选
   * @returns 带位置信息的屋顶环数组
   */
  static getRoofGenerativeLoops(layer?: unknown): IRoofLoopWithPosition[];

  /**
   * 获取所有地上楼层
   * @returns 楼层实体数组
   */
  static getOvergroundLayers(): unknown[];

  /**
   * 合并连续共线的线段曲线
   * @param curves - 曲线数组
   * @returns 合并后的曲线数组
   */
  static mergeCurves(curves: unknown[]): unknown[];

  /**
   * 判断曲线是否构成有效凸多边形
   * @param curves - 曲线数组
   * @returns 是否为有效凸多边形
   */
  static isValidConvexPoly(curves: unknown[]): boolean;

  /**
   * 获取轮廓环的几何类型
   * @param curves - 曲线数组
   * @returns 环类型枚举值
   */
  static getLoopType(curves: unknown[]): EnRoofLoopType;

  /**
   * 根据索引获取地上楼层
   * @param index - 楼层索引（从1开始）
   * @returns 楼层实体
   */
  static getOvergroundLayerByIndex(index: number): unknown;

  /**
   * 获取屋顶的外轮廓环
   * @param roof - 屋顶实体
   * @returns 外轮廓环，如果不存在返回undefined
   */
  static getOuterLoop(roof: unknown): unknown | undefined;

  /**
   * 获取楼层中所有屋顶的外轮廓环
   * @param layer - 楼层实体
   * @returns 轮廓环数组
   */
  static getOuterLoops(layer: unknown): unknown[];

  /**
   * 获取楼层中所有屋顶的外轮廓信息
   * @param layer - 楼层实体
   * @param includeManual - 是否包含手动创建的屋顶，默认false
   * @returns 屋顶面信息数组
   */
  static getOuterLoopInfos(layer: unknown, includeManual?: boolean): IRoofFaceInfo[];

  /**
   * 获取屋顶参数节点
   * @param roof - 屋顶实体
   * @returns 参数节点数组
   */
  static getRoofParamNodes(roof: unknown): unknown[];

  /**
   * 获取初始曲线
   * @param roof - 屋顶实体
   * @returns 初始曲线数组
   */
  static getInitialCurves(roof: unknown): unknown[];

  /**
   * 计算并规范化轮廓环
   * @param input - 输入的面、环或点数组
   * @returns 规范化后的轮廓环
   */
  static calcLoop(input: unknown): unknown;

  /**
   * 获取金字塔屋顶的对应面
   * @param roof - 屋顶实体
   * @param faceTag - 面标签
   * @returns 对应的面，如果未找到返回undefined
   */
  static getPyramidalCorrespondingFaceByFaceTag(
    roof: unknown,
    faceTag: string
  ): unknown | undefined;

  /**
   * 内部方法：获取开口障碍物信息
   * @param params - 障碍物参数
   * @returns 障碍物信息，如果无效返回undefined
   * @internal
   */
  static _getOpeningObstacleInfo(params: IObstacleBaseParams): IObstacleInfo | undefined;

  /**
   * 内部方法：获取参数化开口障碍物信息
   * @param params - 障碍物参数
   * @returns 障碍物信息，如果无效返回undefined
   * @internal
   */
  static _getParametricObstacleInfo(params: IObstacleBaseParams): IObstacleInfo | undefined;

  /**
   * 内部方法：获取带位置信息的环
   * @param roofInfos - 屋顶信息数组
   * @param level - 楼层层级
   * @param currentPaths - 当前楼层路径
   * @param upperPaths - 上层楼层路径
   * @returns 带位置信息的环数组
   * @internal
   */
  static _getLoopsWithPosition(
    roofInfos: IRoofFaceInfo[],
    level: number,
    currentPaths: IGlobalPathInfo[],
    upperPaths?: IGlobalPathInfo[]
  ): IRoofLoopWithPosition[];

  /**
   * 内部方法：获取楼层的全局路径信息
   * @param layer - 楼层实体
   * @returns 全局路径信息数组
   * @internal
   */
  static _getGlobalPaths(layer: unknown): IGlobalPathInfo[];

  /**
   * 内部方法：按类型排序环的曲线顺序
   * @param loop - 轮廓环
   * @param loopType - 环类型
   * @returns 排序后的环
   * @internal
   */
  static _sortLoopByType(loop: unknown, loopType: EnRoofLoopType): unknown;

  /**
   * 内部方法：通过布尔运算裁剪路径生成环
   * @param currentPaths - 当前楼层路径
   * @param upperPaths - 上层楼层路径
   * @returns 裁剪后的环信息数组
   * @internal
   */
  static _getClipLoops(
    currentPaths: IGlobalPathInfo[],
    upperPaths?: IGlobalPathInfo[]
  ): ILoopInfo[];

  /**
   * 内部方法：判断曲线是否顺时针
   * @param curves - 曲线数组
   * @returns 是否顺时针
   * @internal
   */
  static _judgeClockWise(curves: unknown[]): boolean;

  /**
   * 内部方法：重新排序曲线使其首尾相连
   * @param curves - 曲线数组
   * @returns 排序后的曲线数组
   * @internal
   */
  static _resortCurves(curves: unknown[]): unknown[];
}