export class SecurityUtil {
  private static readonly urlChecker = new URLChecker();

  /**
   * Escapes HTML special characters to prevent XSS attacks
   * @param html - The HTML string to escape
   * @returns The escaped HTML string
   */
  static escapeHtml(html: string): string {
    return html
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /**
   * Gets a safe URL by validating against whitelist
   * @param url - The URL to validate
   * @param fallback - Optional fallback URL if validation fails
   * @returns The safe URL or fallback
   */
  static getSafeURL(url: string, fallback?: string): string {
    return this.urlChecker.getSafeURL(url, fallback);
  }

  /**
   * Adds a single URL to the whitelist
   * @param url - The URL to whitelist
   * @param matchType - The type of matching to use (default: "matches")
   * @returns Success status
   */
  static addSingleURLToWhitelist(url: string, matchType: string = "matches"): boolean {
    return this.urlChecker.addSingleURLToWhitelist(url, matchType);
  }

  /**
   * Adds multiple URLs to the whitelist
   * @param urls - Array of URLs to whitelist
   * @returns Success status
   */
  static addURLWhitelist(urls: string[]): boolean {
    return this.urlChecker.addURLWhitelist(urls);
  }

  /**
   * Adds a protocol to the whitelist
   * @param protocol - The protocol to whitelist (e.g., "https", "http")
   * @returns Success status
   */
  static addProtocolToWhitelist(protocol: string): boolean {
    return this.urlChecker.addProtocolToWhitelist(protocol);
  }
}

class URLChecker {
  getSafeURL(url: string, fallback?: string): string {
    // Implementation needed
    return url;
  }

  addSingleURLToWhitelist(url: string, matchType: string): boolean {
    // Implementation needed
    return true;
  }

  addURLWhitelist(urls: string[]): boolean {
    // Implementation needed
    return true;
  }

  addProtocolToWhitelist(protocol: string): boolean {
    // Implementation needed
    return true;
  }
}