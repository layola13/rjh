/**
 * 单门配置映射
 * 用于定义单门类型的属性键映射关系
 */
export interface SingleDoor {
  /** 门宽 (Width) */
  MK: "W";
  /** 门宽 (Width) */
  CD: "W";
  /** 门深 (Depth) */
  W1: "D";
  /** 总高 (Height) */
  ZG: "H";
  /** 尺寸 (Size) */
  ACTSZ: "CZ";
  /** 子开口模式 */
  zk: "ZYKM";
  /** 亮度 (Luminance/Brightness) */
  LDGD: "LD";
}

/**
 * 普通窗配置映射
 * 用于定义普通窗户类型的属性键映射关系
 */
export interface POrdinaryWindow {
  /** 宽度 (Width) */
  w: "W";
  /** 深度 (Depth) */
  W1: "D";
  /** 高度 (Height) */
  h: "H";
  /** 系统尺寸 */
  xtCZ: "CZ";
  /** 亮度 (Luminance/Brightness) */
  ld: "LD";
}

/**
 * 飘窗配置映射
 * 用于定义飘窗类型的属性键映射关系
 */
export interface BayWindow {
  /** 宽度 (Width) */
  w: "W";
  /** 高度 (Height) */
  h: "H";
  /** 深度 (Depth) */
  d: "D";
  /** 系统尺寸 */
  xtCZ: "CZ";
  /** 亮度 (Luminance/Brightness) */
  ld: "LD";
}

/**
 * 落地窗配置映射
 * 用于定义落地窗类型的属性键映射关系
 */
export interface FloorBasedWindow {
  /** 宽度 (Width) */
  w: "W";
  /** 高度 (Height) */
  h: "H";
  /** 系统尺寸 */
  xtCZ: "CZ";
  /** 亮度 (Luminance/Brightness) */
  ld: "LD";
}

/**
 * 转角窗配置映射
 * 用于定义转角窗类型的属性键映射关系
 */
export interface CornerWindow {
  /** 边长A */
  LA: "W2";
  /** 边长B */
  LB: "W1";
  /** 高度 (Height) */
  h: "H";
  /** 系统尺寸 */
  xtCZ: "CZ";
  /** 亮度 (Luminance/Brightness) */
  ld: "LD";
}

/**
 * 转角飘窗配置映射
 * 用于定义转角飘窗类型的属性键映射关系
 */
export interface CornerBayWindow {
  /** 边长b */
  b: "W1";
  /** 边长c */
  c: "W2";
  /** 边长a */
  a: "D1";
  /** 边长d */
  d: "D2";
  /** 边长e (高度) */
  e: "H";
  /** 系统尺寸 */
  xtCZ: "CZ";
  /** 边长f (亮度) */
  f: "LD";
}

/**
 * 内飘窗配置映射
 * 用于定义内飘窗类型的属性键映射关系
 */
export interface InnerBayWindow {
  /** 深度1 (Depth 1) */
  SDD: "D1";
  /** 深度2 (Depth 2) */
  SDD2: "D2";
  /** 高度 (Height) */
  h: "H";
  /** 窗台深尺寸 */
  ctscz: "CZ";
}

/**
 * 弧形窗配置映射
 * 用于定义弧形窗类型的属性键映射关系
 */
export interface CurvedWindow {
  /** 弦长 (Chord) */
  xc: "W";
  /** 高差1 (Height Difference 1) */
  diffH1: "H";
  /** 窗台尺寸 */
  ctCZ: "CZ";
}

/**
 * 门窗配置映射
 * 用于定义门窗组合类型的属性键映射关系
 */
export interface DoorWindow {
  /** 总高 (Height) */
  ZG: "H";
  /** 梁柱尺寸 */
  LZCZ: "CZ";
  /** 子开口模式 */
  zk: "ZYKM";
}

/**
 * 异形窗配置映射
 * 用于定义异形窗类型的属性键映射关系
 */
export interface SpecialShapedWindow {
  /** 宽度 (Width) */
  w: "W";
  /** 高度差 (Height Difference) */
  GDD: "H";
  /** 窗口尺寸 */
  ckcz: "CZ";
}

/**
 * 曲线子元素配置映射
 * 用于定义曲线子元素的属性键映射关系
 */
export interface CurveChild {
  /** 尺寸 (Size) */
  cz: "CZ";
}

/**
 * L型子元素配置映射
 * 用于定义L型子元素的属性键映射关系
 */
export interface LChild {
  /** 尺寸 (Size) */
  cz: "CZ";
}

/**
 * 单门配置常量
 */
export declare const SingleDoor: SingleDoor;

/**
 * 普通窗配置常量
 */
export declare const POrdinaryWindow: POrdinaryWindow;

/**
 * 飘窗配置常量
 */
export declare const BayWindow: BayWindow;

/**
 * 落地窗配置常量
 */
export declare const FloorBasedWindow: FloorBasedWindow;

/**
 * 转角窗配置常量
 */
export declare const CornerWindow: CornerWindow;

/**
 * 转角飘窗配置常量
 */
export declare const CornerBayWindow: CornerBayWindow;

/**
 * 内飘窗配置常量
 */
export declare const InnerBayWindow: InnerBayWindow;

/**
 * 弧形窗配置常量
 */
export declare const CurvedWindow: CurvedWindow;

/**
 * 门窗配置常量
 */
export declare const DoorWindow: DoorWindow;

/**
 * 异形窗配置常量
 */
export declare const SpecialShapedWindow: SpecialShapedWindow;

/**
 * 曲线子元素配置常量
 */
export declare const CurveChild: CurveChild;

/**
 * L型子元素配置常量
 */
export declare const LChild: LChild;