import type { Scene, TransformNode, Vector3, StandardMaterial, DynamicTexture, Mesh } from '@babylonjs/core';

/**
 * 文本对齐方式
 */
export type TextAlignment = 'left' | 'center' | 'right';

/**
 * 3D文本创建配置信息
 */
export interface Text3dInfo {
  /**
   * 显示的文本内容
   * @default "分贝:95dB"
   */
  value?: string;

  /**
   * 文本对齐方式
   * @default "left"
   */
  align?: TextAlignment;

  /**
   * 父节点
   */
  parent?: TransformNode | null;

  /**
   * 旋转角度（欧拉角）
   * @default Vector3(0, 0, 0)
   */
  rot?: Vector3;

  /**
   * 世界坐标位置
   * @default Vector3(0, 0, 0)
   */
  worldPos?: Vector3;
}

/**
 * 3D文本辅助类
 * 用于在Babylon.js场景中创建和管理3D文本对象
 */
export declare class Text3dHelper {
  /**
   * 场景实例
   */
  private static scene: Scene;

  /**
   * 初始化Text3dHelper
   * @param scene - Babylon.js场景对象
   */
  static Init(scene: Scene): void;

  /**
   * 创建3D文本对象
   * @param config - 文本配置信息
   * @returns 包含3D文本的TransformNode节点
   * @remarks
   * - 创建带透明背景的动态纹理
   * - 使用红色字体渲染文本
   * - 支持文本对齐和自定义位置/旋转
   */
  static CreateText(config?: Text3dInfo): TransformNode;
}

/**
 * @deprecated 保留用于类型兼容，实际配置使用Text3dInfo接口
 */
export declare class Text3dInfo {}