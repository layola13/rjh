/**
 * Panel切割样式枚举
 * 定义面板的切割方向
 */
export enum CutStyle {
  /** 不切割 */
  None = "None",
  /** 水平切割 */
  Horizontal = "Horizontal",
  /** 垂直切割 */
  Vertical = "Vertical"
}

/**
 * 面板类
 * 继承自Area，用于表示可切割的面板区域
 */
export class Panel extends Area {
  /** 宿主对象 */
  host: unknown;

  /** 玻璃规格信息 */
  glassSpec: GlassSpec;

  /** 形状集合，包含渲染多边形和切割后的子形状 */
  shapes: WinPolygon[];

  /** 形状类型标识 */
  type: ShapeType.Panel;

  /** 切割样式 */
  cutStyle: CutStyle;

  /** 用于渲染的多边形 */
  renderPolygon?: Polygon;

  /** 可视化形状集合 */
  vshape: Shape[];

  /** 形状分组容器 */
  gshape?: ShapeGroup;

  /** 序列号标签 */
  serial: SerialLabel;

  /** 规格标签 */
  spec: SpecLabel;

  /** 固定规格标签 */
  fixedSpec: SpecLabel;

  /** 是否有边框 */
  bead: boolean;

  /** 顶层框架引用 */
  topFrame: {
    colorManager: {
      barNormal: string;
    };
  };

  /**
   * 构造函数
   * @param host - 宿主对象
   * @param options - 初始化参数
   */
  constructor(host: unknown, options?: unknown);

  /**
   * 更新多边形
   * 根据cutStyle生成渲染多边形和切割后的子多边形
   */
  updatePoly(): void;

  /**
   * 绘制面板
   * @param stage - 绘图舞台对象
   */
  draw(stage: Stage): void;

  /**
   * 序列化为JSON对象
   * @returns 包含面板数据的JSON对象
   */
  toJSON(): PanelJSON;

  /**
   * 从JSON数据反序列化
   * @param data - JSON数据对象
   */
  deserialize(data: PanelJSON): void;

  /**
   * 添加形状到分组
   * @param shapes - 要添加的形状数组
   */
  addToGroup(shapes: Shape[]): void;

  /**
   * 创建渲染用多边形
   * @returns 渲染多边形对象
   */
  makeRenderPolygon(): Polygon;
}

/**
 * 面板序列化数据接口
 */
interface PanelJSON extends AreaJSON {
  /** 面板切割样式 (pcs = panel cut style) */
  pcs?: CutStyle;
}

/**
 * 区域基类序列化数据接口
 */
interface AreaJSON {
  [key: string]: unknown;
}

/**
 * 玻璃规格类
 */
declare class GlassSpec {
  // 具体实现依赖外部模块
}

/**
 * 窗口多边形类
 */
declare class WinPolygon {
  constructor(segments: Segment[]);
  box: BoundingBox;
  intersect(line: Line): Point[];
  // 其他方法...
}

/**
 * 边界框接口
 */
interface BoundingBox {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

/**
 * 区域基类
 */
declare class Area {
  updatePoly(): void;
  draw(stage: Stage): void;
  toJSON(): AreaJSON;
  deserialize(data: AreaJSON): void;
}

/**
 * 形状类型枚举
 */
declare enum ShapeType {
  Panel = "Panel"
  // 其他类型...
}

/**
 * 舞台接口
 */
interface Stage {
  // 舞台相关方法
}

/**
 * 形状接口
 */
interface Shape {
  moveTo(layer: unknown): void;
  hide(): void;
  setAttr(key: string, value: unknown): void;
}

/**
 * 形状分组接口
 */
interface ShapeGroup {
  add(shape: Shape): void;
}

/**
 * 标签基类
 */
declare class Label {
  position: Point;
  updatePoly(): void;
  draw(stage: Stage): void;
}

/**
 * 序列号标签类
 */
declare class SerialLabel extends Label {}

/**
 * 规格标签类
 */
declare class SpecLabel extends Label {}

/**
 * 点接口
 */
interface Point {
  x: number;
  y: number;
  translate(dx: number, dy: number): Point;
}

/**
 * 线段接口
 */
interface Segment {
  // 线段定义
}

/**
 * 直线接口
 */
interface Line {
  pt: Point;
}

/**
 * 多边形接口
 */
interface Polygon {
  // 多边形定义
}

/**
 * 导出的切割样式别名（向后兼容）
 */
export const { None, Horizontal, Vertical } = CutStyle;