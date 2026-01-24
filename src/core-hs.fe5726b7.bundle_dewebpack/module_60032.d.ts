import { default as BaseClass } from './module_42288';

/**
 * 天花板灯光计算器
 * 负责计算天花板区域的聚光灯配置
 */
export default class CeilingLightComputer extends BaseClass {
  /**
   * 计算灯光配置
   * @param element - 场景元素对象
   * @param surface - 天花板表面对象
   * @param context - 计算上下文
   * @param options - 额外选项参数
   * @returns 灯光配置数组，如果天花板被隐藏则返回空数组
   */
  protected _compute(
    element: HSCore.Model.IElement,
    surface: HSCore.Model.ICeilingSurface,
    context: HSCore.Model.ILightContext,
    options: HSCore.Model.IComputeOptions
  ): HSCore.Model.ILightConfig[] {
    // 如果天花板面被隐藏，则不计算灯光
    if (surface.isCeilingFaceHidden()) {
      return [];
    }

    const position = element.getPosition();
    const defaultHeight = this.getDefaultHeight(surface);
    
    // 获取默认灯光参数
    const {
      intensity,
      temperature,
      ies
    } = super.getDefaultLight(element, surface, context);

    // 调整灯光位置（向下偏移0.75单位），如果调整失败则使用原始位置
    const adjustedPosition = this._adjustPosition(position, surface, -0.75) ?? position;

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
 * 类型声明
 */
declare namespace HSCore.Model {
  /** 场景元素接口 */
  interface IElement {
    getPosition(): IVector3;
  }

  /** 天花板表面接口 */
  interface ICeilingSurface {
    isCeilingFaceHidden(): boolean;
  }

  /** 灯光计算上下文 */
  interface ILightContext {
    [key: string]: unknown;
  }

  /** 计算选项 */
  interface IComputeOptions {
    [key: string]: unknown;
  }

  /** 三维向量 */
  interface IVector3 {
    x: number;
    y: number;
    z: number;
  }

  /** 灯光配置 */
  interface ILightConfig {
    /** 灯光类型 */
    type: LightTypeEnum;
    /** 色温（开尔文） */
    temperature: number;
    /** 强度 */
    intensity: number;
    /** 位置坐标 */
    position: IVector3;
    /** 高度 */
    height: number;
    /** IES光度文件配置 */
    ies?: string | IIESConfig;
  }

  /** IES配置 */
  interface IIESConfig {
    [key: string]: unknown;
  }

  /** 灯光类型枚举 */
  enum LightTypeEnum {
    SpotLight = 'SpotLight',
    PointLight = 'PointLight',
    DirectionalLight = 'DirectionalLight'
  }
}