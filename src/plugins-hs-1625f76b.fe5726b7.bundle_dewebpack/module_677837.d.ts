/**
 * 目录弹窗插件类型定义
 * @module CatalogPopupPlugin
 */

/**
 * 2D纹理报告问题类型枚举
 */
export type Material2DReasonType =
  | 'report-2d-reason-texture-not-seamless'
  | 'report-2d-reason-texture-repeat'
  | 'report-2d-reason-texture-distort'
  | 'report-2d-reason-texture-blur'
  | 'report-2d-reason-material-render-bad'
  | 'report-2d-reason-others';

/**
 * 3D模型报告问题类型枚举
 */
export type Model3DReasonType =
  | 'report-3d-reason-face-break'
  | 'report-3d-reason-face-black'
  | 'report-3d-reason-direction-issue'
  | 'report-3d-reason-dimension-issue'
  | 'report-3d-reason-stick-issue'
  | 'report-3d-reason-default-height-issue'
  | 'report-3d-reason-render-displace'
  | 'report-3d-reason-render-material-bad'
  | 'report-3d-reason-others';

/**
 * 反馈模块类型
 */
export type FeedbackModuleType = 'model.2d' | 'model.3d';

/**
 * 反馈对象类型枚举
 */
export enum FeedbackObjectType {
  /** 2D材质 */
  Material2D = 30,
  /** 3D模型 */
  Model3D = 40,
}

/**
 * 反馈样式配置
 */
export interface FeedbackStyleConfig {
  /** 样式类型 */
  type: 'small' | 'medium' | 'large';
}

/**
 * 模型信息
 */
export interface ModelInfo {
  /** 模型ID */
  id: string | number;
  /** 产品类型 */
  type: HSCatalog.ProductTypeEnum;
  /** 模型名称 */
  name: string;
}

/**
 * 反馈入口配置
 */
export interface FeedbackEntryConfig {
  /** 模块类型 */
  module: FeedbackModuleType;
  /** 模型信息 */
  model: ModelInfo;
  /** 样式配置 */
  style: FeedbackStyleConfig;
  /** 产品类型 */
  productType: HSCatalog.ProductTypeEnum;
  /** 拓扑装置模型是否需要更新 */
  tpzzModelNeedUpdate?: boolean;
}

/**
 * 产品缩略图配置
 */
export interface ProductThumbnailConfig {
  /** 图例图片URL */
  legendImg: string;
}

/**
 * 插件依赖配置
 */
export interface PluginConfig {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 依赖项列表 */
  dependencies: string[];
}

/**
 * 目录弹窗插件类
 * 用于管理目录相关的弹窗展示，包括问题反馈、模型申请、品画上传等功能
 * @extends HSApp.Plugin.IPlugin
 */
export declare class CatalogPopupPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 构造函数
   * 初始化目录弹窗插件
   */
  constructor();

  /**
   * 插件激活时的回调
   * 创建并初始化弹窗容器DOM元素
   * @param event - 激活事件对象
   * @param context - 上下文对象
   */
  onActive(event: unknown, context: unknown): void;

  /**
   * 显示问题反馈面板
   * 根据租户类型和产品类型展示不同的反馈界面
   * @param seekId - 产品搜索ID
   * @param productType - 产品类型（材质或模型）
   * @param productName - 产品名称
   * @param tpzzModelNeedUpdate - 拓扑装置模型是否需要更新（可选）
   */
  showReportPanel(
    seekId: string | number,
    productType: HSCatalog.ProductTypeEnum,
    productName: string,
    tpzzModelNeedUpdate?: boolean
  ): void;

  /**
   * 显示模型申请面板
   * 用于用户申请新模型的界面展示
   */
  showModelApplyPanel(): void;

  /**
   * 显示品画上传弹窗
   * 用于品画资源的上传功能
   */
  showUploadPinhuaPopup(): void;

  /**
   * 显示产品缩略图
   * 在弹窗中展示产品的图例预览
   * @param config - 产品缩略图配置对象
   */
  showProductThumbnail(config: ProductThumbnailConfig): void;
}

/**
 * 插件注册声明
 * 在HSApp插件系统中注册目录弹窗插件
 */
declare module 'HSApp' {
  namespace Plugin {
    /**
     * 插件基类接口
     */
    interface IPlugin {
      new (config: PluginConfig): IPlugin;
    }

    /**
     * 注册插件到插件系统
     * @param pluginKey - 插件唯一标识键
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginKey: 'hsw.plugin.catalogpopup.Plugin',
      pluginClass: typeof CatalogPopupPlugin
    ): void;
  }
}

export default CatalogPopupPlugin;