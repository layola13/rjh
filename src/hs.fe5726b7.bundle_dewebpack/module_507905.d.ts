/**
 * CSS模块导出类型定义
 * 
 * 该模块通过css-loader导出HintView组件的样式定义。
 * HintView是一个垂直居中的提示视图容器，包含图标和文本提示。
 * 
 * @module module_507905
 * @original-id 507905
 */

/**
 * CSS加载器模块接口
 * 用于处理和注入CSS样式到文档中
 */
interface CSSLoaderModule {
  /**
   * 添加CSS规则到样式表
   * @param rules - CSS规则数组，包含模块ID和CSS内容
   */
  push(rules: [moduleId: string | number, cssContent: string][]): void;
}

/**
 * Webpack模块导出接口
 */
interface WebpackModuleExports {
  /** CSS加载器实例 */
  exports: CSSLoaderModule;
  /** 当前模块的唯一标识符 */
  id: string | number;
}

/**
 * CSS加载器工厂函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS加载器实例
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoaderModule;

/**
 * Webpack require函数接口
 */
interface WebpackRequire {
  /** 
   * 动态加载模块
   * @param moduleId - 模块ID（986380对应css-loader）
   */
  (moduleId: number): CSSLoaderFactory;
}

/**
 * HintView组件样式类名定义
 * 
 * 样式说明：
 * - `.hintView`: 主容器，使用flex布局垂直居中，占满父容器
 * - `.hintView .hintText`: 提示文本容器，宽度为容器的80%
 * - `.hintView .hintIcon`: 提示图标，固定尺寸106x120px
 * - `.hintView .hintIcon.svgicon`: SVG图标变体，使用flex布局
 * - `.hintView a`: 链接样式，带悬停效果
 */
declare const styles: {
  /** 主容器类名 - 垂直居中的Flex容器 */
  readonly hintView: string;
  /** 提示文本类名 - 宽度受限的文本区域 */
  readonly hintText: string;
  /** 提示图标类名 - 固定尺寸的图标容器 */
  readonly hintIcon: string;
  /** SVG图标修饰类名 - 与hintIcon配合使用 */
  readonly svgicon: string;
};

export default styles;

/**
 * 模块函数签名
 * 
 * @param moduleExports - Webpack模块导出对象
 * @param _unusedExports - 未使用的导出参数（通常为空）
 * @param webpackRequire - Webpack模块加载器
 * 
 * @example
 *