/**
 * Configuration module for Homestyler application
 * Contains environment-specific settings, API endpoints, and service configurations
 * @module config
 */

/**
 * MTOP (Mobile Taobao Open Platform) configuration interface
 * Defines the domain structure for MTOP API endpoints
 */
export interface MtopConfig {
  /** API prefix for the MTOP service */
  prefix: string;
  /** Subdomain for the service */
  subDomain: string;
  /** Main domain (TLD) */
  mainDomain: string;
  /** Full page domain */
  pageDomain: string;
}

/**
 * TOP (Taobao Open Platform) configuration interface
 * Defines the domain structure for TOP API endpoints
 */
export interface TopConfig {
  /** API prefix for the TOP service */
  prefix: string;
  /** Subdomain for the service */
  subDomain: string;
  /** Main domain (TLD) */
  mainDomain: string;
  /** Full page domain */
  pageDomain: string;
}

/**
 * Main application configuration interface
 * Contains all environment and service settings for the Homestyler application
 */
export interface Config {
  /** Business code identifier */
  bizCode: string;
  /** Current environment (e.g., 'pre', 'prod', 'dev') */
  env: string;
  /** Home page URL */
  homeUrl: string;
  /** OSS bucket path for general assets */
  ossBucketPath: string;
  /** OSS path specifically for 3D models */
  ossModelPath: string;
  /** OSS (Object Storage Service) host URL */
  ossHost: string;
  /** OSS CDN (Content Delivery Network) URL */
  ossCdn: string;
  /** PayPal application ID for payment integration */
  paypalAppId: string;
  /** PayPal return URL after payment completion */
  paypalReturnUrl: string;
  /** PayPal authentication environment ('sandbox' or 'production') */
  paypalAuthend: string;
  /** Gallery/showcase host URL */
  galleryHost: string;
  /** MTOP API configuration */
  MTOP_CONFIG: MtopConfig;
  /** TOP API configuration */
  TOP_CONFIG: TopConfig;
}

/**
 * Application configuration object
 * Pre-production environment settings for the Homestyler application
 */
export declare const config: Config;