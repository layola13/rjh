/**
 * CSS样式模块声明
 * 
 * 该模块导出窗帘组件相关的CSS样式定义，包括按钮样式和属性栏布局样式
 * 
 * @module CurtainStyles
 */

/**
 * 模块导出函数类型定义
 * 
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - 模块加载函数
 */
declare module 'module_324474' {
  /**
   * 模块对象接口
   */
  interface Module {
    /** 模块唯一标识符 */
    id: string | number;
    /** 模块导出内容 */
    exports: CSSModuleExports;
  }

  /**
   * CSS模块导出接口
   */
  interface CSSModuleExports {
    /**
     * 添加CSS规则到样式表
     * 
     * @param rules - CSS规则数组，格式为 [模块ID, CSS字符串]
     */
    push(rules: [string | number, string]): void;
  }

  /**
   * CSS加载器工厂函数类型
   * 
   * @param sourceMap - 是否启用source map
   * @returns CSS模块导出对象
   */
  type CSSLoaderFactory = (sourceMap: boolean) => CSSModuleExports;

  /**
   * 样式类名定义
   */
  interface CurtainStyleClasses {
    /** 完成按钮容器类名 */
    curtain_complete_button: string;
    /** 取消按钮容器类名 */
    curtain_cancel_button: string;
    /** 第三行布局类名 */
    curtain_thirdRow: string;
    /** 循环顶部类名 */
    curtain_loopTop: string;
    /** 循环底部类名 */
    curtain_loopBottom: string;
    /** 屏幕顶部类名 */
    curtain_screenTop: string;
    /** 屏幕底部类名 */
    curtain_screenBottom: string;
    /** 轨道顶部类名 */
    curtain_railTop: string;
    /** 轨道底部类名 */
    curtain_railBottom: string;
  }

  /**
   * CSS样式规则内容
   * 
   * 包含以下样式定义：
   * - .curtain_complete_button .btn-default: 完成按钮默认样式（蓝色主题）
   * - .curtain_complete_button .btn-default:hover: 完成按钮悬停样式
   * - .curtain_cancel_button .btn-default: 取消按钮默认样式（灰白主题）
   * - .curtain_cancel_button .btn-default:hover: 取消按钮悬停样式
   * - .rightpropertybar .curtain_*: 右侧属性栏各元素的间距样式
   */
  const CSS_CONTENT: string;

  /**
   * 模块初始化函数
   * 
   * @param module - 当前模块对象
   * @param exports - 模块导出对象
   * @param require - 依赖加载函数
   */
  export default function(
    module: Module,
    exports: CSSModuleExports,
    require: (moduleId: number) => CSSLoaderFactory
  ): void;
}

/**
 * CSS类名命名空间（用于类型安全的样式引用）
 */
declare namespace CurtainStyles {
  /**
   * 按钮尺寸常量
   */
  export const enum ButtonDimensions {
    /** 按钮宽度（像素） */
    WIDTH = 36,
    /** 按钮高度（像素） */
    HEIGHT = 20,
  }

  /**
   * 间距常量
   */
  export const enum Spacing {
    /** 顶部外边距（像素） */
    MARGIN_TOP = 9,
  }

  /**
   * 完成按钮颜色主题
   */
  export interface CompleteButtonTheme {
    /** 默认背景色 */
    backgroundColor: '#237ab9';
    /** 默认边框色 */
    borderColor: '#2e6da4';
    /** 文字颜色 */
    color: '#FFF';
    /** 悬停背景色 */
    hoverBackgroundColor: '#36a1f0';
    /** 悬停边框色 */
    hoverBorderColor: '#204d74';
  }

  /**
   * 取消按钮颜色主题
   */
  export interface CancelButtonTheme {
    /** 默认背景色 */
    backgroundColor: '#fff';
    /** 默认边框色 */
    borderColor: '#ccc';
    /** 文字颜色 */
    color: '#333';
    /** 悬停背景色 */
    hoverBackgroundColor: '#e6e6e6';
    /** 悬停边框色 */
    hoverBorderColor: '#adadad';
  }
}