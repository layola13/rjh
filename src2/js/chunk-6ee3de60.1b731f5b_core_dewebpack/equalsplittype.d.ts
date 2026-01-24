/**
 * 线段侧边枚举
 * 表示点相对于线段的位置关系
 */
export enum LineSide {
  /** 无定义 */
  None = 0,
  /** 左侧 */
  Left = 1,
  /** 在线上 */
  On = 2,
  /** 右侧 */
  Right = 3
}

/**
 * 等分类型枚举
 * 定义多边形边的等分方式
 */
export enum EqualSplitType {
  /** 不等分 */
  None = 0,
  /** 外侧等分 */
  Outter = 1,
  /** 内侧等分 */
  Inner = 2
}

/**
 * 等分侧边枚举
 * 指定在哪一侧进行等分
 */
export enum EqualSplitSide {
  /** 两侧都等分 */
  Both = 0,
  /** 左侧或顶部 */
  LeftOrTop = 1,
  /** 右侧或底部 */
  RightOrBottom = 2
}

/**
 * 端点分割方式枚举
 * 定义边的端点如何与其他边连接
 */
export enum EndpointSplitWay {
  /** 不分割 */
  None = 0,
  /** 贯通 */
  Through = 1,
  /** 左侧或顶部连接 */
  LeftOrTopJoin = 2,
  /** 右侧或底部连接 */
  RightOrBottomJoin = 3
}

/**
 * 端点对象
 * 描述边的一个端点的属性
 */
export class EpObj {
  /** 是否为钢塑类型 */
  steel: boolean;
  
  /** 分割方式 */
  split: EndpointSplitWay;
  
  /** 是否固定（不可拖动） */
  fixed: boolean;

  constructor();
}

/**
 * 多边形ID类型
 * 用于唯一标识多边形
 */
export interface PolyId {
  clone(): PolyId;
  toJSON(): unknown;
  deserialize(data: unknown): void;
}

/**
 * 绘制多边形类型枚举
 */
export enum DrawPolyType {
  standard = 0,
  steelPlastic = 1
}

/**
 * 对齐类型枚举
 */
export enum AlignTypeEnum {
  center = 0,
  left = 1,
  right = 2
}

/**
 * 切割线类型枚举
 */
export enum CutLineType {
  line = 'line',
  arc = 'arc',
  compoundLine = 'compoundLine',
  compoundLineCircle = 'compoundLineCircle',
  simpleLine = 'simpleLine',
  simpleInnerArc = 'simpleInnerArc',
  spinLine = 'spinLine',
  simpleHexagon = 'simpleHexagon',
  compoundDoubleOctagon = 'compoundDoubleOctagon',
  simpleWave = 'simpleWave',
  compoundLongOctagon = 'compoundLongOctagon',
  semiArcPro = 'semiArcPro',
  semiArcPro2 = 'semiArcPro2',
  semiArc = 'semiArc',
  halfWheel = 'halfWheel',
  semiSegmentPro = 'semiSegmentPro'
}

/**
 * 几何图形基类型
 */
export interface GeometryLine {
  clone(): GeometryLine;
  toJSON(): unknown;
  translate(offset: unknown): GeometryLine;
  rotate(angle: number, center: unknown): GeometryLine;
}

/**
 * 切割线接口
 */
export interface CutLine extends GeometryLine {
  pt: unknown;
  start: unknown;
  end: unknown;
  generateDockDataForDim: boolean;
  drag(point: unknown, offset: unknown, params: unknown): void;
}

/**
 * 分割器对象（边对象）
 * 表示多边形的一条边及其所有属性
 */
export class SplitterObj {
  /** 所属多边形ID */
  polyId: PolyId;
  
  /** 起点属性 */
  start: EpObj;
  
  /** 终点属性 */
  end: EpObj;
  
  /** 等分类型 */
  equalSplit: EqualSplitType;
  
  /** 等分侧边 */
  equalSplitSide: EqualSplitSide;
  
  /** 最大等分数量，-1表示无限制 */
  equalSplitMaxCount: number;
  
  /** 绘制多边形类型 */
  drawPolyType: DrawPolyType;
  
  /** 对齐类型 */
  alignType: AlignTypeEnum;
  
  /** 是否加固 */
  reinforced: boolean;
  
  /** 几何线段（可能是直线、圆弧或复合线） */
  line?: GeometryLine | CutLine;

  constructor();

  /**
   * 是否有分割
   * 只读属性，当起点或终点有分割时返回true
   */
  readonly split: boolean;

  /**
   * 是否包含钢塑端点
   * 只读属性，当起点或终点是钢塑类型时返回true
   */
  readonly steel: boolean;

  /**
   * 钢塑端点数量
   * 只读属性，返回0-2之间的值
   */
  readonly steelsCount: number;

  /**
   * 边的位置（中点）
   * 只读属性，返回边的几何中心点
   */
  readonly position: unknown;

  /**
   * 是否为标注生成停靠数据
   * 只读属性
   */
  readonly generateDockDataForDim: boolean;

  /**
   * 边的角度（世界坐标系）
   * 只读属性，返回弧度值
   */
  readonly angle: number;

  /**
   * 平移边
   * @param offset 平移向量
   */
  translate(offset: unknown): void;

  /**
   * 拖动边
   * @param point 拖动点
   * @param offset 偏移量
   * @param params 附加参数
   */
  drag(point: unknown, offset: unknown, params: unknown): void;

  /**
   * 克隆边对象
   * @returns 新的边对象副本
   */
  clone(): SplitterObj;

  /**
   * 序列化为JSON
   * @returns JSON对象
   */
  toJSON(): {
    polyId: unknown;
    sts: EndpointSplitWay;
    eds: EndpointSplitWay;
    equalSplit: EqualSplitType;
    ess: EqualSplitSide;
    ss: boolean;
    es: boolean;
    sFd: boolean;
    eFd: boolean;
    line?: unknown;
    alignType: AlignTypeEnum;
    reinforced: boolean;
  };

  /**
   * 从JSON反序列化
   * @param data JSON数据
   * @returns 边对象实例
   */
  static deserialize(data: {
    polyId: unknown;
    sts?: EndpointSplitWay;
    eds?: EndpointSplitWay;
    startSplit?: boolean | number;
    endSplit?: boolean | number;
    equalSplit?: EqualSplitType;
    ess?: EqualSplitSide;
    sFd?: boolean;
    eFd?: boolean;
    ss?: boolean;
    es?: boolean;
    alignType?: AlignTypeEnum;
    reinforced?: boolean;
    line: {
      name: CutLineType;
      [key: string]: unknown;
    };
  }): SplitterObj;

  /**
   * 旋转到指定角度
   * @param angle 目标角度（世界坐标系）
   * @param center 旋转中心
   * @returns 实际旋转的角度
   */
  rotateTo(angle: number, center: unknown): number;

  /**
   * 旋转指定角度
   * @param angle 旋转角度（屏幕坐标系）
   * @param center 旋转中心
   */
  rotate(angle: number, center: unknown): void;

  /**
   * 将屏幕角度转换为世界角度
   * @param angle 屏幕坐标系角度
   * @returns 世界坐标系角度
   */
  static angleToWorld(angle: number): number;

  /**
   * 将世界角度转换为屏幕角度
   * @param angle 世界坐标系角度
   * @returns 屏幕坐标系角度
   */
  static angleToScreen(angle: number): number;
}

/** 导出常量：无侧边 */
export const None: LineSide.None;

/** 导出常量：左侧 */
export const Left: LineSide.Left;

/** 导出常量：在线上 */
export const On: LineSide.On;

/** 导出常量：右侧 */
export const Right: LineSide.Right;