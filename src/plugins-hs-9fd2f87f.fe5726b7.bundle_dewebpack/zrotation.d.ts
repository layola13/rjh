/**
 * Z轴旋转相关的自定义建模命令模块
 * 提供墙体附着、房间附着等自定义模型的创建和编辑功能
 */

import type { 
  HSCore, 
  HSApp, 
  HSCatalog, 
  HSConstants, 
  HSFPConstants 
} from './types/homeStyler';

// ===========================
// 常量定义
// ===========================

/** 插件命名空间 */
const PLUGIN_NAMESPACE = 'hsw.plugin.customizedmodeling';

/** 命令命名空间 */
const COMMAND_NAMESPACE = `${PLUGIN_NAMESPACE}.cmd`;

// ===========================
// 类型定义
// ===========================

/**
 * 建模完成数据
 */
interface ModelingEndData {
  /** WebCAD文档数据 */
  webCADDocument: unknown;
  /** 文档是否有效 */
  isDocumentValid?: boolean;
  /** 处理耗时(毫秒) */
  consumedTime?: number;
  /** 是否由DIY保存触发 */
  triggeredByDIYSave?: boolean;
  /** 是否由DIY自动保存触发 */
  triggeredByDIYAutoSave?: boolean;
  /** 单位 */
  unit?: string;
  /** X方向长度 */
  XLength?: number;
  /** Y方向长度 */
  YLength?: number;
  /** Z方向长度 */
  ZLength?: number;
  /** X坐标 */
  x?: number;
  /** Y坐标 */
  y?: number;
  /** Z坐标 */
  z?: number;
  /** 旋转角度 */
  rotation?: number;
}

/**
 * 位置信息
 */
interface PositionInfo {
  x: number;
  y: number;
  z: number;
}

/**
 * 模型信息(包含位置和旋转)
 */
interface ModelInfo extends PositionInfo {
  rotation: number;
}

/**
 * Gizmo点击事件数据
 */
interface GizmoClickData {
  /** 关联的墙体 */
  cowall?: HSCore.Model.NgWall;
  /** 房间实体 */
  room?: HSCore.Model.Room;
  /** 面实体 */
  face?: HSCore.Model.Face;
}

/**
 * 实体点击事件数据
 */
interface EntityClickData {
  /** 被点击的实体 */
  entity: HSCore.Model.Entity;
}

/**
 * 内容类型选择结果
 */
interface ContentTypeSelectionResult {
  /** 模型内容类型 */
  modelContentType?: string;
  /** 模型尺寸范围类型 */
  modelSizeRange?: string;
}

/**
 * 数据变更处理器
 */
type DataChangedHandler = (eventType: string, data: unknown) => void;

// ===========================
// 辅助函数
// ===========================

/**
 * 触发自动保存
 * @param saveNow - 是否立即保存
 * @param silent - 是否静默保存
 */
function triggerAutoSave(saveNow?: boolean, silent?: boolean): void;

/**
 * 完成建模流程并创建产品
 * @param command - 复合命令实例
 * @param endData - 建模结束数据
 * @param contentType - 内容类型枚举值
 * @param modelingHost - 建模宿主实体
 * @param sizeRangeType - 尺寸范围类型
 */
function completeModelingAndCreateProduct(
  command: CmdCustomizedModel,
  endData: ModelingEndData,
  contentType: string,
  modelingHost: HSCore.Model.Entity,
  sizeRangeType: string
): void;

/**
 * 更新已有模型
 * @param command - 复合命令实例
 * @param model - 自定义模型实例
 * @param endData - 建模结束数据
 * @param contentType - 内容类型枚举值
 * @param modelingHost - 建模宿主实体
 * @param sizeRangeType - 尺寸范围类型
 */
function updateExistingModel(
  command: CmdCustomizedModel,
  model: HSCore.Model.CustomizedModel,
  endData: ModelingEndData,
  contentType: string,
  modelingHost: HSCore.Model.Entity,
  sizeRangeType: string
): void;

// ===========================
// 命令类声明
// ===========================

/**
 * 自定义模型基础命令
 * 处理自定义建模的通用逻辑
 */
declare class CmdCustomizedModel extends HSApp.Cmd.CompositeCommand {
  /**
   * 自定义模型实例
   * @protected
   */
  protected _customizedModel?: HSCore.Model.CustomizedModel;

  /**
   * 建模宿主实体(墙体/房间/天花板等)
   * @protected
   */
  protected _modelingHost?: HSCore.Model.Entity;

  /**
   * 内容类型枚举值
   * @protected
   */
  protected _contentType?: string;

  /**
   * 地板面实体
   * @protected
   */
  protected _floorFace?: HSCore.Model.Face;

  /**
   * 构造函数
   * @param customizedModel - 自定义模型实例
   * @param modelingHost - 建模宿主实体
   */
  constructor(
    customizedModel?: HSCore.Model.CustomizedModel,
    modelingHost?: HSCore.Model.Entity
  );

  /**
   * 模型创建完成回调
   * @param model - 创建的模型实例
   */
  onModelCreated(model: HSCore.Model.CustomizedModel): void;

  /**
   * 命令完成时调用
   * @param arg - 完成参数
   */
  complete(arg: unknown): void;
}

/**
 * 创建自定义模型抽象命令
 * 处理创建流程的通用逻辑
 */
declare abstract class CmdCreateCustomizedModel extends CmdCustomizedModel {
  /**
   * 数据变更处理器
   * @private
   */
  private _dataChangedHandler?: DataChangedHandler;

  /**
   * 尺寸范围类型
   * @protected
   */
  protected _sizeRangeType?: string;

  /**
   * 执行命令
   */
  onExecute(): void;

  /**
   * 撤销命令
   */
  onUndo(): void;

  /**
   * 清理资源
   */
  onCleanup(): void;

  /**
   * 完成命令
   * @param arg - 完成参数
   */
  complete(arg: unknown): void;

  /**
   * 注册数据变更监听
   * @param handler - 数据变更处理函数
   */
  onDataChanged(handler: DataChangedHandler): void;

  /**
   * 通知数据变更
   * @param eventType - 事件类型
   * @param data - 事件数据
   * @protected
   */
  protected _notifyDataChange(eventType: string, data: unknown): void;

  /**
   * 判断并启动编辑器
   * @protected
   */
  protected _judgeStart(): void;
}

/**
 * 创建墙体附着的自定义模型命令
 * 用于创建依附在墙体上的自定义模型(如背景墙、固定家具等)
 */
declare class CmdCreateWallAttachedCustomizedModel extends CmdCreateCustomizedModel {
  /**
   * 构造函数
   * @param contentType - 内容类型(如背景墙、地板、固定家具)
   * @param sizeRangeType - 尺寸范围类型
   */
  constructor(contentType: string, sizeRangeType: string);

  /**
   * 执行命令,显示选择提示
   */
  onExecute(): void;

  /**
   * 接收并处理命令消息
   * @param messageType - 消息类型
   * @param data - 消息数据
   * @returns 是否成功处理消息
   */
  onReceive(messageType: string, data: unknown): boolean;

  /**
   * 启动3D编辑器
   * @param wall - 墙体实体
   * @param floorFace - 地板面实体(可选)
   * @param face - 面实体(可选)
   */
  startEditor3d(
    wall: HSCore.Model.NgWall | HSCore.Model.Face,
    floorFace?: HSCore.Model.Face,
    face?: HSCore.Model.Face
  ): void;

  /**
   * 检查是否可以启动3D编辑器
   * @param entity - 实体对象
   * @returns 是否可以启动
   * @private
   */
  private _canStartEditor3d(entity: HSCore.Model.Entity): boolean;
}

/**
 * 创建房间附着的自定义模型命令
 * 用于创建依附在房间内的自定义模型(如天花板、地台等)
 */
declare class CmdCreateRoomAttachedCustomizedModel extends CmdCreateCustomizedModel {
  /**
   * 选中的实体列表
   * @private
   */
  private entities: HSCore.Model.Entity[];

  /**
   * 构造函数
   * @param entities - 选中的实体数组
   */
  constructor(entities: HSCore.Model.Entity[]);

  /**
   * 执行命令
   */
  onExecute(): void;

  /**
   * 接收并处理命令消息
   * @param messageType - 消息类型
   * @param data - 消息数据
   * @returns 是否成功处理消息
   */
  onReceive(messageType: string, data: unknown): boolean;

  /**
   * 启动3D编辑器
   * @param room - 房间或天花板实体
   */
  startEditor3d(room: HSCore.Model.Room | HSCore.Model.Floor): void;
}

/**
 * 编辑自定义模型命令
 * 用于编辑已存在的自定义模型
 */
declare class CmdEditCustomizedModel extends CmdCustomizedModel {
  /**
   * 原始模型元数据
   * @private
   */
  private _customizedModelMeta: HSCatalog.ProductMetadata;

  /**
   * 原始模型位置和旋转信息
   * @private
   */
  private _customizedModelInfo: ModelInfo;

  /**
   * 提交后的元数据
   * @private
   */
  private _committedMetaData?: HSCatalog.ProductMetadata;

  /**
   * 提交后的模型信息
   * @private
   */
  private _committedInfo?: ModelInfo;

  /**
   * 是否在DIY保存流程中
   * @private
   */
  private _inDIYSave: boolean;

  /**
   * 尺寸范围类型
   * @private
   */
  private _sizeRangeType: string;

  /**
   * 附着的内容列表
   * @private
   */
  private _attachedContents?: HSCore.Model.Content[];

  /**
   * 构造函数
   * @param customizedModel - 自定义模型实例
   * @param modelingHost - 建模宿主实体
   * @param contentType - 内容类型
   * @param sizeRangeType - 尺寸范围类型
   * @param inDIYSave - 是否在DIY保存中
   */
  constructor(
    customizedModel: HSCore.Model.CustomizedModel,
    modelingHost: HSCore.Model.Entity,
    contentType: string,
    sizeRangeType: string,
    inDIYSave: boolean
  );

  /**
   * 执行命令
   */
  onExecute(): void;

  /**
   * 接收并处理命令消息
   * @param messageType - 消息类型
   * @param data - 消息数据
   * @returns 是否成功处理消息
   */
  onReceive(messageType: string, data: unknown): boolean;

  /**
   * 撤销命令
   */
  onUndo(): void;

  /**
   * 重做命令
   */
  onRedo(): void;

  /**
   * 提交变更
   */
  commit(): void;

  /**
   * 清理资源
   */
  onCleanup(): void;

  /**
   * 建模完成回调
   * @param endData - 建模结束数据
   */
  onModelingComplete(endData: ModelingEndData): void;

  /**
   * 更新附着内容的宿主
   * @param arg1 - 保留参数
   * @param arg2 - 保留参数
   */
  updateAttachedContentHost(arg1?: unknown, arg2?: unknown): void;
}

/**
 * 编辑自定义模型类型命令
 * 用于修改自定义模型的内容类型(如从背景墙改为固定家具)
 */
declare class CmdEditCustomizedModelType extends CmdCustomizedModel {
  /**
   * 是否为房间类型
   * @private
   */
  private _isRoom: boolean;

  /**
   * 新的内容类型字符串
   * @private
   */
  private _strContentType: string;

  /**
   * 原始内容类型
   * @private
   */
  private _contentType: HSCatalog.ContentType;

  /**
   * 新的宿主实体
   * @private
   */
  private _newHost: HSCore.Model.Entity | null;

  /**
   * 构造函数
   * @param customizedModel - 自定义模型实例
   * @param isRoom - 是否为房间附着类型
   * @param contentType - 新的内容类型字符串
   */
  constructor(
    customizedModel: HSCore.Model.CustomizedModel,
    isRoom: boolean,
    contentType: string
  );

  /**
   * 执行命令
   */
  onExecute(): void;

  /**
   * 撤销命令
   */
  onUndo(): void;

  /**
   * 重做命令
   */
  onRedo(): void;

  /**
   * 清理资源
   */
  onCleanup(): void;

  /**
   * 更新模型的内容类型
   * @param contentType - 新的内容类型
   * @private
   */
  private _updateModel(contentType: HSCatalog.ContentType): void;

  /**
   * 构造内容类型对象
   * @param typeString - 内容类型字符串
   * @returns 内容类型对象
   * @private
   */
  private _makeContentType(typeString: string): HSCatalog.ContentType;

  /**
   * 获取命令描述(用于日志)
   * @returns 命令描述
   */
  getDescription(): string;

  /**
   * 获取命令分类(用于日志分组)
   * @returns 命令分类
   */
  getCategory(): string;

  /**
   * 编辑选中的自定义模型类型(静态方法)
   */
  static edit(): void;
}

// ===========================
// 模块导出
// ===========================

/**
 * 命令命名空间导出
 */
export namespace Commands {
  export { CmdCustomizedModel };
  export { CmdCreateCustomizedModel };
  export { CmdCreateWallAttachedCustomizedModel };
  export { CmdCreateRoomAttachedCustomizedModel };
  export { CmdEditCustomizedModel };
  export { CmdEditCustomizedModelType };
}

/**
 * 默认导出所有命令类
 */
export {
  CmdCustomizedModel,
  CmdCreateCustomizedModel,
  CmdCreateWallAttachedCustomizedModel,
  CmdCreateRoomAttachedCustomizedModel,
  CmdEditCustomizedModel,
  CmdEditCustomizedModelType
};