/**
 * CSS模块类型定义
 * 该模块导出搜索结果为空时的样式定义
 */

/**
 * CSS模块加载器函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块加载器实例
 */
type CSSModuleLoader = (sourceMap: boolean) => {
  push(content: [string, string]): void;
};

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param require - Webpack require函数
 * @param moduleId - 当前模块ID
 */
declare function moduleExports(
  exports: { id: string; exports?: unknown },
  require: (moduleId: number) => CSSModuleLoader,
  moduleId: number
): void;

/**
 * 无搜索结果组件的CSS样式类名
 */
export interface NoneSearchStyles {
  /** 搜索结果为空容器的根样式类 */
  'none-search-wrapper': string;
  
  /** 搜索结果为空图标样式类 */
  'none-search-icon': string;
  
  /** 搜索结果为空文本样式类 */
  'none-search-text': string;
  
  /** 教学模式-亮色主题样式修饰符 */
  'teaching-light': string;
  
  /** 教学模式-暗色主题样式修饰符 */
  'teaching-black': string;
}

/**
 * CSS样式字符串常量
 * 包含无搜索结果组件的完整样式定义
 */
declare const styles: string;

export default styles;