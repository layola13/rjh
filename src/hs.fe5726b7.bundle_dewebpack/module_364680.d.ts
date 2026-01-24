/**
 * CSS模块加载器类型定义
 * 用于Webpack CSS模块的样式注入
 */

/**
 * CSS模块导出函数类型
 * @param exports - 模块导出对象
 * @param cssLoaderApi - CSS加载器API函数
 * @param cssLoaderApi.sourceMap - 是否启用源映射
 * @returns 处理后的CSS模块导出对象
 */
declare module 'module_364680' {
  /**
   * 认证弹窗组件的样式定义
   * 包含以下CSS类：
   * - .auth-popup-container: 弹窗容器（全屏遮罩，带毛玻璃效果）
   * - .auth-popup-container-content: 弹窗内容区域（居中显示，宽度420px）
   * - .auth-popup-container-content-title: 标题样式（24px加粗）
   * - .auth-popup-container-content-description: 描述文本样式（16px灰色）
   * - .auth-popup-container-content-checkbox: 复选框区域样式
   * - .auth-popup-container-content-action: 操作按钮容器（弹性布局）
   * - .auth-popup-container-content-action-btn: 圆形操作按钮（60x60px）
   * - .auth-popup-container-content-action-prev: 上一步按钮样式
   * - .auth-popup-container-content-action-next: 下一步按钮样式
   */
  interface CSSModule {
    /** 模块唯一标识符 */
    id: string | number;
    
    /**
     * 推送CSS内容到样式表
     * @param styleEntry - 包含模块ID和CSS内容的元组
     */
    push(styleEntry: [string | number, string]): void;
  }

  /**
   * CSS加载器API函数
   * @param sourceMap - 是否生成源映射
   * @returns CSS模块实例
   */
  type CSSLoaderAPI = (sourceMap: boolean) => CSSModule;

  /**
   * 模块导出函数
   * @param exports - 当前模块的导出对象
   * @param require - 模块加载函数
   * @param moduleId - 当前模块ID (364680)
   */
  export default function(
    exports: { exports?: CSSModule },
    cssLoaderApi: CSSLoaderAPI,
    moduleId: number
  ): void;
}

/**
 * 样式类名定义
 */
declare module 'module_364680/styles' {
  /** 认证弹窗容器类名 - 全屏遮罩层，z-index: 20000 */
  export const authPopupContainer: string;
  
  /** 认证弹窗内容区域类名 - 420px宽，垂直水平居中 */
  export const authPopupContainerContent: string;
  
  /** 认证弹窗标题类名 - 24px加粗字体 */
  export const authPopupContainerContentTitle: string;
  
  /** 认证弹窗描述文本类名 - 16px灰色文本 */
  export const authPopupContainerContentDescription: string;
  
  /** 复选框容器类名 */
  export const authPopupContainerContentCheckbox: string;
  
  /** 操作按钮容器类名 - 弹性布局 */
  export const authPopupContainerContentAction: string;
  
  /** 操作按钮类名 - 60x60px圆形按钮，悬停时变蓝色 */
  export const authPopupContainerContentActionBtn: string;
  
  /** 按钮文本标签类名 */
  export const authPopupContainerContentActionBtnText: string;
  
  /** 上一步按钮类名 - 浅灰色背景 */
  export const authPopupContainerContentActionPrev: string;
  
  /** 下一步按钮类名 - 深色背景，左边距46px */
  export const authPopupContainerContentActionNext: string;
}