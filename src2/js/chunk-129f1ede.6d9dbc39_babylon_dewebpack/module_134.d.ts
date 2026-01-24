/**
 * 框架生成扩展模块
 * 用于生成3D框架结构的异步处理工具类
 */

import { Scene, TransformNode } from '@babylonjs/core';
import { GenResult } from './GenResult';

/**
 * 框料数据接口
 */
interface Bar {
  /** 弧形高度 */
  arcHeight: number;
  // 其他框料属性...
}

/**
 * 闭合对象接口
 */
interface CloseObject {
  /** 框料数组 */
  bars: Bar[];
}

/**
 * 截面配置接口
 */
interface Profile {
  // 截面配置属性...
}

/**
 * 截面横截面接口
 */
interface ProfileCross {
  // 横截面配置属性...
}

/**
 * 生成选项接口
 */
interface GenerationOptions {
  /** 截面配置数组 */
  profiles: Profile[];
  /** 截面横截面数组 */
  profileCrosss: ProfileCross[];
  /** 是否为3D框架信息模式 */
  frame_3D_info?: boolean;
  /** 固定组对象数组 */
  fixedGroup: TransformNode[];
  // 其他选项...
}

/**
 * 框架扩展工具类
 * 提供框架结构的异步生成功能
 */
declare class FrameExtension {
  /** 场景实例 */
  private static scene: Scene;

  /**
   * 初始化框架扩展
   * @param scene - Babylon.js 场景实例
   */
  static Init(scene: Scene): void;

  /**
   * 异步生成框架
   * @param closeObject - 闭合对象，包含框料数据
   * @param parentNode - 父节点，用于组织场景层级
   * @param options - 生成选项配置
   * @returns Promise<GenResult> - 生成结果，包含状态码和可能的错误信息
   * @throws {Error} 当框料生成错误时抛出异常
   */
  static AsyncGenFrames(
    closeObject: CloseObject,
    parentNode: TransformNode,
    options: GenerationOptions
  ): Promise<GenResult>;
}

export default FrameExtension;