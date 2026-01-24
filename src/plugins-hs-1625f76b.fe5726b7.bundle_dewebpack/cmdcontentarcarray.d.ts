/**
 * 圆弧阵列命令模块
 * 用于在平面图中对内容对象执行圆弧阵列操作
 */

import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 键盘事件参数接口
 */
interface KeydownEventParams {
  keyCode?: number;
}

/**
 * 数量变更事件参数接口
 */
interface NumChangeEventParams {
  number?: number;
}

/**
 * 圆弧阵列位置和旋转参数接口
 */
interface ArcArrayParams {
  /** 阵列中各对象的位置坐标数组 */
  position: Array<{ x: number; y: number; z?: number }>;
  /** 阵列中各对象的旋转角度数组 */
  rotation: Array<number>;
}

/**
 * 内容数据JSON接口
 */
interface ContentDataJSON {
  /** 内容ID */
  id: string;
  [key: string]: unknown;
}

/**
 * 选中内容的JSON结构接口
 */
interface SelectedContentJSON {
  /** 内容数据数组 */
  data: ContentDataJSON[];
  [key: string]: unknown;
}

/**
 * 内容元数据接口
 */
interface ContentMetadata {
  /** 内容唯一标识符 */
  id: string;
  [key: string]: unknown;
}

/**
 * 内容对象接口
 */
interface Content {
  /** 内容ID */
  id: string;
  /** 内容元数据 */
  metadata: ContentMetadata;
  [key: string]: unknown;
}

/**
 * 应用设置接口
 */
interface AppSettings {
  getViewItem(key: string): boolean;
  setViewItem(key: string, value: boolean): void;
}

/**
 * 工具栏插件接口
 */
interface ToolbarPlugin {
  showSecondToolbar(show: boolean): void;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  getPlugin(type: string): ToolbarPlugin | null;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  cancel(cmd: CmdContentArcArray): void;
  complete(cmd: CmdContentArcArray): void;
}

/**
 * 事务会话接口
 */
interface TransactionSession {
  abort(): void;
  commit(): void;
}

/**
 * 事务请求接口
 */
interface TransactionRequest {
  [key: string]: unknown;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(type: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

/**
 * 平面图接口
 */
interface Floorplan {
  [key: string]: unknown;
}

/**
 * 应用程序接口
 */
interface App {
  appSettings: AppSettings;
  cmdManager: CommandManager;
  pluginManager: PluginManager;
  floorplan: Floorplan;
}

/**
 * 命令上下文接口
 */
interface CommandContext {
  app: App;
  transManager: TransactionManager;
}

/**
 * 粘贴内容参数接口
 */
interface PasteContentParams {
  dataContent: ContentDataJSON;
  contentsJSON: SelectedContentJSON;
  floorplan: Floorplan;
  productsMap: Map<string, ContentMetadata>;
  position: { x: number; y: number; z?: number };
  entity: Content;
  rotation: number;
}

/**
 * 圆弧阵列命令类
 * 继承自HSApp.Cmd.Command，用于执行内容对象的圆弧阵列操作
 */
export declare class CmdContentArcArray extends HSApp.Cmd.Command {
  /** 应用程序实例 */
  app: App;
  
  /** 当前事务会话 */
  session: TransactionSession;
  
  /** 阵列数量，默认为4 */
  arrayNum: number;
  
  /** 事务请求数组 */
  requestArr: TransactionRequest[];
  
  /** 要进行阵列操作的内容对象 */
  content: Content;
  
  /** 是否已隐藏内容精确定位 */
  hasHideContentPrecisionLocation: boolean;
  
  /** 命令上下文 */
  context: CommandContext;

  /**
   * 构造函数
   * @param content - 要进行圆弧阵列的内容对象
   */
  constructor(content: Content);

  /**
   * 命令执行时的回调
   * 初始化应用程序引用、启动事务会话、隐藏内容精确定位视图
   */
  onExecute(): void;

  /**
   * 接收命令消息的处理函数
   * @param event - 事件类型（cancel/keydown/numchange/enter/complete）
   * @param params - 事件参数
   * @returns 是否成功处理事件
   */
  onReceive(
    event: 'cancel' | 'keydown' | 'numchange' | 'enter' | 'complete' | string,
    params?: KeydownEventParams | NumChangeEventParams | ArcArrayParams | unknown
  ): boolean;

  /**
   * 更新阵列数量
   * @param num - 新的阵列数量
   */
  updateArrayNum(num: number): void;

  /**
   * 应用圆弧阵列操作
   * @param params - 阵列参数（位置和旋转信息）
   */
  applyArcArray(params: ArcArrayParams): void;

  /**
   * 批量添加阵列内容
   * @param contents - 内容数据数组
   * @param contentsJSON - 内容JSON结构
   * @param productsMap - 产品元数据映射表
   * @param params - 阵列参数
   */
  addContents(
    contents: ContentDataJSON[],
    contentsJSON: SelectedContentJSON,
    productsMap: Map<string, ContentMetadata>,
    params: ArcArrayParams
  ): void;

  /**
   * 添加单个内容到指定位置
   * @param dataContent - 内容数据
   * @param contentsJSON - 内容JSON结构
   * @param floorplan - 平面图对象
   * @param productsMap - 产品元数据映射表
   * @param position - 目标位置
   * @param rotation - 旋转角度
   */
  addContent(
    dataContent: ContentDataJSON,
    contentsJSON: SelectedContentJSON,
    floorplan: Floorplan,
    productsMap: Map<string, ContentMetadata>,
    position: { x: number; y: number; z?: number },
    rotation: number
  ): void;

  /**
   * ESC键处理，取消命令并中止事务
   */
  onESC(): void;

  /**
   * 完成命令执行
   * 取消所有选择，提交事务并完成命令
   */
  handleComplete(): void;

  /**
   * 命令清理回调
   * 恢复内容精确定位视图并显示第二工具栏
   */
  onCleanup(): void;

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令所属的日志组类型
   */
  getCategory(): string;

  /**
   * 获取当前命令参数（用于日志记录）
   * @returns 包含活动区域和点击比率的参数对象
   */
  getCurrentParams(): {
    activeSection: string;
    activeSectionName: string;
    clicksRatio: {
      id: string;
      name: string;
    };
  };

  /**
   * 显示或隐藏第二工具栏
   * @param show - true显示，false隐藏
   */
  showSecondToolbar(show: boolean): void;
}