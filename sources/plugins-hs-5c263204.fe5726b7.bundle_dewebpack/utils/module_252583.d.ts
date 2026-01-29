/**
 * CSS模块类型定义
 * Module: module_252583
 * Original ID: 252583
 * 
 * 该模块导出引导提示组件的CSS样式定义，包含动画效果和布局样式
 */

/**
 * Webpack CSS加载器推送的样式条目
 */
interface CSSModuleEntry {
  /** 模块唯一标识符 */
  id: string;
  /** CSS样式内容字符串 */
  content: string;
}

/**
 * CSS加载器返回对象接口
 */
interface CSSLoaderExports {
  /**
   * 推送CSS样式到构建系统
   * @param entry - 包含模块ID和CSS内容的元组
   */
  push(entry: [string, string]): void;
}

/**
 * Webpack CSS加载器函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS加载器导出对象
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSLoaderExports;

/**
 * 引导提示组件CSS样式常量
 * 
 * 包含的主要样式类：
 * - `.guide-global` - 全局容器样式
 * - `.guideTip` - 提示框定位
 * - `.content-text` - 提示内容文本样式
 * - `.iconArrow` - 箭头指示器（支持上下左右四个方向）
 * - 动画类：`bounce`, `bounceleft`, `bounceright`, `bouncetop`, `bouncebottom`
 * 
 * 样式特性：
 * - 使用 AlibabaPuHuiTi-Bold 字体
 * - 主题色：#396efe（蓝色）
 * - 支持四个方向的箭头指示器
 * - 包含5种弹跳动画效果
 */
declare const GUIDE_GLOBAL_STYLES: string;

/**
 * 模块导出类型声明
 * 该模块通过webpack的css-loader处理CSS内容并注入到页面中
 */
export default CSSLoaderExports;

/**
 * CSS类名命名空间
 */
export namespace GuideStyles {
  /** 全局容器类名 */
  export const GLOBAL_CLASS: '.guide-global';
  
  /** 提示框类名 */
  export const TIP_CLASS: '.guideTip';
  
  /** 工具提示容器类名 */
  export const TOOLTIP_CONTAINER_CLASS: '.tooltipContainer';
  
  /** 内容文本类名 */
  export const CONTENT_TEXT_CLASS: '.content-text';
  
  /** 关闭按钮类名 */
  export const CLOSE_BUTTON_CLASS: '.guideTipCloseBtn';
  
  /** 箭头图标类名 */
  export const ICON_ARROW_CLASS: '.iconArrow';
  
  /** 箭头方向类型 */
  export type ArrowDirection = 'left' | 'right' | 'top' | 'bottom' | 'noarrow';
  
  /** 动画类型 */
  export type AnimationType = 
    | 'bounce' 
    | 'bounceleft' 
    | 'bounceright' 
    | 'bouncetop' 
    | 'bouncebottom' 
    | 'animated' 
    | 'guideanimated';
}

/**
 * 样式配置常量
 */
export const StyleConstants = {
  /** 主题色 */
  PRIMARY_COLOR: '#396efe',
  /** 字体家族 */
  FONT_FAMILY: 'AlibabaPuHuiTi-Bold',
  /** z-index层级 */
  Z_INDEX: 5000,
  /** 字体大小 */
  FONT_SIZE: {
    SMALL: '12px',
    LARGE: '18px',
  },
  /** 动画时长 */
  ANIMATION_DURATION: {
    STANDARD: '1s',
    LONG: '5s',
  },
  /** 边框圆角 */
  BORDER_RADIUS: '8px',
} as const;