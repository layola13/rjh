/**
 * CSS模块导出的类型定义文件
 * @module BomFilterStyles
 * @description BOM（物料清单）过滤器组件的样式定义
 */

/**
 * CSS样式内容字符串
 * 包含BOM过滤器容器、模型、分类、徽章等所有样式规则
 */
export type CSSContent = string;

/**
 * 模块ID标识符
 */
export type ModuleId = string | number;

/**
 * Webpack CSS模块推送项
 * @description 表示一个CSS模块及其依赖关系的数组结构
 * @example [moduleId, cssContent, sourceMap?]
 */
export type CSSModulePushItem = [ModuleId, CSSContent, unknown?];

/**
 * Webpack CSS加载器返回的模块接口
 * @description 包含push方法用于注册CSS内容到运行时
 */
export interface CSSLoaderModule {
  /**
   * 将CSS模块内容推送到样式管理器
   * @param item - 包含模块ID和CSS内容的数组
   */
  push(item: CSSModulePushItem): void;
}

/**
 * Webpack模块工厂函数参数 - 导出对象
 * @description 用于将模块内容挂载到exports对象
 */
export interface ModuleExports {
  /** 模块的唯一标识符 */
  id: ModuleId;
  /** 导出的内容（此处为CSS加载器模块） */
  exports: CSSLoaderModule | Record<string, unknown>;
}

/**
 * Webpack运行时 - require函数类型
 * @description 用于加载其他模块的函数
 * @param moduleId - 要加载的模块ID
 * @returns 加载后的模块导出内容
 */
export type WebpackRequire = (moduleId: number) => CSSLoaderModule;

/**
 * Webpack模块工厂函数签名
 * @description 定义单个模块的加载逻辑
 * @param module - 当前模块的导出对象容器
 * @param exports - 模块导出的内容（通常与module.exports相同）
 * @param require - Webpack运行时提供的模块加载器
 */
export type ModuleFactory = (
  module: ModuleExports,
  exports: ModuleExports['exports'],
  require: WebpackRequire
) => void;

/**
 * 样式类名映射接口
 * @description 定义所有可用的CSS类名常量
 */
export interface BomFilterStyleClasses {
  /** 主容器类名 */
  readonly 'bom-filter-container': string;
  /** 模型容器类名 */
  readonly 'bom-filter-container-model': string;
  /** 模型内容区域类名 */
  readonly 'bom-filter-container-model-content': string;
  /** 分类容器类名 */
  readonly 'bom-filter-container-category': string;
  /** 一级分类内容类名 */
  readonly 'bom-filter-container-category-content-level1': string;
  /** 二级分类内容类名 */
  readonly 'bom-filter-container-category-content-level2': string;
  /** 标题容器类名 */
  readonly 'bom-filter-container-title': string;
  /** 标题文本类名 */
  readonly 'bom-filter-container-title-text': string;
  /** 模态框底部类名 */
  readonly 'bom-modal-footer': string;
  /** 专属标签类名 */
  readonly 'bom-exclusive-tag': string;
  /** 过滤框容器类名 */
  readonly 'bom-filter-box': string;
  /** 提示图标类名 */
  readonly 'bom-tooltip-icon': string;
  /** 营销徽章类名 */
  readonly 'marketing-badge-bom': string;
  /** 提示气泡类名 */
  readonly 'bom-tooltip-popover': string;
  /** 模型数量显示类名 */
  readonly 'models-count': string;
  /** 平铺图标类名 */
  readonly 'tile-plan-model-numbers-icon': string;
}

/**
 * 默认导出：Webpack CSS模块工厂函数
 * @description 当模块被Webpack加载时执行此函数以注册样式
 */
declare const moduleFactory: ModuleFactory;

export default moduleFactory;