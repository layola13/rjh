/**
 * 渲染图像检查引导步骤模块
 * 用于新手引导流程中检查渲染图像的步骤定义
 */

/**
 * 引导步骤的回调函数类型
 */
type GuideCallback = (() => void) | undefined;

/**
 * 工具提示的位置类型
 */
type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

/**
 * 目标元素的偏移配置
 */
interface TargetDiff {
  /** 左侧偏移量（像素） */
  left: number;
  /** 右侧偏移量（像素） */
  right: number;
  /** 顶部偏移量（像素） */
  top: number;
  /** 底部偏移量（像素） */
  bottom: number;
}

/**
 * 工具提示信息配置
 */
interface TooltipInfo {
  /** 工具提示的标题文本 */
  title: string;
}

/**
 * 引导步骤提示配置
 */
interface GuideTipConfig {
  /** 目标元素的CSS选择器 */
  target: string;
  /** 目标元素的边界偏移配置 */
  targetDiff: TargetDiff;
  /** 是否允许点击目标元素 */
  targetEnableClick: boolean;
  /** 是否监听目标元素变化 */
  listenTargetChange: boolean;
  /** 提示类型 */
  type: 'tooltip' | 'modal' | 'popover';
  /** 工具提示的显示位置 */
  tooltipPlacement: TooltipPlacement;
  /** 工具提示的详细信息 */
  tooltipInfo: TooltipInfo;
}

/**
 * 引导步骤定义接口
 */
interface GuideStep {
  /** 步骤的唯一标识符 */
  id: string;
  
  /**
   * 步骤执行前的准备函数
   * @param callback - 完成后的回调函数
   * @returns Promise，resolve 为 true 表示准备完成
   */
  pre(callback: GuideCallback): Promise<boolean>;
  
  /**
   * 执行下一步的函数
   * @returns Promise，resolve 为 true 表示执行成功
   */
  next(): Promise<boolean>;
  
  /**
   * 获取步骤的提示配置
   * @returns 引导提示配置对象
   */
  tip(): GuideTipConfig;
}

/**
 * 准备渲染图像检查界面
 * - 禁用全局快捷键
 * - 调整相关DOM元素的z-index和样式
 * - 设置事件监听器
 * @param callback - 完成后的回调函数
 */
declare function setupRenderImageCheck(callback?: GuideCallback): void;

/**
 * 清理渲染图像检查界面
 * - 恢复全局快捷键
 * - 重置DOM元素样式
 * - 移除事件监听器
 */
declare function cleanupRenderImageCheck(): void;

/**
 * 延迟执行的辅助函数
 * @param delay - 延迟时间（毫秒），默认3000ms
 * @returns Promise，在指定时间后resolve为true
 */
declare function wait(delay?: number): Promise<boolean>;

/**
 * 渲染图像检查引导步骤
 * 该步骤用于引导用户查看渲染结果图像
 */
declare const checkRenderImageStep: GuideStep;

export default checkRenderImageStep;

/**
 * 全局资源管理器接口
 */
declare global {
  /**
   * 资源管理器，用于获取国际化字符串
   */
  const ResourceManager: {
    /**
     * 获取国际化字符串
     * @param key - 资源键名
     * @returns 对应的本地化字符串
     */
    getString(key: string): string;
  };
}