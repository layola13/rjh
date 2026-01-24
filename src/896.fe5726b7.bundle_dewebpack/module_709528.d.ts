/**
 * VIP用户服务模块
 * 提供用户VIP信息查询、记录查询和过期通知检查功能
 */

/**
 * Mtop API响应结构
 */
interface MtopResponse<T = any> {
  /** 响应数据 */
  data?: {
    data?: T;
    result?: T;
  } | T;
  /** 结果数据（备用字段） */
  result?: T;
  /** 返回状态码数组 */
  ret: string[];
}

/**
 * VIP信息数据结构
 */
interface VipInfo {
  /** VIP类型 */
  vipType?: string;
  /** 过期时间戳 */
  expireTime?: number;
  /** VIP等级 */
  level?: number;
  /** 是否有效 */
  isValid?: boolean;
  [key: string]: any;
}

/**
 * VIP记录数据结构
 */
interface VipRecord {
  /** 记录ID */
  recordId?: string;
  /** 操作类型 */
  operationType?: string;
  /** 创建时间 */
  createTime?: number;
  /** VIP天数 */
  vipDays?: number;
  [key: string]: any;
}

/**
 * VIP过期通知检查结果
 */
interface VipNoticeExpireResult {
  /** 是否即将过期 */
  noticeExpire?: boolean;
  /** 剩余天数 */
  remainDays?: number;
  [key: string]: any;
}

/**
 * 全局NWTK对象声明
 */
declare const NWTK: {
  mtop: {
    User: {
      /** 获取用户VIP信息 */
      userVipGet(): Promise<MtopResponse<VipInfo>>;
      /** 查询VIP记录 */
      vipRecordsQuery(): Promise<MtopResponse<VipRecord[]>>;
      /** 检查VIP过期通知 */
      vipNoticeCheckExpire(): Promise<MtopResponse<VipNoticeExpireResult>>;
    };
  };
};

/**
 * 处理Mtop接口返回结果
 * 校验响应状态并提取数据
 * 
 * @template T - 返回数据类型
 * @param responsePromise - Mtop API Promise
 * @returns 提取后的业务数据
 * @throws 当响应状态不为SUCCESS时抛出原始响应
 */
export function handleMtopResult<T = any>(
  responsePromise: Promise<MtopResponse<T>>
): Promise<T>;

/**
 * 获取用户VIP信息
 * 
 * @returns VIP信息数据
 * @throws 当API调用失败时抛出错误
 */
export function getUserVip(): Promise<VipInfo>;

/**
 * 获取用户VIP记录列表
 * 
 * @returns VIP记录数组
 * @throws 当API调用失败时抛出错误
 */
export function getVipRecords(): Promise<VipRecord[]>;

/**
 * 检查VIP是否即将过期
 * 
 * @returns 是否需要显示过期通知
 * @throws 当API调用失败时抛出错误
 */
export function vipNoticeCheckExpire(): Promise<boolean | undefined>;