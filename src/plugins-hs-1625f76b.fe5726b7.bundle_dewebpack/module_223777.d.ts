/**
 * 墙体上下文工具插件 - 状态栏管理模块
 * 
 * 该模块负责管理墙体实体选中时状态栏的按钮和菜单项，
 * 提供分割、转换、删除、隐藏等操作功能。
 */

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
 * 命令管理器接口
 * 负责创建和执行应用程序命令
 */
interface CommandManager {
  /**
   * 创建指定类型的命令
   * @param commandType 命令类型
   * @param args 命令参数数组
   * @returns 创建的命令对象
   */
  createCommand(commandType: string, args: unknown[]): Command;

  /**
   * 为多个实体创建命令集合
   * @param entities 实体数组
   * @param commandType 命令类型
   * @returns 命令数组
   */
  createCommandsForEntities(entities: WallEntity[], commandType: string): Command[];

  /**
   * 执行命令
   * @param command 要执行的命令
   */
  execute(command: Command): void;

  /**
   * 完成命令执行
   */
  complete(): void;
}

/**
 * 命令对象接口
 */
interface Command {
  readonly type: string;
  readonly args: unknown[];
}

/**
 * 墙体实体接口
 */
interface WallEntity {
  readonly id: string;
  readonly type: string;
  [key: string]: unknown;
}

/**
 * 视图对象接口
 */
interface View {
  readonly id: string;
  readonly type: string;
  is2D?: boolean;
  [key: string]: unknown;
}

/**
 * 选择集合接口
 */
interface Selection {
  readonly length: number;
  [index: number]: WallEntity;
  slice(start?: number, end?: number): WallEntity[];
}

/**
 * 填充状态栏事件数据
 */
interface PopulateStatusBarEventData {
  /** 当前视图 */
  view: View;
  /** 菜单项集合 */
  menuItems: MenuItemCollection;
  /** 选中的实体数组 */
  selectedEntities: WallEntity[];
  /** 选择集合 */
  selection: Selection;
}

/**
 * 信号事件对象
 */
interface SignalEvent<T = unknown> {
  readonly data: T;
}

/**
 * 菜单项集合接口
 */
interface MenuItemCollection {
  /**
   * 在指定位置插入菜单项集合
   * @param index 插入位置索引
   * @param items 要插入的菜单项数组
   */
  xInsertCollection(index: number, items: StatusBarItem[]): void;
}

/**
 * 状态栏按钮项配置
 */
interface StatusBarButtonItem {
  /** 控件唯一标识 */
  id: string;
  /** 控件类型 */
  type: PropertyBarControlTypeEnum.imageButton;
  /** 按钮数据 */
  data: {
    /** 图标路径 */
    src: string;
    /** 提示文本 */
    tooltip: string;
    /** 点击事件处理函数 */
    onclick: () => void;
  };
}

/**
 * 状态栏分隔线项配置
 */
interface StatusBarDividerItem {
  /** 控件类型 */
  type: PropertyBarControlTypeEnum.divider;
}

/**
 * 状态栏项联合类型
 */
type StatusBarItem = StatusBarButtonItem | StatusBarDividerItem;

/**
 * 信号 API 对象接口
 * 提供信号订阅和发布功能
 */
interface SignalAPIObject {
  /** 填充状态栏信号 */
  readonly signalPopulateStatusBar: Signal<PopulateStatusBarEventData>;

  /**
   * 判断是否为 Web 环境显示状态栏项
   * @returns 是否显示
   */
  willShowStatusBarItemsForWeb(): boolean;
}

/**
 * 信号对象接口
 */
interface Signal<T = unknown> {
  /** 信号名称 */
  readonly name: string;
  /** 信号数据类型 */
  readonly dataType?: string;
}

/**
 * 应用程序实例接口
 */
interface AppInstance {
  /** 命令管理器 */
  readonly cmdManager: CommandManager;

  /**
   * 判断是否为 2D 视图
   * @param view 视图对象
   * @returns 是否为 2D 视图
   */
  is2DView(view: View): boolean;
}

/**
 * 信号钩子类
 * 用于管理信号的订阅和取消订阅
 */
declare class SignalHook {
  /**
   * 构造函数
   * @param context 上下文对象
   */
  constructor(context: unknown);

  /**
   * 监听信号
   * @param signal 要监听的信号
   * @param handler 信号处理函数
   */
  listen<T>(signal: Signal<T>, handler: (event: SignalEvent<T>) => void): void;

  /**
   * 取消所有信号监听
   */
  unlistenAll(): void;
}

/**
 * 墙体上下文工具状态栏管理器
 * 
 * 该类继承自基础工具类，负责在用户选中墙体时，
 * 动态填充状态栏中的操作按钮（如分割、转弧形墙、删除、隐藏等）。
 */
declare class WallContextualToolsStatusBarManager {
  /** 应用程序实例 */
  private _app: AppInstance;

  /** 信号 API 对象 */
  private _signalAPIObject: SignalAPIObject;

  /** 信号钩子管理器 */
  private _signalHook: SignalHook;

  /**
   * 初始化方法
   * @param app 应用程序实例
   * @param signalAPIObject 信号 API 对象
   */
  init_(app: AppInstance, signalAPIObject: SignalAPIObject): void;

  /**
   * 反初始化方法
   * 清理所有信号监听
   */
  uninit_(): void;

  /**
   * 填充状态栏事件处理函数
   * 
   * 根据选中的墙体实体，决定是否显示状态栏按钮，
   * 并根据选中数量（单个或多个）调用不同的初始化方法。
   * 
   * @param event 填充状态栏事件对象
   */
  private _onPopulateStatusBar(event: SignalEvent<PopulateStatusBarEventData>): void;

  /**
   * 初始化单个墙体的状态栏按钮
   * 
   * 包括：分割墙体、转换为弧形墙/直线墙、删除、隐藏等按钮
   * 
   * @param entity 选中的墙体实体
   * @param view 当前视图
   * @returns 状态栏项数组
   */
  private _initStatusBarItems(entity: WallEntity, view: View): StatusBarItem[];

  /**
   * 初始化多个墙体的状态栏按钮
   * 
   * 包括：批量删除、批量隐藏等按钮
   * 
   * @param entities 选中的墙体实体数组
   * @param view 当前视图
   * @returns 状态栏项数组
   */
  private _initStatusBarItemsForMultiple(entities: WallEntity[], view: View): StatusBarItem[];

  /**
   * 获取分割墙体按钮配置
   * 
   * 点击后执行 SplitNGWall 命令，将墙体分割为两段
   * 
   * @param entity 墙体实体
   * @param iconBasePath 图标基础路径
   * @returns 分割按钮配置对象
   */
  private _getSplitButtonObj(entity: WallEntity, iconBasePath: string): StatusBarButtonItem;

  /**
   * 获取转换墙体类型按钮配置
   * 
   * 根据当前墙体类型：
   * - 如果是弧形墙：显示"转为直线墙"
   * - 如果是直线墙：显示"转为弧形墙"
   * 
   * @param entity 墙体实体
   * @param iconBasePath 图标基础路径
   * @returns 转换按钮配置对象
   */
  private _getToArcWallButtonObj(entity: WallEntity, iconBasePath: string): StatusBarButtonItem;

  /**
   * 获取删除单个墙体按钮配置
   * 
   * 点击后执行 DeleteNGWall 命令
   * 
   * @param entity 墙体实体
   * @param iconBasePath 图标基础路径
   * @returns 删除按钮配置对象
   */
  private _getDeleteButtonObj(entity: WallEntity, iconBasePath: string): StatusBarButtonItem;

  /**
   * 获取批量删除墙体按钮配置
   * 
   * 点击后执行 DeleteNGWalls 命令（复数形式）
   * 
   * @param entities 墙体实体数组
   * @param iconBasePath 图标基础路径
   * @returns 删除按钮配置对象
   */
  private _getDeletesButtonObj(entities: WallEntity[], iconBasePath: string): StatusBarButtonItem;

  /**
   * 获取隐藏单个墙体按钮配置
   * 
   * 点击后执行 HideWall 命令
   * 
   * @param entity 墙体实体
   * @param iconBasePath 图标基础路径
   * @returns 隐藏按钮配置对象
   */
  private _getHideButtonObj(entity: WallEntity, iconBasePath: string): StatusBarButtonItem;

  /**
   * 获取批量隐藏墙体按钮配置
   * 
   * 点击后为每个实体创建 HideWall 命令，并组合为复合命令执行
   * 
   * @param entities 墙体实体数组
   * @param iconBasePath 图标基础路径
   * @returns 隐藏按钮配置对象
   */
  private _getHidesButtonObj(entities: WallEntity[], iconBasePath: string): StatusBarButtonItem;
}

/**
 * 导出模块默认类
 */
export default WallContextualToolsStatusBarManager;

/**
 * 全局命名空间声明
 */
declare global {
  /**
   * HSCore 核心命名空间
   */
  namespace HSCore {
    namespace Util {
      /** 信号钩子工具类 */
      class SignalHook {
        constructor(context: unknown);
        listen<T>(signal: Signal<T>, handler: (event: SignalEvent<T>) => void): void;
        unlistenAll(): void;
      }

      /** 墙体工具类 */
      namespace Wall {
        /**
         * 判断是否为弧形墙
         * @param entity 墙体实体
         * @returns 是否为弧形墙
         */
        function isArcWall(entity: WallEntity): boolean;
      }
    }

    namespace Model {
      /** 墙体模型类 */
      class Wall {
        static readonly type: string;
      }
    }
  }

  /**
   * HSApp 应用程序命名空间
   */
  namespace HSApp {
    namespace Util {
      /** 实体工具类 */
      namespace Entity {
        /**
         * 判断实体集合是否属于指定类型
         * @param modelType 模型类型
         * @param entities 实体数组
         * @returns 是否匹配类型
         */
        function isTypeOf(modelType: unknown, entities: unknown[]): boolean;
      }
    }

    namespace App {
      /**
       * 获取应用程序实例
       * @returns 应用程序实例
       */
      function getApp(): AppInstance;
    }
  }

  /**
   * HSFPConstants 常量命名空间
   */
  namespace HSFPConstants {
    /** 命令类型枚举 */
    namespace CommandType {
      const SplitNGWall: string;
      const ToArcWall: string;
      const DeleteNGWall: string;
      const DeleteNGWalls: string;
      const HideWall: string;
      const Composite: string;
    }
  }

  /**
   * 资源管理器
   */
  namespace ResourceManager {
    /**
     * 获取国际化字符串
     * @param key 字符串键
     * @returns 翻译后的字符串
     */
    function getString(key: string): string;
  }
}