/**
 * 面板生成器模块
 * 用于在3D场景中创建和管理玻璃面板
 */

import { TransformNode, Vector4, Scene, Mesh } from '@babylonjs/core';

/**
 * 2D点坐标接口
 */
interface Point2D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 面板数据接口
 */
interface PanelData {
  /** 面板轮廓点集合 */
  pts: Point2D[];
}

/**
 * 玻璃平面配置接口
 */
interface GlassPlan {
  /** 固定基础Z坐标 */
  fixedbasez: number;
  /** 固定位置Z坐标数组 */
  fixedposzarray: number[];
  /** 固定深度（米） */
  fixeddepthm: number;
}

/**
 * 配置选项接口
 */
interface PanelConfig {
  /** 玻璃平面配置 */
  glassPlan: GlassPlan;
  /** 固定组网格数组 */
  fixedGroup: Mesh[];
}

/**
 * 面板生成器类
 * 负责在3D场景中生成和管理玻璃面板组
 */
declare class PanelGenerator {
  /**
   * 3D场景实例
   */
  private static scene: Scene;

  /**
   * 初始化面板生成器
   * @param scene - Babylon.js 3D场景实例
   */
  static Init(scene: Scene): void;

  /**
   * 生成面板组
   * @param panelDataArray - 面板数据数组
   * @param parentNode - 父节点，生成的面板组将挂载到此节点下
   * @param config - 面板配置选项
   * @param addToFixedGroup - 是否将生成的面板添加到固定组中，默认为true
   * @remarks
   * 该方法会：
   * 1. 创建一个名为"Group"的容器节点
   * 2. 遍历所有面板数据，计算每个面板的边界框
   * 3. 根据配置生成3D网格面板
   * 4. 可选地将面板添加到固定组数组中
   */
  static GenPanels(
    panelDataArray: PanelData[] | undefined,
    parentNode: TransformNode,
    config: PanelConfig,
    addToFixedGroup?: boolean
  ): void;
}

export default PanelGenerator;