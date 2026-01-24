/**
 * CSS模块导出类型定义
 * Module: module_729305
 * Original ID: 729305
 * 
 * 此模块导出教学主页相关的CSS样式定义
 */

/**
 * CSS模块加载器函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS加载器实例
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoader;

/**
 * CSS加载器接口
 */
interface CSSLoader {
  /**
   * 添加CSS规则到样式表
   * @param moduleInfo - 包含模块ID和CSS内容的数组
   */
  push(moduleInfo: [string, string]): void;
}

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 * @param moduleId - 当前模块ID
 */
declare function moduleExport(
  exports: { id: string; exports: CSSLoader },
  require: (moduleId: number) => CSSLoaderFactory,
  moduleId: number
): void;

/**
 * 教学主页样式类名定义
 */
interface TeachingHomePageStyles {
  /** 主页包装器容器 */
  'home-page-wrapper': string;
  
  /** 顶部左侧区域容器 */
  'home-page-top-left': string;
  
  /** 教学主页顶部标题 */
  'teaching-homepage-top-title': string;
  
  /** 浅色主题标题 */
  'teaching-light': string;
  
  /** 深色主题标题 */
  'teaching-black': string;
  
  /** 顶部选择器 */
  'top-select': string;
  
  /** 隐藏状态的顶部选择器 */
  'top-select-hidden': string;
  
  /** 选择器容器 */
  'select-container': string;
  
  /** 隐藏状态的选择器容器 */
  'select-container-hidden': string;
  
  /** 时段包装器 */
  'period-wrapper': string;
  
  /** 隐藏状态的时段包装器 */
  'hidden-period-wrapper': string;
  
  /** 全局英文样式 */
  'global-en': string;
}

/**
 * 导出的CSS模块
 */
declare const styles: TeachingHomePageStyles;

export default styles;