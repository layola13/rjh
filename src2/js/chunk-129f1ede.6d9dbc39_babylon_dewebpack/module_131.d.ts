import type { Mesh, Scene, Material, Vector2, Vector3, Vector4, Color4 } from '@babylonjs/core';

/**
 * 表示墙体边界的bar对象
 */
interface Bar {
  /** 起始点坐标 */
  startPt: Point2D;
  /** 结束点坐标 */
  endPt: Point2D;
  /** 弧形高度（可选） */
  arcHeight?: number;
}

/**
 * 二维点坐标
 */
interface Point2D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 闭合对象，包含墙体边界信息
 */
interface CloseObject {
  /** 边界bar集合 */
  bars: Bar[];
}

/**
 * 弧形相关数据
 */
interface ArcData {
  /** 起始点 */
  start: Point2D;
  /** 结束点 */
  end: Point2D;
  /** 中心点 */
  center: Point2D;
  /** 圆心 */
  middle(): Point2D;
  /** 半径 */
  r: number;
  /** 起始角度 */
  startAngle: number;
  /** 结束角度 */
  endAngle: number;
  /** 是否逆时针 */
  counterClockwise: boolean;
  /** 弧长 */
  length: number;
  /** 检查点是否在弧上 */
  contains(point: Point2D): boolean;
}

/**
 * 假框架数据结构
 */
interface FakeFrameData {
  /** 框架类型：'3dArc' 或 'plain' */
  frameType: '3dArc' | string;
  /** 闭合对象 */
  closeObject: CloseObject;
  /** 弧形高度（用于3D弧形框架） */
  arcHeight: number;
  /** 是否简单闭合 */
  isSimpleClosed: boolean;
  /** 边界数据（当非简单闭合时使用） */
  boundary?: Bar[];
}

/**
 * 轮廓类型枚举
 */
export enum ProfileTypesEnum {
  BrickWallIn = 'BrickWallIn',
  // 其他类型...
}

/**
 * 假框架网格生成器
 * 用于在3D场景中生成框架的内部墙体网格
 */
export default class FakeFrameMeshGenerator {
  /** 网格标识名称 */
  static readonly meshName: string = 'fake-frame';

  /** 框架数据 */
  readonly data: FakeFrameData;
  
  /** 父网格节点 */
  readonly parent: Mesh;
  
  /** Babylon场景对象 */
  readonly scene: Scene;

  /**
   * 构造函数
   * @param data - 框架数据
   * @param parent - 父网格节点
   * @param scene - Babylon场景对象
   */
  constructor(data: FakeFrameData, parent: Mesh, scene: Scene);

  /**
   * 获取内墙材质
   * @returns 内墙材质对象
   */
  get innerWallMaterial(): Material;

  /**
   * 生成框架网格
   * @param depth - 深度值
   * @param thickness - 厚度（会自动增加0.2）
   */
  make(depth: number, thickness: number): void;

  /**
   * 为3D弧形框架生成网格
   * @param depth - 深度值
   * @param adjustedThickness - 调整后的厚度
   */
  makeFor3dArcFrame(depth: number, adjustedThickness: number): void;

  /**
   * 为平面框架生成网格
   * @param depth - 深度值
   * @param adjustedThickness - 调整后的厚度
   */
  makeForPlainFrame(depth: number, adjustedThickness: number): void;

  /**
   * 边缘锐化处理
   * @param start - 起始点
   * @param end - 结束点
   * @param arcHeight - 弧形高度
   * @returns 锐化后的点集合
   */
  sharpening(start: Point2D, end: Point2D, arcHeight: number): Vector2[];

  /**
   * 对弧形进行边缘锐化
   * @param arc - 弧形数据
   * @returns 锐化后的点集合
   */
  edgeSharpening(arc: ArcData): Vector2[];

  /**
   * 计算弧上的点
   * @param arc - 弧形数据
   * @param length - 沿弧的长度
   * @param startPoint - 起始点（默认为弧的起点）
   * @returns 弧上的点坐标
   */
  pointOnArc(arc: ArcData, length: number, startPoint?: Point2D): Point2D;

  /**
   * 根据三点创建弧形
   * @param point1 - 第一个点
   * @param point2 - 第二个点
   * @param point3 - 第三个点
   * @returns 弧形数据
   */
  arcFrom3Points(point1: Point2D, point2: Point2D, point3: Point2D): ArcData;

  /**
   * 生成投影形状
   * @param width - 宽度
   * @param height - 高度
   * @param thickness - 厚度
   * @param depth - 深度
   * @returns 形状点集合
   */
  projectionShape(width: number, height: number, thickness: number, depth: number): Vector2[];

  /**
   * 创建侧面弧形
   * @param arc - 原始弧形
   * @param offset - 偏移量
   * @param reverse - 是否反向（默认false）
   * @returns 侧面弧形数据
   */
  sideArc(arc: ArcData, offset: number, reverse?: boolean): ArcData;
}