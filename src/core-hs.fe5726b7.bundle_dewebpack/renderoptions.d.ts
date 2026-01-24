/**
 * 渲染选项配置类
 * 管理模板渲染、穹顶光照、高级参数等渲染相关设置
 */

import { DomeLightOption } from './DomeLightOption';

/**
 * 模板信息接口
 */
export interface TemplateInfo {
  /** 模板名称 */
  name: string;
  /** 是否启用智能模式 */
  intelligent: boolean;
  /** 是否为夜间模式 */
  isNight: boolean;
  /** 渲染绑定类型 */
  renderBindingType: HSConstants.Render.TemplateRenderBinding;
}

/**
 * 穹顶光照数据接口
 */
export interface DomeLightData {
  /** 亮度 */
  brightness: number;
  /** 反射强度 */
  reflection: number;
  /** 色调索引 */
  toneIndex: number;
  /** 色温值 */
  toneTemperature: number;
}

/**
 * 渲染选项序列化数据接口
 */
export interface RenderOptionsData {
  /** 当前模板配置 */
  currentTemplate?: {
    name?: string;
    intelligent?: boolean;
    enable?: boolean;
    isNight?: boolean;
    renderBindingType?: HSConstants.Render.TemplateRenderBinding;
  };
  /** 当前分组 */
  currentGroup?: string;
  /** 穹顶光照数据 */
  domeLight?: DomeLightData;
  /** 高级参数 */
  seniorParams?: Record<string, unknown>;
}

/**
 * 渲染选项类
 * 用于管理渲染相关的所有配置选项
 */
export declare class RenderOptions {
  /** 默认备用模板名称 */
  static readonly AlternateTemplateName: string;

  /** 模板渲染绑定类型 */
  private _templateRenderBinding: HSConstants.Render.TemplateRenderBinding;
  
  /** 模板名称 */
  private _templateName: string;
  
  /** 是否启用智能模式 */
  private _templateIntelligent: boolean;
  
  /** 是否启用模板 */
  private _templateEnabled: boolean;
  
  /** 是否为夜间模式 */
  private _templateIsNight: boolean;
  
  /** 当前分组 */
  private _currentGroup?: string;
  
  /** 高级参数 */
  private _seniorParams?: Record<string, unknown>;
  
  /** 穹顶光照数据 */
  private _domeLightData: DomeLightOption;
  
  /** 模板缓存 */
  private _templateCache?: {
    removeAllMembers(): void;
  };

  constructor();

  /**
   * 设置当前模板
   * @param templateName 模板名称（必须是有效的温度名称）
   * @param intelligent 是否启用智能模式
   * @param isNight 是否为夜间模式
   * @param renderBindingType 渲染绑定类型，默认为Common
   */
  setCurrentTemplate(
    templateName: string,
    intelligent: boolean,
    isNight: boolean,
    renderBindingType?: HSConstants.Render.TemplateRenderBinding
  ): void;

  /**
   * 获取当前模板信息
   */
  get currentTemplate(): TemplateInfo;

  /**
   * 获取模板渲染绑定类型
   */
  get templateRenderBindingType(): HSConstants.Render.TemplateRenderBinding;

  /**
   * 设置模板缓存
   * @param cache 缓存对象
   */
  setTemplateCache(cache: { removeAllMembers(): void }): void;

  /**
   * 获取当前模板缓存
   */
  get currentTemplateCache(): { removeAllMembers(): void } | undefined;

  /**
   * 清除模板缓存
   */
  clearTemplateCache(): void;

  /**
   * 设置穹顶光照参数
   * @param brightness 亮度
   * @param reflection 反射强度
   * @param toneIndex 色调索引
   * @param toneTemperature 色温值，默认6500K
   */
  setDomeLight(
    brightness: number,
    reflection: number,
    toneIndex: number,
    toneTemperature?: number
  ): void;

  /**
   * 获取穹顶光照数据
   */
  get domeLightData(): DomeLightOption;

  /**
   * 重置穹顶光照参数
   */
  resetDomeLight(): void;

  /**
   * 设置当前分组
   * @param group 分组标识
   */
  setCurrentGroup(group: string): void;

  /**
   * 获取当前分组
   * @returns 当模板启用时返回undefined，否则返回当前分组
   */
  get currentGroup(): string | undefined;

  /**
   * 获取温度值
   * @returns 启用模板时返回模板温度值，否则根据分组返回-1或undefined
   */
  get temperature(): number | undefined;

  /**
   * 禁用模板
   */
  disableTemplate(): void;

  /**
   * 启用模板
   */
  enableTemplate(): void;

  /**
   * 检查模板是否启用
   */
  get isTemplateEnabled(): boolean;

  /**
   * 检查是否为夜间模式
   */
  get templateIsNight(): boolean;

  /**
   * 设置高级参数
   * @param params 高级参数对象
   */
  setSeniorParams(params: Record<string, unknown>): void;

  /**
   * 获取高级参数
   */
  get seniorParams(): Record<string, unknown> | undefined;

  /**
   * 重置所有选项到默认值
   */
  reset(): void;

  /**
   * 验证渲染选项是否有效
   * @param groupMap 分组映射对象
   * @returns 模板启用时返回true，否则检查分组是否存在于映射中
   */
  verify(groupMap: Record<string, unknown>): boolean;

  /**
   * 导出当前配置数据
   * @returns 序列化的配置对象
   */
  dump(): RenderOptionsData;

  /**
   * 加载配置数据
   * @param data 要加载的配置数据
   */
  load(data: RenderOptionsData): void;
}