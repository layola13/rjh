/**
 * 圆形路径预处理器模块
 * 用于处理圆形路径的几何计算和约束生成
 */

/**
 * 3D 点坐标接口
 */
export interface Point3D {
  x: string;
  y: string;
  z: string;
}

/**
 * 状态对象接口
 */
export interface State {
  /** 描述信息 */
  _desc?: string;
  /** 本地标识符 */
  localId: string;
  /** 状态类型 */
  type?: 'point' | 'position';
  /** 是否为控制参数 */
  isCtlParam?: boolean;
  /** 状态值 */
  value: string | number | Point3D;
}

/**
 * 约束对象接口
 */
export interface Constraint {
  /** 描述信息 */
  _desc?: string;
  /** 本地标识符 */
  localId: string;
  /** 约束类型 */
  type: 'position';
  /** 约束方程 */
  equation: string;
}

/**
 * 元素参数接口
 */
export interface ElementParameters {
  /** 半径 */
  radius?: number;
  /** 点的 Z 坐标 */
  pointz?: string | number;
  /** 路径数组 */
  paths?: string[][];
  /** 是否循环路径 */
  loop?: boolean;
  /** 左上角半径 */
  luradius?: number;
  /** 左下角半径 */
  ldradius?: number;
  /** 右上角半径 */
  ruradius?: number;
  /** 右下角半径 */
  rdradius?: number;
}

/**
 * 元素对象接口
 */
export interface Element {
  /** 本地标识符 */
  localId: string;
  /** 元素参数 */
  parameters: ElementParameters;
}

/**
 * 配置数据接口
 */
export interface ConfigData {
  /** JSON 数据 */
  json?: ConfigData;
  /** 状态数组 */
  states?: State[];
  /** 约束数组 */
  constraints?: Constraint[];
  /** 子元素数组 */
  children?: Element[];
}

/**
 * 圆形路径预处理器
 * 处理圆形路径的几何计算，生成路径点和约束方程
 * 
 * @param element - 要处理的元素对象
 * @param config - 配置数据对象
 */
export function circlePathPrevProcessor(
  element: Element,
  config: ConfigData
): void;

/**
 * 子元素圆形路径预处理器
 * 处理子元素中的圆角路径，支持四个角的独立圆角半径
 * 
 * @param element - 父元素对象
 * @param config - 配置数据对象
 */
export function circlePathPrevProcessorForChildren(
  element: Element,
  config: ConfigData
): void;