/**
 * 材质移动替换命令模块
 * 提供材质拖拽预览和替换功能
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

/**
 * 鼠标事件数据接口
 */
interface MouseEventData {
  /** 原生鼠标事件对象 */
  event: MouseEvent;
  /** 拾取结果数组 */
  pickResults: PickResult[];
}

/**
 * 拾取结果接口
 */
interface PickResult {
  /** 被拾取的网格名称 */
  meshName?: string;
  /** 其他拾取相关数据 */
  [key: string]: unknown;
}

/**
 * 材质更新元数据接口
 */
interface MaterialUpdateMetaData {
  /** 材质图标图片URL */
  iconImg?: string;
  /** 材质图标（备用字段） */
  icon?: string;
  /** 其他材质相关元数据 */
  [key: string]: unknown;
}

/**
 * 实体接口
 */
interface Entity {
  /** 实体元数据 */
  metadata: Record<string, unknown>;
  /** 其他实体属性 */
  [key: string]: unknown;
}

/**
 * 迷你图片预览控制器接口
 */
interface IMiniImagePreviewCtrl {
  /** 初始化预览控制器 */
  init(): void;
  /** 渲染预览图片 */
  render(position: { x: number; y: number }): void;
  /** 销毁预览控制器 */
  destroy(): void;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /** 取消当前命令 */
  cancel(): void;
  /** 完成当前命令 */
  complete(): void;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /**
   * 创建请求
   * @param requestType - 请求类型
   * @param params - 请求参数
   */
  createRequest(requestType: string, params: unknown[]): unknown;
  /**
   * 提交事务
   * @param request - 请求对象
   */
  commit(request: unknown): void;
}

/**
 * 命令上下文接口
 */
interface CommandContext {
  /** 事务管理器 */
  transManager: TransactionManager;
  /** 其他上下文属性 */
  [key: string]: unknown;
}

/**
 * 工具栏处理器接口
 */
interface ToolbarHandler {
  /**
   * 更新工具栏重置项状态
   * @param itemIds - 工具栏项ID数组
   * @param states - 对应的启用状态数组
   */
  updateToolbarResetItems(itemIds: string[], states: boolean[]): void;
}

/**
 * 材质移动替换命令类
 * 继承自HSApp.Cmd.Command，实现材质的拖拽预览和替换功能
 */
export declare class CmdContentMaterialMoveReplace extends HSApp.Cmd.Command {
  /** 目标实体对象 */
  private _entity: Entity;
  
  /** 材质更新元数据 */
  private _updateMetaData: MaterialUpdateMetaData;
  
  /** 工具栏处理器 */
  private _handler: ToolbarHandler;
  
  /** 迷你图片预览控制器实例 */
  private miniImagePreviewCtrl?: IMiniImagePreviewCtrl | null;
  
  /** 最后一次的拾取结果 */
  private _lastPickResult?: PickResult;
  
  /** 命令管理器 */
  protected mgr?: CommandManager;
  
  /** 命令执行上下文 */
  protected context: CommandContext;

  /**
   * 构造函数
   * @param entity - 要操作的实体对象
   * @param updateMetaData - 材质更新的元数据
   * @param handler - 工具栏处理器
   */
  constructor(
    entity: Entity,
    updateMetaData: MaterialUpdateMetaData,
    handler: ToolbarHandler
  );

  /**
   * 命令执行时调用
   * 创建材质预览界面
   */
  onExecute(): void;

  /**
   * 命令清理时调用
   * 销毁材质预览界面
   */
  onCleanup(): void;

  /**
   * 接收命令事件
   * @param eventType - 事件类型（mousemove/mousedown/dragMove/dragEnd等）
   * @param eventData - 事件数据
   * @returns 是否继续处理事件
   */
  onReceive(eventType: string, eventData: unknown): boolean;

  /**
   * 处理鼠标移动事件
   * @param eventData - 鼠标事件数据
   * @returns 是否继续处理
   */
  onMouseMove(eventData: MouseEventData): boolean;

  /**
   * 处理鼠标按下事件
   * @param eventData - 鼠标事件数据
   */
  onMouseDown(eventData: MouseEventData): void;

  /**
   * 处理拖拽结束事件
   * 执行材质替换或取消操作
   */
  onDragEnd(): void;

  /**
   * 替换指定网格的材质
   * @param meshName - 目标网格名称
   * @private
   */
  private _replaceMaterial(meshName: string): void;

  /**
   * 创建迷你图片预览控制器
   * @param metaData - 材质元数据
   * @private
   */
  private _createMiniImagePreview(metaData: MaterialUpdateMetaData): void;

  /**
   * 渲染迷你图片预览
   * @param eventData - 包含鼠标位置的事件数据
   * @returns 是否成功渲染
   * @private
   */
  private _renderMiniImagePreview(eventData: MouseEventData): boolean;

  /**
   * 销毁迷你图片预览控制器
   * @private
   */
  private _destroyMiniImagePreview(): void;
}