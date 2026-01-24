/**
 * CSS 模块加载器类型定义
 * 用于描述评分系统（Marking System）的样式模块导出
 */

/**
 * Webpack CSS 模块加载函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - 模块加载函数
 */
declare function cssModuleLoader(
  exports: Record<string, unknown>,
  module: CSSModule,
  require: RequireFunction
): void;

/**
 * CSS 模块对象接口
 */
interface CSSModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: Record<string, unknown>;
}

/**
 * 模块加载函数接口
 */
interface RequireFunction {
  /**
   * 加载指定模块
   * @param moduleId - 模块 ID
   * @returns 模块导出对象
   */
  (moduleId: number): unknown;
}

/**
 * CSS 加载器返回值接口
 * 提供 push 方法用于添加 CSS 规则
 */
interface CSSLoader {
  /**
   * 添加 CSS 规则到样式表
   * @param rule - CSS 规则数组 [moduleId, cssContent]
   */
  push(rule: [string | number, string]): void;
}

/**
 * 评分系统样式模块
 * 
 * 包含以下主要样式组件：
 * - `.markingsystem` - 全屏遮罩层容器
 * - `.markingsystem-popup-header-tips` - 顶部提示框
 * - `.markingsystem-popup-header-tips-arrow` - 提示框箭头
 * - `.markingsystem .popup` - 主弹窗容器
 * - `.markingsystem .popup .header` - 弹窗头部
 * - `.markingsystem .popup .content` - 弹窗内容区
 * - `.markingsystem .popup .content .starmarkingentry` - 星级评分区域
 * - `.markingsystem .popup .content .commentcontainer` - 评论输入区域
 * - `.markingsystem .popup .footer` - 弹窗底部操作区
 * 
 * 样式特性：
 * - 响应式居中布局
 * - 半透明黑色遮罩背景
 * - 带阴影的白色卡片式弹窗
 * - 包含星级评分和文本评论功能
 * - 渐变式底部操作栏
 */
declare module "*.css" {
  const content: string;
  export default content;
}

/**
 * 图片资源模块类型定义
 * 用于 CSS 中的 url() 引用
 */
declare module "*.png" {
  const path: string;
  export default path;
}

declare module "*.jpg" {
  const path: string;
  export default path;
}

declare module "*.jpeg" {
  const path: string;
  export default path;
}

declare module "*.gif" {
  const path: string;
  export default path;
}

declare module "*.svg" {
  const path: string;
  export default path;
}

export {};