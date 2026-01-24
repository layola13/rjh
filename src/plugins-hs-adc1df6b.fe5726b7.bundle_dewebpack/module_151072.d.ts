/**
 * 参数化屋顶插件类型定义
 * Module: module_151072
 * Original ID: 151072
 */

import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 屋顶区域元数据信息接口
 */
export interface IRoofMetaInfo {
  /** 屋顶类型 */
  roofType: ENParamRoofType;
  /** 屋顶名称 */
  name?: string;
  /** 其他元数据属性 */
  [key: string]: unknown;
}

/**
 * 参数化屋顶类型枚举
 */
export enum ENParamRoofType {
  /** 平面屋顶 */
  Plane = 'Plane',
  /** 坡屋顶 */
  Pitched = 'Pitched',
  /** 其他类型 */
  [key: string]: string;
}

/**
 * 屋顶属性配置接口
 */
export interface IRoofProperty {
  /** 属性键值对 */
  [key: string]: unknown;
}

/**
 * 屋顶区域属性配置接口
 */
export interface IRoofRegionProperty {
  /** 属性键值对 */
  [key: string]: unknown;
}

/**
 * 视图控制器刷新选项
 */
export interface IViewControllerRefreshOptions {
  /** 是否强制刷新 */
  forceRefresh?: boolean;
  /** 其他选项 */
  [key: string]: unknown;
}

/**
 * 参数化屋顶处理器接口
 */
export interface IParametricRoofHandler {
  /**
   * 初始化处理器
   * @param context - 插件上下文
   * @param config - 配置对象
   */
  init(context: unknown, config: unknown): void;

  /**
   * 反初始化处理器
   */
  uninit(): void;

  /**
   * 刷新视图控制器
   * @param options - 刷新选项
   */
  refreshViewController(options: IViewControllerRefreshOptions): void;

  /**
   * 获取资源对象
   */
  getResource(): IParametricRoofResource;

  /** 属性栏处理器 */
  propertyBarHandler: IPropertyBarHandler;
}

/**
 * 属性栏处理器接口
 */
export interface IPropertyBarHandler {
  /**
   * 根据屋顶区域生成属性配置
   * @param region - 屋顶区域对象
   * @returns 屋顶区域属性配置
   */
  generatePropertyByRoofRegion(region: unknown): IRoofRegionProperty;

  /**
   * 根据屋顶对象生成属性配置
   * @param roof - 屋顶对象
   * @returns 屋顶属性配置
   */
  generatePropertyByRoof(roof: unknown): IRoofProperty;
}

/**
 * 参数化屋顶资源接口
 */
export interface IParametricRoofResource {
  /** 屋顶元数据列表 */
  roofMetaList: IRoofMetaInfo[];
}

/**
 * 自定义参数化屋顶插件类
 * 支持自定义参数化屋顶功能
 */
export declare class CustomizedParametricRoofPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 插件处理器实例
   */
  handler: IParametricRoofHandler;

  /**
   * 构造函数
   * 初始化插件配置和依赖项
   */
  constructor();

  /**
   * 插件激活时的回调
   * @param context - 插件上下文
   * @param config - 配置对象
   */
  onActive(context: unknown, config: unknown): void;

  /**
   * 插件停用时的回调
   */
  onDeactive(): void;

  /**
   * 生成屋顶区域属性配置
   * @param region - 屋顶区域对象
   * @returns 屋顶区域属性配置
   */
  generateRoofRegionProperty(region: unknown): IRoofRegionProperty;

  /**
   * 生成屋顶属性配置
   * @param roof - 屋顶对象
   * @returns 屋顶属性配置
   */
  generateRoofProperty(roof: unknown): IRoofProperty;

  /**
   * 刷新视图控制器
   * @param options - 刷新选项
   */
  refreshViewController(options: IViewControllerRefreshOptions): void;

  /**
   * 获取平面屋顶元数据信息
   * @returns 平面屋顶元数据，如果不存在则返回 undefined
   */
  getPlaneRoofMetaInfo(): IRoofMetaInfo | undefined;
}

/**
 * 插件注册声明
 * 将自定义参数化屋顶插件注册到应用插件系统
 */
declare module './HSApp' {
  namespace HSApp.Plugin {
    /**
     * 注册插件到插件系统
     * @param pluginType - 插件类型标识
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginType: typeof HSFPConstants.PluginType.ParametricRoof,
      pluginClass: typeof CustomizedParametricRoofPlugin
    ): void;
  }
}