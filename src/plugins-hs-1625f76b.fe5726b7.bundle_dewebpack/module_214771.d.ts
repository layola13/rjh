/**
 * CSS模块类型定义
 * 该模块导出CSS样式字符串，用于自定义模型创建弹窗和鼠标提示组件
 */

/**
 * CSS模块导出函数类型
 * @param sourceMap - 是否包含source map信息
 * @returns CSS加载器实例
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSLoader;

/**
 * CSS加载器接口
 * 用于处理和注入CSS样式
 */
interface CSSLoader {
  /**
   * 添加CSS规则到加载器
   * @param module - 模块信息数组 [模块ID, CSS内容字符串, source map(可选)]
   */
  push(module: [string | number, string, string?]): void;
}

/**
 * Webpack模块导出对象
 */
interface ModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: CSSLoader;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出的内容
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFunction;

/**
 * 模块工厂函数签名
 * @param module - Webpack模块对象，包含id和exports
 * @param exports - 模块导出对象（module.exports的引用）
 * @param require - Webpack的require函数，用于加载其他模块
 */
declare function moduleFactory(
  module: ModuleExports,
  exports: CSSLoader,
  require: WebpackRequire
): void;

/**
 * CSS类名类型定义
 * 包含所有可用的CSS类名
 */
export interface CSSModuleClasses {
  /** 鼠标提示浮层样式 */
  mousetooltip: string;
  
  /** 窗口包装器样式 */
  windowWrapper: string;
  
  /** 创建自定义模型弹窗容器 */
  createcustomizedmodel: string;
  
  /** 弹窗窗口样式 */
  popupwindows: string;
  
  /** 弹窗主体 */
  'popup-window': string;
  
  /** 窗口头部 */
  'window-header': string;
  
  /** 标题样式 */
  title: string;
  
  /** 关闭按钮 */
  closeBtn: string;
  
  /** 鼠标悬停图片 */
  'hover-image': string;
  
  /** 窗口内容区域 */
  'window-contents': string;
  
  /** 内容包装器 */
  contentsWrapper: string;
  
  /** 模型尺寸字段容器 */
  'model-size-field': string;
  
  /** 模型尺寸标题 */
  'model-size-tile': string;
  
  /** 模型输出切换容器 */
  modeloutputtogglecontainer: string;
  
  /** 输出项 */
  outputitem: string;
  
  /** 激活状态 */
  active: string;
  
  /** 模型类型字段容器 */
  'model-type-field': string;
  
  /** 模型类型标题 */
  'model-type-tile': string;
  
  /** 模型类型容器 */
  'model-type-container': string;
  
  /** 模型视图列表项 */
  'model-view-li': string;
  
  /** 模型图片容器 */
  'model-image': string;
  
  /** 模型图片悬停状态 */
  'model-image-hover': string;
  
  /** 模型图片选中状态 */
  'model-image-selected': string;
  
  /** 模型复选框 */
  'model-checkbox': string;
  
  /** 模型描述容器 */
  'model-description': string;
  
  /** 模型名称 */
  'model-name': string;
  
  /** 模型提示信息 */
  'model-tips': string;
  
  /** 模型描述高亮状态 */
  'model-description-highlight': string;
  
  /** 自定义模型按钮组 */
  'customizedmodel-buttons': string;
  
  /** 创建按钮 */
  createbutton: string;
  
  /** 取消按钮 */
  cancelbutton: string;
}

/**
 * 导出CSS模块类名映射
 */
declare const styles: CSSModuleClasses;

export default styles;