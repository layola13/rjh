/**
 * 选择实体数据接口
 */
interface ISelectionData {
  /** 当前选择的实体列表 */
  selection: unknown[];
  /** 已选择的实体集合 */
  selectedEntities: HSCore.Model.Content[];
  /** 菜单项集合 */
  menuItems: IMenuItemCollection;
}

/**
 * 状态栏填充事件数据
 */
interface IPopulateStatusBarEvent {
  /** 事件携带的数据 */
  data: ISelectionData;
}

/**
 * 菜单项集合接口
 */
interface IMenuItemCollection {
  /**
   * 在指定位置插入菜单项集合
   * @param index - 插入位置索引
   * @param items - 要插入的菜单项数组
   */
  xInsertCollection(index: number, items: IStatusBarItem[]): void;
}

/**
 * 属性栏控件类型枚举
 */
declare enum PropertyBarControlTypeEnum {
  /** 图片按钮 */
  imageButton = 'imageButton',
  /** 分隔线 */
  divider = 'divider'
}

/**
 * 状态栏项目配置接口
 */
interface IStatusBarItem {
  /** 唯一标识符 */
  id?: string;
  /** 控件类型 */
  type: PropertyBarControlTypeEnum;
  /** 排序顺序 */
  order: number;
  /** 控件数据 */
  data?: IStatusBarItemData;
}

/**
 * 状态栏项目数据接口
 */
interface IStatusBarItemData {
  /** 图标路径 */
  src?: string;
  /** 工具提示文本 */
  tooltip?: string;
  /** 点击事件处理函数 */
  onclick?: () => void;
}

/**
 * 命令管理器接口
 */
interface ICommandManager {
  /** 当前活动的命令 */
  current: unknown | null;

  /**
   * 注册命令类型
   * @param commandTypes - 要注册的命令类型
   */
  register(...commandTypes: string[]): void;

  /**
   * 创建命令
   * @param commandType - 命令类型
   * @param args - 命令参数
   * @returns 创建的命令实例
   */
  createCommand(commandType: string, args?: unknown[]): ICommand;

  /**
   * 为实体集合创建命令
   * @param entities - 实体数组
   * @param commandType - 命令类型
   * @returns 创建的命令数组
   */
  createCommandsForEntities(entities: HSCore.Model.Content[], commandType: string): ICommand[];

  /**
   * 执行命令
   * @param command - 要执行的命令
   * @param autoComplete - 是否自动完成,默认true
   */
  execute(command: ICommand, autoComplete?: boolean): void;

  /**
   * 完成当前命令
   */
  complete(): void;

  /**
   * 取消当前命令
   */
  cancel(): void;
}

/**
 * 命令接口
 */
interface ICommand {
  /** 命令输出结果 */
  output?: unknown;
}

/**
 * 应用实例接口
 */
interface IApplication {
  /** 命令管理器 */
  cmdManager: ICommandManager;
  /** 选择管理器 */
  selectionManager: ISelectionManager;
}

/**
 * 选择管理器接口
 */
interface ISelectionManager {
  /**
   * 选择指定实体
   * @param entity - 要选择的实体
   */
  select(entity: unknown): void;
}

/**
 * 信号API对象接口
 */
interface ISignalAPIObject {
  /** 填充状态栏信号 */
  signalPopulateStatusBar: unknown;

  /**
   * 判断是否为Web环境显示状态栏项
   * @returns 是否显示
   */
  willShowStatusBarItemsForWeb(): boolean;
}

/**
 * 插件集合接口
 */
interface IPluginCollection {
  /** 目录插件 */
  [key: string]: unknown;
}

/**
 * 信号钩子类
 */
declare class SignalHook {
  /**
   * 构造函数
   * @param context - 上下文对象
   */
  constructor(context: unknown);

  /**
   * 监听信号
   * @param signal - 信号对象
   * @param handler - 处理函数
   */
  listen(signal: unknown, handler: (event: IPopulateStatusBarEvent) => void): void;

  /**
   * 取消所有监听
   */
  unlistenAll(): void;
}

/**
 * 上下文工具插件类
 * 提供内容编辑相关的上下文操作工具栏
 */
export default class ContextualToolsPlugin {
  /** 应用实例引用 */
  private _app: IApplication;

  /** 命令管理器引用 */
  private _cmdMgr: ICommandManager;

  /** 信号API对象引用 */
  private _signalAPIObject: ISignalAPIObject;

  /** 目录插件引用 */
  private _catalogPlugin: unknown;

  /** 信号钩子实例 */
  private _signalHook: SignalHook;

  /** 当前选中的实体列表 */
  private _entities: HSCore.Model.Content[];

  /** 是否显示翻转内容提示 */
  private showFlipContentTip?: boolean;

  /**
   * 初始化插件
   * @param app - 应用实例
   * @param signalAPIObject - 信号API对象
   * @param plugins - 插件集合
   */
  init_(app: IApplication, signalAPIObject: ISignalAPIObject, plugins: IPluginCollection): void;

  /**
   * 反初始化插件,清理资源
   */
  uninit_(): void;

  /**
   * 填充状态栏事件处理
   * @param event - 状态栏填充事件
   * @private
   */
  private _onPopulateStatusBar(event: IPopulateStatusBarEvent): void;

  /**
   * 初始化状态栏项目
   * @param entities - 实体列表
   * @returns 状态栏项目配置数组
   * @private
   */
  private _initStatusBarItems(entities: HSCore.Model.Content[]): IStatusBarItem[];

  /**
   * 复制按钮点击处理
   * @private
   */
  private _onDuplicateBtnClk(): void;

  /**
   * 隐藏按钮点击处理
   * @private
   */
  private _onHideBtnClk(): void;

  /**
   * 取消组合按钮点击处理
   * @private
   */
  private _onUngroupBtnClk(): void;

  /**
   * 组合按钮点击处理
   * @private
   */
  private _onGroupBtnClk(): void;

  /**
   * 删除按钮点击处理
   * @private
   */
  private _onDeleteBtnClk(): void;

  /**
   * 替换按钮点击处理
   * @private
   */
  private _onReplaceBtnClk(): void;

  /**
   * 翻转内容按钮点击处理
   * @private
   */
  private _onFlipContentBtnClk(): void;
}

/**
 * HSFPConstants 命令类型常量
 */
declare namespace HSFPConstants {
  enum CommandType {
    /** 智能替换内容 */
    SmartReplaceContent = 'SmartReplaceContent',
    /** 打开独立面板 */
    OpenIndependentPanel = 'OpenIndependentPanel',
    /** 复制 */
    Duplicate = 'Duplicate',
    /** 显示内容 */
    DisplayContent = 'DisplayContent',
    /** 复合命令 */
    Composite = 'Composite',
    /** 移除组 */
    RemoveGroup = 'RemoveGroup',
    /** 添加组 */
    AddGroup = 'AddGroup',
    /** 删除选择 */
    DeleteSelection = 'DeleteSelection',
    /** 翻转内容 */
    FlipContent = 'FlipContent'
  }

  enum PluginType {
    /** 目录插件 */
    Catalog = 'Catalog'
  }
}

/**
 * HSConstants 模型类常量
 */
declare namespace HSConstants {
  enum ModelClass {
    /** 程序集 */
    NgPAssembly = 'NgPAssembly',
    /** 内容 */
    NgContent = 'NgContent',
    /** 组 */
    NgGroup = 'NgGroup',
    /** 自定义模型 */
    NgCustomizedModel = 'NgCustomizedModel',
    /** 开口 */
    NgOpening = 'NgOpening'
  }
}

/**
 * HSCore 核心命名空间
 */
declare namespace HSCore {
  namespace Model {
    /**
     * 内容基类
     */
    class Content {
      /**
       * 判断实例是否为指定类型
       * @param modelClass - 模型类名称
       * @returns 是否为指定类型
       */
      instanceOf(modelClass: string): boolean;

      /** 翻转状态 */
      flip?: number;

      /** 是否可取消组合 */
      ungroupable?: boolean;
    }

    /**
     * 障碍物类
     */
    class Obstacle extends Content {}
  }

  namespace Util {
    /**
     * 信号钩子工具类
     */
    class SignalHook {
      constructor(context: unknown);
      listen(signal: unknown, handler: (event: unknown) => void): void;
      unlistenAll(): void;
    }
  }
}

/**
 * HSApp 应用命名空间
 */
declare namespace HSApp {
  namespace Util {
    namespace Entity {
      /**
       * 判断实体类型
       * @param modelClass - 模型类
       * @param entities - 实体数组
       * @returns 是否全部匹配类型
       */
      function isTypeOf(modelClass: unknown, entities: unknown[]): boolean;
    }
  }

  namespace App {
    /**
     * 获取应用实例
     * @returns 应用实例
     */
    function getApp(): IApplication;
  }
}

/**
 * 资源管理器
 */
declare namespace ResourceManager {
  /**
   * 获取本地化字符串
   * @param key - 资源键
   * @returns 本地化文本
   */
  function getString(key: string): string;
}

/**
 * 实时提示工具
 */
declare namespace LiveHint {
  /**
   * 显示提示
   * @param message - 提示消息
   * @param duration - 显示时长(毫秒)
   * @param onComplete - 完成回调
   */
  function show(message: string, duration: number, onComplete?: () => void): void;

  /**
   * 隐藏提示
   */
  function hide(): void;
}