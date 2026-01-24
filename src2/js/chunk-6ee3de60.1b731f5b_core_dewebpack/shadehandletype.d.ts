/**
 * 遮阳系统模块
 * 提供遮阳配置、手柄类型定义及相关管理功能
 */

/**
 * 遮阳手柄类型枚举
 * 定义遮阳系统支持的手柄位置类型
 */
export enum ShadeHandleType {
  /** 无手柄 */
  None = 0,
  /** 中心手柄 */
  Center = 1,
  /** 左侧手柄 */
  Left = 2,
  /** 右侧手柄 */
  Right = 3,
  /** 双侧手柄 */
  Both = 4
}

/**
 * 遮阳区域类
 * 继承自Area，提供遮阳系统的完整功能实现
 * 包括珠链管理、间距配置、标签显示等
 */
export declare class Shade extends Area {
  /** 宿主对象引用 */
  readonly host: unknown;
  
  /** 遮阳区域的多边形几何 */
  polygon: Polygon;
  
  /** 点击索引 */
  tapIdx: number;
  
  /** 手柄形状集合 */
  shapes: Shape[];
  
  /** 偏移向量 */
  offvec: Vector;
  
  /** 手柄类型 */
  handleType: ShadeHandleType;
  
  /** 自定义属性集合 */
  attrs: Record<string, unknown>;
  
  /** 形状类型标识 */
  readonly type: ShapeType.Shade;
  
  /** 多层管理器 */
  readonly mulManager: ShadeManager;
  
  /** 内边距标签 */
  readonly paddingLabel: Label;
  
  /** 间距标签 */
  readonly gapLabel: Label;
  
  /** 珠链对象（可选） */
  bead?: Bead;
  
  /** 是否隐藏珠链 */
  readonly beadHidden: boolean;
  
  /** 内部珠链启用状态 */
  private _withBead: boolean;

  /**
   * 构造函数
   * @param host - 宿主对象
   * @param polygon - 遮阳区域多边形
   */
  constructor(host: unknown, polygon: Polygon);

  /**
   * 是否允许拖拽修改
   * @readonly
   */
  get dragModify(): false;

  /**
   * 是否启用珠链
   */
  get withBead(): boolean;
  set withBead(value: boolean);

  /**
   * 内边距值
   * @readonly
   */
  get padding(): number;

  /**
   * 间距值
   * @readonly
   */
  get gap(): number;

  /**
   * 生成内边距描述文本
   * @param value - 内边距数值
   * @returns 格式化后的描述字符串
   */
  paddingDesc(value: number): string;

  /**
   * 生成间距描述文本
   * @param value - 间距数值
   * @returns 格式化后的描述字符串
   */
  gapDesc(value: number): string;

  /**
   * 更新珠链状态
   * 根据_withBead标志创建或移除珠链对象
   */
  updateBead(): void;

  /**
   * 平移变换
   * 同时移动珠链、管理器、形状和标签
   * @param vector - 平移向量
   */
  translate(vector: Vector): void;

  /**
   * 序列化为JSON对象
   * @returns 包含完整状态的JSON对象
   */
  toJSON(): {
    /** 形状类型 */
    type: ShapeType.Shade;
    /** 多边形ID */
    pid: unknown;
    /** 多层管理器状态 */
    mm: unknown;
    /** 手柄类型 */
    ht: ShadeHandleType;
    /** 珠链启用状态 */
    wbd: boolean;
    /** 珠链数据（如果存在） */
    bd?: unknown;
    /** 间距标签数据 */
    glab: unknown;
    /** 内边距标签数据 */
    plab: unknown;
    /** 自定义属性 */
    attrs: Record<string, unknown>;
  };

  /**
   * 从JSON对象反序列化
   * @param data - 序列化数据对象
   */
  deserialize(data: {
    mm: unknown;
    ht?: ShadeHandleType;
    wbd?: boolean;
    bd?: unknown;
    attrs?: Record<string, unknown>;
  }): void;

  /**
   * 更新多边形
   * 刷新珠链、形状、管理器和标签
   * @param polygon - 新的多边形对象（可选）
   */
  updatePoly(polygon?: Polygon): void;

  /**
   * 绘制遮阳系统
   * 渲染所有形状、标签和子元素
   * @param context - 绘图上下文
   */
  draw(context: unknown): void;

  /**
   * 生成手柄形状集合
   * 根据handleType计算手柄位置并创建圆角矩形形状
   * @returns 手柄形状数组
   */
  makeHandleShapes(): Shape[];

  /**
   * 高亮显示
   * 将高亮状态传递给所有栏杆
   * @param highlight - 是否高亮
   */
  highlight(highlight: boolean): void;
}

/**
 * 依赖类型声明
 */
declare class Area {
  add(child: unknown): void;
  remove(child: unknown): void;
  draw(context: unknown): void;
}

declare class Polygon {
  readonly polyId: { toJSON(): unknown };
  readonly isEmpty: boolean;
  readonly box: {
    xmin: number;
    xmax: number;
    center: Point;
  };
  intersect(line: unknown): Point[];
}

declare class Vector {
  /* 向量定义 */
}

declare class Point {
  x: number;
  translate(vector: Vector): Point;
}

declare class Shape {
  translate(vector: Vector): void;
  middle(): Point;
  length: number;
  getLayer(): unknown;
  moveTo(layer: unknown): void;
  hide(): void;
}

declare class Bead {
  constructor(parent: Shade);
  translate(vector: Vector): void;
  toJSON(): unknown;
  deserialize(data: unknown): void;
}

declare class Label {
  constructor(parent: Shade, position: Point);
  text: string;
  hidden: boolean;
  draggable: boolean;
  translate(vector: Vector): void;
  updatePoly(): void;
  toJSON(): unknown;
  draw(context: unknown): void;
}

declare class ShadeManager {
  constructor(shade: Shade);
  readonly padding: number;
  readonly computedGap: number;
  readonly bars: Array<{ highlight(value: boolean): void }>;
  translate(vector: Vector): void;
  updatePoly(): void;
  toJSON(): unknown;
  deserialize(data: unknown): void;
}

declare enum ShapeType {
  Shade = "Shade"
}