/**
 * 连接器生成器模块
 * 用于生成3D场景中的连接器组件，包括垂直和水平连接
 */

import type { Scene, TransformNode, Vector2, Vector3, Mesh } from '@babylonjs/core';

/**
 * 连接器配置接口
 */
export interface IConnector {
  /** 连接器唯一标识 */
  id?: string | number;
  /** 连接器宽度 */
  width: number;
  /** 起始点坐标 */
  startPt: IPoint;
  /** 结束点坐标 */
  endPt: IPoint;
}

/**
 * 二维点坐标接口
 */
export interface IPoint {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 框架配置接口
 */
export interface IFrame {
  /** 框架唯一标识 */
  id: string | number;
  /** 锚点位置 */
  anchor: IPoint;
  /** 弧形高度（可选） */
  arcHeight?: number;
  /** 弧面是否朝内（可选） */
  arcFaceInner?: boolean;
}

/**
 * 场景配置接口
 */
export interface ISceneConfig {
  /** 中心位置向量 */
  center_pos: Vector3;
  /** 框架深度 */
  frame_depth: number;
  /** 墙体深度 */
  wall_depth: number;
  /** 连接器组数组 */
  connectionGroup: IConnectorItem[];
  /** 框架数组 */
  frames: IFrame[];
  /** 是否包含背景墙 */
  bgWall?: boolean;
}

/**
 * 连接器项数据结构
 */
export interface IConnectorItem {
  /** 原始连接器数据 */
  connector: IConnector;
  /** 连接器根节点 */
  connectorMesh: TransformNode;
  /** 连接器组节点 */
  connectorGroupMesh: TransformNode;
  /** 左侧3D网格节点 */
  threeDMeshLeftNode?: TransformNode;
  /** 左侧连接弧度 */
  threeDMeshLeftConnectionRadian: number;
  /** 左侧框架ID */
  leftFrameID: string | number;
  /** 右侧3D网格节点 */
  threeDMeshRightNode?: TransformNode;
  /** 右侧连接弧度 */
  threeDMeshRightConnectionRadian: number;
  /** 右侧框架ID */
  rightFrameId: string | number;
}

/**
 * 形状轴心点枚举
 */
export enum ShapePivotPoint {
  CenterDown = 'CenterDown'
}

/**
 * UV计算模式枚举
 */
export enum ModeCalFaceUVEnum {
  FixedU = 'FixedU'
}

/**
 * 材质类型枚举
 */
export enum ProfileTypesEnum {
  LXCIN = 'LXCIN',
  LXCOUT = 'LXCOUT',
  JT = 'JT'
}

/**
 * 挤出模型配置接口
 */
export interface IExtrudeOptions {
  /** 2D形状顶点数组 */
  shape2d: Vector2[];
  /** 形状轴心点 */
  shapePivot: ShapePivotPoint;
  /** 材质类型 */
  mat: unknown;
}

/**
 * 框架多边形信息接口
 */
export interface IFramePolygon {
  /** X轴最大值（米） */
  max_x_m: number;
  /** X轴最小值（米） */
  min_x_m: number;
}

/**
 * 框架信息接口
 */
export interface IFrameInfo {
  /** 框架多边形数据 */
  frame_polygon: IFramePolygon;
}

/**
 * 连接器生成器类
 * 负责创建和管理3D场景中的连接器组件
 */
export default class ConnectorGenerator {
  /** Babylon.js场景实例 */
  private static scene: Scene;

  /**
   * 初始化连接器生成器
   * @param scene - Babylon.js场景实例
   */
  static Init(scene: Scene): void;

  /**
   * 生成连接器组件
   * @param connectors - 连接器配置数组
   * @param parentNode - 父级变换节点
   * @param sceneConfig - 场景配置对象
   * @param frameData - 框架数据配置
   */
  static GenConnectors(
    connectors: IConnector[] | undefined,
    parentNode: TransformNode,
    sceneConfig: ISceneConfig,
    frameData: ISceneConfig
  ): void;

  /**
   * 生成通用连接器几何体
   * @param endPos - 结束位置向量
   * @param startPos - 起始位置向量
   * @param width - 连接器宽度
   * @param frameDepth - 框架深度
   * @param wallDepth - 墙体深度
   * @param sceneConfig - 场景配置对象
   * @returns 连接器变换节点
   */
  static generalConnection(
    endPos: Vector2,
    startPos: Vector2,
    width: number,
    frameDepth: number,
    wallDepth: number,
    sceneConfig: ISceneConfig
  ): TransformNode;

  /**
   * 判断连接器是否为垂直方向
   * @param connector - 连接器配置对象
   * @returns 如果连接器垂直则返回true，否则返回false
   */
  static isVertical(connector: IConnector): boolean;

  /**
   * 获取连接器中心点坐标
   * @param connector - 连接器配置对象
   * @returns 中心点二维向量
   */
  static GetConnectorCenter(connector: IConnector): Vector2;

  /**
   * 根据连接器位置查找相邻框架
   * @param connector - 连接器配置对象
   * @param frameData - 框架数据配置
   * @param isLeft - 是否查找左侧框架（true为左侧，false为右侧）
   * @returns 查找到的框架对象，未找到则返回undefined
   */
  static genFrame(
    connector: IConnector,
    frameData: ISceneConfig,
    isLeft?: boolean
  ): IFrame | undefined;
}