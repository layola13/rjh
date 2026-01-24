/**
 * 崩溃检测阈值（毫秒）
 * 当页面超过此时间无响应时判定为崩溃
 */
declare const CRASH_THRESHOLD: 60000;

/**
 * 页面状态信息
 */
interface PageState {
  /** 是否已崩溃 */
  isCrash: boolean;
  /** 页面是否可见 */
  visible: boolean;
  /** 页面是否已加载 */
  isLoad: boolean;
  /** 最后更新时间戳 */
  t: number;
}

/**
 * 页面状态记录表
 * key: 页面ID
 * value: 页面状态
 */
declare const pages: Record<string, PageState>;

/**
 * 崩溃追踪ID映射表
 * key: 页面ID
 * value: 追踪ID
 */
declare const crashTraceIdsByPageId: Map<string, string>;

/**
 * 用户行为日志映射表
 * key: 页面ID
 * value: 用户追踪日志数组
 */
declare const useTrackLogsByPageId: Map<string, UserTrackLog[]>;

/**
 * 日志服务器地址
 */
declare let logServer: string | undefined;

/**
 * Service Worker 定时器ID
 */
declare let swInterval: number | null;

/**
 * 用户追踪日志项
 */
interface UserTrackLog {
  /** 操作类型 */
  actionType: string;
  /** 当前时间戳 */
  currentTime: number;
  /** 日志名称 */
  logName?: string;
  /** 追踪ID */
  traceId?: string;
  /** 页面ID */
  pageId?: string;
  /** 自定义信息 */
  customizedInfo?: CustomizedInfo;
  /** 关联的用户追踪ID */
  linkUserTraceId?: string;
  /** 上一个追踪ID */
  lastTraceId?: string;
}

/**
 * 自定义日志信息
 */
interface CustomizedInfo {
  /** 描述信息 */
  description?: string;
  /** 日志分组 */
  group?: string;
  /** 持续时间（毫秒） */
  duration?: number;
  /** 页面状态快照 */
  pages?: Record<string, PageState>;
  /** 设计ID */
  designId?: string;
  /** 发布版本 */
  publishVersion?: string;
  /** 按类型分类的发布版本 */
  publishVersionByType?: string;
  /** 激活的环境名称 */
  activeEnvironmentName?: string;
  /** 视图模式名称 */
  viewModeName?: string;
  /** 用户行为追踪历史 */
  beforeUserTracks?: UserTrackLog[];
  /** 库ID */
  libraryId?: string;
  /** 包ID */
  packageId?: string;
  /** 用例ID */
  caseId?: string;
  /** 子用例ID */
  subCaseId?: string;
}

/**
 * Fetch 请求配置选项
 */
interface FetchOptions {
  /** 内容类型，设为false则不处理 */
  contentType?: string | false;
  /** 自定义请求头 */
  headers?: Record<string, string | boolean>;
}

/**
 * Service Worker 消息数据
 */
interface ServiceWorkerMessageData {
  /** 消息类型: heartbeat | unload | hidden | visible */
  type: 'heartbeat' | 'unload' | 'hidden' | 'visible' | string;
  /** 页面ID */
  id: string;
  /** 日志服务器地址 */
  logServer?: string;
  /** 用户追踪日志列表 */
  userTrackLogs?: UserTrackLog[];
}

/**
 * 生成UUID（符合UUID v4格式）
 * @returns 生成的UUID字符串
 */
declare function getUUID(): string;

/**
 * 处理请求数据
 * 根据内容类型决定是否进行JSON序列化
 * @param data - 要处理的数据
 * @param options - 请求配置选项
 * @returns 处理后的数据（字符串或原始数据）
 */
declare function processData(
  data: unknown,
  options: FetchOptions
): string | unknown;

/**
 * 转换为Fetch API的RequestInit选项
 * @param options - 自定义选项
 * @param body - 请求体数据
 * @param url - 请求URL（用于判断是否跨域）
 * @returns Fetch RequestInit对象
 */
declare function toFetchOptions(
  options?: FetchOptions,
  body?: unknown,
  url?: string
): RequestInit & { body?: string | unknown };

/**
 * 执行AJAX请求并解析JSON响应
 * @param url - 请求地址
 * @param options - Fetch选项
 * @returns 解析后的JSON数据
 */
declare function ajax<T = unknown>(
  url: string,
  options: RequestInit
): Promise<T>;

/**
 * 发送POST请求
 * @param url - 请求地址
 * @param body - 请求体数据
 * @param options - 自定义选项
 * @returns 解析后的JSON响应
 */
declare function post<T = unknown>(
  url: string,
  body?: unknown,
  options?: FetchOptions
): Promise<T>;

/**
 * 空函数，用于替代console输出
 */
declare function selfConsole(...args: unknown[]): void;

/**
 * 发送用户追踪日志到服务器
 * @param pageId - 页面ID
 * @param isCrash - 是否为崩溃日志
 * @param duration - 持续时间（毫秒）
 */
declare function sendUserTrackLog(
  pageId: string,
  isCrash: boolean,
  duration?: number
): void;

/**
 * 防抖检查页面崩溃状态
 * 根据心跳时间和用户行为判断页面是否崩溃
 * @param pageId - 页面ID
 */
declare function checkCrashDebounce(pageId: string): void;

/**
 * 启动Service Worker定时器
 * 每2秒检查一次所有页面的崩溃状态
 */
declare function serviceWorkTimer(): void;