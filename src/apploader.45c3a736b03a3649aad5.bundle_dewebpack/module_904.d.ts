/**
 * URL白名单检查器，用于验证URL的协议和域名是否在允许的白名单中
 */
export declare class URLChecker {
  /**
   * URL白名单列表
   * 每个条目包含：[域名, 匹配模式]
   * 匹配模式可以是 "matches"（域名匹配）或 "precise"（精确匹配）
   */
  private urlWhitelist: Array<[string, WhitelistMatchMode]>;

  /**
   * 协议白名单列表
   * 默认包含 "http:" 和 "https:"
   */
  private protocolWhitelist: string[];

  /**
   * 创建一个新的URLChecker实例
   * 默认协议白名单包含 http: 和 https:
   */
  constructor();

  /**
   * 将协议添加到白名单
   * @param protocol - 协议名称（可带或不带冒号，如 "http" 或 "http:"）
   */
  addProtocolToWhitelist(protocol: string): void;

  /**
   * 批量添加URL到白名单
   * @param entries - URL白名单条目数组，每个条目为 [域名, 匹配模式]
   * @returns 成功添加的URL数量
   */
  addURLWhitelist(entries: Array<[string, WhitelistMatchMode]>): number;

  /**
   * 添加单个URL到白名单
   * @param hostname - 主机名/域名
   * @param matchMode - 匹配模式，默认为 "matches"
   * @returns 如果添加成功返回 true，否则返回 false
   */
  addSingleURLToWhitelist(
    hostname: string,
    matchMode?: WhitelistMatchMode
  ): boolean;

  /**
   * 检查URL是否安全（是否在白名单中）
   * @param url - 要检查的URL字符串
   * @param customWhitelist - 可选的自定义白名单，如果不提供则使用实例的白名单
   * @returns 如果URL安全则返回原URL字符串，否则返回 null
   */
  getSafeURL(
    url: string,
    customWhitelist?: Array<[string, WhitelistMatchMode]>
  ): string | null;
}

/**
 * 白名单匹配模式
 * - "precise": 精确匹配主机名
 * - "matches": 域名匹配，允许子域名（例如 "example.com" 可匹配 "sub.example.com"）
 */
type WhitelistMatchMode = "precise" | "matches";