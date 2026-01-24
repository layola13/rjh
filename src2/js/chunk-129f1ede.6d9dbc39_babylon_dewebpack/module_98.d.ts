import { Vector3, Quaternion, Animation, Mesh, AbstractMesh } from '@babylonjs/core';

/**
 * 动画项配置接口
 */
export interface AnimationItem {
  /** 关联的网格对象 */
  mesh: Mesh | AbstractMesh;
  /** 旋转值（弧度） */
  rotationValue: number;
  /** 动画开启状态 */
  openStatus: boolean;
  /** 当前动画进度值 */
  currentValue: number;
  /** 轴箭头ID */
  axisArrowId: number;
  /** 轴箭头方向数组 */
  axisArrowDirection: string[];
  /** X轴移动距离（可选） */
  moveX?: number;
  /** 原始X坐标位置（可选） */
  oriPosX?: number;
  /** 当前移动值（可选） */
  currentMoveValue?: number;
  /** 移动状态（可选） */
  moveStatus?: number;
  /** 轴箭头向量数组（可选） */
  axisArrow?: Vector3[];
  /** 初始旋转四元数 */
  identifyRot: Quaternion;
}

/**
 * Z轴移动动画配置
 */
export interface ZMoveConfig {
  /** 起始Z轴值 */
  startZValue: number;
  /** 结束Z轴值 */
  endZValue: number;
}

/**
 * 轴配置接口
 */
export interface AxisConfig {
  x: number;
  y: number;
}

/**
 * 动画配置管理器
 */
export interface AnimationConfigManager {
  /** 是否启用动画 */
  EnableAnimation: boolean;
}

/**
 * 动画数组管理器
 */
export interface AnimationArrayManager {
  /** 标准动画数组 */
  animationArray: AnimationItem[];
  /** 移动动画数组 */
  animationMoveArray: (Mesh | AbstractMesh)[];
  /** 旋转动画数组 */
  animationRotArray: (Mesh | AbstractMesh)[];
}

/**
 * 动画工具类
 * 提供网格对象的旋转、移动等动画效果
 */
export default class AnimationHelper {
  /**
   * 为网格添加旋转动画
   * @param mesh - 目标网格对象
   * @param rotationValue - 旋转值（默认为1弧度）
   * @param axisConfig - 轴配置（可以是单个配置或配置数组）
   * @param axisDirection - 轴方向标识（如 "X_Y_Z" 或 "X"）
   * @param moveScale - 移动缩放因子（可选）
   */
  static addAniamtion(
    mesh: Mesh | AbstractMesh,
    rotationValue?: number,
    axisConfig?: AxisConfig | AxisConfig[],
    axisDirection?: string,
    moveScale?: number
  ): void;

  /**
   * 为网格添加移动动画（X、Y或Z轴）
   * @param mesh - 目标网格对象
   * @param moveX - X轴移动距离（可选）
   * @param moveY - Y轴移动距离（可选）
   * @param zMoveConfig - Z轴移动配置（可选）
   */
  static AddAniamtionMove(
    mesh: Mesh | AbstractMesh,
    moveX?: number,
    moveY?: number,
    zMoveConfig?: ZMoveConfig
  ): void;

  /**
   * 为网格添加特殊移动动画（支持多阶段序列）
   * @param mesh - 目标网格对象
   * @param moveDistance - 移动距离
   * @param stageIndex - 阶段索引（0-3）
   * @param sequence - 序列标识（如 "A0-A1-A2", "S0-S1-S2-S3" 等）
   */
  static AddAniamtionMoveSpecial(
    mesh: Mesh | AbstractMesh,
    moveDistance: number,
    stageIndex: number,
    sequence: string
  ): void;

  /**
   * 为网格添加旋转动画（Y轴）
   * @param mesh - 目标网格对象
   * @param rotationY - Y轴旋转值（弧度）
   */
  static AddAniamtionRot(
    mesh: Mesh | AbstractMesh,
    rotationY: number
  ): void;
}