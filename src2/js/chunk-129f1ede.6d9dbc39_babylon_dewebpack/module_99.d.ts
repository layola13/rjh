/**
 * 纱窗生成器模块
 * 负责生成推拉窗纱窗的3D网格对象
 */

import { Vector3, Vector4, TransformNode, Mesh, MeshBuilder, Scene, Material } from '@babylonjs/core';

/**
 * 纱窗配置方案接口
 */
interface FlyScreenPlan {
  /** 纱窗叶片基础Z轴偏移 (米) */
  leafbasez: number;
  /** 纱窗叶片深度 (米) */
  leafdepthm: number;
  /** 固定位置Z轴数组 */
  fixedposzarray: number[];
  /** 活动叶片Z轴数组 */
  leafposzarray: number[];
}

/**
 * 2D点坐标接口
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 纱窗轮廓选项接口
 */
interface FlyScreenOptions {
  /** 纱窗轮廓顶点数组 */
  opts: Point2D[];
}

/**
 * 纱窗多边形数据接口
 */
interface FlyScreenPolygon {
  /** 顶点数组 */
  pts: Point2D[];
}

/**
 * 框架多边形边界信息
 */
interface FramePolygon {
  /** X轴最小值 (米) */
  min_x_m: number;
  /** X轴最大值 (米) */
  max_x_m: number;
}

/**
 * 框架3D信息接口
 */
interface Frame3DInfo {
  /** 弧形面是否朝内 */
  arcFaceInner: boolean;
  /** 框架弧形高度 (米) */
  frameArcHeight: number;
}

/**
 * 纱窗配置接口
 */
interface FlyScreenConfig {
  /** 纱窗生成方案 */
  flyScreenPlan: FlyScreenPlan;
  /** 框架多边形边界 */
  frame_polygon: FramePolygon;
  /** 框架3D信息 (可选，用于弧形窗) */
  frame_3D_info?: Frame3DInfo;
}

/**
 * 水平中梃信息接口
 */
interface HorizontalMullionInfo {
  /** 弧形半径 (米) */
  radius: number;
  /** 弧度 (弧度制) */
  radion: number;
  /** 偏移量 */
  offset: Point2D;
  /** 右侧弧度 (弧度制) */
  rightRadion: number;
}

/**
 * 型材类型枚举
 */
declare enum ProfileTypesEnum {
  Flyscreen = 'Flyscreen'
}

/**
 * 纱窗生成器类
 * 提供推拉窗纱窗网格的生成功能，支持平面和弧形窗纱窗
 */
declare class FlyScreenGenerator {
  /** Babylon.js场景对象 */
  private static scene: Scene;

  /**
   * 初始化纱窗生成器
   * @param scene - Babylon.js场景实例
   */
  static Init(scene: Scene): void;

  /**
   * 生成推拉窗纱窗网格
   * @param flyScreens - 纱窗配置数组
   * @param parentNode - 父节点 (用于组织场景层级)
   * @param config - 纱窗详细配置
   * @param offsetZ - Z轴偏移量 (米)
   * @throws {Error} 当 flyScreens 为 null 时抛出异常
   */
  static GenSashFlyScreens(
    flyScreens: FlyScreenOptions[],
    parentNode: TransformNode,
    config: FlyScreenConfig,
    offsetZ: number
  ): void;

  /**
   * 生成单个纱窗网格
   * @param plan - 纱窗方案配置
   * @param baseZ - 基础Z轴位置 (米)
   * @param polygon - 纱窗多边形轮廓
   * @param parentNode - 父节点
   * @param isFixed - 是否为固定纱窗 (true=固定, false=活动)
   * @default isFixed true
   */
  static GenFlyScreen(
    plan: FlyScreenPlan,
    baseZ: number,
    polygon: FlyScreenPolygon,
    parentNode: TransformNode,
    isFixed?: boolean
  ): void;
}

export default FlyScreenGenerator;