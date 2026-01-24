/**
 * MD5 哈希算法类型定义
 * 提供完整的 MD5 加密和 HMAC-MD5 功能
 */

declare module 'md5-module' {
  /**
   * 输入数据类型：字符串、数字数组、类型化数组或 ArrayBuffer
   */
  type InputData = string | number[] | Uint8Array | ArrayBuffer;

  /**
   * 输出格式类型
   */
  type OutputFormat = 'hex' | 'array' | 'digest' | 'buffer' | 'arrayBuffer' | 'base64';

  /**
   * MD5 哈希计算器类
   * 支持流式更新和多种输出格式
   */
  interface Md5Hasher {
    /**
     * 更新哈希数据
     * @param input - 要哈希的数据
     * @returns 当前实例，支持链式调用
     */
    update(input: InputData): this;

    /**
     * 完成哈希计算并返回十六进制字符串
     * @returns 32位小写十六进制字符串
     */
    hex(): string;

    /**
     * 完成哈希计算并返回十六进制字符串（同 hex）
     */
    toString(): string;

    /**
     * 完成哈希计算并返回字节数组
     * @returns 16字节数组
     */
    digest(): number[];

    /**
     * 完成哈希计算并返回字节数组（同 digest）
     */
    array(): number[];

    /**
     * 完成哈希计算并返回 ArrayBuffer
     * @returns 16字节 ArrayBuffer
     */
    arrayBuffer(): ArrayBuffer;

    /**
     * 完成哈希计算并返回 ArrayBuffer（同 arrayBuffer）
     */
    buffer(): ArrayBuffer;

    /**
     * 完成哈希计算并返回 Base64 字符串
     * @returns Base64 编码的哈希值
     */
    base64(): string;
  }

  /**
   * HMAC-MD5 计算器类
   * 使用密钥进行消息认证码计算
   */
  interface HmacMd5Hasher extends Md5Hasher {
    // 继承所有 Md5Hasher 的方法
  }

  /**
   * MD5 主函数接口
   * 提供快捷哈希计算和实例创建
   */
  interface Md5Function {
    /**
     * 快捷计算 MD5 哈希（十六进制）
     * @param input - 输入数据
     * @returns 32位小写十六进制字符串
     */
    (input: InputData): string;

    /**
     * 创建新的 MD5 哈希器实例
     * @returns MD5 哈希器实例
     */
    create(): Md5Hasher;

    /**
     * 快捷更新并计算（十六进制）
     * @param input - 输入数据
     * @returns 32位小写十六进制字符串
     */
    update(input: InputData): string;

    /**
     * 快捷计算并输出十六进制
     */
    hex(input: InputData): string;

    /**
     * 快捷计算并输出字节数组
     */
    array(input: InputData): number[];

    /**
     * 快捷计算并输出字节数组（同 array）
     */
    digest(input: InputData): number[];

    /**
     * 快捷计算并输出 ArrayBuffer
     */
    arrayBuffer(input: InputData): ArrayBuffer;

    /**
     * 快捷计算并输出 ArrayBuffer（同 arrayBuffer）
     */
    buffer(input: InputData): ArrayBuffer;

    /**
     * 快捷计算并输出 Base64
     */
    base64(input: InputData): string;

    /**
     * HMAC-MD5 功能对象
     */
    hmac: HmacMd5Interface;
  }

  /**
   * HMAC-MD5 接口
   * 提供基于密钥的消息认证码功能
   */
  interface HmacMd5Interface {
    /**
     * 快捷计算 HMAC-MD5（十六进制）
     * @param key - 密钥
     * @param message - 消息内容
     * @returns 32位小写十六进制字符串
     */
    (key: InputData, message: InputData): string;

    /**
     * 创建新的 HMAC-MD5 计算器实例
     * @param key - 密钥
     * @returns HMAC-MD5 计算器实例
     */
    create(key: InputData): HmacMd5Hasher;

    /**
     * 快捷更新并计算（十六进制）
     * @param key - 密钥
     * @param message - 消息内容
     * @returns 32位小写十六进制字符串
     */
    update(key: InputData, message: InputData): string;

    /**
     * 快捷计算并输出十六进制
     */
    hex(key: InputData, message: InputData): string;

    /**
     * 快捷计算并输出字节数组
     */
    array(key: InputData, message: InputData): number[];

    /**
     * 快捷计算并输出字节数组（同 array）
     */
    digest(key: InputData, message: InputData): number[];

    /**
     * 快捷计算并输出 ArrayBuffer
     */
    arrayBuffer(key: InputData, message: InputData): ArrayBuffer;

    /**
     * 快捷计算并输出 ArrayBuffer（同 arrayBuffer）
     */
    buffer(key: InputData, message: InputData): ArrayBuffer;

    /**
     * 快捷计算并输出 Base64
     */
    base64(key: InputData, message: InputData): string;
  }

  /**
   * Mtop 请求响应类型枚举
   */
  enum MtopResponseType {
    /** 错误 */
    ERROR = -1,
    /** 成功 */
    SUCCESS = 0,
    /** Token 过期 */
    TOKEN_EXPIRED = 1,
    /** Session 过期 */
    SESSION_EXPIRED = 2,
  }

  /**
   * Mtop 请求参数接口
   */
  interface MtopRequestParams {
    /** API 名称 */
    api: string;
    /** API 版本 */
    v: string;
    /** 请求数据（对象或 JSON 字符串） */
    data?: Record<string, unknown> | string;
    /** 请求类型：get 或 post */
    type?: 'get' | 'post';
    /** 数据类型：jsonp、json、originaljsonp */
    dataType?: 'jsonp' | 'json' | 'originaljsonp';
    /** 超时时间（毫秒） */
    timeout?: number;
    /** 是否需要登录 */
    needLogin?: boolean;
    /** 登录会话选项 */
    sessionOption?: string;
    /** 是否使用安全通道 */
    isSec?: number;
    /** 加密码 */
    ecode?: number;
    /** 应用 Key */
    appKey?: string;
    /** 扩展请求头 */
    ext_headers?: Record<string, string>;
    /** 扩展查询参数 */
    ext_querys?: Record<string, string>;
    /** 用户代理 */
    ua?: string;
    /** 返回值类型：original 或 string */
    valueType?: 'original' | 'string';
    /** TTID */
    ttid?: string;
    /** 自定义 WindVane 类名 */
    customWindVaneClassName?: string;
    /** 自定义支付宝 JSBridge API */
    customAlipayJSBridgeApi?: string;
    /** 危险操作：设置 WindVane 参数 */
    dangerouslySetWindvaneParams?: Record<string, unknown>;
    /** 危险操作：设置支付宝参数 */
    dangerouslySetAlipayParams?: Record<string, unknown>;
    /** 危险操作：设置协议 */
    dangerouslySetProtocol?: string;
    /** 危险操作：设置 WindVane TTID */
    dangerouslySetWVTtid?: boolean;
    /** 其他自定义参数 */
    [key: string]: unknown;
  }

  /**
   * Mtop 请求选项接口
   */
  interface MtopRequestOptions {
    /** 强制使用 H5 请求 */
    H5Request?: boolean;
    /** 强制使用 WindVane 请求 */
    WindVaneRequest?: boolean;
    /** 使用支付宝 JSBridge */
    useAlipayJSBridge?: boolean;
    /** 使用 JSONP 结果类型 */
    useJsonpResultType?: boolean;
    /** 主域名 */
    mainDomain?: string;
    /** 子域名 */
    subDomain?: string;
    /** 前缀 */
    prefix?: string;
    /** 页面域名 */
    pageDomain?: string;
    /** 是否安全 */
    secure?: boolean;
    /** SameSite 属性 */
    sameSite?: string;
    /** 成功回调 */
    successCallback?: (response: MtopResponse) => void;
    /** 失败回调 */
    failureCallback?: (error: MtopError) => void;
    /** 超时错误消息 */
    timeoutErrMsg?: string;
    /** 中止错误消息 */
    abortErrMsg?: string;
    /** 最大重试次数 */
    maxRetryTimes?: number;
    /** 主机配置 */
    hostSetting?: Record<string, { prefix?: string; subDomain?: string; mainDomain?: string }>;
    /** 等待 WKWebView Cookie 函数 */
    waitWKWebViewCookieFn?: (callback: () => void) => void;
    /** 同步 Cookie 模式 */
    syncCookieMode?: boolean;
    /** 风控选项 */
    bxOption?: Record<string, unknown>;
  }

  /**
   * Mtop 响应接口
   */
  interface MtopResponse<T = unknown> {
    /** 返回码数组 */
    ret: string[];
    /** 响应数据 */
    data: T;
    /** 响应类型 */
    retType?: MtopResponseType;
    /** Cookie 值 */
    c?: string;
    /** 响应头 */
    responseHeaders?: string;
    /** API 名称 */
    api?: string;
    /** API 版本 */
    v?: string;
  }

  /**
   * Mtop 错误接口
   */
  interface MtopError {
    /** 错误返回码 */
    ret: string[];
    /** 错误堆栈 */
    stack?: string[];
    /** 错误类型 */
    retJson: MtopResponseType;
  }

  /**
   * Mtop 请求类
   * 封装阿里系 Mtop 接口调用
   */
  class MtopRequest {
    /**
     * 构造函数
     * @param params - 请求参数
     */
    constructor(params: MtopRequestParams);

    /**
     * 使用中间件
     * @param middleware - 中间件函数
     * @returns 当前实例
     */
    use(middleware: (next: () => void, reject: (error: string) => void) => void | Promise<void>): this;

    /**
     * 发起请求
     * @param options - 请求选项
     * @returns Promise，成功返回响应，失败返回错误
     */
    request<T = unknown>(options?: MtopRequestOptions): Promise<MtopResponse<T>>;
  }

  /**
   * Mtop 主对象接口
   */
  interface MtopObject {
    /**
     * 创建 Mtop 请求实例
     * @param params - 请求参数
     * @returns Mtop 请求实例
     */
    (params: MtopRequestParams): MtopRequest;

    /**
     * 快捷请求方法
     * @param params - 请求参数
     * @param success - 成功回调
     * @param failure - 失败回调
     * @returns Promise
     */
    request<T = unknown>(
      params: MtopRequestParams,
      success?: (response: MtopResponse<T>) => void,
      failure?: (error: MtopError) => void
    ): Promise<MtopResponse<T>>;

    /**
     * H5 请求方法
     * @param params - 请求参数
     * @param success - 成功回调
     * @param failure - 失败回调
     * @returns Promise
     */
    H5Request<T = unknown>(
      params: MtopRequestParams,
      success?: (response: MtopResponse<T>) => void,
      failure?: (error: MtopError) => void
    ): Promise<MtopResponse<T>>;

    /** 全局中间件数组 */
    middlewares: Array<(next: () => void, reject: (error: string) => void) => void | Promise<void>>;

    /** 全局配置 */
    config: Record<string, unknown>;

    /** 响应类型枚举 */
    RESPONSE_TYPE: typeof MtopResponseType;

    /** 请求类 */
    CLASS: typeof MtopRequest;

    /** 错误监听器 */
    errorListener?: (error: { api: string; data: unknown; v: string; retJson: MtopError }) => void;
  }

  /**
   * 主导出对象
   */
  interface ModuleExports {
    /** MD5 函数 */
    md5: Md5Function;
    /** Mtop 对象 */
    mtop: MtopObject;
  }

  const exports: ModuleExports;
  export = exports;
}

declare global {
  interface Window {
    /** 全局 MD5 函数 */
    md5?: import('md5-module').Md5Function;
    /** 全局 Mtop 对象 */
    mtop?: import('md5-module').MtopObject;
    /** WindVane 对象 */
    windvane?: {
      call: (
        plugin: string,
        method: string,
        params: unknown,
        success: (result: unknown) => void,
        failure: (error: unknown) => void,
        timeout?: number
      ) => void;
    };
    /** 支付宝 JSBridge */
    AlipayJSBridge?: {
      call: (api: string, params: unknown, callback: (result: unknown) => void) => void;
    };
    /** etSign 签名函数 */
    etSign?: (data: string) => string;
    /** Et 就绪回调 */
    etReady?: () => void;
    /** Et 是否就绪 */
    __etReady?: boolean;
    /** WebKit 消息处理器 */
    webkit?: {
      messageHandlers?: Record<string, unknown>;
    };
    /** Lib 库 */
    lib?: {
      mtop?: import('md5-module').MtopObject;
    };
  }
}