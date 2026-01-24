/**
 * 绘图信息模块
 * 提供框架变量计算和统计功能
 */

import { ShapeManager } from './ShapeManager';
import { Frame, ThreedArcFrame } from './Frame';
import { Glass, ScreenFiller, ShapeType } from './Shape';
import { Direction } from './Direction';
import { UnitConvertion, DrawParams } from './UnitConvertion';
import { WinPolygon } from './WinPolygon';
import { EdgeFinder } from './EdgeFinder';

/**
 * 框架变量信息
 */
export interface FrameVariable {
  /** 变量名称 */
  name: string;
  /** 变量值 */
  value: string | number;
}

/**
 * 框架变量集合
 */
export interface FrameVariables {
  /** 框架ID */
  frameId: string | number;
  /** 框架唯一标识 */
  frameUid: string;
  /** 变量列表 */
  variables: FrameVariable[];
}

/**
 * 边界框坐标
 */
export interface BoundingBox {
  /** X轴最小值 */
  xmin: number;
  /** X轴最大值 */
  xmax: number;
  /** Y轴最小值 */
  ymin: number;
  /** Y轴最大值 */
  ymax: number;
}

/**
 * 多边形接口
 */
export interface Polygon {
  /** 边界框 */
  box: BoundingBox;
  /** 边集合 */
  edges: Edge[];
  /** 面积 */
  area: number;
  /** 是否简单闭合 */
  isSimpleClosed: boolean;
  /** 缺角位数量 */
  cutAnglesCount: number;
  /** 检查是否为矩形 */
  isRectangle(): boolean;
}

/**
 * 边/弧接口
 */
export interface Edge {
  /** 起点 */
  start: Point;
  /** 终点 */
  end: Point;
}

/**
 * 点坐标
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * 转角连接件
 */
export interface CornerJoiner {
  /** 长度 */
  length: number;
  /** 面积 */
  area: number;
  /** 倾斜角度 */
  skewAngle: number;
}

/**
 * 连接件
 */
export interface Connector {
  /** 长度 */
  length: number;
  /** 面积 */
  area: number;
}

/**
 * 框架条
 */
export interface FrameBar {
  /** 类型 */
  type: ShapeType;
  /** 起始角度 */
  stAngle: number;
}

/**
 * 边缘连接方式枚举
 */
export enum EdgeJointWay {
  /** 分离连接 */
  Separated = 'Separated'
}

/**
 * 绘图信息类
 * 负责计算和统计框架的各种参数变量
 */
export declare class DrawingInfo {
  /** 形状管理器 */
  private readonly shapeManager: ShapeManager;
  
  /** 框架列表 */
  private readonly frames: Frame[];

  /**
   * 构造函数
   * @param shapeManager 形状管理器实例
   * @param frames 框架数组
   */
  constructor(shapeManager: ShapeManager, frames: Frame[]);

  /**
   * 获取所有框架的变量信息
   * 包含玻璃数量、扇数量、转角信息、尺寸等统计数据
   */
  get frameVariables(): FrameVariables[];

  /**
   * 计算圆弧区域面积
   * @param polygon 多边形对象
   * @returns 圆弧区域面积值
   */
  areaOfArc(polygon: Polygon): number;

  /**
   * 获取指定方向的框架条
   * @param frame 框架对象
   * @param direction 方向（左/右/上/下）
   * @returns 对应方向的框架条
   */
  frameBar(frame: Frame, direction: Direction): FrameBar;

  /**
   * 获取框架所属系列名称
   * @param frame 框架对象
   * @returns 系列名称："推拉"/"折叠"/"边框"/"平开"
   */
  seriesOfFrame(frame: Frame): string;
}