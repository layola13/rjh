/**
 * CSS模块定义
 * 导出样式表字符串数组，包含提醒工具提示的样式定义
 * @module RemindTooltipStyles
 */

/**
 * 样式表导出函数类型
 * @param shouldMinify - 是否压缩CSS输出
 * @returns 样式表推送接口
 */
type StyleLoaderPush = (shouldMinify: boolean) => {
  push: (entry: [string, string, string]) => void;
};

/**
 * Webpack模块导出接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出对象 */
  exports: unknown;
}

/**
 * 提醒工具提示样式模块
 * 
 * 包含的样式类：
 * - `.remind-tooltip-wrapper`: 工具提示容器，圆角边框
 * - `.remind-arrow.teaching-light`: 亮色主题箭头（白色）
 * - `.remind-arrow.teaching-black`: 暗色主题箭头（深灰色 #343538）
 * 
 * @param module - Webpack模块对象
 * @param _exports - 模块导出对象（未使用）
 * @param require - Webpack require函数
 */
declare function remindTooltipStylesModule(
  module: WebpackModule,
  _exports: unknown,
  require: (moduleId: number) => StyleLoaderPush
): void;

/**
 * CSS样式内容常量
 */
declare const REMIND_TOOLTIP_STYLES: string;

export { remindTooltipStylesModule as default, REMIND_TOOLTIP_STYLES };