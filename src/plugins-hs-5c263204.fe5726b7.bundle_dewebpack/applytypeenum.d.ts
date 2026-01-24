/**
 * 智能布局命令模块
 * 提供全屋和单间的智能布局功能，支持软装、硬装和全量应用
 */

import { HSApp } from './HSApp';
import { HSCatalog } from './HSCatalog';
import { HSCore } from './HSCore';

/**
 * 生成类型枚举（内部使用）
 */
declare enum InternalGenerateTypeEnum {
  /** 全部生成 */
  All = "ToolInspirationGenerateAll",
  /** 软装生成 */
  SoftDecoration = "ToolInspirationGenerateFurnishingLayout",
  /** 硬装生成 */
  HardDecoration = "ToolInspirationGenerateInteriorFinishLayout"
}

/**
 * 应用类型枚举
 * 定义智能布局的应用范围
 */
export declare enum ApplyTypeEnum {
  /** 全部应用（软装+硬装） */
  All = "all",
  /** 仅软装 */
  SoftDecoration = "softDecoration",
  /** 仅硬装 */
  HardDecoration = "hardDecoration"
}

/**
 * 房间信息接口
 */
interface RoomInfo {
  /** 房间对象 */
  room: HSCore.Model.Room;
  /** 样式模板 */
  stylerTemplate: StylerTemplate;
}

/**
 * 样式模板接口
 */
interface StylerTemplate {
  /** 模板ID */
  id: string;
  /** 设计ID */
  designId: string;
  /** 房间ID（可选） */
  roomId?: string;
  /** 应用类型 */
  apply: ApplyTypeEnum;
  /** 自定义房间信息 */
  customizedRoom: CustomizedRoom;
  /** 内容类型 */
  contentType: HSCatalog.ContentType;
}

/**
 * 自定义房间接口
 */
interface CustomizedRoom {
  /** 房间类型 */
  roomType: HSCore.Model.RoomTypeEnum;
}

/**
 * 房间匹配信息接口
 */
interface RoomMatchInfo {
  /** 模板房间 */
  templateRoom: HSCore.Model.Room;
  /** 设计房间 */
  designRoom: StylerTemplate;
}

/**
 * 房间数据结构
 */
interface RoomData {
  [key: string]: unknown;
}

/**
 * 替换开口数据
 */
interface ReplacedOpenings {
  [key: string]: unknown;
}

/**
 * 材质数据
 */
interface Materials {
  [key: string]: unknown;
}

/**
 * 元数据
 */
interface Metas {
  [key: string]: unknown;
}

/**
 * 模板设计数据接口
 */
interface TemplateDesignData {
  /** 房间数据 */
  roomData?: RoomData;
  /** 替换的开口 */
  replacedOpenings?: ReplacedOpenings;
  /** 材质 */
  materials?: Materials;
  /** 元数据 */
  metas?: Metas;
  /** 模板设计ID */
  templateDesignId?: string;
  /** 橱柜样式 */
  cabinetStyles?: unknown;
  /** 版本 */
  version?: string;
}

/**
 * 天花板和特征墙数据
 */
interface CeilingAndFeatureWallData {
  ceilingAndFeatureWallData: Record<string, unknown>;
  featureWallIds: string[];
}

/**
 * 导入数据接口
 */
interface HSImportData {
  /** 软装布局 */
  furnishingLayout?: Record<string, unknown>;
  /** 硬装布局 */
  interiorFinishLayout?: Record<string, unknown>;
}

/**
 * 算法结果接口
 */
interface AlgorithmResult {
  result: {
    furnishingLayout: Record<string, { statusCode: number }>;
    interiorFinishLayout: Record<string, unknown>;
  };
}

/**
 * 存储接口
 */
interface Storage {
  /** 代理对象映射 */
  proxyObjectsMap?: Map<string, unknown>;
  /** 重做数据 */
  redoData?: unknown;
}

/**
 * 会话接口
 */
interface Session {
  /** 结束会话 */
  end(): void;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /** 开始会话 */
  startSession(): Session;
}

/**
 * 命令上下文接口
 */
interface CommandContext {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /**
   * 完成命令
   * @param command 命令实例
   */
  complete(command: CmdHomeGptSmartLayout): void;
}

/**
 * HomeGPT智能布局命令
 * 负责将样式模板应用到当前设计中，支持全屋和单间布局
 */
export declare class CmdHomeGptSmartLayout extends HSApp.Cmd.Command {
  /** 应用实例 */
  private readonly _app: HSApp.App;
  
  /** 存储对象 */
  private readonly _storage: Storage;
  
  /** 会话对象 */
  private _session?: Session;
  
  /** 是否为全屋模式 */
  private readonly _wholeHouseFlag: boolean;
  
  /** 房间信息列表 */
  private readonly _infos: RoomInfo[];
  
  /** 应用类型 */
  private readonly _applyType: ApplyTypeEnum;
  
  /** 完成计数器 */
  private _completeCount: number;
  
  /** 是否存在失败房间 */
  public existFailRooms?: boolean;
  
  /** 失败的房间ID列表 */
  public failRooms: string[];
  
  /** 命令上下文 */
  protected context: CommandContext;
  
  /** 命令管理器 */
  protected mgr: CommandManager;

  /**
   * 构造函数
   * @param app 应用实例
   * @param applyType 应用类型
   * @param storage 存储对象
   * @param infos 房间信息列表
   */
  constructor(
    app: HSApp.App,
    applyType: ApplyTypeEnum,
    storage: Storage,
    infos: RoomInfo[]
  );

  /**
   * 执行命令
   * 根据全屋或单间模式执行相应的设计应用
   */
  onExecute(): void;

  /**
   * 应用单个房间设计
   * @param info 房间信息
   */
  applyRoomDesign(info: RoomInfo): void;

  /**
   * 应用全屋设计
   */
  wholeHouseToDesign(): void;

  /**
   * 将模板添加到设计中
   * @param info 房间信息
   */
  private _addToDesign(info: RoomInfo): Promise<void>;

  /**
   * 应用设计到房间（V1版本）
   * @param info 房间信息
   * @param designData 设计数据
   * @param softDecorationData 软装数据
   */
  private _applyToDesign(
    info: RoomInfo,
    designData: TemplateDesignData,
    softDecorationData: unknown
  ): Promise<void>;

  /**
   * 应用设计到房间（V2版本，用于卫生间类型）
   * @param info 房间信息
   * @param middleData 中间数据
   * @param roomId 房间ID
   */
  private _applyToDesignV2(
    info: RoomInfo,
    middleData: unknown,
    roomId: string
  ): Promise<void>;

  /**
   * 获取卫生间类型列表
   * @returns 卫生间类型枚举数组
   */
  private _getBathroomTypes(): HSCore.Model.RoomTypeEnum[];

  /**
   * 检查房间类型是否匹配
   * @param sourceType 源房间类型
   * @param targetType 目标房间类型
   * @returns 是否匹配
   */
  private _isRoomTypeMatched(
    sourceType: HSCore.Model.RoomTypeEnum,
    targetType: HSCore.Model.RoomTypeEnum
  ): boolean;

  /**
   * 根据应用类型过滤导入数据
   * @param data 原始数据
   * @returns 过滤后的导入数据
   */
  private _getHSImportData(data?: HSImportData): HSImportData | undefined;

  /**
   * 验证软装布局是否有效
   * @param furnishingLayout 软装布局数据
   * @param info 房间信息
   * @returns 是否有效
   */
  private _isValidFurnishingLayout(
    furnishingLayout: Record<string, { statusCode: number }>,
    info: RoomInfo
  ): number;

  /**
   * 布局失败处理
   * @param errorMessage 错误消息（可选）
   * @param roomId 房间ID（可选）
   */
  layoutFailed(errorMessage?: string | null, roomId?: string): void;

  /**
   * 布局终止处理
   * 完成所有房间处理后的清理工作
   */
  layoutTerminate(): void;
}