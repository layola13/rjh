/**
 * 工具栏项数据接口
 */
interface ToolbarItemData {
  /** 显示顺序 */
  order: number;
  /** 所属工具栏名称 */
  toolbar: string;
  /** 项目路径 */
  path: string;
}

/**
 * 工具栏项接口
 */
interface ToolbarItem {
  /** 项目数据 */
  data: ToolbarItemData;
  /** 项目名称 */
  name: string;
  /** 父级项目 */
  parent: ToolbarItem | null;
  /** 子项目列表 */
  childItems?: ToolbarItem[];
  
  /**
   * 获取项目的完整路径
   * @returns 路径字符串
   */
  getPath(): string;
}

/**
 * 工具栏根节点接口
 */
interface ToolbarRoot {
  /** 获取所有子项目 */
  childItems: ToolbarItem[];
}

/**
 * 基础工具栏接口
 */
interface BaseToolbar {
  /** 工具栏名称 */
  name: string;
  /** 路径字典 */
  pathDictionary: Record<string, unknown>;
  /** 项目添加信号 */
  signalItemAdded: unknown;
  /** 项目移除信号 */
  signalItemRemoved: unknown;
  
  /**
   * 获取工具栏根节点
   * @returns 根节点对象
   */
  getRoot(): ToolbarRoot;
}

/**
 * 信号事件数据 - 项目添加
 */
interface ItemAddedEventData {
  /** 被添加的项目 */
  addedItem: ToolbarItem;
}

/**
 * 信号事件数据 - 项目移除
 */
interface ItemRemovedEventData {
  /** 被移除的项目 */
  removedItem: ToolbarItem;
  /** 所在文件夹 */
  folder: ToolbarItem;
}

/**
 * 信号事件接口
 */
interface SignalEvent<T> {
  /** 事件数据 */
  data: T;
}

/**
 * 链接工具栏配置选项
 */
interface LinkedToolbarOptions {
  /** 需要添加的项目列表,格式为 [路径, 父路径] 的二元组数组 */
  addItems?: Array<[string, string]>;
  /** 需要排除的项目路径列表 */
  excludeItems?: string[];
  /** 需要包含的项目路径列表 */
  includeItems?: string[];
  /** 是否在默认环境中 */
  isInDefaultEnv?: boolean;
}

/**
 * 链接工具栏类
 * 
 * 用于创建一个基于基础工具栏的链接工具栏,支持项目过滤、添加和同步更新
 */
declare class LinkedToolbar {
  /** 基础工具栏引用 */
  private _base: BaseToolbar;
  
  /** 路径字典 */
  pathDictionary: Record<string, unknown>;
  
  /** 排除的项目路径列表 */
  private _excludeItems?: string[];
  
  /** 包含的项目路径列表 */
  private _includeItems?: string[];
  
  /** 信号钩子,用于监听基础工具栏的变化 */
  private _signalHook: HSCore.Util.SignalHook;

  /**
   * 创建链接工具栏实例
   * 
   * @param element - DOM元素或元素标识
   * @param baseToolbar - 基础工具栏实例
   * @param param2 - 第三个参数(具体类型未知)
   * @param param3 - 第四个参数(具体类型未知)
   * @param options - 配置选项
   */
  constructor(
    element: unknown,
    baseToolbar: BaseToolbar,
    param2: unknown,
    param3: unknown,
    options: LinkedToolbarOptions
  );

  /**
   * 添加工具栏项目
   * 
   * @param itemData - 项目数据或路径
   * @param parentPath - 父级路径
   */
  addItem(itemData: ToolbarItemData | string, parentPath?: string): void;

  /**
   * 移除工具栏项目
   * 
   * @param itemPath - 项目路径
   */
  removeItem(itemPath: string): void;

  /**
   * 处理基础工具栏项目添加事件
   * 
   * @param event - 项目添加事件
   */
  private _onBaseItemAdded(event: SignalEvent<ItemAddedEventData>): void;

  /**
   * 处理基础工具栏项目移除事件
   * 
   * @param event - 项目移除事件
   */
  private _onBaseItemRemoved(event: SignalEvent<ItemRemovedEventData>): void;

  /**
   * 检查基础工具栏项目是否被排除
   * 
   * @param itemPath - 项目路径
   * @returns 如果项目被排除返回true,否则返回false
   */
  private _isBaseItemExcluded(itemPath: string): boolean;

  /**
   * 检查并添加链接项目
   * 
   * 如果项目未被排除,则添加该项目及其所有子项目到链接工具栏
   * 
   * @param item - 工具栏项目
   */
  private _checkAndAddLinkedItem(item: ToolbarItem): void;
}

/**
 * HSCore工具类命名空间
 */
declare namespace HSCore {
  namespace Util {
    /**
     * 信号钩子类
     * 
     * 用于监听和管理信号事件
     */
    class SignalHook {
      /**
       * 创建信号钩子实例
       * 
       * @param context - 上下文对象
       */
      constructor(context: unknown);

      /**
       * 监听信号
       * 
       * @param signal - 信号源
       * @param handler - 事件处理函数
       * @returns 当前实例,支持链式调用
       */
      listen(signal: unknown, handler: Function): this;
    }
  }
}

export default LinkedToolbar;