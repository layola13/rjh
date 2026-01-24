/**
 * Configuration module for Homestyler application
 * Contains environment settings, OSS paths, payment gateway configs, and API domains
 */

/**
 * MTOP (Mobile Taobao Open Platform) configuration interface
 */
export interface MtopConfig {
  /** API prefix for MTOP requests */
  prefix: string;
  /** Subdomain for MTOP services */
  subDomain: string;
  /** Main domain extension */
  mainDomain: string;
  /** Full page domain */
  pageDomain: string;
}

/**
 * TOP (Taobao Open Platform) configuration interface
 */
export interface TopConfig {
  /** API prefix for TOP requests */
  prefix: string;
  /** Subdomain for TOP services */
  subDomain: string;
  /** Main domain extension */
  mainDomain: string;
  /** Full page domain */
  pageDomain: string;
}

/**
 * Application configuration interface
 */
export interface AppConfig {
  /** Business code identifier */
  bizCode: string;
  /** Environment name (dev, staging, production, etc.) */
  env: string;
  /** Home URL without protocol */
  homeUrl: string;
  /** OSS bucket path for general assets */
  ossBucketPath: string;
  /** OSS path specifically for 3D models */
  ossModelPath: string;
  /** OSS host URL with protocol */
  ossHost: string;
  /** OSS CDN URL with trailing slash */
  ossCdn: string;
  /** PayPal application/client ID */
  paypalAppId: string;
  /** PayPal return URL after payment */
  paypalReturnUrl: string;
  /** PayPal environment (sandbox or live) */
  paypalAuthend: string;
  /** Gallery/showcase host URL */
  galleryHost: string;
  /** MTOP platform configuration */
  MTOP_CONFIG: MtopConfig;
  /** TOP platform configuration */
  TOP_CONFIG: TopConfig;
}

/**
 * Main application configuration object
 * Pre-configured for development environment with sandbox PayPal
 */
export declare const config: AppConfig;