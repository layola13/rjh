/**
 * SavePostDataStage - 保存设计数据的阶段处理类
 * 负责处理设计数据的保存、版本管理和元数据刷新
 */

/**
 * 应用程序接口
 */
export interface IApp {
  /** 平面图实例 */
  floorplan: IFloorplan;
  /** 设计元数据管理器 */
  designMetadata: IDesignMetadata;
}

/**
 * 平面图接口
 */
export interface IFloorplan {
  /** 扩展数据 */
  ext: Record<string, any>;
}

/**
 * 设计元数据管理器接口
 */
export interface IDesignMetadata {
  /** 获取元数据值 */
  get(key: string): any;
  /** 设置元数据值 */
  set(key: string, value: any): void;
}

/**
 * 保存设计数据接口
 */
export interface ISaveDesignData {
  /** 扩展数据（JSON字符串） */
  ext?: string;
  /** 属性数据（JSON字符串） */
  attributes?: string;
  /** 其他保存数据字段 */
  [key: string]: any;
}

/**
 * 扩展数据对象
 */
export interface IExtData {
  [key: string]: any;
}

/**
 * 属性数据对象
 */
export interface IAttributesData {
  /** 审计信息 */
  audit?: any;
  /** 提交知识图谱标志 */
  submitForKG?: any;
  /** 其他属性 */
  [key: string]: any;
}

/**
 * 执行参数接口
 */
export interface IExecuteOptions {
  /** 是否为另存为操作 */
  isSaveas: boolean;
}

/**
 * 执行上下文参数
 */
export interface IExecuteContext {
  /** 保存数据 */
  data: ISaveDesignData;
  /** 扩展数据 */
  ext: IExtData;
}

/**
 * 保存结果接口
 */
export interface ISaveResult {
  /** 设计ID */
  id: string;
  /** 版本ID */
  versionId?: string;
  /** 属性数据 */
  attributes?: string;
  /** 其他结果字段 */
  [key: string]: any;
}

/**
 * 设计元数据接口
 */
export interface IDesignMetadata {
  /** 元数据结果 */
  result?: ISaveResult;
  /** 其他元数据字段 */
  [key: string]: any;
}

/**
 * 执行响应 - 成功
 */
export interface IExecuteSuccessResponse {
  status: 'success';
  data: IDesignMetadata;
}

/**
 * 执行响应 - 失败
 */
export interface IExecuteErrorResponse {
  status: 'error';
  info: any;
}

/**
 * 执行响应类型
 */
export type IExecuteResponse = IExecuteSuccessResponse | IExecuteErrorResponse;

/**
 * SavePostDataStage 类
 * 负责处理设计数据的保存流程
 */
export declare class SavePostDataStage {
  /** 应用程序实例 */
  private app: IApp;

  /**
   * 构造函数
   * @param options - 配置选项
   * @param options.app - 应用程序实例
   */
  constructor(options: { app: IApp });

  /**
   * 执行保存操作
   * @param options - 执行选项
   * @param context - 执行上下文
   * @returns Promise 返回保存结果
   */
  execute(
    options: IExecuteOptions,
    context: IExecuteContext
  ): Promise<IExecuteResponse>;

  /**
   * 提取设计额外信息为JSON
   * @param metadata - 设计元数据
   * @returns Promise 返回处理后的元数据
   */
  extractDesignExtraInfoToJson(metadata: IDesignMetadata): Promise<IDesignMetadata>;

  /**
   * 刷新设计元数据
   * @param designId - 设计ID
   * @param forceRefresh - 是否强制刷新（默认false）
   * @returns Promise 返回刷新后的元数据
   */
  refreshDesignMeta(designId: string, forceRefresh?: boolean): Promise<ISaveResult>;
}

/**
 * 默认导出
 */
export { SavePostDataStage };