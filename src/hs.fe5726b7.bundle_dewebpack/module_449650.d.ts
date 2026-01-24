/**
 * CNAME URL 工具模块
 * 用于根据 CNAME 模式映射生成负载均衡的 URL
 */

/**
 * CNAME 模式配置接口
 */
interface CNamePattern {
  /** 匹配的主机名列表 */
  hosts: string[];
  /** CNAME 模式字符串，包含 #index# 占位符 */
  cnamePattern: string;
  /** 可用的服务器数量 */
  count: number;
}

/**
 * CNAME 配置模块接口
 */
interface CNameConfig {
  /** CNAME 模式映射数组 */
  cnamePatternMaps: CNamePattern[];
}

/**
 * UUID 正则表达式
 * 匹配标准的 UUID v4 格式：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 */
const UUID_PATTERN: RegExp = /\b[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}\b/i;

/**
 * 从 URL 中提取 UUID
 * @param url - 待解析的 URL 字符串
 * @returns 提取到的 UUID 字符串，如果未找到则返回 undefined
 */
function extractUuid(url: string | null | undefined): string | undefined {
  if (!url) {
    return undefined;
  }

  const match = UUID_PATTERN.exec(url);
  return match ? match[0] : undefined;
}

/**
 * 根据 CNAME 模式生成负载均衡的 URL
 * @param url - 原始 URL
 * @param offset - 服务器索引偏移量，默认为 0
 * @returns 转换后的 CNAME URL，如果没有匹配的模式则返回原 URL
 */
function getCNameUrl(url: string, offset?: number): string {
  const cnamePatterns: CNamePattern[] = (require(138357) as CNameConfig).cnamePatternMaps;

  for (let i = 0, len = cnamePatterns.length; i < len; i += 1) {
    const pattern = cnamePatterns[i];
    const matchedHost = pattern.hosts.find((host: string) => url.includes(host));

    if (matchedHost) {
      let serverIndex: number;
      const uuid = extractUuid(url);

      if (uuid) {
        // 使用 UUID 的前 8 位十六进制字符计算服务器索引
        const actualOffset = offset ?? 0;
        const uuidPrefix = uuid;
        const hashValue = Number.parseInt(`0x${uuidPrefix.substr(0, 8)}`);
        serverIndex = (hashValue + actualOffset) % pattern.count;
      } else {
        // 没有 UUID 时使用随机索引
        serverIndex = Math.floor(Math.random() * pattern.count);
      }

      // 替换主机名和索引占位符
      let transformedUrl = url.replace(matchedHost, pattern.cnamePattern);
      transformedUrl = transformedUrl.replace('#index#', String(serverIndex));
      return transformedUrl;
    }
  }

  return url;
}

/**
 * 导出的工具对象
 */
export interface CNameUrlUtils {
  getCNameUrl: typeof getCNameUrl;
}

declare const utils: CNameUrlUtils;
export default utils;

export { getCNameUrl };