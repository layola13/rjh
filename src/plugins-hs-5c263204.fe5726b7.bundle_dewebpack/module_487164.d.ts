/**
 * CSS模块类型定义
 * @module GuideTipStyles
 * @description 引导提示组件的样式定义，包含工具提示的位置、箭头方向和动画效果
 */

/**
 * Webpack模块导出函数类型
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - 模块加载函数
 */
declare module 'module_487164' {
  /**
   * 模块导出对象
   */
  interface ModuleExports {
    /** 模块ID */
    id: string;
    /** 导出内容 */
    exports: unknown;
  }

  /**
   * CSS加载器返回类型
   */
  interface CSSLoader {
    /**
     * 推送CSS内容到加载器
     * @param content - CSS内容数组，包含模块ID和CSS字符串
     */
    push(content: [string, string]): void;
  }

  /**
   * CSS模块加载函数
   * @param useSourceMap - 是否使用源映射
   * @returns CSS加载器实例
   */
  type CSSModuleLoader = (useSourceMap: boolean) => CSSLoader;

  /**
   * 引导提示样式类名
   */
  export interface GuideTipClasses {
    /** 主容器类名 */
    guideTip: string;
    /** 内容容器类名 */
    content: string;
    /** 文本内容类名 */
    'content-text': string;
    /** 关闭按钮类名 */
    guideTipCloseBtn: string;
    /** 箭头图标类名 */
    iconArrow: string;
    /** 右侧箭头类名 */
    right: string;
    /** 左侧箭头类名 */
    left: string;
    /** 底部箭头类名 */
    bottom: string;
    /** 顶部箭头类名 */
    top: string;
    /** 无箭头类名 */
    noarrow: string;
    /** 工具提示容器类名 */
    'guide-tooltip': string;
  }

  /**
   * 工具提示位置类型
   */
  export type TooltipPosition = 'left' | 'right' | 'top' | 'bottom';

  /**
   * 箭头方向类型
   */
  export type ArrowDirection = 'left' | 'right' | 'top' | 'bottom' | 'noarrow';

  /**
   * CSS动画关键帧类型
   */
  export interface AnimationKeyframes {
    /** Y轴弹跳动画 */
    'bounce-y': string;
    /** X轴弹跳动画 */
    'bounce-x': string;
  }

  /**
   * 样式配置选项
   */
  export interface StyleOptions {
    /** 字体大小（像素） */
    fontSize?: number;
    /** 背景颜色 */
    backgroundColor?: string;
    /** 文字颜色 */
    textColor?: string;
    /** 边框圆角（像素） */
    borderRadius?: number;
    /** 最大宽度（像素） */
    maxWidth?: number;
    /** 内边距 */
    padding?: string;
    /** 箭头大小（像素） */
    arrowSize?: number;
    /** 工具提示偏移距离（像素） */
    tooltipOffset?: number;
  }

  const styles: GuideTipClasses;
  export default styles;
}