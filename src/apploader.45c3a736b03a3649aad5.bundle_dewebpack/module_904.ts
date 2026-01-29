export class URLChecker {
  private urlWhitelist: Array<[string, MatchType]> = [];
  private protocolWhitelist: string[] = ["http:", "https:"];

  /**
   * Adds a protocol to the whitelist
   * @param protocol - Protocol to whitelist (e.g., "http" or "http:")
   */
  addProtocolToWhitelist(protocol: string): void {
    this.protocolWhitelist.push(protocol.endsWith(":") ? protocol : `${protocol}:`);
  }

  /**
   * Adds multiple URLs to the whitelist
   * @param urls - Array of [hostname, matchType] tuples
   * @returns Number of successfully added URLs
   */
  addURLWhitelist(urls: Array<[string, MatchType]>): number {
    let addedCount = 0;
    
    for (const [hostname, matchType] of urls) {
      if (this.addSingleURLToWhitelist(hostname, matchType)) {
        addedCount += 1;
      }
    }
    
    return addedCount;
  }

  /**
   * Adds a single URL to the whitelist
   * @param hostname - The hostname to whitelist
   * @param matchType - Type of matching: "matches" for subdomain matching, "precise" for exact match
   * @returns True if successfully added
   */
  addSingleURLToWhitelist(hostname: string, matchType: MatchType = "matches"): boolean {
    if (matchType === "matches" || matchType === "precise") {
      this.urlWhitelist.push([hostname, matchType]);
      return true;
    }
    
    return false;
  }

  /**
   * Validates a URL against the whitelist
   * @param url - URL to validate
   * @param whitelist - Optional custom whitelist to use instead of instance whitelist
   * @returns The original URL if valid, null otherwise
   */
  getSafeURL(url: string, whitelist?: Array<[string, MatchType]>): string | null {
    const urlsToCheck = whitelist ?? this.urlWhitelist;
    
    let parsedURL: URL;
    try {
      parsedURL = new URL(url);
    } catch (error) {
      return null;
    }
    
    if (!this.protocolWhitelist.includes(parsedURL.protocol)) {
      return null;
    }
    
    for (const entry of urlsToCheck) {
      if (entry.length === 2) {
        const [hostname, matchType] = entry;
        
        if (matchType === "precise") {
          if (hostname === parsedURL.hostname) {
            return url;
          }
        } else if (matchType === "matches") {
          if (parsedURL.hostname.endsWith(`.${hostname}`) || parsedURL.hostname === hostname) {
            return url;
          }
        }
      }
    }
    
    return null;
  }
}

type MatchType = "matches" | "precise";