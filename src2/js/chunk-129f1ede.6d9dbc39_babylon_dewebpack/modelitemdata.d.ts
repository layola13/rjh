/**
 * 3D模型数据和动画系统类型定义
 * @module ModelItemData
 */

import { AbstractMesh, Vector3, Quaternion } from '@babylonjs/core';

/**
 * 轴向方向枚举
 */
type AxisDirection = 'left' | 'right' | 'up' | 'down' | 'left_rotate' | 'right_rotate' | 'up_rotate' | 'down_rotate';

/**
 * 移动状态枚举
 * - 0: 初始旋转阶段
 * - 1: 回旋阶段
 * - 2: 第二次旋转/平移阶段
 * - 3: 第三次旋转/回退阶段
 * - 4: 第四次旋转/平移准备
 * - 5: 平移回退阶段
 */
type MoveStatus = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * 模型项数据类
 * 封装3D网格模型的基本信息
 */
export declare class ModelItemData {
  /**
   * 模型名称
   */
  readonly name: string;

  /**
   * 3D网格对象（私有）
   */
  private readonly mesh: AbstractMesh;

  /**
   * 构造函数
   * @param name - 模型名称标识符
   * @param mesh - Babylon.js 网格对象
   */
  constructor(name: string, mesh: AbstractMesh);

  /**
   * 获取关联的3D网格对象
   * @returns Babylon.js AbstractMesh 实例
   */
  get Mesh(): AbstractMesh;
}

/**
 * 动画项类
 * 管理3D模型的旋转和平移动画状态
 */
export declare class AnimationItem {
  /**
   * 关联的3D网格模型
   */
  mesh?: AbstractMesh;

  /**
   * 旋转轴向量数组
   * - 单轴动画：长度为1
   * - 多轴动画：长度为2或更多
   */
  axisArrow?: Vector3[];

  /**
   * 轴向方向标识数组
   */
  axisArrowDirection?: AxisDirection[];

  /**
   * 当前激活的轴向索引
   */
  axisArrowId: number;

  /**
   * 旋转速度值（弧度/帧）
   */
  rotationValue: number;

  /**
   * X轴平移距离
   * - 正值：向正X方向移动
   * - 负值：向负X方向移动
   * - undefined：不执行平移
   */
  moveX?: number;

  /**
   * 模型原始X坐标位置
   */
  oriPosX: number;

  /**
   * 初始旋转四元数（用于重置）
   */
  identifyRot: Quaternion;

  /**
   * 动画开启状态
   * - true: 正向动画
   * - false: 反向动画
   */
  openStatus: boolean;

  /**
   * 当前累计旋转值（弧度）
   */
  currentValue: number;

  /**
   * 当前移动状态机状态
   */
  moveStatus: MoveStatus;

  /**
   * 当前累计平移值
   */
  currentMoveValue: number;

  /**
   * 执行旋转动画
   * 
   * 根据配置的轴向和方向执行复杂的旋转-平移组合动画：
   * - 单轴模式：围绕单一轴旋转，可选平移
   * - 双轴模式：依次围绕两个轴旋转，可选平移
   * - 自由旋转模式：基于方向字符串执行自定义旋转
   * 
   * 状态机流程（带平移）：
   * 0 → 正向旋转至最大角度 → 1
   * 1 → 反向旋转至原点 → 2
   * 2 → 平移/第二轴旋转 → 3
   * 3 → 回退旋转/平移 → 4/0
   * 
   * @remarks
   * - 使用状态机管理复杂动画序列
   * - 支持角度限制和方向切换
   * - 自动处理up/down方向的特殊角度限制（0.3弧度）
   */
  DoRotate(): void;

  /**
   * 重置动画状态
   * 
   * 将模型恢复到初始状态：
   * - 重置旋转四元数
   * - 恢复初始位置
   * - 清空状态机和累计值
   */
  DoReset(): void;
}