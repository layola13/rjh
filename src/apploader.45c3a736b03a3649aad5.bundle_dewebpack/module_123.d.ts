/**
 * CSS样式模块 - 内部网络检测提示框样式
 * @module InternalNetworkCheckStyles
 */

/**
 * CSS模块导出接口
 */
export interface CSSModule {
  /** CSS模块唯一标识 */
  id: string;
  /** CSS内容字符串 */
  toString(): string;
  /** 源映射标识 */
  i?(modules: CSSModule[], mediaQuery?: string): void;
}

/**
 * 内部网络检测提示框的CSS样式定义
 * 
 * 包含以下主要样式：
 * - `.wrapper_check_internal_network_box`: 固定定位的容器，居中显示
 * - `.message_content`: 消息内容容器，橙色背景，圆角设计
 * - `.animation`: 闪烁动画效果
 * - `.fix_tips`: 固定提示框，带滚动和缩小动画
 * 
 * @remarks
 * 该模块定义了内部网络检测提示框的完整样式，包括：
 * - 固定定位和层级控制 (z-index: 10000000)
 * - 响应式布局和Flexbox对齐
 * - 动画效果（闪烁、滚动、缩放）
 * - 交互状态（hover效果）
 * - 阴影和视觉层次
 */
declare const styles: CSSModule;

export default styles;

/**
 * 样式类名常量定义
 */
export declare const StyleClasses: {
  /** 主容器类名 - 固定定位的检测提示框容器 */
  readonly WRAPPER: 'wrapper_check_internal_network_box';
  
  /** 消息内容类名 - 包含提示信息的内容区域 */
  readonly MESSAGE_CONTENT: 'message_content';
  
  /** 提示文本类名 - 具体的提示文字样式 */
  readonly MESSAGE_TIP: 'msg_content_tip';
  
  /** 动画类名 - 闪烁动画效果 */
  readonly ANIMATION: 'animation';
  
  /** 固定提示类名 - 带滚动动画的固定提示框 */
  readonly FIX_TIPS: 'fix_tips';
  
  /** 左侧按钮ID - 内部网络提示左侧操作按钮 */
  readonly LEFT_BUTTON: 'msg_content_internalnet_left';
  
  /** 右侧按钮ID - 内部网络提示右侧操作按钮 */
  readonly RIGHT_BUTTON: 'msg_content_internalnet_right';
};

/**
 * 动画配置常量
 */
export declare const AnimationConfig: {
  /** 闪烁动画持续时间（毫秒） */
  readonly TWINKLING_DURATION: 2100;
  
  /** 滚动动画持续时间（毫秒） */
  readonly ROLL_DURATION: 1000;
  
  /** 滚动动画迭代次数 */
  readonly ROLL_ITERATIONS: 5;
  
  /** 缩小动画延迟（毫秒） */
  readonly SMALL_DELAY: 5000;
};

/**
 * 布局配置常量
 */
export declare const LayoutConfig: {
  /** 主容器左边距（像素） */
  readonly WRAPPER_MARGIN_LEFT: -209;
  
  /** 固定提示框左边距（像素） */
  readonly FIX_TIPS_MARGIN_LEFT: -88;
  
  /** Z轴层级 */
  readonly Z_INDEX: 10000000;
  
  /** 最小高度（像素） */
  readonly MIN_HEIGHT: 42;
  
  /** 最小宽度（像素） */
  readonly MIN_WIDTH: 160;
  
  /** 边框圆角（像素） */
  readonly BORDER_RADIUS: 8;
};

/**
 * 颜色配置常量
 */
export declare const ColorConfig: {
  /** 主背景色（橙色） */
  readonly BACKGROUND: '#ff5300';
  
  /** 文字颜色（白色） */
  readonly TEXT_COLOR: '#ffffff';
  
  /** Hover状态背景色 */
  readonly HOVER_BACKGROUND: '#da6d38';
};