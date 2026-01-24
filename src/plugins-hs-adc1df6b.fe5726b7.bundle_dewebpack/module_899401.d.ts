/**
 * 设计持久化插件 - 类型定义
 * 提供设计文件的保存、加载、自动保存等功能
 */

import { HSCore } from 'HSCore';
import { HSApp } from 'HSApp';

/**
 * 服务类型枚举
 */
export enum ServiceEnum {
  /** 默认保存服务 */
  DEFAULT = 'default',
  /** 自定义保存服务 */
  CUSTOM = 'custom'
}

/**
 * 保存选项接口
 */
export interface SaveOptions {
  /** 保存追踪ID */
  saveTraceId?: string;
  /** 是否检查房间关闭状态 */
  doRoomClosedCheck?: boolean;
  /** 是否显示实时提示 */
  showLiveHint?: boolean;
  /** 是否静默保存 */
  silent?: boolean;
  /** 是否更新缩略图 */
  updateThumbnail?: boolean;
  /** 是否自动创建 */
  isAutoCreate?: boolean;
  /** 保存类型 */
  saveType?: 'save' | 'saveas';
}

/**
 * 设计元数据接口
 */
export interface DesignMetadata {
  /** 设计ID */
  designId?: string;
  /** 版本ID */
  versionId?: string;
  /** 用户ID */
  userId?: string;
  /** 设计名称 */
  designName?: string;
}

/**
 * 设计历史版本接口
 */
export interface DesignVersions {
  /** 版本列表 */
  versions: DesignVersion[];
}

/**
 * 单个设计版本接口
 */
export interface DesignVersion {
  /** 版本ID */
  versionId: string;
  /** 创建时间 */
  createTime: number;
  /** 版本描述 */
  description?: string;
}

/**
 * 分页查询参数接口
 */
export interface PageQueryParams {
  /** 设计ID */
  designId: string;
  /** 页码 */
  pageNum: number;
  /** 每页数量 */
  pageSize: number;
}

/**
 * 保存信号数据接口
 */
export interface SaveSignalData {
  /** 保存追踪ID */
  saveTraceId: string;
  /** 是否成功 */
  success: boolean;
  /** 错误信息 */
  error?: Error;
}

/**
 * 自动保存状态变化信号数据
 */
export interface AutoSaveChangedData {
  /** 自动保存是否开启 */
  autoSaveOn: boolean;
}

/**
 * 打开设计数据上下文
 */
export interface OpenDesignContext {
  /** 是否为户型集合 */
  isFpcollection: boolean;
  /** 设计ID */
  designId: string;
}

/**
 * 持久化插件类
 * 负责设计的保存、加载、自动保存等持久化操作
 */
export declare class PersistencePlugin extends HSApp.Plugin.IPlugin {
  /** 内部处理器 */
  private _handler: unknown;

  /** 服务枚举 */
  readonly ServiceEnum: typeof ServiceEnum;

  /** 保存开始信号 */
  readonly signalSaveStart: HSCore.Util.Signal<SaveSignalData>;

  /** 保存成功信号 */
  readonly signalSaveSucceeded: HSCore.Util.Signal<SaveSignalData>;

  /** 保存失败信号 */
  readonly signalSaveFailed: HSCore.Util.Signal<SaveSignalData>;

  /** 保存取消信号 */
  readonly signalSaveCancel: HSCore.Util.Signal<void>;

  /** 保存进度信号 */
  readonly signalSaveProcess: HSCore.Util.Signal<number>;

  /** 开始加载设计信号 */
  readonly signalStartLoadingDesign: HSCore.Util.Signal<string>;

  /** 自动保存开始信号 */
  readonly signalAutoSaveStart: HSCore.Util.Signal<void>;

  /** 自动保存成功信号 */
  readonly signalAutoSaveSucceeded: HSCore.Util.Signal<void>;

  /** 自动保存进度信号 */
  readonly signalAutoSaveProcess: HSCore.Util.Signal<number>;

  /** 自动保存失败信号 */
  readonly signalAutoSaveFailed: HSCore.Util.Signal<Error>;

  /** 迁移设计保存成功信号 */
  readonly signalMigrateDesignSaveSucceeded: HSCore.Util.Signal<void>;

  /** 自动保存状态变化信号 */
  readonly signalAutoSaveChanged: HSCore.Util.Signal<AutoSaveChangedData>;

  /** 自动保存是否开启 */
  private _autoSaveOn: boolean;

  /** 打开设计处理器 */
  readonly OpenDesignHandler: unknown;

  /** 应用实例 */
  private app: HSApp.App;

  /** 当前自动保存间隔（分钟） */
  private currentInterval: number;

  /** 调度器定时器ID */
  private _scheduler?: number;

  /** 页面卸载时是否忽略户型脏标记 */
  beforeunloadIgnoreFloorplanDirty: boolean;

  /**
   * 设置页面卸载时是否忽略户型脏标记
   * @param ignore - 是否忽略
   */
  setBeforeunloadIgnoreFloorplanDirty(ignore: boolean): void;

  /**
   * 判断是否正在保存
   * @returns 是否正在保存
   */
  isSaving(): boolean;

  /**
   * 判断是否正在自动保存
   * @returns 是否正在自动保存
   */
  isAutoSaving(): boolean;

  /**
   * 使用选项保存设计
   * @param options - 保存选项
   * @returns 保存结果Promise
   */
  saveWithOptions(options: SaveOptions): Promise<boolean>;

  /**
   * 保存设计
   * @param force - 是否强制保存，默认false
   * @param updateThumbnail - 是否更新缩略图，默认true
   * @param doRoomClosedCheck - 是否检查房间关闭，默认false
   * @returns 保存结果Promise
   */
  save(force?: boolean, updateThumbnail?: boolean, doRoomClosedCheck?: boolean): Promise<boolean>;

  /**
   * 另存为设计
   * @returns 保存结果Promise
   */
  saveas(): Promise<boolean>;

  /**
   * 注册任务服务
   * @param serviceKey - 服务键名
   * @param taskKey - 任务键名
   * @param service - 服务实例
   */
  registerTaskService(serviceKey: string, taskKey: string, service: unknown): void;

  /**
   * 注销任务服务
   * @param serviceKey - 服务键名
   * @param taskKey - 任务键名
   */
  unregisterTaskService(serviceKey: string, taskKey: string): void;

  /**
   * 插件激活时调用
   * @param context - 上下文
   * @param options - 选项
   */
  onActive(context: unknown, options: unknown): void;

  /**
   * 插件停用时调用
   */
  onDeactive(): void;

  /**
   * 应用设置变化时的回调
   * @param event - 变化事件
   */
  private onAppSettingsChanged(event: { data: { fieldName: string; value: unknown } }): void;

  /**
   * 注册打开前置任务
   * @param taskKey - 任务键名
   * @param task - 任务函数
   */
  registerOpenPreTask(taskKey: string, task: unknown): void;

  /**
   * 注销打开前置任务
   * @param taskKey - 任务键名
   * @param task - 任务函数
   */
  unregisterOpenPreTask(taskKey: string, task: unknown): void;

  /**
   * 注册保存服务
   * @param serviceKey - 服务键名
   * @param service - 服务实例
   */
  registerService(serviceKey: string, service: unknown): void;

  /**
   * 注销保存服务
   * @param serviceKey - 服务键名
   */
  unregisterService(serviceKey: string): void;

  /**
   * 获取保存服务
   * @param serviceKey - 服务键名
   * @returns 服务实例
   */
  getService(serviceKey: string): unknown;

  /**
   * 注册数据转储服务
   * @param serviceKey - 服务键名
   * @param service - 实现ISaveProcess接口的服务实例
   */
  registerDumpService(serviceKey: string, service: HSApp.Interface.Save.ISaveProcess): void;

  /**
   * 注销数据转储服务
   * @param serviceKey - 服务键名
   */
  unregisterDumpService(serviceKey: string): void;

  /**
   * 根据键名获取转储服务
   * @param serviceKey - 服务键名
   * @returns 服务实例
   */
  getDumpServiceByKey(serviceKey: string): HSApp.Interface.Save.ISaveProcess | undefined;

  /**
   * 获取所有转储服务
   * @returns 服务映射表
   */
  getDumpServices(): Map<string, HSApp.Interface.Save.ISaveProcess>;

  /**
   * 判断是否为当前用户的设计
   * @param designId - 设计ID
   * @returns 是否为当前用户设计
   */
  isMyDesign(designId: string): boolean;

  /**
   * 保存户型数据
   * @param data - 户型数据
   * @param metadata - 元数据
   * @param options - 保存选项
   * @returns 保存结果Promise
   */
  saveFloorplan(data: unknown, metadata: DesignMetadata, options: SaveOptions): Promise<boolean>;

  /**
   * 在检查保存状态后执行操作
   * @param action - 要执行的操作
   * @param actionName - 操作名称
   * @param errorMsg - 错误消息
   * @returns 执行结果Promise
   */
  execteActionWithCheckSavingStatus(
    action: () => void | Promise<void>,
    actionName?: string,
    errorMsg?: string
  ): Promise<void>;

  /**
   * 确保设计已保存
   * @param onSuccess - 成功回调
   * @param onCancel - 取消回调
   * @param showDialog - 是否显示对话框，默认true
   * @param doRoomClosedCheck - 是否检查房间关闭，默认true
   * @returns 确保保存Promise
   */
  ensureSaved(
    onSuccess?: () => void,
    onCancel?: () => void,
    showDialog?: boolean,
    doRoomClosedCheck?: boolean
  ): Promise<void>;

  /**
   * 打开设计（预留接口）
   */
  open(): void;

  /**
   * 检查房间是否关闭
   * @param designData - 设计数据
   * @returns 是否关闭
   */
  checkRoomClosed(designData: unknown): boolean;

  /**
   * 更新设计元数据
   * @returns 更新结果Promise
   */
  updateDesignMeta(): Promise<void>;

  /**
   * 刷新设计元数据
   * @param designId - 设计ID
   * @returns 刷新结果Promise
   */
  refreshDesignMeta(designId: string): Promise<DesignMetadata>;

  /**
   * 设置自动保存开关
   * @param enabled - 是否启用
   */
  setAutoSaveOn(enabled: boolean): void;

  /**
   * 获取自动保存开关状态
   * @returns 是否启用自动保存
   */
  getAutoSaveOn(): boolean;

  /**
   * 设置自动保存属性
   * @param attribute - 属性对象
   */
  setAutoSaveAttribute(attribute: Record<string, unknown>): void;

  /**
   * 自动创建设计
   * @returns 创建结果Promise
   */
  autoCreate(): Promise<void>;

  /**
   * 显示保存提醒
   */
  private saveRemind(): void;

  /**
   * 自动保存历史版本提醒
   */
  private autoSaveHistoryVersion(): void;

  /**
   * 执行自动保存
   * @param remindIfNeeded - 需要时是否提醒，默认false
   * @param forceAutoSave - 是否强制自动保存，默认false
   * @param delayMs - 延迟毫秒数，默认0
   */
  autoSave(remindIfNeeded?: boolean, forceAutoSave?: boolean, delayMs?: number): void;

  /**
   * 获取设计历史版本列表
   * @param designId - 设计ID
   * @returns 版本列表Promise
   */
  getHistories(designId?: string): Promise<DesignVersions>;

  /**
   * 分页获取设计历史版本
   * @param params - 分页参数
   * @returns 分页结果Promise
   */
  getHistoriesByPage(params: PageQueryParams): Promise<unknown>;

  /**
   * 在打开文档前转储服务数据
   * @param designData - 设计数据
   * @param context - 上下文
   */
  dumpServicesBeforeOpenDocument(designData: unknown, context: OpenDesignContext): Promise<void>;

  /**
   * 打开转储服务数据
   * @param designData - 设计数据
   * @param context - 上下文
   */
  openDumpServicesData(designData: unknown, context: OpenDesignContext): Promise<void>;

  /**
   * 打开设计
   * @param designId - 设计ID
   * @param versionId - 版本ID（可选）
   */
  openDesign(designId: string, versionId?: string): void;

  /**
   * 异步获取设计JSON数据
   * @param designId - 设计ID
   * @returns 设计数据Promise
   */
  getDesignJsonAsync(designId: string): Promise<unknown>;

  /**
   * 触发开始加载设计信号
   * @param designId - 设计ID
   */
  dispatchStartLoadingDesignSignal(designId: string): void;

  /**
   * 调用更新设计
   * @param updateData - 更新数据
   * @returns 更新结果Promise
   */
  callUpdateDesign(updateData: unknown): Promise<unknown>;

  /**
   * 判断是否保持设计元数据
   * @returns 是否保持
   */
  keepDesignMeta(): boolean;
}

/**
 * 模块导出
 */
export default PersistencePlugin;