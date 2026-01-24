/**
 * 铺装碎石算法模块
 * 用于计算和分配不规则碎石瓷砖在指定区域内的铺设
 */

/**
 * 碎石尺寸类型枚举
 */
export enum RubbleSizeTypeEnum {
  /** 使用包围盒计算 */
  box = 0,
  /** 使用外轮廓路径计算 */
  outerPath = 1
}

/**
 * 曲线属性
 */
interface CurveAttribute {
  /** 曲线类型 */
  type: string;
  /** 曲线长度 */
  len: number;
  /** 圆弧半径（仅当曲线为圆弧时） */
  radius?: number;
}

/**
 * 边缘信息
 */
interface EdgeInfo {
  /** 边缘属性 */
  edge: CurveAttribute;
  /** 方向向量 */
  dir: any; // Vector type from geometry library
}

/**
 * 顶点信息
 */
interface VertexInfo {
  /** 前一个边缘 */
  pre: EdgeInfo & { vertex?: VertexInfo };
  /** 下一个边缘 */
  next: EdgeInfo & { vertex?: VertexInfo };
  /** 顶点角度 */
  angle: number;
  /** 顶点索引 */
  index: number;
  /** 顶点位置 */
  pos: any; // Point type from geometry library
}

/**
 * 碎石路径信息
 */
interface RubblePath {
  /** 外轮廓曲线数组 */
  outer: any[]; // Curve array
}

/**
 * 碎石信息
 */
interface RubbleInfo {
  /** 唯一标识符 */
  uid: string;
  /** 碎石路径 */
  path: RubblePath;
  /** 碎石面积 */
  area: number;
  /** 碎石尺寸（用于矩形计算） */
  size?: any; // Vector2 type
}

/**
 * 裁剪参数
 */
interface ClipParameters {
  /** 碎石顶点数组 */
  rubbleVertexes: VertexInfo[];
  /** 碎石信息 */
  rubble: RubbleInfo;
  /** 是否保持UV映射 */
  keepUv: boolean;
  /** 当前裁剪的砖块分段信息 */
  clipBrick?: VertexInfo[];
  /** 结果收集器 */
  collector?: any[];
}

/**
 * 单元信息
 */
interface UnitInfo {
  /** 单元ID */
  unitId: string;
  /** 外轮廓曲线数组 */
  outer: any[];
  /** 单元面积 */
  area: number;
}

/**
 * 接缝信息
 */
interface SeamInfo {
  /** 接缝宽度 */
  width: number;
}

/**
 * 铺装输入数据
 */
interface PavingInputData {
  /** 接缝信息 */
  seam: SeamInfo;
  /** 单元信息数组 */
  unitsInfos: UnitInfo[];
}

/**
 * 铺装选项
 */
interface PavingOption {
  /** 旋转角度 */
  rotation?: number;
}

/**
 * 图案信息
 */
interface PatternInfo {
  /** 图案识别ID */
  seekId: number;
  /** 铺装选项 */
  pavingOption?: PavingOption;
}

/**
 * 碎石单元
 */
interface RubbleUnit {
  /** 图案信息 */
  patternInfo: PatternInfo;
}

/**
 * 轮廓类型选项
 */
interface OutlineTypeOption {
  /** 轮廓类型 */
  outlineType: RubbleSizeTypeEnum;
  /** 是否保持UV映射 */
  keepUv: boolean;
}

/**
 * 计数结果
 */
interface CountResult {
  /** 各碎石ID的使用计数信息 */
  countInfo: Map<string, number>;
  /** 是否存在计算误差 */
  error?: boolean;
}

/**
 * 铺装碎石算法类
 * 负责在指定区域内计算和分配不规则碎石瓷砖
 */
export declare class PaveRubbleAlgorithm {
  /** 碎石信息数组 */
  private _rubbles: RubbleInfo[];
  
  /** 原始路径 */
  private _originalPath: any[];
  
  /** 原始区域面积 */
  private _originalArea: number;
  
  /** 原始路径的顶点分段信息 */
  private _originalPartial?: VertexInfo[];
  
  /** 当前砖块区域面积 */
  private _brickArea: number;
  
  /** 当前砖块路径 */
  private _brickPath: any[][];
  
  /** 当前砖块的顶点分段信息 */
  private _brickPartial: VertexInfo[][];
  
  /** 各碎石ID的拼接计数信息 */
  private _jointInfo: Map<string, number>;

  /**
   * 构造函数
   * @param rubbles - 碎石信息数组
   * @param originalPath - 原始铺装区域路径
   * @param originalArea - 原始区域面积（可选，未提供时自动计算）
   */
  constructor(rubbles: RubbleInfo[], originalPath: any[], originalArea?: number);

  /**
   * 获取路径的顶点分段属性
   * @param path - 曲线路径数组
   * @returns 顶点信息数组，按角度排序
   */
  private _getPartialAttr(path: any[]): VertexInfo[];

  /**
   * 获取曲线属性
   * @param curve - 曲线对象
   * @returns 曲线属性
   */
  private _getCurveAttr(curve: any): CurveAttribute;

  /**
   * 重置砖块信息为原始状态
   */
  resetBrickInfo(): void;

  /**
   * 计算并更新砖块信息
   * @param paths - 砖块路径数组
   * @param area - 砖块总面积
   */
  private _calculateBrickInfo(paths: any[][], area: number): void;

  /**
   * 尝试裁剪并放置碎石
   * @param params - 裁剪参数
   * @returns 是否成功裁剪
   */
  private _ClipRubble(params: ClipParameters): boolean;

  /**
   * 遍历裁剪尝试
   * @param params - 裁剪参数
   * @param clipFunction - 裁剪函数
   * @returns 是否成功裁剪
   */
  private _traverseClip(params: ClipParameters, clipFunction: (params: ClipParameters, index: number) => boolean): boolean;

  /**
   * 保持UV映射的裁剪方式
   * @param params - 裁剪参数
   * @returns 是否成功裁剪
   */
  private _clipKeepUv(params: ClipParameters): boolean;

  /**
   * 使用相同角度顶点裁剪
   * @param params - 裁剪参数
   * @param vertexIndex - 顶点索引
   * @returns 是否成功裁剪
   */
  private _clipSameAngleVertex(params: ClipParameters, vertexIndex: number): boolean;

  /**
   * 使用相近边缘裁剪
   * @param params - 裁剪参数
   * @param vertexIndex - 顶点索引
   * @returns 是否成功裁剪
   */
  private _clipNearEdge(params: ClipParameters, vertexIndex: number): boolean;

  /**
   * 在指定向量方向上裁剪
   * @param rubbleVertex - 碎石顶点
   * @param brickVertex - 砖块顶点
   * @param rubble - 碎石信息
   * @param collector - 结果收集器
   * @param useNext - 是否使用下一个边（默认true）
   * @returns 是否成功裁剪
   */
  private _clipOnVector(
    rubbleVertex: VertexInfo,
    brickVertex: VertexInfo,
    rubble: RubbleInfo,
    collector?: any[],
    useNext?: boolean
  ): boolean;

  /**
   * 从砖块中裁剪指定路径
   * @param path - 裁剪路径
   * @param area - 裁剪面积
   * @param collector - 结果收集器
   */
  private _ClipBrick(path: any[], area: number, collector?: any[]): void;

  /**
   * 按百分比分配碎石计数
   * @param rubbles - 成功放置的碎石数组
   */
  private _allocatingByPercent(rubbles: RubbleInfo[]): void;

  /**
   * 拼接碎石瓷砖（基于轮廓路径）
   * @param keepUv - 是否保持UV映射
   * @returns 计数结果
   */
  jointRubbleTiles(keepUv: boolean): CountResult;

  /**
   * 拼接矩形碎石瓷砖（基于包围盒）
   * @returns 计数结果
   */
  jointRectRubbleTiles(): CountResult;

  /**
   * 判断两条边是否相似
   * @param edge1 - 边1属性
   * @param edge2 - 边2属性
   * @returns 是否相似
   */
  private _isSimilarEdge(edge1: CurveAttribute, edge2: CurveAttribute): boolean;

  /**
   * 计算碎石数量（静态方法）
   * @param pavingData - 铺装输入数据
   * @param unitId - 单元ID
   * @param rubbles - 碎石信息数组
   * @param option - 轮廓类型选项（可选）
   * @returns 计数结果
   */
  static calculateRubbleCount(
    pavingData: PavingInputData,
    unitId: string,
    rubbles: RubbleInfo[],
    option?: OutlineTypeOption
  ): CountResult;

  /**
   * 判断是否可以使用包围盒计算（静态方法）
   * @param rubbleUnits - 碎石单元数组
   * @returns 是否可以使用包围盒计算
   */
  static canUseBoxCalculate(rubbleUnits: RubbleUnit[]): boolean;
}