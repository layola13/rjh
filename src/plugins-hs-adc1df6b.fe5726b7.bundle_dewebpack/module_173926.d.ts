/**
 * CSS模块导出的类型定义
 * 该模块包含社区分享组件的样式定义
 * 
 * @module CommunityShareStyles
 */

/**
 * Webpack模块加载器函数类型
 * @param isProd - 是否为生产环境构建
 * @returns CSS模块加载器实例
 */
type CSSModuleLoader = (isProd: boolean) => {
  /**
   * 推送CSS内容到样式表
   * @param entry - [模块ID, CSS内容字符串]元组
   */
  push(entry: [string, string]): void;
};

/**
 * Webpack模块导出函数签名
 * 
 * @param exports - 模块导出对象
 * @param module - 当前模块对象，包含id等元数据
 * @param require - Webpack的require函数，用于加载其他模块
 */
declare function moduleExports(
  exports: {
    /** 模块ID标识符 */
    id: string;
    /** 模块导出内容（CSS加载器实例） */
    exports: ReturnType<CSSModuleLoader>;
  },
  module: unknown,
  require: (moduleId: number) => CSSModuleLoader
): void;

/**
 * 社区分享组件的CSS样式内容
 * 
 * 包含以下主要样式：
 * - #community-share-div: 全屏遮罩容器（绝对定位，z-index: 4000）
 * - .close-share-area: 右上角关闭按钮区域（80x80px，带hover/active效果）
 * - .community-share-frame-container: 分享框架容器（全屏，带过渡动画）
 * - .community-share-frame-mask: 毛玻璃背景遮罩（渐变+模糊效果）
 * - .community-share-frame: 居中的分享内容框架（flexbox布局）
 */
declare const cssContent: string;

export default cssContent;