/**
 * 左侧菜单数据构建器
 * 负责根据选中实体和应用状态动态生成左侧菜单项
 */

/**
 * 菜单项配置接口
 */
export interface LeftMenuItem {
  /** 菜单项唯一标识符 */
  id: string;
  /** 菜单项显示文本（支持国际化key） */
  label: string;
  /** 是否禁用 */
  disable?: boolean;
  /** 快捷键配置 */
  hotkey?: string;
  /** 是否注册快捷键 */
  registerHotkey?: boolean;
  /** 点击回调函数 */
  onClick?: () => void;
  /** UI模式限制 */
  uiMode?: string[];
  /** 权益金额获取方法（特定菜单项） */
  getBenefitAmount?: () => number | undefined;
  /** 显示市场弹窗方法（特定菜单项） */
  showMarketModal?: () => void;
}

/**
 * 菜单策略接口
 * 用于根据不同场景动态生成菜单项
 */
export interface MenuStrategy {
  /** 策略名称 */
  name: string;
  /** 策略优先级（数值越小优先级越高） */
  order: number;
  /** 判断策略是否适用于当前选中实体 */
  isApplied: (entities: unknown[]) => boolean;
  /** 获取该策略对应的菜单项 */
  getItems: (context: MenuContext) => LeftMenuItem[];
}

/**
 * 菜单生成上下文
 */
export interface MenuContext {
  /** 当前选中的实体列表 */
  entities: unknown[];
  /** 应用实例 */
  app: unknown;
  /** 是否为3D视图 */
  is3D: boolean;
}

/**
 * 菜单项分组结果
 */
export interface MenuItemsResult {
  /** 默认菜单项 */
  defaultItems: LeftMenuItem[];
  /** 自定义菜单项 */
  customizedItems: LeftMenuItem[];
  /** 鼠标位置（可选） */
  mousePos?: unknown;
}

/**
 * 数据构建器类
 * 单例模式，负责管理左侧菜单的动态生成、快捷键注册和策略管理
 */
export declare class DataBuilder {
  /** 单例实例 */
  private static _instance?: DataBuilder;

  /** 菜单策略列表 */
  private strategies: MenuStrategy[];

  /** 快捷键映射表 */
  private hotkeyMap: Map<string, LeftMenuItem>;

  /**
   * 私有构造函数（单例模式）
   */
  private constructor();

  /**
   * 获取单例实例
   * @returns DataBuilder实例
   */
  static getInstance(): DataBuilder;

  /**
   * 获取左侧菜单项
   * @param dispatch - 分发器对象
   * @param mousePos - 鼠标位置
   * @returns 过滤和处理后的菜单项列表
   */
  getLeftMenuItem(dispatch: { dispatch: (data: MenuItemsResult) => void }, mousePos?: unknown): LeftMenuItem[];

  /**
   * 更新特定菜单项的权益相关方法
   * 为"walldecorationAdvanced"菜单项注入插件提供的权益方法
   * @param items - 菜单项列表
   */
  private updateItemBenefit(items: LeftMenuItem[]): void;

  /**
   * 注册菜单项的快捷键
   * @param items - 需要注册快捷键的菜单项列表
   */
  private registerHotKey(items: LeftMenuItem[]): void;

  /**
   * 注销所有已注册的快捷键
   */
  private unRegisterHotKey(): void;

  /**
   * 注册自定义菜单策略
   * @param strategy - 要注册的策略对象
   * @returns 更新后的策略列表
   */
  registerStrategy(strategy: MenuStrategy): MenuStrategy[];

  /**
   * 注销指定的菜单策略
   * @param strategy - 要注销的策略对象
   * @returns 更新后的策略列表
   */
  unregisterStrategy(strategy: MenuStrategy): MenuStrategy[];

  /**
   * 对策略列表按优先级排序
   * @returns 排序后的策略列表
   */
  private sortStrategy(): MenuStrategy[];

  /**
   * 获取当前场景下的所有菜单项（分组）
   * @returns 分组后的菜单项结果
   */
  private getItems(): MenuItemsResult;

  /**
   * 应用匹配的策略生成菜单项
   * @param context - 菜单生成上下文
   * @returns 生成的菜单项列表
   */
  private applyStrategies(context: MenuContext): LeftMenuItem[];
}