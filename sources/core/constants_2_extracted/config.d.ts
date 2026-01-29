/**
 * Configuration module for application settings
 * @module Config
 */

/**
 * Application configuration interface
 */
export interface Config {
  /**
   * Flag to enable/disable FGI (Foreground Image) functionality
   * @default true
   */
  FgiEnable: boolean;

  /**
   * Flag to enable/disable clip background wall feature
   * @default true
   */
  ClipBackgroundWallEnable: boolean;
}

/**
 * Default configuration object with all features enabled
 */
export declare const Config: Config;