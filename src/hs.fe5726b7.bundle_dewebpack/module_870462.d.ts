/**
 * CSS模块导出类型定义
 * 用于通知弹窗组件的样式声明
 * @module NotificationPopupStyles
 */

/**
 * CSS加载器函数类型
 * @param sourceMap - 是否启用source map
 * @returns CSS模块加载器实例
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSModuleLoader;

/**
 * CSS模块加载器接口
 * 负责处理CSS模块的加载和注入
 */
interface CSSModuleLoader {
  /**
   * 添加CSS规则到模块
   * @param rule - CSS规则数组 [模块ID, CSS内容字符串, source map数据(可选)]
   */
  push(rule: [string, string, string?]): void;
}

/**
 * Webpack模块导出对象
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出内容 */
  exports: CSSModuleLoader;
}

/**
 * 通知弹窗样式模块
 * 
 * 包含的CSS类：
 * - `.notificationpopupwrapper` - 弹窗容器（全屏覆盖层，居中显示）
 * - `.notificationpopupwrapper.hidden` - 隐藏状态
 * - `.notificationpopupwrapper .mask` - 半透明黑色遮罩层（opacity: 0.3）
 * - `.notificationpopupwrapper .notificationpopup` - 弹窗主体（500px宽，圆角边框）
 * - `.notificationpopup .header` - 弹窗头部区域（40px高）
 * - `.header .closebtn` - 关闭按钮（12x12px，右上角定位）
 * - `.notificationpopup .content` - 内容区域（支持图标+文字布局）
 * - `.content .image` - 图标元素（30x30px）
 * - `.content .text` - 文本内容（14px字体，深灰色）
 * - `.content.noicon` - 无图标模式
 * - `.notificationpopup .actions` - 操作按钮区域（右对齐布局）
 * - `.actions .notification-btn` - 操作按钮（最小100px宽）
 * 
 * @param moduleExports - Webpack模块导出对象
 * @param moduleContext - 模块上下文（未使用）
 * @param requireFunction - Webpack require函数，用于加载CSS加载器
 */
declare function notificationPopupStylesModule(
  moduleExports: WebpackModule,
  moduleContext: unknown,
  requireFunction: (moduleId: number) => CSSLoaderFunction
): void;

/**
 * 导出的CSS内容常量
 * 包含完整的通知弹窗组件样式规则
 */
declare const CSS_CONTENT: string;

export { notificationPopupStylesModule as default, CSS_CONTENT };