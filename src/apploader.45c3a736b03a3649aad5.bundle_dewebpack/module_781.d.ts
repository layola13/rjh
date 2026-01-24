/**
 * CSS 样式模块导出
 * 包含登录相关的样式定义，包括登录弹窗、背景遮罩等
 */

/**
 * CSS 加载器辅助函数类型
 * 用于处理 CSS 模块的导入和导出
 */
interface CSSLoader {
  /**
   * CSS 模块的唯一标识符
   */
  id: string;
  
  /**
   * 添加 CSS 规则到样式表
   * @param rule - CSS 规则数组，格式为 [id, cssContent, sourceMap?]
   */
  push(rule: [string, string, string?]): void;
}

/**
 * CSS 加载器工厂函数类型
 * @param baseLoader - 基础的 CSS 加载器实例
 * @returns 增强后的 CSS 加载器
 */
type CSSLoaderFactory = (baseLoader: CSSLoader) => CSSLoader;

/**
 * 模块导出对象
 * 包含编译后的 CSS 样式模块
 */
export interface StyleModule {
  /**
   * 主要导出：编译后的 CSS 加载器实例
   * 包含完整的登录界面样式定义
   */
  A: CSSLoader;
}

/**
 * 登录界面样式定义
 * 
 * 包含以下主要组件样式：
 * - #login-root-dom: 登录模态框根容器（全屏遮罩层）
 * - #homestyler-body: 主登录弹窗容器（858px 宽度）
 * - #logining-popup: 紧凑型登录弹窗（390px 宽度）
 * - #logining-popup-tip: 提示信息弹窗（505px 宽度）
 * 
 * 样式特性：
 * - 使用固定定位和 z-index 实现模态层级
 * - 应用毛玻璃效果 (backdrop-filter: blur)
 * - 响应式居中布局 (transform: translate(-50%, -50%))
 * - 包含淘宝登录按钮样式和悬停效果
 */
declare const loginStyles: CSSLoader;

export default loginStyles;