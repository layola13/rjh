/**
 * CSS 模块导出的类型定义
 * 该模块导出新手引导相关的 CSS 样式
 */

/**
 * CSS 类名映射接口
 * 定义所有可用的 CSS 类名及其对应的字符串值
 */
export interface GuideCSSClasses {
  /** 启用操作交互的类名 */
  enableoperate: string;
  
  /** 引导加载遮罩容器的类名 */
  guideloadingWrapper: string;
  
  /** 引导加载动画的类名 */
  guideloading: string;
  
  /** 引导主容器的类名 */
  guideWrapper: string;
  
  /** 分数提示框的类名 */
  scoreTip: string;
  
  /** 引导构建块-顶部区域的类名 */
  'guide-build-block-top': string;
  
  /** 引导构建块-中间区域的类名 */
  'guide-build-block-middle': string;
  
  /** 引导构建块-中间左侧区域的类名 */
  'guide-build-block-middle-left': string;
  
  /** 引导构建块-中间中心区域的类名 */
  'guide-build-block-middle-center': string;
  
  /** 渲染前遮罩的类名 */
  'mask-before-render': string;
  
  /** 引导构建块-中间右侧区域的类名 */
  'guide-build-block-middle-right': string;
  
  /** 引导构建块-底部区域的类名 */
  'guide-build-block-bottom': string;
  
  /** 引导工具栏遮罩的类名 */
  guideToolbarMask: string;
  
  /** 引导遮罩的类名 */
  guideMask: string;
  
  /** 引导遮罩组的类名 */
  guideMasks: string;
  
  /** 左侧遮罩的类名 */
  leftMask: string;
  
  /** 右侧遮罩的类名 */
  rightMask: string;
  
  /** 顶部遮罩的类名 */
  topMask: string;
  
  /** 底部遮罩的类名 */
  bottomMask: string;
  
  /** 边框的类名 */
  border: string;
  
  /** 双层工具栏引导遮罩组的类名 */
  guideMasks_twoleveltoolbar: string;
  
  /** 简介窗口 V2 版本的类名 */
  'brief-Introduction-v2-window': string;
  
  /** 内容容器的类名 */
  contentsWrapper: string;
}

/**
 * CSS 模块默认导出
 * 包含所有 CSS 类名的映射对象
 */
declare const styles: GuideCSSClasses;

export default styles;