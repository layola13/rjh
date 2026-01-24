/**
 * 目录面板命令 - 用于打开和管理产品目录独立面板
 * 支持产品选择、面板显示/隐藏、撤销/重做等功能
 */

import { HSCore } from '635589';

/**
 * 目录插件接口
 */
interface CatalogPlugin {
  /** 独立面板隐藏信号 */
  signalIndependentHidden: Signal<PanelHiddenEvent>;
  
  /**
   * 打开独立面板
   * @param option 打开选项
   * @param treeId 树ID
   */
  openIndependentPanel(option: OpenOption, treeId: string): void;
  
  /**
   * 关闭独立面板
   */
  closeIndependent(): void;
}

/**
 * 打开选项配置
 */
interface OpenOption {
  /** 搜索ID */
  seekId?: string;
  
  /** 查询参数 */
  query?: Record<string, unknown> & {
    seekId?: string;
    categoryId?: string;
  };
}

/**
 * 面板隐藏事件数据
 */
interface PanelHiddenEvent {
  data?: {
    /** 是否保持打开状态 */
    keepOpening?: boolean;
  };
}

/**
 * 产品信息接口
 */
interface Product {
  /** 产品分类ID列表 */
  categories?: string[];
}

/**
 * 命令上下文
 */
interface CommandContext {
  /** 命令管理器 */
  cmdMgr?: unknown;
  [key: string]: unknown;
}

/**
 * 信号接口
 */
interface Signal<T> {
  /**
   * 监听信号
   * @param handler 处理函数
   * @param context 上下文对象
   */
  listen(handler: (event: T) => void, context: unknown): void;
  
  /**
   * 取消监听
   * @param handler 处理函数
   * @param context 上下文对象
   */
  unlisten(handler: (event: T) => void, context: unknown): void;
}

/**
 * 撤销/重做事件
 */
interface UndoRedoEvent {
  data?: {
    /** 请求对象 */
    request?: unknown;
  };
}

/**
 * 产品选择处理函数
 * @param content 产品内容
 * @param context 命令上下文
 */
type ProductSelectedHandler = (content: unknown, context: CommandContext) => void;

/**
 * 面板显示处理函数
 * @param context 命令上下文
 */
type PanelShownHandler = (context: CommandContext) => void;

/**
 * 面板隐藏处理函数
 * @param context 命令上下文
 */
type PanelHiddenHandler = (context: CommandContext) => void;

/**
 * 撤销/重做处理函数
 * @param request 请求对象
 * @param isRedo 是否为重做操作
 */
type UndoRedoHandler = (request?: unknown, isRedo?: boolean) => void;

/**
 * 目录面板命令构造函数参数
 */
interface CatalogPanelCommandOptions {
  /** 产品选择处理函数 */
  productSelectedHandler?: ProductSelectedHandler;
  
  /** 面板显示处理函数 */
  panelShownHandler?: PanelShownHandler;
  
  /** 面板隐藏处理函数 */
  panelHiddenHandler?: PanelHiddenHandler;
  
  /** 撤销/重做处理函数 */
  undoRedoHandler?: UndoRedoHandler;
}

/**
 * 目录面板命令类
 * 继承自 HSApp.Cmd.Command，用于管理目录面板的打开、关闭和交互
 */
declare class CatalogPanelCommand extends HSApp.Cmd.Command {
  /** 树ID */
  private treeId: string;
  
  /** 目录插件实例 */
  private catalogPlugin: CatalogPlugin;
  
  /** 打开选项 */
  private openOption: OpenOption;
  
  /** 产品选择处理函数 */
  private productSelectedHandler: ProductSelectedHandler;
  
  /** 面板显示处理函数 */
  private panelShownHandler: PanelShownHandler;
  
  /** 面板隐藏处理函数 */
  private panelHiddenHandler: PanelHiddenHandler;
  
  /** 撤销/重做处理函数 */
  private undoRedoHandler: UndoRedoHandler;
  
  /**
   * 构造函数
   * @param catalogPlugin 目录插件实例
   * @param openOption 打开选项
   * @param options 配置选项
   * @param treeId 树ID（可选，默认为空字符串）
   */
  constructor(
    catalogPlugin: CatalogPlugin,
    openOption: OpenOption,
    options: CatalogPanelCommandOptions,
    treeId?: string
  );
  
  /**
   * 执行命令 - 打开目录面板
   */
  onExecute(): void;
  
  /**
   * 清理命令 - 关闭面板并移除事件监听
   */
  onCleanup(): void;
  
  /**
   * 接收消息
   * @param messageType 消息类型
   * @param content 消息内容
   * @returns 是否处理成功
   */
  onReceive(messageType: string, content: unknown): boolean;
  
  /**
   * 面板隐藏事件处理
   * @param event 隐藏事件
   */
  private onPanelHidden(event: PanelHiddenEvent): void;
  
  /**
   * 是否可撤销/重做
   * @returns false - 该命令本身不支持撤销重做
   */
  canUndoRedo(): boolean;
  
  /**
   * 命令执行期间是否可撤销/重做
   * @returns true - 允许在命令执行期间进行撤销重做操作
   */
  canUndoRedoInCommand(): boolean;
  
  /**
   * 命令内撤销操作处理
   * @param event 撤销事件
   */
  private handleUndoInCommand(event: UndoRedoEvent): void;
  
  /**
   * 命令内重做操作处理
   * @param event 重做事件
   */
  private handleRedoInCommand(event: UndoRedoEvent): void;
}

export default CatalogPanelCommand;