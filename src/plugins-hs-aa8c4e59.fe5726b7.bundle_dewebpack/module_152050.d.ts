import type { HSApp } from './HSApp';
import type { HSCore } from './HSCore';
import type { HSCatalog } from './HSCatalog';
import type { HSFPConstants } from './HSFPConstants';

/**
 * 样板间应用类型枚举
 */
export enum TemplateApplicationType {
  /** 全部应用 */
  All = "ToolInspirationGenerateAll",
  /** 软装应用 */
  SoftDecoration = "ToolInspirationGenerateFurnishingLayout",
  /** 硬装应用 */
  HardDecoration = "ToolInspirationGenerateInteriorFinishLayout"
}

/**
 * 装修类型枚举
 */
export enum DecorationType {
  /** 全部 */
  All = "all",
  /** 软装 */
  SoftDecoration = "softDecoration",
  /** 硬装 */
  HardDecoration = "hardDecoration"
}

/**
 * 房间设计数据接口
 */
export interface RoomDesignData {
  /** 房间数据 */
  roomData?: Record<string, unknown>;
  /** 替换的开口数据 */
  replacedOpenings?: Record<string, unknown>;
  /** 材质数据 */
  materials?: {
    floors?: Record<string, unknown>;
    walls?: Record<string, unknown>;
    ceilings?: Record<string, unknown>;
  };
  /** 元数据 */
  metas?: Record<string, unknown>;
  /** 模板设计ID */
  templateDesignId?: string;
  /** 柜体样式 */
  cabinetStyles?: unknown;
  /** 版本号 */
  version?: string;
}

/**
 * 软装数据接口
 */
export interface SoftDecorationData {
  /** 源房间类型 */
  sourceRoomType?: string;
  /** 源房间剩余内容 */
  sourceRoomRestContents?: string[];
  /** 源房间ID */
  sourceRoom?: string;
}

/**
 * 约束布局应用结果接口
 */
export interface ConstraintLayoutResult {
  /** 软装数据 */
  softDecoData?: Record<string, SoftDecorationData>;
  /** 硬装结果 */
  hardResults?: Array<{
    openings?: Array<{ id: string }>;
  }>;
  /** 分组结果 */
  groupsResult?: unknown;
}

/**
 * HomeStyler导入数据接口
 */
export interface HSImportData {
  /** 软装布局 */
  furnishingLayout?: Record<string, {
    statusCode: number;
    sourceRoomRestContents?: string[];
  }>;
  /** 硬装布局 */
  interiorFinishLayout?: Record<string, unknown>;
}

/**
 * 材质选择页面配置接口
 */
export interface MaterialPickUpPageConfig {
  /** 数据列表 */
  data: Array<[string, string[]]>;
  /** 是否显示面板 */
  showPanel: boolean;
  /** 版权信息 */
  copyright: string;
  /** 面积 */
  area: string;
  /** 名称 */
  name: string;
  /** 是否全屋设计 */
  isWholeHouse: boolean;
}

/**
 * 模板设计日志数据接口
 */
export interface TemplateDesignLogData {
  /** 日志类型 */
  logType: 'apply';
  /** 日志数据 */
  data: {
    /** 触发类型 */
    triggerType: 'start' | 'end';
    /** 样板间模板 */
    stylerTemplate: HSCatalog.StylerTemplate;
    /** 目标房间 */
    targetRoom?: HSCore.Model.Floor;
    /** 是否辅助设计 */
    isHelpDesign?: boolean;
    /** 是否全屋设计 */
    isWholeHouse: boolean;
    /** 状态 */
    status?: 'cancel' | 'fail' | '';
  };
}

/**
 * 应用样板间设计命令类
 * 负责将样板间设计应用到目标房间或全屋
 */
export default class ApplyStylerTemplateCommand extends HSApp.Cmd.Command {
  /** 是否全屋应用标记 */
  private _wholeHouseFlag: boolean;
  
  /** 应用实例 */
  private _app: HSApp.App;
  
  /** 当前选中的房间 */
  private _selectedRoom?: HSCore.Model.Floor;
  
  /** 样板间模板 */
  private _stylerTemplate: HSCatalog.StylerTemplate;
  
  /** 已应用的房间列表 */
  private _appliedRooms: HSCore.Model.Floor[];
  
  /** 目录插件 */
  private _catalogPlugin: unknown;
  
  /** 存储对象 */
  private _storage: {
    DontShowImportConfirmDialog?: boolean;
    redoData?: unknown;
    proxyObjectsMap?: Map<unknown, unknown>;
  };
  
  /** 显示材质选择页面的回调 */
  private _showMaterialPickUpPage?: (config: MaterialPickUpPageConfig) => void;
  
  /** 当前房间 */
  private _currentRoom?: HSCore.Model.Floor;
  
  /** 是否正在选择房间 */
  private _isSelectingRoom: boolean;
  
  /** 恢复数据 */
  private _restore?: unknown;
  
  /** 是否辅助设计 */
  private _isHelpDesign?: boolean;
  
  /** 信号钩子 */
  private _signalHook: HSCore.Util.SignalHook;
  
  /** 定时器ID */
  private _setTimeoutId?: ReturnType<typeof setTimeout>;
  
  /** 软装数据 */
  private _softDecoData?: Record<string, SoftDecorationData>;
  
  /** 是否禁用面板 */
  private _disablePanel: boolean;
  
  /** 模板设计日志信号 */
  private _signalTemplateDesignToLog: HSCore.Util.Signal<TemplateDesignLogData>;
  
  /** 是否开始记录日志 */
  private _startLogging: boolean;
  
  /** 事务会话 */
  private _session?: unknown;
  
  /** 命令助手 */
  private cmdHelper?: {
    signalImportDesignCanceled: HSCore.Util.Signal<void>;
    signalRoomDesignApplied: HSCore.Util.Signal<void>;
    dealwithSuccessLogicAfterImport: (message: string) => void;
    dealWithSuccessLogicAfterImport: (
      restore?: unknown,
      selectedRoom?: HSCore.Model.Floor,
      showPanel?: boolean,
      options?: { useConstraintLayout?: boolean }
    ) => void;
    dealWithFailLogicAfterImport: (error: unknown, message: string) => void;
  };

  /**
   * 构造函数
   * @param options 配置选项
   */
  constructor(options: {
    app: HSApp.App;
    catalogPlugin: unknown;
    storage: ApplyStylerTemplateCommand['_storage'];
    stylerTemplate: HSCatalog.StylerTemplate;
    room?: HSCore.Model.Floor;
    restore?: unknown;
    isHelpDesign?: boolean;
    showMaterialPickUpPage?: (config: MaterialPickUpPageConfig) => void;
    disablePanel?: boolean;
    signalTemplateDesignToLog: HSCore.Util.Signal<TemplateDesignLogData>;
  });

  /**
   * 执行命令
   */
  onExecute(): void;

  /**
   * 接收消息
   * @param message 消息类型
   * @param data 消息数据
   * @returns 是否处理成功
   */
  onReceive(message: string, data: unknown): boolean;

  /**
   * 状态改变处理
   */
  private _onStatusChanged(): void;

  /**
   * 取消高亮房间
   * @param room 房间对象
   */
  private _dehighlightRoom(room: HSCore.Model.Floor): void;

  /**
   * 高亮房间
   * @param room 房间对象
   */
  private _highlightRoom(room: HSCore.Model.Floor): void;

  /**
   * 取消导入
   */
  private _cancelImport(): void;

  /**
   * 完成导入
   */
  private _completeImport(): void;

  /**
   * 终止处理
   * @param isCancelled 是否取消
   */
  private _onTerminate(isCancelled: boolean): void;

  /**
   * 开始选择房间
   */
  private _selectRoomStart(): void;

  /**
   * 更新光标状态
   * @param status 状态名称
   */
  private _updateCursorStatus(status: string): void;

  /**
   * 结束选择房间
   */
  private _selectRoomEnd(): void;

  /**
   * 导入设计被取消
   */
  private _importDesignCanceled(): void;

  /**
   * 房间设计已应用
   */
  private _roomDesignApplied(): void;

  /**
   * 保存到户型扩展数据
   */
  private _saveToFloorplanExt(): void;

  /**
   * 创建应用确认对话框
   */
  private _createApplyMessageBox(): {
    show: (callback: (result: number, dontShowAgain: boolean) => void) => void;
  };

  /**
   * 应用房间设计
   */
  private _applyRoomDesign(): void;

  /**
   * 应用全屋设计
   */
  private _applyWholehouseDesign(): void;

  /**
   * 应用到设计
   * @param designData 设计数据
   * @param isWholeHouse 是否全屋
   * @param softDecoData 软装数据
   * @param excludedFloors 排除的房间列表
   * @param roomKeys 房间键列表
   */
  private _applyToDesign(
    designData: RoomDesignData,
    isWholeHouse: boolean,
    softDecoData: Record<string, SoftDecorationData>,
    excludedFloors?: HSCore.Model.Floor[],
    roomKeys?: string[]
  ): Promise<void>;

  /**
   * 处理导入结束
   * @param options 选项
   */
  handleImportEnding(options?: { useConstraintLayout?: boolean }): void;

  /**
   * 获取失败提示
   * @param errorCode 错误代码
   * @returns 提示文本
   */
  private _getFailureTip(errorCode: number | string): string;

  /**
   * 后处理约束布局应用
   * @param softDecoData 软装数据
   * @param options 选项
   */
  private _postApplyToDesignByConstraintLayout(
    softDecoData?: Record<string, SoftDecorationData>,
    options?: { useConstraintLayout?: boolean }
  ): Promise<void>;

  /**
   * 添加到设计（主方法）
   * @param isWholeHouse 是否全屋
   */
  private _addToDesign(isWholeHouse: boolean): Promise<void>;

  /**
   * 应用到设计V2版本
   * @param targetRoom 目标房间
   * @param middleData 中间数据
   * @param roomId 房间ID
   * @param isWholeHouse 是否全屋
   */
  private _applyToDesignV2(
    targetRoom: HSCore.Model.Floor,
    middleData: unknown,
    roomId: string,
    isWholeHouse: boolean
  ): Promise<void>;

  /**
   * 处理导入结束V2版本
   * @param importData 导入数据
   */
  handleImportEndingV2(importData: HSImportData): void;

  /**
   * 获取HomeStyler导入数据
   * @param algorithmResult 算法结果
   * @returns 导入数据
   */
  private _getHSImportData(algorithmResult: unknown): HSImportData | undefined;

  /**
   * 验证软装布局是否有效
   * @param furnishingLayout 软装布局数据
   * @returns 是否有效
   */
  private _isValidFurnishingLayout(furnishingLayout: HSImportData['furnishingLayout']): boolean;

  /**
   * 获取卫生间类型列表
   * @returns 房间类型数组
   */
  private _getBathroomTypes(): HSCore.Model.RoomTypeEnum[];

  /**
   * 检查房间类型是否匹配
   * @param roomType 房间类型
   * @returns 是否匹配
   */
  private _isRoomTypeMatched(roomType: HSCore.Model.RoomTypeEnum): boolean;

  /**
   * 处理失败情况
   * @param error 错误对象
   * @param message 错误消息
   * @param errorCode 错误代码
   */
  private _handleFail(error: unknown, message: string, errorCode?: string | number): void;

  /**
   * 添加追踪日志
   * @param triggerType 触发类型
   * @param status 状态
   */
  private _addTrackLog(triggerType?: 'start' | 'end', status?: 'cancel' | 'fail' | ''): void;

  /**
   * 是否可以撤销重做
   * @returns 始终返回false
   */
  canUndoRedo(): boolean;

  /**
   * 获取命令描述
   * @returns 描述文本
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 分类类型
   */
  getCategory(): string;
}