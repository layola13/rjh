/**
 * CSS模块导出类型定义
 * 该模块导出一个CSS样式表，用于property-bar-level3组件的样式定义
 * @module PropertyBarLevel3Styles
 */

/**
 * Webpack模块导出函数类型
 * @param e - 模块导出对象
 * @param t - 模块依赖项（未使用）
 * @param n - Webpack require函数，用于加载其他模块
 */
declare function cssModuleExport(
  e: { 
    /** 模块唯一标识符 */
    id: string | number; 
    /** 模块导出对象 */
    exports: CSSModuleExports 
  },
  t: unknown,
  n: WebpackRequireFunction
): void;

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 加载的模块（CSS加载器实例）
 */
interface WebpackRequireFunction {
  (moduleId: number): CSSLoaderInstance;
}

/**
 * CSS加载器实例接口
 * @param sourceMap - 是否生成source map，false表示不生成
 * @returns CSS加载器API对象
 */
interface CSSLoaderInstance {
  (sourceMap: boolean): CSSLoaderAPI;
}

/**
 * CSS加载器API接口
 * 提供push方法用于添加CSS模块
 */
interface CSSLoaderAPI {
  /**
   * 添加CSS模块到样式表
   * @param entry - CSS模块条目 [模块ID, CSS内容字符串]
   */
  push(entry: [string | number, string]): void;
}

/**
 * CSS模块导出对象类型
 * 包含CSS样式表的元数据和内容
 */
interface CSSModuleExports {
  /** 模块标识符 */
  id: string | number;
  /** CSS内容字符串 */
  content: string;
  /** 是否包含source map */
  sourceMap?: boolean;
}

/**
 * Property Bar Level 3 组件的CSS类名定义
 */
interface PropertyBarLevel3ClassNames {
  /** 根容器类名 */
  'property-bar-level3': string;
  /** 标题容器类名 */
  'property-bar-level3-title': string;
  /** 标题左侧区域类名 */
  'level3-title-left': string;
  /** 标题文本类名 */
  'level3-label': string;
  /** 工具提示图标类名 */
  'level3-tooltip': string;
  /** 自定义图标类名 */
  'level3-custom-icon': string;
  /** 状态按钮类名 */
  'level3-status-btn': string;
  /** 右侧状态按钮类名 */
  'level3-right-status-btn': string;
  /** 标题右侧区域类名 */
  'level3-title-right': string;
  /** 下拉按钮类名 */
  'level3-dropdown-btn': string;
  /** 重置按钮类名 */
  'level3-reset': string;
  /** 隐藏标题状态类名 */
  'property-bar-level3-title-hidden': string;
  /** 禁用状态类名 */
  'disabled': string;
  /** 向上箭头状态类名 */
  'up': string;
  /** 重置按钮禁用状态类名 */
  'reset-disabled': string;
}

export default cssModuleExport;
export type { 
  CSSModuleExports, 
  CSSLoaderAPI, 
  CSSLoaderInstance, 
  WebpackRequireFunction,
  PropertyBarLevel3ClassNames 
};