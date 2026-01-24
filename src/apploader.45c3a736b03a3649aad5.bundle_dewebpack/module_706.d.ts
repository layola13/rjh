/**
 * 安全工具类
 * 提供HTML转义和URL安全检查功能
 */
export declare class SecurityUtil {
  /**
   * URL检查器实例
   * 用于验证和过滤URL以防止XSS等安全问题
   */
  static urlChecker: URLChecker;

  /**
   * 转义HTML特殊字符，防止XSS攻击
   * 
   * @param html - 需要转义的HTML字符串
   * @returns 转义后的安全字符串
   * 
   * @example
   *