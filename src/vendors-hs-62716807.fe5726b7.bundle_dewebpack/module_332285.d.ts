/**
 * Ant Design CSS样式类型声明文件
 * 该模块导出Ant Design组件库的全局CSS样式
 * @module AntDesignStyles
 */

/**
 * CSS模块导出接口
 * 包含Ant Design的基础样式、动画效果和组件样式
 */
declare module 'antd-global-styles' {
  /**
   * 导出的CSS样式内容
   * 包含以下主要部分：
   * - 全局重置样式（CSS Reset）
   * - Ant Design组件基础样式
   * - 过渡动画效果（fade, move, slide, zoom等）
   * - 交互反馈样式（点击波纹效果等）
   */
  const styles: string;
  export default styles;
}

/**
 * CSS类名空间
 * 定义Ant Design使用的CSS类名
 */
declare namespace AntDesignStyles {
  /**
   * 动画类型枚举
   */
  export type AnimationType = 
    | 'fade' 
    | 'move-up' 
    | 'move-down' 
    | 'move-left' 
    | 'move-right'
    | 'slide-up' 
    | 'slide-down' 
    | 'slide-left' 
    | 'slide-right'
    | 'zoom' 
    | 'zoom-big' 
    | 'zoom-big-fast' 
    | 'zoom-up' 
    | 'zoom-down' 
    | 'zoom-left' 
    | 'zoom-right';

  /**
   * 动画状态
   */
  export type AnimationState = 'enter' | 'appear' | 'leave' | 'enter-active' | 'appear-active' | 'leave-active';

  /**
   * CSS自定义属性（CSS Variables）
   */
  export interface CSSCustomProperties {
    /** Ant Design波纹阴影颜色 */
    '--antd-wave-shadow-color': string;
    /** 滚动条宽度 */
    '--scroll-bar': number;
  }

  /**
   * 全局样式类名
   */
  export interface GlobalClassNames {
    /** 图标基础类 */
    anticon: string;
    /** 旋转动画类 */
    'anticon-spin': string;
    /** 清除浮动类 */
    clearfix: string;
    /** 点击动画类 */
    'ant-click-animating-node': string;
    /** 折叠动画类 */
    'ant-motion-collapse': string;
    /** 折叠动画类（旧版） */
    'ant-motion-collapse-legacy': string;
    /** 折叠动画激活状态类 */
    'ant-motion-collapse-legacy-active': string;
  }

  /**
   * 动画类名生成器
   * @param type - 动画类型
   * @param state - 动画状态
   * @returns 完整的CSS类名
   */
  export function getAnimationClassName(type: AnimationType, state: AnimationState): string;

  /**
   * 关键帧动画名称
   */
  export type KeyframeAnimation =
    | 'antFadeIn'
    | 'antFadeOut'
    | 'antMoveUpIn'
    | 'antMoveUpOut'
    | 'antMoveDownIn'
    | 'antMoveDownOut'
    | 'antMoveLeftIn'
    | 'antMoveLeftOut'
    | 'antMoveRightIn'
    | 'antMoveRightOut'
    | 'antSlideUpIn'
    | 'antSlideUpOut'
    | 'antSlideDownIn'
    | 'antSlideDownOut'
    | 'antSlideLeftIn'
    | 'antSlideLeftOut'
    | 'antSlideRightIn'
    | 'antSlideRightOut'
    | 'antZoomIn'
    | 'antZoomOut'
    | 'antZoomBigIn'
    | 'antZoomBigOut'
    | 'antZoomUpIn'
    | 'antZoomUpOut'
    | 'antZoomDownIn'
    | 'antZoomDownOut'
    | 'antZoomLeftIn'
    | 'antZoomLeftOut'
    | 'antZoomRightIn'
    | 'antZoomRightOut'
    | 'loadingCircle'
    | 'waveEffect'
    | 'fadeEffect';

  /**
   * 动画时长配置（毫秒）
   */
  export const ANIMATION_DURATION: {
    /** 标准动画时长 */
    readonly STANDARD: 200;
    /** 快速动画时长 */
    readonly FAST: 100;
    /** 波纹效果时长 */
    readonly WAVE: 400;
    /** 淡出效果时长 */
    readonly FADE: 2000;
  };

  /**
   * 缓动函数（贝塞尔曲线）
   */
  export const EASING_FUNCTIONS: {
    /** 标准缓动 */
    readonly STANDARD: 'cubic-bezier(0.645, 0.045, 0.355, 1)';
    /** 进入缓动 */
    readonly EASE_IN: 'cubic-bezier(0.08, 0.82, 0.17, 1)';
    /** 退出缓动 */
    readonly EASE_OUT: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)';
    /** 平滑缓动 */
    readonly SMOOTH: 'cubic-bezier(0.23, 1, 0.32, 1)';
    /** 急速缓动 */
    readonly SHARP: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';
  };
}

export = AntDesignStyles;
export as namespace AntDesignStyles;