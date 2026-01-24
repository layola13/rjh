/**
 * 切换开关组件包装器
 * 提供React组件的DOM挂载和生命周期管理
 */

/**
 * 切换开关配置选项
 */
export interface ToggleSwitchOptions {
  /** 当前开关状态值 */
  value: boolean;
  /** 开关标签文本 */
  label?: string;
  /** 开启状态显示文本 */
  onLabel?: string;
  /** 关闭状态显示文本 */
  offLabel?: string;
  /** 值变化回调函数 */
  onValueChange?: (value: boolean) => void;
}

/**
 * 切换开关组件实例接口
 * @internal
 */
interface ToggleSwitchInstance {
  update(options: Partial<ToggleSwitchOptions>): void;
}

/**
 * 切换开关包装器类
 * 封装React组件的创建、更新和销毁逻辑
 */
export default class ToggleSwitchWrapper {
  /** DOM容器元素 */
  private readonly newDiv: HTMLDivElement;
  
  /** React组件实例 */
  private readonly instance: ToggleSwitchInstance;

  /**
   * 创建切换开关实例
   * @param options - 开关配置选项
   * @param container - 父容器DOM节点
   */
  constructor(options: ToggleSwitchOptions, container: HTMLElement);

  /**
   * 更新开关配置
   * @param options - 部分配置选项
   */
  update(options: Partial<ToggleSwitchOptions>): void;

  /**
   * 销毁组件并清理DOM
   */
  destroy(): void;

  /**
   * 销毁组件（已废弃）
   * @deprecated 请使用 destroy 方法替代
   */
  destory(): void;

  /**
   * 静态工厂方法创建实例
   * @param options - 开关配置选项
   * @param container - 父容器DOM节点
   * @returns 新的切换开关包装器实例
   */
  static create(options: ToggleSwitchOptions, container: HTMLElement): ToggleSwitchWrapper;
}