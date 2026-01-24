/**
 * 工具栏项数据配置接口
 * 定义工具栏项的视觉和行为属性
 */
interface ToolbarItemData {
  /** 排序顺序，数值越小越靠前，默认为1000 */
  order: number;
  
  /** 是否可见 */
  visible: boolean;
  
  /** 是否启用（可交互） */
  enable: boolean;
  
  /** 徽章配置，用于显示通知标识 */
  badge?: Record<string, unknown>;
  
  /** 数量计数 */
  count?: number;
  
  /** 关联的命令标识 */
  command?: string;
  
  /** 快捷键配置 */
  hotkey?: string;
  
  /** 工具栏项标签文本 */
  label?: string;
  
  /** 工具栏项类型（如"checkbox"） */
  type?: 'checkbox' | string;
  
  /** 复选框类型的选中状态 */
  isChecked?: boolean;
  
  /** 按钮是否处于按下状态 */
  isPressed?: boolean;
  
  /** 是否显示圆点提示 */
  hasDot?: boolean;
  
  /** 用户行为日志分组标识 */
  logGroup?: string;
}

/**
 * 用户追踪日志事件参数
 * 用于记录用户交互行为
 */
interface UserTrackLogEvent {
  /** 事件描述 */
  description: string;
  
  /** 活动区域标识 */
  activeSection: string;
  
  /** 分组名称 */
  group: string;
  
  /** 点击率统计信息 */
  clicksRatio: {
    /** 项目唯一标识 */
    id: string;
    /** 项目显示名称 */
    name?: string;
  };
  
  /** 是否累积时间统计 */
  isCumulatingTime: boolean;
  
  /** 额外参数信息 */
  argInfo?: {
    /** 复选框选中状态 */
    isChecked?: boolean;
  };
}

/**
 * 信号（事件发射器）接口
 * 用于发布-订阅模式的事件通知
 */
interface Signal<T> {
  /** 派发事件给所有订阅者 */
  dispatch(data: T): void;
}

/**
 * 工具栏项父节点接口
 * 用于构建树形结构
 */
interface ToolbarItemParent {
  /** 获取父节点路径 */
  getPath(): string;
}

/**
 * 用户追踪日志记录器接口
 */
interface UserTrackLogger {
  /** 推送用户行为事件 */
  push(eventName: string, eventData: UserTrackLogEvent): void;
}

/**
 * 应用程序全局对象接口
 */
interface AppInstance {
  /** 用户行为追踪日志记录器 */
  userTrackLogger: UserTrackLogger;
}

/**
 * 工具栏项类
 * 表示工具栏中的单个可交互项（按钮、复选框等）
 * 支持层级结构、状态管理和用户行为追踪
 */
declare class ToolbarItem {
  /** 工具栏项名称（唯一标识） */
  readonly name: string;
  
  /** 数据变更信号，当状态改变时触发 */
  readonly signalChanged: Signal<ToolbarItemData>;
  
  /** 父节点引用，用于构建树形结构 */
  parent?: ToolbarItemParent;
  
  /** 工具栏项的数据配置 */
  data: ToolbarItemData;
  
  /**
   * 创建工具栏项实例
   * @param name - 工具栏项唯一名称
   * @param changeCallback - 可选的数据变更回调函数
   */
  constructor(name: string, changeCallback?: (data: ToolbarItemData) => void);
  
  /**
   * 更新工具栏项数据
   * @param newData - 要合并的新数据（部分更新）
   */
  setData(newData: Partial<ToolbarItemData>): void;
  
  /**
   * 禁用工具栏项（使其不可交互）
   */
  disable(): void;
  
  /**
   * 启用工具栏项（使其可交互）
   */
  enable(): void;
  
  /**
   * 检查工具栏项是否已启用
   * @returns 如果启用返回true，否则返回false
   */
  isEnabled(): boolean;
  
  /**
   * 显示工具栏项
   */
  show(): void;
  
  /**
   * 隐藏工具栏项
   */
  hide(): void;
  
  /**
   * 添加徽章（通知标识）
   * @param badgeConfig - 徽章配置对象
   */
  addBadge(badgeConfig: Record<string, unknown>): void;
  
  /**
   * 移除徽章
   */
  removeBadge(): void;
  
  /**
   * 添加圆点提示标记
   */
  addDot(): void;
  
  /**
   * 移除圆点提示标记
   */
  removeDot(): void;
  
  /**
   * 获取工具栏项的路径
   * @returns 从根节点到当前项的路径（用"/"分隔）
   */
  getPath(): string;
  
  /**
   * 获取完整路径（包含父节点）
   * @returns 完整路径字符串
   */
  getFullPath(): string;
  
  /**
   * 检查工具栏项是否处于按下状态
   * @returns 如果按下返回true，否则返回false
   */
  isPressed(): boolean;
  
  /**
   * 触发点击事件
   * 执行用户行为追踪日志记录
   */
  click(): void;
}

/**
 * 全局HSCore工具类命名空间
 */
declare namespace HSCore {
  namespace Util {
    class Signal<T> {
      constructor(context: unknown);
      dispatch(data: T): void;
    }
  }
}

/**
 * 全局HSApp应用程序命名空间
 */
declare namespace HSApp {
  namespace App {
    function getApp(): AppInstance;
  }
}

export default ToolbarItem;