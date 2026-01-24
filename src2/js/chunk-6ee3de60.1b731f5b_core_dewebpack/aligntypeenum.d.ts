/**
 * 对齐类型枚举
 */
export enum AlignTypeEnum {
  /** 居中对齐 */
  center = 0,
  /** 左对齐 */
  left = 1,
  /** 右对齐 */
  right = 2
}

/**
 * 标注类型
 */
export enum DimType {
  /** 直线标注 */
  Line = "line",
  /** 弦长标注 */
  Chord = "chord",
  /** 竖梃标注 */
  Mullion = "mullion",
  /** 竖梃弦高标注 */
  MullionChordHeight = "mullionChordHeight",
  /** 竖梃投影标注 */
  MullionProjection = "mullionProjection",
  /** 内部竖梃标注 */
  InnerMullion = "innermullion",
  /** 内部空间标注 */
  InnerSpace = "innerSpace"
}

/**
 * 内部空间标注参考类型
 */
export enum InnerSpaceDimRefType {
  /** 框架参考 */
  frame = "frame",
  /** 竖梃参考 */
  mullion = "mullion",
  /** 内部竖梃参考 */
  innermullion = "innermullion"
}

/**
 * 点坐标接口
 */
export interface Point {
  x: number;
  y: number;
  toJSON(): { x: number; y: number };
  translate(vec: Vector): Point;
}

/**
 * 向量接口
 */
export interface Vector {
  x: number;
  y: number;
  slope: number;
  length: number;
  multiply(scalar: number): Vector;
  toJSON(): { x: number; y: number };
}

/**
 * 线段接口
 */
export interface Segment {
  start: Point;
  end: Point;
  middle(): Point;
  slope: number;
  length: number;
  translate(vec: Vector): Segment;
}

/**
 * 多边形ID
 */
export interface PolyId {
  idx: number;
  pos: number;
  equalTo(other: PolyId): boolean;
}

/**
 * 标注序列化数据
 */
export interface DimInfoJSON {
  /** 标注类型 */
  type: DimType;
  /** 边索引 */
  eidx: number;
  /** 竖梃标注索引 */
  midx: number;
  /** 标注名称 */
  name: string;
  /** 是否显示标注 */
  ds: boolean;
  /** 偏移向量 */
  ov: { x: number; y: number };
  /** 对齐类型 */
  at: AlignTypeEnum;
  /** 参考类型（仅InnerSpaceDimInfo） */
  rt?: InnerSpaceDimRefType;
}

/**
 * 标注权重项
 */
interface DimWeightItem {
  /** 是否已使用 */
  isUsed: boolean;
  /** 标注信息 */
  dim: DimInfo;
  /** 权重值 */
  val: number;
}

/**
 * 基础标注信息类
 */
export declare class DimInfo {
  /** 边索引 */
  edgeIdx: number;
  /** 标注类型 */
  type: DimType;
  /** 竖梃标注索引 */
  mulDimIdx: number;
  /** 标注名称 */
  name: string;
  /** 标注数值 */
  value: number;
  /** 是否显示标注 */
  dimShow: boolean;
  /** 偏移向量 */
  offvec: Vector;
  /** 方向向量 */
  dir: Vector;
  /** 是否为圆弧 */
  isArc: boolean;
  /** 竖梃起始标志 */
  mulStart: boolean;
  /** 对齐类型 */
  alignType: AlignTypeEnum;
  /** 手动确认标志 */
  manualConfirmed: boolean;
  /** 线段数组 */
  segs: Segment[];
  /** 目标构件 */
  targetBar?: any;

  constructor(edgeIdx?: number, type?: DimType);

  /** 是否为框架标注 */
  readonly frameDim: boolean;
  /** 是否为竖梃标注 */
  readonly mullionDim: boolean;
  /** 是否为内部竖梃标注 */
  readonly innerMullionDim: boolean;
  /** 是否为竖梃投影标注 */
  readonly mullionProjectionDim: boolean;
  /** 是否为内部空间标注 */
  readonly innerSpace: boolean;
  /** 获取线段列表 */
  readonly lines: Segment[];
  /** 获取标注对象本身 */
  readonly obj: DimInfo;
  /** 获取标注线段 */
  readonly dimSeg: Segment | undefined;

  /**
   * 创建标注
   * @param bar 目标构件
   * @param segment 线段
   * @param direction 方向向量
   * @param offset 偏移量
   * @param orientation 方向
   * @param mulStart 竖梃起始标志
   */
  createDim(bar: any, segment: Segment, direction: Vector, offset: number, orientation: number, mulStart: boolean): void;

  /**
   * 应用差值
   * @param newValue 新数值
   * @param point 参考点
   */
  applyDiff(newValue: number, point?: Point): void;

  /**
   * 应用到竖梃
   * @param bar 构件
   * @param newValue 新数值
   * @param point 参考点
   */
  applyMullion(bar: any, newValue: number, point: Point): void;

  /**
   * 应用到框架
   * @param newValue 新数值
   * @param expandDir 扩展方向
   */
  applyFrame(newValue: number, expandDir?: number): void;

  /**
   * 平移标注
   * @param vec 平移向量
   */
  translate(vec: Vector): void;

  /**
   * 序列化为JSON
   */
  toJSON(): DimInfoJSON;

  /**
   * 从JSON反序列化
   * @param json 序列化数据
   */
  deserialize(json: DimInfoJSON): this;

  /**
   * 判断是否与另一标注相似
   * @param other 另一标注
   */
  likeTo(other: DimInfo): boolean;

  /**
   * 判断是否反向
   * @param expandDir 扩展方向
   */
  isReverse(expandDir: number): boolean;

  /**
   * 从JSON数据反序列化标注
   * @param json 序列化数据
   */
  static deDim(json: DimInfoJSON): DimInfo;

  /** 判断角度是否向上 */
  static isUp(angle: number): boolean;
  /** 判断角度是否向下 */
  static isDown(angle: number): boolean;
  /** 判断角度是否向左 */
  static isLeft(angle: number): boolean;
  /** 判断角度是否向右 */
  static isRight(angle: number): boolean;
}

/**
 * 弦长标注信息
 */
export declare class ChordDimInfo extends DimInfo {
  constructor(edgeIdx?: number);
}

/**
 * 竖梃标注信息
 */
export declare class MullionDimInfo extends DimInfo {
  constructor(edgeIdx?: number, mulDimIdx?: number);

  readonly frameDim: false;
  readonly mullionDim: true;
}

/**
 * 竖梃弦高标注信息
 */
export declare class MulChordHeightDimInfo extends DimInfo {
  constructor(polyId?: PolyId);

  readonly frameDim: false;
  readonly mullionDim: true;
}

/**
 * 竖梃投影标注信息
 */
export declare class MullionProjectionDimInfo extends DimInfo {
  constructor(edgeIdx?: number, mulDimIdx?: number);

  readonly frameDim: false;
  readonly mullionProjectionDim: true;
}

/**
 * 内部竖梃标注信息
 */
export declare class InnerMullionDimInfo extends DimInfo {
  constructor(edgeIdx?: number, mulDimIdx?: number);

  readonly frameDim: false;
  readonly innerMullionDim: true;
}

/**
 * 内部空间标注信息
 */
export declare class InnerSpaceDimInfo extends DimInfo {
  /** 参考类型 */
  refType: InnerSpaceDimRefType;

  constructor(edgeIdx?: number, mulDimIdx?: number, refType?: InnerSpaceDimRefType);

  readonly frameDim: false;
  readonly innerMullionDim: false;
  readonly innerSpace: true;

  toJSON(): DimInfoJSON;
  deserialize(json: DimInfoJSON): this;
  applyDiff(newValue: number, point?: Point): void;
}

/**
 * 标注信息管理器
 */
export declare class DimInfoManager {
  private _dimInfos: DimInfo[];

  constructor();

  /**
   * 添加标注
   * @param dim 标注信息
   */
  add(dim: DimInfo): void;

  /**
   * 移除标注
   * @param dim 标注信息
   */
  remove(dim: DimInfo): void;

  /**
   * 清空所有标注
   */
  clear(): void;

  /**
   * 查找框架标注
   * @param edgeIdx 边索引
   */
  findFrameDim(edgeIdx: number): DimInfo | undefined;

  /**
   * 查找弦长标注
   * @param edgeIdx 边索引
   */
  findChordDim(edgeIdx: number): DimInfo | undefined;

  /**
   * 查找竖梃标注
   * @param edgeIdx 边索引
   * @param mulDimIdx 竖梃标注索引
   */
  findMulDim(edgeIdx: number, mulDimIdx: number): DimInfo | undefined;

  /**
   * 查找竖梃弦高标注
   * @param polyId 多边形ID
   */
  findMulChordHeightDim(polyId: PolyId): DimInfo | undefined;

  /**
   * 查找竖梃投影标注
   * @param edgeIdx 边索引
   * @param mulDimIdx 竖梃标注索引
   */
  findMulProjectionDim(edgeIdx: number, mulDimIdx: number): DimInfo | undefined;

  /**
   * 查找内部空间标注
   * @param edgeIdx 边索引
   * @param mulDimIdx 竖梃标注索引
   * @param refType 参考类型
   */
  findInnerSpaceDim(edgeIdx: number, mulDimIdx: number, refType: InnerSpaceDimRefType): DimInfo | undefined;

  /**
   * 查找内部竖梃标注
   * @param edgeIdx 边索引
   * @param mulDimIdx 竖梃标注索引
   */
  findInnerMulDim(edgeIdx: number, mulDimIdx: number): DimInfo | undefined;

  /** 获取可见标注列表 */
  readonly visualDims: DimInfo[];

  /** 获取所有标注列表 */
  readonly allDims: DimInfo[];

  /** 获取框架标注数量 */
  readonly frameCount: number;

  /**
   * 序列化为JSON数组
   */
  toJSON(): DimInfoJSON[];

  /**
   * 平移所有标注
   * @param vec 平移向量
   */
  translate(vec: Vector): void;

  /**
   * 遍历所有标注
   * @param callback 回调函数
   */
  forEach(callback: (dim: DimInfo) => void): void;

  /**
   * 过滤重复标注
   * @param shape 图形对象
   */
  filterDuplicate(shape: any): void;

  /**
   * 过滤内部重复标注
   * @param shape 图形对象
   */
  filterDuplicateInner(shape: any): void;

  /**
   * 对竖梃标注信息排序
   */
  sortMulDimInfo(): void;

  /**
   * 获取图形的标注列表
   * @param shape 图形对象
   * @param targetShape 目标图形
   */
  private fdims(shape: any, targetShape: any): DimInfo[];

  /**
   * 判断点是否在区域内
   * @param point 点坐标
   * @param shapes 图形数组
   * @param couples 配对数组
   * @param walls 墙体数组
   */
  private inArea(point: Point, shapes: any[], couples: any[], walls: any[]): boolean;

  /**
   * 计算T角标注权重
   * @param dims 标注列表
   * @param shapes 图形数组
   * @param couples 配对数组
   * @param view 视图对象
   */
  private calcDimTCornerWeight(dims: DimInfo[], shapes: any[], couples: any[], view: any): DimWeightItem[];

  /**
   * 计算标注权重
   * @param dims 标注列表
   * @param shapes 图形数组
   * @param couples 配对数组
   * @param view 视图对象
   */
  private calcDimWeight(dims: DimInfo[], shapes: any[], couples: any[], view: any): DimWeightItem[];

  /**
   * 隐藏重复标注
   * @param allDims 所有标注
   * @param weightItems 权重项数组
   */
  private hideDim(allDims: DimInfo[], weightItems: DimWeightItem[]): void;
}

// 类型别名导出
export type Chord = ChordDimInfo;
export type Mullion = MullionDimInfo;
export type MullionChordHeight = MulChordHeightDimInfo;
export type MullionProjection = MullionProjectionDimInfo;
export type InnerMullion = InnerMullionDimInfo;
export type InnerSpace = InnerSpaceDimInfo;