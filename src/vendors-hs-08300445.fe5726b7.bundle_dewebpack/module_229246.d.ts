/**
 * ScrollLocker - 滚动锁定管理器
 * 用于锁定和解锁容器的滚动行为，常用于模态框、抽屉等组件
 */

/**
 * 滚动锁定选项配置
 */
export interface ScrollLockOptions {
  /**
   * 目标容器元素
   * @default document.body
   */
  container?: HTMLElement;
}

/**
 * 锁定目标信息
 */
interface LockTarget {
  /** 锁定目标的唯一标识符 */
  target: number;
  /** 锁定配置选项 */
  options?: ScrollLockOptions;
}

/**
 * 滚动锁定管理类
 * 支持多个实例同时锁定，采用引用计数机制
 */
export default class ScrollLocker {
  /**
   * 当前实例的锁定目标标识
   */
  private lockTarget: number;

  /**
   * 当前实例的配置选项
   */
  private options?: ScrollLockOptions;

  /**
   * 创建滚动锁定实例
   * @param options - 滚动锁定配置选项
   */
  constructor(options?: ScrollLockOptions);

  /**
   * 获取锁定容器元素
   * @returns 容器元素或 undefined
   */
  getContainer(): HTMLElement | undefined;

  /**
   * 重新锁定并更新配置
   * 如果当前已锁定，会先解锁再用新配置重新锁定
   * @param options - 新的配置选项
   */
  reLock(options: ScrollLockOptions): void;

  /**
   * 锁定滚动
   * - 计算滚动条宽度并调整容器宽度以防止布局偏移
   * - 添加 overflow: hidden 样式
   * - 添加 CSS 类标识
   */
  lock(): void;

  /**
   * 解锁滚动
   * - 移除锁定样式
   * - 恢复原始 CSS 类名
   * - 清理相关状态
   */
  unLock(): void;
}

/**
 * 滚动锁定效果的 CSS 类名
 */
declare const SCROLL_LOCK_CLASS: "ant-scrolling-effect";

/**
 * 全局锁定计数器
 */
declare let lockCounter: number;

/**
 * 全局锁定目标列表
 */
declare let lockTargets: LockTarget[];

/**
 * 容器样式缓存 Map
 * 用于保存和恢复容器的原始样式
 */
declare const styleCache: Map<HTMLElement, any>;