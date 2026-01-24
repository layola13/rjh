/**
 * Module: OpenDesignHandler
 * 设计文档打开处理器，负责设计文件的加载、迁移和状态管理
 */

import { HSCore } from 'hscore';
import { HSApp } from 'hsapp';
import CryptoJS from 'crypto-js';

/**
 * 设计迁移参数接口
 */
interface MigrateParams {
  /** 迁移阶段 (0-3) */
  stage: number;
  /** 迁移结果数据 */
  result: DesignData | null;
  /** 是否为新版户型工具 */
  isNewFp: boolean;
  /** 是否为户型库设计 */
  isFpcollection: boolean;
  /** 原始配饰数据 */
  originalAccessoryData: unknown | null;
  /** 原始配饰是否需要迁移 */
  isOriginalAccessoryMigrate: boolean;
  /** 旧版魔法字符串 */
  oldMagic: string;
  /** 新版魔法字符串 */
  newMagic: string;
}

/**
 * 设计数据接口
 */
interface DesignData {
  /** 设计ID */
  id?: string;
  /** 用户ID */
  userId?: string;
  /** 设计名称 */
  name: string;
  /** 设计描述 */
  description?: string;
  /** 设计状态 */
  status: HSCore.Doc.DocumentStatus;
  /** 魔法标识 */
  magic: string;
  /** 设计属性 */
  attributes?: string | DesignAttributes;
  /** 设计数据内容 */
  data: unknown;
  /** 原始公寓ID */
  originApartmentId?: string;
  /** 卧室数量 */
  bedroomNum?: number;
  /** 客厅数量 */
  livingroomNum?: number;
  /** 卫生间数量 */
  bathroomNum?: number;
  /** 小区名称 */
  neighbor?: string;
  /** 省份ID */
  provinceId?: string;
  /** 省份名称 */
  provinceName?: string;
  /** 城市ID */
  cityId?: string;
  /** 城市名称 */
  cityName?: string;
  /** 区县ID */
  districtId?: string;
  /** 区县名称 */
  districtName?: string;
}

/**
 * 设计属性接口
 */
interface DesignAttributes {
  /** 省份 */
  province: string | null;
  /** 城市 */
  city: string | null;
  /** 区县 */
  district: string | null;
  /** 小区 */
  neighbor: string | null;
  /** 卧室数量 */
  bedroomNum: number;
  /** 客厅数量 */
  livingroomNum: number;
  /** 卫生间数量 */
  bathroomNum: number;
  /** 风格 */
  style: string | null;
  /** 查看模式 */
  viewMode?: string;
  /** 户型ID */
  floorplanId?: string;
}

/**
 * 构建设计数据参数接口
 */
interface BuildDesignDataParams {
  /** 资源类型 */
  assetType?: number;
  /** 属性JSON字符串 */
  attributes?: string;
  /** 设计名称 */
  name?: string;
  /** 设计描述 */
  description?: string;
  /** 设计状态 */
  status?: HSCore.Doc.DocumentStatus;
}

/**
 * 设计信息接口
 */
interface DesignInfo {
  /** 设计ID */
  designId: string;
  /** 设计属性 */
  designAttributes: DesignAttributes;
  /** 标题 */
  title: string;
  /** 状态 */
  status: HSCore.Doc.DocumentStatus;
}

/**
 * 预处理任务参数接口
 */
interface PreTaskParams {
  /** 设计ID */
  designId: string;
  /** 是否为户型库设计 */
  isFpcollection: boolean;
}

/**
 * 打开设计上下文接口
 */
interface OpenDesignContext {
  /** 是否为户型库设计 */
  isFpcollection: boolean;
  /** 设计ID */
  designId: string;
}

/**
 * 服务转储数据接口
 */
interface DumpServicesData {
  [key: string]: unknown;
}

/**
 * 设计处理器扩展接口
 */
interface DesignHandler {
  /** 打开文档前转储服务数据 */
  dumpServicesBeforeOpenDocument?(
    app: unknown,
    design: DesignData,
    context: OpenDesignContext
  ): Promise<void>;
  /** 打开转储的服务数据 */
  openDumpServicesData?(
    app: unknown,
    design: DesignData,
    context: OpenDesignContext
  ): Promise<void>;
}

/**
 * 预处理任务函数类型
 */
type PreTaskFunction = (params: PreTaskParams) => Promise<void>;

/**
 * 设计版本类型枚举
 */
declare const enum DesignVersionType {
  NormalVersionType = 'normal',
}

/**
 * 文档状态枚举
 */
declare const enum DocumentStatus {
  Public = 'public',
  Deleted = 'deleted',
}

/**
 * OpenDesignHandler - 设计文档打开处理器
 * 提供设计文件的加载、验证、迁移和状态管理功能
 */
export interface OpenDesignHandler {
  /** 自定义处理器实例 */
  handler: DesignHandler | null;

  /** 是否正在加载中 */
  loading: boolean;

  /** 加载成功信号 */
  loadSuccessSignal: HSCore.Util.Signal;

  /** 迁移参数配置 */
  migrateParams: MigrateParams;

  /**
   * 检查当前会话状态
   * @returns Promise<unknown> 会话检查结果
   */
  checkCurrentSession(): Promise<unknown>;

  /**
   * 更新设计状态
   * @param designId - 设计ID
   * @param status - 新状态
   * @returns Promise<void>
   */
  updateDesignStatus(designId: string, status: HSCore.Doc.DocumentStatus): Promise<void>;

  /**
   * 构建设计数据对象
   * @param design - 原始设计数据
   * @returns 构建后的设计数据或null
   */
  buildDesignData(design: Partial<DesignData>): BuildDesignDataParams | null;

  /**
   * 处理AJAX数据并更新URL和历史记录
   * @param title - 设计标题
   * @param status - 设计状态
   * @param designId - 设计ID
   * @param attributes - 设计属性
   */
  processAjaxData(
    title: string,
    status: HSCore.Doc.DocumentStatus,
    designId: string,
    attributes: DesignAttributes
  ): void;

  /**
   * 清空URL路径参数
   */
  emptyUrlPath(): void;

  /**
   * 更新设计数据
   * @param designId - 设计ID
   * @param data - 要更新的数据
   * @returns Promise<unknown> 更新结果
   */
  updateDesignData(designId: string, data: Partial<DesignData>): Promise<unknown>;

  /**
   * 更新当前设计状态
   * @param status - 新状态
   */
  updateCurrentDesignStatus(status: HSCore.Doc.DocumentStatus): void;

  /**
   * 验证加载的设计数据
   * @param design - 设计数据
   * @param designId - 设计ID
   * @param sessionId - 会话ID
   * @param isFpcollection - 是否为户型库设计
   * @returns 错误类型字符串或null
   * @private
   */
  _verifyLoadingDesignData(
    design: DesignData,
    designId: string,
    sessionId: string,
    isFpcollection: boolean
  ): string | null;

  /**
   * 加载设计数据
   * @param designId - 设计ID
   * @param sessionId - 会话ID
   * @param isFpcollection - 是否为户型库设计
   * @param versionType - 版本类型，默认为NormalVersionType
   * @param versionId - 版本ID（可选）
   */
  loadDesignData(
    designId: string,
    sessionId: string,
    isFpcollection: boolean,
    versionType?: DesignVersionType,
    versionId?: string
  ): void;

  /**
   * 注册打开前预处理任务
   * @param key - 任务键名
   * @param task - 任务函数
   */
  registerOpenPreTask(key: string, task: PreTaskFunction): void;

  /**
   * 注销打开前预处理任务
   * @param key - 任务键名
   * @param task - 任务函数
   */
  unregisterOpenPreTask(key: string, task: PreTaskFunction): void;

  /** 预处理任务映射表 */
  preTaskMap: Map<string, PreTaskFunction>;

  /**
   * 执行预处理任务
   * @param params - 任务参数
   * @returns Promise<void>
   */
  preTask(params: PreTaskParams): Promise<void>;

  /**
   * 设置户型库标志
   * @param isFpcollection - 是否为户型库设计
   */
  setFPFlag(isFpcollection: boolean): void;

  /**
   * 跳转到设计案例详情页
   * @param designId - 设计ID
   * @returns Promise<void>
   */
  jumpToDesignCaseDetail(designId: string): Promise<void>;

  /**
   * 加载资源
   * @param designId - 设计ID
   * @param sessionId - 会话ID
   * @param isFpcollection - 是否为户型库设计
   * @param versionType - 版本类型，默认为NormalVersionType
   * @param versionId - 版本ID（可选）
   * @returns Promise<void>
   */
  loadAsset(
    designId: string,
    sessionId: string,
    isFpcollection: boolean,
    versionType?: DesignVersionType,
    versionId?: string
  ): Promise<void>;

  /**
   * 打开原始设计（用于迁移）
   * @param designId - 设计ID
   * @returns Promise<unknown> 文档对象
   */
  openOriginalDesign(designId: string): Promise<unknown>;

  /**
   * 打开设计文档
   * @param designId - 设计ID
   * @param isFpcollection - 是否为户型库设计
   * @param design - 设计数据
   * @param app - 应用实例
   * @param traceId - 追踪ID
   * @returns Promise<void>
   */
  openDesign(
    designId: string,
    isFpcollection: boolean,
    design: DesignData,
    app: unknown,
    traceId: string
  ): Promise<void>;

  /**
   * 通过postMessage发送设计ID
   * @param designId - 设计ID
   */
  postMessageWithDesignId(designId: string): void;

  /**
   * 打开新文档
   * @param app - 应用实例
   */
  openNewDocument(app: unknown): void;

  /**
   * 打开户型工具设计
   * @param isPrecise - 是否为精确户型（undefined表示移除参数）
   * @param designId - 设计ID（空字符串表示清除）
   * @param target - 窗口目标
   * @param reload - 是否重新加载当前页
   * @param versionId - 版本ID（可选）
   */
  openFPToolDesign(
    isPrecise: boolean | undefined,
    designId: string,
    target: string,
    reload: boolean,
    versionId?: string
  ): void;

  /**
   * 显示设计迁移阶段提示
   * @param stage - 阶段编号 (1-3)
   * @param delay - 延迟显示时间（毫秒）
   */
  showDesignMigrateStage(stage: number, delay?: number): void;

  /**
   * 隐藏设计迁移阶段提示
   */
  hiddenDesignMigrateStage(): void;
}

/**
 * 保持设计元数据
 * @returns boolean 是否保持元数据
 */
declare function keepDesignMeta(): boolean;

export const OpenDesignHandler: OpenDesignHandler;