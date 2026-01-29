/**
 * 提交数据处理器 - 用于管理表单数据提交前的处理流程
 * 支持添加、删除和执行自定义数据处理函数
 */

/** 提交数据处理项配置 */
export interface SubmitDataHandleItem {
  /** 唯一标识符 */
  id: string | number;
  /** 优先级，用于排序执行顺序 */
  priority?: number;
  /** 数据处理函数 */
  fn: (context: DataHandleContext) => Promise<void> | void;
  /** 处理完成后的回调函数 */
  callback?: (context: DataHandleContext) => void;
}

/** 数据处理上下文 */
export interface DataHandleContext {
  /** 待提交的数据（会被修改） */
  submitData: SubmitData;
  /** 原始表单数据（只读） */
  formData: FormData;
}

/** 原始表单数据结构 */
export interface FormData {
  /** 表单内容文本 */
  content?: string;
  /** 其他动态字段 */
  [key: string]: unknown;
}

/** 最终提交的数据结构 */
export interface SubmitData {
  /** 标题（从 content 截取前30字符） */
  title?: string;
  /** 业务类型：global(FP租户) | tpzz | sjj */
  biz: string;
  /** 域名环境 */
  domain: string;
  /** 环境ID */
  environment: string;
  /** 环境名称 */
  environmentName: string;
  /** 网站标识 */
  webSite: string;
  /** 模块标识 */
  module: string;
  /** 用户行为追踪日志 */
  userTracks: unknown[];
  /** 设计ID */
  designId?: string;
  /** 用户信息 */
  userInfo: UserInfo;
  /** 客户端信息 */
  clientInfo?: ClientInfo;
  /** 扩展数据 */
  extraData: ExtraData;
  /** 其他动态字段 */
  [key: string]: unknown;
}

/** 用户信息 */
export interface UserInfo {
  /** UMS 用户ID */
  umsId?: string;
  /** 员工ID */
  employeeId?: string;
  /** 企业ID */
  enterpriseId?: string;
}

/** 客户端信息（由反馈系统收集） */
export interface ClientInfo {
  [key: string]: unknown;
}

/** 扩展数据 */
export interface ExtraData {
  /** 魔法值（楼层图元数据标识） */
  magic: string;
  /** 设计版本号 */
  designVersion?: string;
  /** 发布版本号 */
  publishVersion?: string;
  /** 按类型分类的发布版本 */
  publishVersionByType?: Record<string, string>;
  /** 其他扩展字段 */
  [key: string]: unknown;
}

/** 表单数据适配器参数 */
export interface FormDataAdapterParams {
  /** 原始表单数据 */
  formData: FormData;
  /** 网站标识 */
  webSite: string;
  /** 模块标识 */
  module?: string;
}

/**
 * 提交数据处理管理器
 * 负责收集和执行所有注册的数据处理函数
 */
export default class SubmitDataHandler {
  /** 内部存储的处理函数数组（按优先级排序） */
  private _arr: SubmitDataHandleItem[];

  constructor();

  /**
   * 添加数据处理项
   * @param item - 处理项配置，包含 id、fn 和可选的 callback
   * @remarks 如果 id 已存在则不会重复添加，添加后自动按优先级排序
   */
  addSubmitDataHandleItem(item: SubmitDataHandleItem): void;

  /**
   * 删除指定的数据处理项
   * @param id - 要删除的处理项 ID
   */
  deleteSubmitDataHandleItem(id: string | number): void;

  /**
   * 表单数据适配器 - 将原始表单数据转换为完整的提交数据
   * @param params - 包含 formData、webSite 和 module 的参数对象
   * @returns 处理后的完整提交数据
   * @remarks
   * 自动收集以下信息：
   * - 应用配置（designId、环境、业务类型）
   * - 用户信息（从全局 adskUser 获取）
   * - 客户端信息（通过反馈系统收集）
   * - 用户行为追踪日志
   * - 发布版本信息
   */
  formDataAdapter(params: FormDataAdapterParams): Promise<SubmitData>;

  /**
   * 执行所有自定义数据处理函数
   * @param submitData - 当前的提交数据
   * @param formData - 原始表单数据
   * @returns 处理后的提交数据
   * @private
   */
  private _handleCustomizedData(
    submitData: SubmitData,
    formData: FormData
  ): Promise<SubmitData>;

  /**
   * 设置嵌套对象的键值
   * @param target - 目标对象
   * @param keyPath - 键路径，支持点号分隔（如 "extraData.version"）
   * @param value - 要设置的值
   * @remarks 如果路径中的对象不存在会自动创建
   * @example
   *