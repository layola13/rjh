import { Vector3, Color3, Angle } from '@babylonjs/core';
import { AxisFaceItem, AxisHelperCameraPos } from './AxisFaceItem';

/**
 * 轴辅助器配置类
 * 用于管理3D场景中的坐标轴辅助显示，包括六个主面和若干边角位置
 */
export default class AxisHelperConfig {
  /**
   * 轴辅助器的基准尺寸
   * @default 0.5
   */
  static readonly size: number = 0.5;

  /**
   * 所有轴面项的集合
   * 包含主面（前后左右上下）、边缘和顶点的显示配置
   */
  static readonly axis_faces: AxisFaceItem[] = [];

  /**
   * 选中状态的高亮颜色（青色）
   */
  static readonly SelectColor: Color3 = new Color3(0, 1, 1);

  /**
   * 未选中状态的默认颜色（浅灰色）
   */
  static readonly UnSelectColor: Color3 = new Color3(0.9, 0.9, 0.9);

  /**
   * 初始化轴辅助器的所有面
   * 创建主面（6个）、边（12个）和顶点（8个）的显示配置
   * 需要在启用辅助场景时调用
   */
  static Init(): void;

  /**
   * 更新轴辅助器的六个主面位置和旋转
   * 根据模型的边界框尺寸动态调整辅助器显示
   * 
   * @param x - 模型在X轴方向的半尺寸
   * @param y - 模型在Y轴方向的半尺寸
   * @param z - 模型在Z轴方向的半尺寸
   */
  static UpdateAxisAuxiliary(x: number, y: number, z: number): void;
}