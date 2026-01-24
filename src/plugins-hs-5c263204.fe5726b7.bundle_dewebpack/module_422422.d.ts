/**
 * 反馈系统 API 模块
 * 提供创建反馈、获取配置、查询统计等功能
 */

/** 反馈类型选项 */
interface FeedbackType {
  /** 类型名称 */
  name: string;
  /** 排序权重 */
  sort: number;
}

/** 选项分组 */
interface SelectionGroup {
  /** 分组ID */
  id: string;
  /** 分组名称 */
  name: string;
  /** 排序权重 */
  sort: number;
  /** 选项列表 */
  options: Array<{ label: string; value: string }>;
}

/** 环境配置响应 */
interface EnvironmentConfig {
  /** 选项分组列表 */
  selectionGroups: SelectionGroup[];
  /** 其他配置项 */
  [key: string]: unknown;
}

/** 创建反馈请求参数 */
interface CreateFeedbackData {
  /** 反馈标题 */
  title: string;
  /** 反馈内容 */
  content: string;
  /** 反馈类型 */
  type: string[];
  /** 附加数据 */
  extraData?: Record<string, unknown>;
  /** 附件URL列表 */
  attachments?: string[];
}

/** 回复状态枚举 */
type ReplyState = 'UNREAD' | 'UNANSWERED' | 'READ' | 'ANSWERED';

/** 反馈回复项 */
interface FeedbackReply {
  /** 回复ID */
  id: string;
  /** 回复内容 */
  content: string;
  /** 回复时间戳 */
  replyDate: number;
  /** 回复者信息 */
  replier?: {
    name: string;
    avatar?: string;
  };
}

/** 反馈详情 */
interface FeedbackReport {
  /** 反馈ID */
  id: string;
  /** 标题 */
  title: string;
  /** 内容 */
  content: string;
  /** 回复列表（按时间倒序） */
  reply: FeedbackReply[];
  /** 创建时间 */
  createDate: number;
  /** 状态 */
  status: string;
}

/** 反馈列表项（原始） */
interface RawFeedbackItem {
  /** 反馈ID */
  id: string;
  /** 标题 */
  title: string;
  /** 回复状态 */
  replyState: ReplyState;
  /** 附加数据（JSON字符串） */
  extraData: string;
  /** 类型列表 */
  type: FeedbackType[];
  /** 创建时间 */
  createDate: number;
}

/** 反馈列表项（处理后） */
interface ProcessedFeedbackItem extends Omit<RawFeedbackItem, 'extraData' | 'type'> {
  /** 是否有未读回复 */
  hasUnreadReply: boolean;
  /** 附加数据（已解析） */
  extraData: Record<string, unknown>;
  /** 类型名称列表 */
  type: string[];
}

/** 反馈列表响应（原始） */
interface RawFeedbackListResponse {
  /** 反馈列表 */
  items: RawFeedbackItem[];
  /** 总数 */
  total: number;
  /** 当前页 */
  page: number;
}

/** 反馈列表响应（处理后） */
interface ProcessedFeedbackListResponse extends Omit<RawFeedbackListResponse, 'items'> {
  /** 反馈列表 */
  items: ProcessedFeedbackItem[];
}

/** 分页查询参数 */
interface PaginationParams {
  /** 页码（从1开始） */
  page: number;
  /** 每页数量 */
  pageSize: number;
}

/** 统计数据响应 */
interface FeedbackStatistics {
  /** 待处理数量 */
  pending: number;
  /** 已解决数量 */
  resolved: number;
  /** 总数 */
  total: number;
}

/** 未读数量响应 */
interface UnreadCountResponse {
  /** 未读数量 */
  count: number;
}

/** WebSocket令牌响应 */
interface WebsocketTokenResponse {
  /** 访问令牌 */
  token: string;
  /** 过期时间戳 */
  expireTime: number;
}

/** 文件上传参数 */
interface UploadFileParams {
  /** 文件对象 */
  file: File;
  /** 文件类型限制 */
  accept?: string;
  /** 最大文件大小（字节） */
  maxSize?: number;
}

/** MTOP响应包装 */
interface MtopResponse<T> {
  /** 返回码 */
  ret: string[];
  /** 业务数据 */
  data: T;
  /** 错误信息 */
  message?: string;
}

/**
 * 解包MTOP响应
 * 检查ret字段是否包含SUCCESS，成功则返回data，失败则拒绝Promise
 */
function unwrapMtopResponse<T>(promise: Promise<MtopResponse<T>>): Promise<T> {
  return promise.then((response) => {
    if (response?.ret?.[0]?.includes('SUCCESS')) {
      return Promise.resolve(response.data);
    }
    return Promise.reject(response);
  });
}

/**
 * 创建反馈
 * @param data 反馈数据
 * @returns 创建结果
 */
export function createFeedback(data: CreateFeedbackData): Promise<{ id: string }> {
  return unwrapMtopResponse(
    NWTK.mtop.NewFeedback.create({ data })
  );
}

/**
 * 获取环境配置
 * 包含反馈类型、选项分组等配置信息，返回前会按sort字段排序
 * @param data 查询参数
 * @returns 环境配置
 */
export function getEnvironmentConfig(data: Record<string, unknown>): Promise<EnvironmentConfig> {
  return unwrapMtopResponse(
    NWTK.mtop.NewFeedback.getEnvironmentConfig({ data })
  ).then((config) => {
    // 按sort字段对选项分组排序
    config.selectionGroups?.sort((a, b) => a.sort - b.sort);
    return config;
  });
}

/**
 * 获取反馈统计数据
 * @returns 统计信息
 */
export function getFeedbackStatistics(): Promise<FeedbackStatistics> {
  return unwrapMtopResponse(
    NWTK.mtop.NewFeedback.getFeedbackStatistics()
  );
}

/**
 * 获取我的反馈列表
 * 处理后会标记未读状态、解析extraData并提取类型名称
 * @param params 分页参数
 * @returns 反馈列表
 */
export function getMyFeedbackList(params: PaginationParams): Promise<ProcessedFeedbackListResponse> {
  return unwrapMtopResponse(
    NWTK.mtop.NewFeedback.getMyFeedbackList({ data: params })
  ).then((response) => ({
    ...response,
    items: response.items.map((item) => ({
      ...item,
      hasUnreadReply: item.replyState === 'UNREAD' || item.replyState === 'UNANSWERED',
      extraData: JSON.parse(item.extraData) as Record<string, unknown>,
      type: item.type.map((typeItem) => typeItem.name),
    })),
  }));
}

/**
 * 获取我的未读反馈数量
 * @returns 未读数量
 */
export function getMyFeedbackReportCount(): Promise<number> {
  return unwrapMtopResponse(
    NWTK.mtop.NewFeedback.getMyFeedbackReportCount()
  ).then((response) => response.count);
}

/**
 * 获取WebSocket连接令牌
 * 用于实时消息推送
 * @returns 令牌信息
 */
export function getWebsocketToken(): Promise<WebsocketTokenResponse> {
  return unwrapMtopResponse(
    NWTK.mtop.NewFeedback.getWebsocketToken()
  );
}

/**
 * 读取反馈详情并标记为已读
 * 返回前会按回复时间倒序排列回复列表
 * @param data 查询参数（包含反馈ID）
 * @returns 反馈详情
 */
export function readReport(data: { id: string }): Promise<FeedbackReport> {
  return unwrapMtopResponse(
    NWTK.mtop.NewFeedback.readReport({ data })
  ).then((report) => {
    // 按回复时间倒序排列
    report.reply?.sort((a, b) => b.replyDate - a.replyDate);
    return report;
  });
}

/**
 * 上传文件到S3存储
 * @param params 上传参数
 * @returns 文件URL
 */
export function uploadFileToS3(params: UploadFileParams): Promise<string> {
  return HSApp.Io.Request.Design.uploadFile(params);
}