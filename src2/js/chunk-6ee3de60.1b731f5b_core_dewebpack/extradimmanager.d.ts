/**
 * 额外尺寸标注管理器
 * 负责管理和操作图形中的各类尺寸标注（任意、水平、垂直、半径、角度等）
 */
export declare class ExtraDimManager {
  /**
   * 宿主对象，通常是包含该管理器的图形实体
   */
  private readonly host: ExtraDimHost;

  /**
   * 存储所有额外尺寸标注的集合
   */
  private readonly extraDims: Set<ExtraDim>;

  /**
   * 构造函数
   * @param host - 宿主对象，用于承载尺寸标注
   */
  constructor(host: ExtraDimHost);

  /**
   * 添加一个额外的尺寸标注
   * @param extraDim - 要添加的尺寸标注实例
   */
  addExtraDim(extraDim: ExtraDim): void;

  /**
   * 将所有尺寸标注序列化为JSON格式
   * @returns 尺寸标注的JSON数组
   */
  toJSON(): ExtraDimJSON[];

  /**
   * 更新所有尺寸标注的多边形表示
   * @param polygon - 用于更新的多边形数据
   */
  updatePoly(polygon: unknown): void;

  /**
   * 平移所有尺寸标注
   * @param offset - 平移向量
   */
  translate(offset: Vector): void;

  /**
   * 清空所有尺寸标注
   */
  clear(): void;

  /**
   * 绘制所有尺寸标注
   * @param context - 绘图上下文（如Canvas 2D context）
   */
  draw(context: DrawingContext): void;

  /**
   * 从JSON数据反序列化并恢复尺寸标注集合
   * @param data - 序列化的尺寸标注数据数组
   */
  deserialize(data: ExtraDimJSON[] | null | undefined): void;
}

/**
 * 尺寸标注宿主接口
 * 需要实现此接口的对象才能作为ExtraDimManager的宿主
 */
export interface ExtraDimHost {
  /**
   * 向宿主添加尺寸标注
   * @param extraDim - 要添加的尺寸标注
   */
  add(extraDim: ExtraDim): void;

  /**
   * 向宿主添加额外尺寸标注（可能与add有不同的处理逻辑）
   * @param extraDim - 要添加的尺寸标注
   */
  addExtraDim(extraDim: ExtraDim): void;
}

/**
 * 尺寸标注基础接口
 * 所有类型的尺寸标注都需要实现此接口
 */
export interface ExtraDim {
  /**
   * 标注名称（可选）
   */
  name?: string;

  /**
   * 序列化为JSON
   */
  toJSON(): ExtraDimJSON;

  /**
   * 更新多边形表示
   * @param polygon - 多边形数据（可选）
   */
  updatePoly(polygon?: unknown): void;

  /**
   * 平移标注
   * @param offset - 平移向量
   */
  translate(offset: Vector): void;

  /**
   * 绘制标注
   * @param context - 绘图上下文
   */
  draw(context: DrawingContext): void;

  /**
   * 创建框架关联
   * @param relations - 框架关联数据数组
   */
  createFrameRelation(relations: FrameRelationData[]): void;
}

/**
 * 尺寸标注序列化数据格式
 */
export interface ExtraDimJSON {
  /**
   * 尺寸标注类型（dt = dimension type）
   */
  dt: ExtraDimTypeEnum;

  /**
   * 起始点（st = start point）
   */
  st: PointJSON;

  /**
   * 结束点（et = end point）
   */
  et: PointJSON;

  /**
   * 偏移向量（ov = offset vector）
   */
  ov: VectorJSON;

  /**
   * 文本内容（用于半径等标注）
   */
  txt?: string;

  /**
   * 标注名称
   */
  name?: string;

  /**
   * 框架关联数据（fr = frame relations）
   */
  fr: FrameRelationJSON[];
}

/**
 * 尺寸标注类型枚举
 */
export enum ExtraDimTypeEnum {
  /** 任意方向标注 */
  Arbitrary = 0,
  /** 水平标注 */
  Horizontal = 1,
  /** 垂直标注 */
  Vertical = 2,
  /** 半径标注 */
  Radius = 3,
  /** 角度标注 */
  Angle = 4,
}

/**
 * 任意方向尺寸标注类
 */
export declare class ExtraDimArbitrary implements ExtraDim {
  name?: string;
  constructor(
    startPoint: Point,
    endPoint: Point,
    host: ExtraDimHost,
    offsetVector: Vector
  );
  toJSON(): ExtraDimJSON;
  updatePoly(polygon?: unknown): void;
  translate(offset: Vector): void;
  draw(context: DrawingContext): void;
  createFrameRelation(relations: FrameRelationData[]): void;
}

/**
 * 水平尺寸标注类
 */
export declare class ExtraDimHorizontal implements ExtraDim {
  name?: string;
  constructor(
    startPoint: Point,
    endPoint: Point,
    host: ExtraDimHost,
    offsetVector: Vector
  );
  toJSON(): ExtraDimJSON;
  updatePoly(polygon?: unknown): void;
  translate(offset: Vector): void;
  draw(context: DrawingContext): void;
  createFrameRelation(relations: FrameRelationData[]): void;
}

/**
 * 垂直尺寸标注类
 */
export declare class ExtraDimVertical implements ExtraDim {
  name?: string;
  constructor(
    startPoint: Point,
    endPoint: Point,
    host: ExtraDimHost,
    offsetVector: Vector
  );
  toJSON(): ExtraDimJSON;
  updatePoly(polygon?: unknown): void;
  translate(offset: Vector): void;
  draw(context: DrawingContext): void;
  createFrameRelation(relations: FrameRelationData[]): void;
}

/**
 * 半径尺寸标注类
 */
export declare class ExtraDimRadius implements ExtraDim {
  name?: string;
  constructor(
    text: string,
    startPoint: Point,
    host: ExtraDimHost,
    offsetVector: Vector
  );
  toJSON(): ExtraDimJSON;
  updatePoly(polygon?: unknown): void;
  translate(offset: Vector): void;
  draw(context: DrawingContext): void;
  createFrameRelation(relations: FrameRelationData[]): void;
}

/**
 * 角度尺寸标注类
 */
export declare class ExtraDimAngle implements ExtraDim {
  name?: string;
  constructor(startPoint: Point, host: ExtraDimHost);
  toJSON(): ExtraDimJSON;
  updatePoly(polygon?: unknown): void;
  translate(offset: Vector): void;
  draw(context: DrawingContext): void;
  createFrameRelation(relations: FrameRelationData[]): void;
}

/**
 * 框架关联数据类
 */
export declare class FrameRelationData {
  constructor(param1: number, param2: number);
  
  /**
   * 从JSON反序列化
   * @param data - 序列化的框架关联数据
   * @returns 当前实例
   */
  deserialize(data: FrameRelationJSON): this;
}

/**
 * 二维点接口
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * 二维向量接口
 */
export interface Vector {
  x: number;
  y: number;
}

/**
 * 点的JSON序列化格式
 */
export interface PointJSON {
  x: number;
  y: number;
}

/**
 * 向量的JSON序列化格式
 */
export interface VectorJSON {
  x: number;
  y: number;
}

/**
 * 框架关联的JSON序列化格式
 */
export interface FrameRelationJSON {
  [key: string]: unknown;
}

/**
 * 绘图上下文类型（如CanvasRenderingContext2D或自定义渲染器）
 */
export type DrawingContext = CanvasRenderingContext2D | unknown;