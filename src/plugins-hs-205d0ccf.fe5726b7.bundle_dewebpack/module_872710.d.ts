/**
 * CSS模块导出类型定义
 * 用于样式模块的类型声明
 */

/**
 * CSS模块加载器函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块加载器实例
 */
type CSSModuleLoader = (sourceMap: boolean) => {
  push: (entry: [string, string, string]) => void;
};

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 */
declare function moduleExport(
  exports: { id: string },
  require: (moduleId: number) => CSSModuleLoader
): void;

/**
 * 卡片提示气球组件的CSS类名
 */
export interface CardTipsBallonStyles {
  /** 提示容器的根元素样式类 */
  'card-tips-ballon-tips-container': string;
}

/**
 * 卡片提示气球容器样式规则
 * - 绝对定位，左上角对齐
 * - z-index: 3000，确保显示在最上层
 */
declare const styles: CardTipsBallonStyles;

export default styles;