/**
 * 右键菜单管理器
 * 负责在编辑器中显示和管理上下文菜单
 */

/**
 * 菜单位置坐标
 */
export interface MenuPosition {
  /** 横坐标（像素） */
  x: number;
  /** 纵坐标（像素） */
  y: number;
}

/**
 * 属性栏控制类型枚举
 */
export enum PropertyBarControlTypeEnum {
  /** 分隔线 */
  divider = 'divider'
}

/**
 * 右键菜单项配置
 */
export interface RightMenuItem {
  /** 菜单项类型 */
  type: PropertyBarControlTypeEnum | string;
  /** 是否禁用 */
  disable?: boolean;
  /** 是否保留（即使被禁用） */
  keep?: boolean;
  /** 显示顺序 */
  order?: number;
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * 信号钩子接口
 */
export interface SignalHook {
  /** 取消所有监听 */
  unlistenAll(): void;
}

/**
 * 信号接口
 */
export interface Signal<T = unknown> {
  /** 分发信号 */
  dispatch(data?: T): void;
}

/**
 * 最小工具栏数据
 */
export interface MinBarData {
  /** CSS选择器 */
  selector: string;
}

/**
 * 初始化信号集合
 */
export interface RightMenuSignals {
  /** 填充最小工具栏信号 */
  signalPopulateMinBar: Signal<MinBarData>;
  /** 填充自定义菜单项信号 */
  signalPopulateCustomizedItems: Signal;
  /** 菜单项点击事件追踪信号 */
  signalItemClickEventTrack: Signal;
}

/**
 * 右键菜单管理器类
 * 提供右键菜单的显示、隐藏、过滤等核心功能
 */
export default class RightMenuManager {
  /** 是否显示右键菜单 */
  private _showRightMenu: boolean;
  
  /** 信号钩子实例 */
  private _signalHook: SignalHook;
  
  /** 是否为柜体应用模式 */
  private _cabinetApp: boolean;
  
  /** 是否禁用右键菜单 */
  private _isDisableRightmenu: boolean;
  
  /** 是否启用菜单 */
  private enableMenu: boolean;
  
  /** 填充最小工具栏信号 */
  private signalPopulateMinBar: Signal<MinBarData>;
  
  /** 填充自定义菜单项信号 */
  private signalPopulateCustomizedItems: Signal;
  
  /** 菜单项点击事件追踪信号 */
  private signalItemClickEventTrack: Signal;

  /**
   * 初始化右键菜单管理器
   * @param e - 第一个参数（未使用）
   * @param t - 第二个参数（未使用）
   * @param signals - 信号集合
   */
  init(e: unknown, t: unknown, signals: RightMenuSignals): void;

  /**
   * 文档点击事件处理
   * 用于检测点击是否在菜单外部，以关闭菜单
   * @param event - 鼠标事件
   */
  documentClicked(event: MouseEvent): void;

  /**
   * 反初始化，清理资源
   */
  uninit(): void;

  /**
   * 菜单项点击事件追踪
   * 分发点击事件信号
   */
  onItemClickEventTrack(): void;

  /**
   * 渲染菜单
   * @param position - 菜单显示位置
   * @param items - 菜单项数据
   * @param forceUnmount - 是否强制卸载已有组件，默认false
   */
  renderMenu(position: MenuPosition, items: RightMenuItem[], forceUnmount?: boolean): void;

  /**
   * 自动调整菜单位置以适应屏幕
   * 防止菜单溢出视口边界
   * @param position - 初始位置
   * @param items - 菜单项数据
   * @param menuElement - 菜单DOM元素
   */
  autoFitMenu(position: MenuPosition, items: RightMenuItem[], menuElement: HTMLElement): void;

  /**
   * 过滤并排序菜单项
   * 移除被禁用且不需要保留的项，并按order字段排序
   * @param items - 原始菜单项数组
   * @returns 过滤排序后的菜单项数组
   */
  filterSortItems(items: RightMenuItem[]): RightMenuItem[];

  /**
   * 过滤重复的菜单项
   * 特别处理连续的分隔线和首尾的分隔线
   * @param items - 菜单项数组
   * @returns 去重后的菜单项数组
   */
  filterRepetitiveItems(items: RightMenuItem[]): RightMenuItem[];

  /**
   * 初始化菜单数据
   * @param signal - 自定义菜单项信号
   * @returns 菜单项数组
   */
  initData(signal: Signal): RightMenuItem[];

  /**
   * 显示右键菜单栏
   * @param position - 显示位置
   * @param items - 菜单项数据，可选（未提供时会自动初始化）
   * @param forceUnmount - 是否强制卸载，默认false
   */
  showRightMenuBar(position: MenuPosition, items?: RightMenuItem[], forceUnmount?: boolean): void;

  /**
   * 显示右键菜单（启用柜体应用模式）
   */
  showRightMenu(): void;

  /**
   * 禁用右键菜单
   */
  disableRightmenu(): void;

  /**
   * 启用右键菜单
   */
  enableRightmenu(): void;

  /**
   * 检查右键菜单是否正在显示
   * @returns 是否显示中
   */
  isRightMenuShowed(): boolean;

  /**
   * 隐藏右键菜单
   */
  hideRightMenu(): void;

  /**
   * ESC键隐藏右键菜单
   * @param event - 键盘事件
   */
  escHideRightMenu(event: KeyboardEvent | JQuery.Event): void;

  /**
   * 设置右键菜单状态映射表
   * @param statusMap - 状态映射对象
   */
  setRightMenuStatusMap(statusMap: Record<string, unknown>): void;

  /**
   * 设置右键菜单启用状态
   * @param enabled - 是否启用
   */
  setRightMenuStatus(enabled: boolean): void;
}