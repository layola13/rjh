/**
 * Document management and utility functions module
 * Provides global window functions for creating new documents and URL/HTML processing
 */

/**
 * Application instance interface
 */
interface App {
  /** Creates a new document */
  newDocument(): Promise<void>;
  /** Switches the view to 2D mode */
  switchTo2DView(): void;
  /** Document metadata manager */
  designMetadata: DesignMetadata;
}

/**
 * Design metadata manager interface
 */
interface DesignMetadata {
  /** Sets a metadata property */
  set(key: string, value: unknown): void;
  /** Persists metadata changes */
  flush(): void;
}

/**
 * HSApp namespace
 */
interface HSApp {
  App: {
    /** Gets the current application instance */
    getApp(): App;
  };
}

/**
 * HSCore namespace
 */
interface HSCore {
  Doc: {
    /** Document status enumeration */
    DocumentStatus: {
      /** Public document status */
      Public: string | number;
    };
  };
}

/**
 * LiveHint interface for UI hints
 */
interface LiveHint {
  /** Hides the live hint */
  hide(): void;
}

/**
 * User benefit metadata
 */
interface BenefitMeta {
  /** Whether the document is public by default */
  defaultPublic?: boolean;
}

/**
 * Autodesk user interface
 */
interface AdskUser {
  /** Gets user benefit metadata */
  getBenefitMeta(category: string, key: string): BenefitMeta | null | undefined;
}

declare global {
  interface Window {
    /** HSApp application namespace */
    HSApp: HSApp;
    /** HSCore framework namespace */
    HSCore: HSCore;
    /** LiveHint UI component */
    LiveHint?: LiveHint;
    /** Autodesk user instance */
    adskUser: AdskUser;
    /** Debug mode flag */
    DEBUG?: boolean;
    
    /**
     * Creates a new document asynchronously
     * - Hides LiveHint if available
     * - Creates new document via HSApp
     * - Switches to 2D view
     * - Sets document to public if white label sharing is enabled
     */
    onNewDocument(): Promise<void>;
    
    /**
     * Appends version string to URL for cache busting
     * @param url - The URL to version
     * @returns Versioned URL with hsw_version parameter, or empty string if input is falsy
     * @remarks In DEBUG mode, returns original URL unchanged
     */
    toVersionedUrl(url: string): string;
    
    /**
     * Strips HTML tags and escapes special characters
     * @param html - The HTML string to sanitize
     * @returns Sanitized string with < > " replaced by full-width equivalents
     * @remarks Replaces: < → ＜, > → ＞, " → ＂
     */
    stripHtml(html: string): string;
  }
  
  /** Application version string used for cache busting */
  const hsw_version: string;
}

export {};