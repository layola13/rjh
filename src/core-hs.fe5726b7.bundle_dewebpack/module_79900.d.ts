/**
 * 吊顶灯光计算模块
 * 负责计算吊顶面隐藏时的灯光配置
 */

import BaseLight from './BaseLight';

/**
 * 灯光配置接口
 */
interface LightConfiguration {
  /** 灯光类型 */
  type: HSCore.Model.LightTypeEnum.SpotLight;
  /** 色温值（开尔文） */
  temperature: number;
  /** 灯光位置（2D坐标） */
  position: THREE.Vector2;
  /** 灯光高度 */
  height: number;
  /** IES光域文件配置 */
  ies: string | null;
  /** 光照强度 */
  intensity: number;
}

/**
 * 模型对象接口
 */
interface ModelObject {
  /** 获取模型位置 */
  getPosition(): THREE.Vector3;
  /** 正面朝向向量 */
  frontForwardVec: THREE.Vector3;
  /** 获取模型尺寸 */
  getSize(): THREE.Vector3;
}

/**
 * 场景元素接口
 */
interface SceneElement {
  /** 检查吊顶面是否隐藏 */
  isCeilingFaceHidden(): boolean;
}

/**
 * 吊顶灯光计算器
 * 继承自基础灯光类，专门处理吊顶场景的灯光计算
 */
export default class CeilingLightComputer extends BaseLight {
  /**
   * 计算灯光配置
   * @param model - 模型对象
   * @param element - 场景元素
   * @param context - 上下文参数
   * @param options - 额外选项
   * @returns 灯光配置数组，如果吊顶面隐藏则返回空数组
   */
  protected _compute(
    model: ModelObject,
    element: SceneElement,
    context: unknown,
    options: unknown
  ): LightConfiguration[];

  /**
   * 获取默认高度
   * @param element - 场景元素
   * @returns 默认高度值
   */
  protected getDefaultHeight(element: SceneElement): number;

  /**
   * 获取默认灯光参数
   * @param model - 模型对象
   * @param element - 场景元素
   * @param context - 上下文参数
   * @returns 包含光照强度、色温和IES配置的对象
   */
  protected getDefaultLight(
    model: ModelObject,
    element: SceneElement,
    context: unknown
  ): {
    intensity: number;
    temperature: number;
    ies: string | null;
  };
}