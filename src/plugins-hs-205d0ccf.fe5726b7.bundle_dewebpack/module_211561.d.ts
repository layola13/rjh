/**
 * CSS 模块导出类型定义
 * 用于 Webpack CSS Loader 的样式模块
 * @module ValidAreaContainerStyles
 */

/**
 * CSS 模块导出函数类型
 * @param sourceMap - 是否生成 source map
 * @returns CSS 模块对象，包含 push 方法用于添加样式规则
 */
type CSSModuleExport = (sourceMap: boolean) => {
  /**
   * 添加 CSS 样式规则到模块
   * @param rule - 样式规则数组，格式为 [模块ID, CSS内容, sourceMap?]
   */
  push(rule: [string, string, string?]): void;
};

/**
 * Webpack 模块导出函数签名
 * @param exports - 模块导出对象
 * @param require - Webpack require 函数，用于加载依赖模块
 */
declare function module(
  exports: {
    /** 模块导出的内容 */
    exports: unknown;
    /** 模块唯一标识符 */
    id: string;
  },
  require: (moduleId: number) => CSSModuleExport
): void;

/**
 * 有效面积容器组件的 CSS 类名定义
 */
declare interface ValidAreaContainerClassNames {
  /** 容器根元素类名 */
  'valid-area-container': string;
  /** 主体区域类名 */
  'valid-area-body': string;
  /** 禁用箭头状态类名 */
  'disabled-Arrow': string;
  /** 计算成功状态类名 */
  'body-calculate-success': string;
  /** 标题区域类名 */
  'valid-area-title': string;
  /** 后缀区域类名 */
  'valid-area-suffix': string;
  /** 平面图禁用状态类名 */
  'floorplan-disable': string;
  /** 后缀禁用状态类名 */
  'suffix-disable': string;
  /** 后缀正常状态类名 */
  'suffix-normal': string;
  /** 后缀重试状态类名 */
  'suffix-retry': string;
  /** 加载图标类名 */
  'loading-img': string;
  /** 计算成功区域类名 */
  'calculate-success': string;
  /** 计算面积显示类名 */
  'calculate-area': string;
  /** 计算单位显示类名 */
  'calculate-unit': string;
  /** 计算重试按钮类名 */
  'calculate-retry': string;
}

/**
 * CSS 模块默认导出
 * 包含所有样式类名的映射对象
 */
declare const styles: ValidAreaContainerClassNames;

export default styles;