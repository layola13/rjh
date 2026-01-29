/**
 * ScrollLocker - 管理滚动锁定的类
 * 用于防止页面滚动，通常用于模态框、抽屉等组件打开时
 */

/**
 * 滚动锁定选项配置
 */
export interface ScrollLockOptions {
  /**
   * 滚动锁定的容器元素
   * @default document.body
   */
  container?: HTMLElement;
}

/**
 * 锁定记录项
 */
interface LockRecord {
  /** 锁定目标的唯一标识符 */
  target: number;
  /** 锁定配置选项 */
  options?: ScrollLockOptions;
}

/**
 * 样式缓存值
 */
interface StyleCache {
  width?: string;
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
}

/**
 * ScrollLocker 类
 * 管理页面或容器的滚动锁定状态，支持多个锁定实例
 */
export default class ScrollLocker {
  /**
   * 当前实例的唯一锁定目标标识符
   */
  private lockTarget: number;

  /**
   * 当前实例的锁定选项配置
   */
  private options?: ScrollLockOptions;

  /**
   * 构造函数
   * @param options - 滚动锁定配置选项
   */
  constructor(options?: ScrollLockOptions);

  /**
   * 获取锁定的容器元素
   * @returns 容器元素或 undefined
   */
  getContainer(): HTMLElement | undefined;

  /**
   * 重新锁定
   * 使用新的配置选项更新锁定状态
   * @param options - 新的滚动锁定配置选项
   */
  reLock(options?: ScrollLockOptions): void;

  /**
   * 锁定滚动
   * 阻止容器或页面的滚动行为
   */
  lock(): void;

  /**
   * 解锁滚动
   * 恢复容器或页面的滚动行为
   */
  unLock(): void;
}

/**
 * 滚动锁定效果的 CSS 类名
 */
declare const SCROLL_LOCK_CLASS: "ant-scrolling-effect";

/**
 * 全局锁定记录数组
 * 存储所有活跃的滚动锁定实例信息
 */
declare const lockRecords: LockRecord[];

/**
 * 样式缓存 Map
 * 键为容器元素，值为该元素的原始样式
 */
declare const styleCache: Map<HTMLElement, StyleCache>;

/**
 * 锁定目标计数器
 * 用于生成唯一的锁定标识符
 */
declare const lockTargetCounter: number;