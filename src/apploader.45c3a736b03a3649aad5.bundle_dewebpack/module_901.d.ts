/**
 * 网络检测模块
 * 提供网络速度检测和内网环境检测功能
 */

/**
 * 网络强度枚举
 */
export enum NetworkIntensity {
  /** 良好网络 */
  Good = "good",
  /** 较差网络 */
  Bad = "bad",
  /** 离线状态 */
  OffLine = "offLine"
}

/**
 * 业务类型
 */
export type BizType = "fp" | "homestyler" | string;

/**
 * 网络速度等级阈值配置
 */
export interface NetworkGradeThresholds {
  /** 良好网络的时间上限(ms) */
  good: number;
  /** 平均网络的时间上限(ms) */
  average: number;
  /** 较差网络的时间上限(ms) */
  poor: number;
}

/**
 * 网络检测结果
 */
export interface NetworkDetectionResult {
  /** 网络强度 */
  intensity: NetworkIntensity;
  /** 请求耗时(ms) */
  duration: number;
  /** 请求状态 */
  status: "success" | "fail";
  /** 使用的等级配置 */
  grade: NetworkGradeThresholds;
}

/**
 * URL查询参数
 */
export interface QueryParams {
  /** 资源ID */
  assetId?: string;
  /** 环境标识 */
  env?: string;
  [key: string]: string | undefined;
}

/**
 * 日志自定义信息
 */
export interface LogCustomizedInfo {
  /** 设计ID */
  designId?: string;
  /** 描述信息 */
  description: string;
  /** 分组 */
  group: string;
  /** 分组名称 */
  groupName: string;
  /** 参数信息 */
  argInfo?: NetworkDetectionResult;
  /** 实际耗时 */
  realDuration?: number;
}

/**
 * 日志用户信息
 */
export interface LogUserInfo {
  /** 业务标识 */
  biz: string;
  /** 域名环境 */
  domain?: string;
}

/**
 * 日志记录对象
 */
export interface LogRecord {
  /** 操作类型 */
  actionType: string;
  /** 当前时间戳 */
  currentTime: number;
  /** 日志名称 */
  logName: string;
  /** 追踪ID */
  traceId: string;
  /** 自定义信息 */
  customizedInfo: LogCustomizedInfo;
  /** 用户信息 */
  userInfo: LogUserInfo;
}

/**
 * 内网检测响应
 */
export interface InternalNetworkResponse {
  /** 响应状态 */
  status: number | false;
}

/**
 * 网络检测类
 * 用于检测网络速度和内网环境
 */
export declare class NetworkDetect {
  /** 网络等级阈值配置 */
  private readonly grade: NetworkGradeThresholds;
  
  /** 业务标识 */
  private readonly biz: BizType;

  /**
   * 构造函数
   * @param biz - 业务类型标识（"fp"使用较高阈值，其他使用默认阈值）
   */
  constructor(biz: BizType);

  /**
   * 检测网络速度
   * 通过加载图片资源测量网络响应时间
   * @param imageUrl - 用于测试的图片URL
   * @returns 网络检测结果的Promise
   */
  detectNetworkSpeed(imageUrl: string): Promise<NetworkDetectionResult>;

  /**
   * 检测打开工具时的网络状况
   * @param imageUrl - 用于测试的图片URL
   * @returns 网络检测结果的Promise
   */
  detectOpenToolNetwork(imageUrl: string): Promise<NetworkDetectionResult>;

  /**
   * 检测是否在内网环境
   * 通过访问内网特定资源判断当前网络环境
   * @returns 如果是内网则resolve警告信息数组，否则reject空数组
   */
  detectinternalNetwork(): Promise<[string, string]>;
}

/**
 * 模块默认导出
 */
declare const _default: {
  /** 网络检测类 */
  NetworkDetect: typeof NetworkDetect;
  /** 网络强度枚举 */
  NetworkIntensity: typeof NetworkIntensity;
};

export default _default;