/**
 * 装饰条管理器
 * 负责管理窗框、窗扇等构件上的装饰条集合
 */
export declare class DecorationBarManager {
  /**
   * 宿主对象（Frame、Sash等）
   */
  private readonly host: Frame | Sash | WinComponent;

  /**
   * 装饰条集合，key为序列化后的PolyId JSON字符串
   */
  private readonly decorationBars: Map<string, DecorationShape>;

  /**
   * 构造装饰条管理器
   * @param host 宿主构件对象
   */
  constructor(host: Frame | Sash | WinComponent);

  /**
   * 添加装饰条到指定多边形
   * @param polyIdContainer 包含polyId的对象
   * @param decorationShape 装饰条形状对象
   */
  addDecorationBar(
    polyIdContainer: { polyId: PolyId },
    decorationShape: DecorationShape
  ): void;

  /**
   * 根据多边形ID获取对应的装饰条
   * @param polyId 多边形标识
   * @returns 装饰条形状对象，不存在则返回undefined
   */
  getDecorationBar(polyId: PolyId): DecorationShape | undefined;

  /**
   * 更新所有装饰条的多边形关联
   * 遍历宿主的玻璃组件，重新计算装饰条位置
   * 移除已失效的装饰条
   */
  updatePoly(): void;

  /**
   * 清空所有装饰条的图形表示（不删除数据）
   */
  clearBar(): void;

  /**
   * 移除指定多边形的装饰条
   * @param polyId 多边形标识
   * @param deleteFromMap 是否从集合中彻底删除，默认false
   */
  removeBar(polyId: PolyId, deleteFromMap?: boolean): void;

  /**
   * 平移所有装饰条
   * @param offset 偏移向量
   */
  translate(offset: Vector2D): void;

  /**
   * 序列化为JSON对象
   * @returns 包含所有装饰条数据的JSON结构
   */
  toJSON(): DecorationBarManagerJSON;

  /**
   * 从JSON数据反序列化
   * @param json 序列化的装饰条管理器数据
   */
  deserialize(json: DecorationBarManagerJSON): void;

  /**
   * 获取所有装饰条的Bar对象数组（扁平化）
   */
  get bars(): Bar[];
}

/**
 * 装饰条管理器序列化数据结构
 */
export interface DecorationBarManagerJSON {
  /**
   * 装饰条数组，每项为[polyIdJSON字符串, DecorationShape序列化数据]
   */
  bars: Array<[string, DecorationShapeJSON]>;
}

/**
 * 多边形唯一标识符
 */
export interface PolyId {
  toJSON(): Record<string, unknown>;
  deserialize(data: Record<string, unknown>): this;
  equalTo(other: PolyId): boolean;
}

/**
 * 装饰条形状对象
 */
export interface DecorationShape {
  /** 关联的多边形 */
  polygon: WinPolygon;
  /** 装饰条定义 */
  decorationBar: DecorationBarChinese;
  /** 包含的Bar图形对象 */
  bars: Bar[];
  
  add(bar: Bar): void;
  clearBar(): void;
  translate(offset: Vector2D): void;
  toJSON(): DecorationShapeJSON;
  deserialize(json: DecorationShapeJSON): void;
}

/**
 * 装饰条中文定义
 */
export interface DecorationBarChinese {
  /** 宿主多边形 */
  hostPoly: WinPolygon;
  /**
   * 拆分装饰条为多个Bar对象
   */
  split(): Bar[];
}

/**
 * 窗框构件
 */
export interface Frame {
  mulManager: { glasses: Glass[] };
  usedPoly: PolyId[];
  add(shape: DecorationShape): void;
}

/**
 * 窗扇构件
 */
export interface Sash {
  mulManager: { glasses: Glass[] };
  usedPoly: PolyId[];
  add(shape: DecorationShape): void;
}

/**
 * 玻璃组件
 */
export interface Glass {
  polygon: WinPolygon;
  bead?: { innerPoly: WinPolygon[] };
}

/**
 * 窗多边形
 */
export interface WinPolygon {
  polyId: PolyId;
  clone(): WinPolygon;
}

/**
 * 条形图形对象
 */
export interface Bar {
  shapeType: ShapeType;
}

/**
 * 图形类型枚举
 */
export enum ShapeType {
  DecorationBar = 'DecorationBar'
}

/**
 * 二维向量
 */
export interface Vector2D {
  x: number;
  y: number;
}

/**
 * 通用窗构件接口
 */
export interface WinComponent {
  add(shape: DecorationShape): void;
}

/**
 * DecorationShape序列化数据
 */
export interface DecorationShapeJSON {
  polygon: Record<string, unknown>;
  decorationBar: Record<string, unknown>;
}