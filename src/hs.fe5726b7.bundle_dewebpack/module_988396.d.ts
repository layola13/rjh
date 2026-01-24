/**
 * Module: module_988396
 * Utility module providing HTTP client, API wrapper, CDN helpers, URL utilities, configuration, and image processing
 */

/**
 * Core AJAX/HTTP client interface
 * Provides low-level HTTP request functionality
 */
export interface Ajax {
  // Add specific method signatures based on your HTTP client implementation
  (options: AjaxOptions): Promise<AjaxResponse>;
  get?: <T = unknown>(url: string, options?: AjaxOptions) => Promise<T>;
  post?: <T = unknown>(url: string, data?: unknown, options?: AjaxOptions) => Promise<T>;
  put?: <T = unknown>(url: string, data?: unknown, options?: AjaxOptions) => Promise<T>;
  delete?: <T = unknown>(url: string, options?: AjaxOptions) => Promise<T>;
}

/**
 * AJAX request configuration options
 */
export interface AjaxOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  credentials?: RequestCredentials;
  signal?: AbortSignal;
}

/**
 * AJAX response structure
 */
export interface AjaxResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * API client wrapper built on top of AJAX
 * Provides higher-level API interaction methods
 */
export interface Api {
  request: <T = unknown>(endpoint: string, options?: AjaxOptions) => Promise<T>;
  // Add other API-specific methods as needed
}

/**
 * CDN utilities for asset management
 * Handles CDN URL generation and asset optimization
 */
export interface Cdn {
  getUrl: (path: string, options?: CdnOptions) => string;
  getImageUrl?: (path: string, options?: ImageCdnOptions) => string;
}

/**
 * CDN configuration options
 */
export interface CdnOptions {
  version?: string;
  subdomain?: string;
  secure?: boolean;
}

/**
 * Image-specific CDN options
 */
export interface ImageCdnOptions extends CdnOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
}

/**
 * URL manipulation and parsing utilities
 */
export interface Url {
  parse: (url: string) => ParsedUrl;
  stringify: (parsed: ParsedUrl) => string;
  resolve?: (base: string, relative: string) => string;
  addQueryParams?: (url: string, params: Record<string, string | number | boolean>) => string;
}

/**
 * Parsed URL structure
 */
export interface ParsedUrl {
  protocol?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
  query?: Record<string, string>;
}

/**
 * Configuration management
 * Handles application-wide configuration settings
 */
export interface Configure {
  set: (key: string, value: unknown) => void;
  get: <T = unknown>(key: string) => T | undefined;
  getAll?: () => Record<string, unknown>;
  merge?: (config: Record<string, unknown>) => void;
}

/**
 * Image processing and manipulation utilities
 */
export interface Image {
  load: (src: string) => Promise<HTMLImageElement>;
  resize?: (img: HTMLImageElement, width: number, height: number) => HTMLCanvasElement;
  optimize?: (img: HTMLImageElement, options?: ImageOptimizeOptions) => Blob;
  toDataUrl?: (img: HTMLImageElement, format?: string, quality?: number) => string;
}

/**
 * Image optimization options
 */
export interface ImageOptimizeOptions {
  quality?: number;
  format?: 'image/jpeg' | 'image/png' | 'image/webp';
  maxWidth?: number;
  maxHeight?: number;
}

/**
 * Core AJAX client instance
 */
export const ajax: Ajax;

/**
 * API client wrapper instance (built on ajax)
 */
export const api: Api;

/**
 * CDN utilities instance
 */
export const cdn: Cdn;

/**
 * URL manipulation utilities instance
 */
export const url: Url;

/**
 * Configuration manager instance
 */
export const configure: Configure;

/**
 * Image processing utilities instance
 */
export const image: Image;