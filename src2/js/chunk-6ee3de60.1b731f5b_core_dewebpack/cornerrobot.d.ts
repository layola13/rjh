import type { Point, Vector, Segment, Line, Matrix, Polygon } from '@flatten-js/core';
import type { Shape } from 'konva/lib/Shape';
import type { WinPolygon } from './WinPolygon';

/**
 * 角落机器人配置参数
 */
export interface CornerRobotOptions {
  /** 外边缘数组 */
  outerEdges: Segment[];
  /** 多边形对象 */
  polygon: Polygon & { box: { center: Point } };
}

/**
 * 主机框架位置枚举
 */
export enum HostFramePos {
  left = 'left',
  right = 'right'
}

/**
 * 倾斜部分枚举
 */
export enum SkewPartEnum {
  Body = 'Body'
}

/**
 * 工具类型枚举
 */
export enum ToolType {
  editCornerRobot = 'editCornerRobot'
}

/**
 * 形状数据属性
 */
export interface ShapeDataAttr {
  /** 多边形对象 */
  poly: WinPolygon;
  /** 填充颜色 */
  fcolor: string;
  /** 是否可拖拽 */
  drag: boolean;
  /** 是否为中间形状 */
  isMiddleShape: boolean;
  /** 角落边缘索引（可选） */
  cornerEdgeIndex?: number;
  /** 描边颜色（可选） */
  stroke?: string;
  /** 描边宽度（可选） */
  strokeWidth?: number;
}

/**
 * 宿主形状接口
 */
export interface HostShape {
  /** 中心边缘 */
  centerEdge: Segment;
  /** 多边形对象 */
  polygon: Polygon & { 
    box: { center: Point };
    edges: Segment[];
    cloneWith(edges: Segment[]): Polygon;
  };
  /** 宿主框架位置 */
  hostFramePos: HostFramePos;
  /** 倾斜角落框架 */
  skewCornerFrame(angle: number, unused: number, context: unknown, part: SkewPartEnum): void;
  /** 更新多边形 */
  updatePoly(polygon: Polygon): void;
  /** 绘制 */
  draw(view: unknown): void;
  /** 获取父级矩阵数组 */
  getParentMatrices(): Matrix[];
}

/**
 * 倾斜信息元组
 * [角度, 弧度, 正切值]
 */
export type SkewInfo = [number, number, number];

/**
 * 角落机器人类
 * 用于在窗口角落区域提供交互式编辑功能
 */
export declare class CornerRobot {
  /** 视图对象 */
  readonly view: unknown;
  
  /** 机器人尺寸 */
  readonly rsize: number;
  
  /** 形状数组 */
  shapes: WinPolygon[];
  
  /** 可视化形状数组 */
  vshapes: Shape[];
  
  /** 中心点 */
  cpt?: Point;
  
  /** 宿主形状 */
  hostShape?: HostShape;

  /**
   * 构造函数
   * @param view - 视图对象
   */
  constructor(view: unknown);

  /**
   * 创建机器人形状
   * @param options - 配置参数
   */
  create(options: CornerRobotOptions): void;

  /**
   * 附加到宿主形状
   * @param hostShape - 宿主形状对象
   */
  attach(hostShape: HostShape): void;

  /**
   * 平移机器人
   * @param vector - 平移向量
   */
  translate(vector: Vector): void;

  /**
   * 拖拽机器人
   * @param vector - 拖拽向量
   * @param context - 上下文对象
   */
  drag(vector: Vector, context: unknown): void;

  /**
   * 拖拽长度调整
   * @param shape - 形状对象
   * @param edgeIndex - 边缘索引
   * @param vector - 拖拽向量
   * @param view - 视图对象
   */
  dragLength(shape: WinPolygon, edgeIndex: number, vector: Vector, view: unknown): void;

  /**
   * 获取变换矩阵
   * @param center - 中心点
   * @returns 变换矩阵
   */
  getMatrix(center: Point): Matrix;

  /**
   * 碰撞检测
   * @param point - 测试点
   * @returns 是否命中
   */
  hitTest(point: Point): boolean;

  /**
   * 根据比例更新机器人
   * @param portion - 比例值 (-1 到 1)
   */
  updateByPortion(portion: number): void;

  /**
   * 隐藏机器人
   */
  hide(): void;

  /**
   * 从比例获取倾斜信息
   * @param portion - 比例值
   * @param hostShape - 宿主形状
   * @returns 倾斜信息 [角度, 弧度, 正切值]
   */
  static getSkewInfo(portion: number, hostShape: HostShape): SkewInfo;

  /**
   * 从比例计算角度
   * @param portion - 比例值 (-1 到 1)
   * @param hostShape - 宿主形状
   * @returns 角度（度数）
   */
  static getAngleFromPortion(portion: number, hostShape: HostShape): number;

  /**
   * 从角度计算比例
   * @param angle - 角度（度数）
   * @param hostShape - 宿主形状
   * @returns 比例值 (-1 到 1)
   */
  static getPortionFromAngle(angle: number, hostShape: HostShape): number;
}