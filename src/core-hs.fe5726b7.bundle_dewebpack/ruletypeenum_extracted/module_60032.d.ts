import { default as BaseClass } from './module_42288';

/**
 * 灯光计算器类
 * 用于计算吊顶灯光的位置、强度和属性
 */
export default class CeilingLightComputer extends BaseClass {
  /**
   * 计算灯光配置
   * @param lightSource - 光源对象
   * @param ceiling - 吊顶对象
   * @param context - 计算上下文
   * @param options - 额外选项参数
   * @returns 灯光配置数组，如果吊顶面被隐藏则返回空数组
   */
  protected _compute(
    lightSource: LightSource,
    ceiling: Ceiling,
    context: ComputeContext,
    options: ComputeOptions
  ): LightConfiguration[] {
    // 如果吊顶面被隐藏，不生成灯光
    if (ceiling.isCeilingFaceHidden()) {
      return [];
    }

    // 获取光源的初始位置
    const sourcePosition = lightSource.getPosition();

    // 获取默认高度
    const defaultHeight = this.getDefaultHeight(ceiling);

    // 从父类获取默认灯光属性
    const { intensity, temperature, ies } = super.getDefaultLight(
      lightSource,
      ceiling,
      context
    );

    // 调整光源位置（向下偏移0.75个单位），如果调整失败则使用原始位置
    const adjustedPosition = this._adjustPosition(sourcePosition, ceiling, -0.75) ?? sourcePosition;

    // 返回聚光灯配置
    return [
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: adjustedPosition,
        height: defaultHeight,
        ies
      }
    ];
  }
}

/**
 * 光源对象接口
 */
interface LightSource {
  getPosition(): Vector3;
}

/**
 * 吊顶对象接口
 */
interface Ceiling {
  isCeilingFaceHidden(): boolean;
}

/**
 * 三维向量/位置接口
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * 计算上下文接口
 */
interface ComputeContext {
  [key: string]: unknown;
}

/**
 * 计算选项接口
 */
interface ComputeOptions {
  [key: string]: unknown;
}

/**
 * 灯光配置接口
 */
interface LightConfiguration {
  /** 灯光类型（聚光灯） */
  type: HSCore.Model.LightTypeEnum.SpotLight;
  /** 色温（开尔文） */
  temperature: number;
  /** 光照强度 */
  intensity: number;
  /** 灯光位置 */
  position: Vector3;
  /** 灯光高度 */
  height: number;
  /** IES光域文件配置 */
  ies?: string | IESConfig;
}

/**
 * IES光域配置接口
 */
interface IESConfig {
  [key: string]: unknown;
}