/**
 * Language pack registry
 * 
 * Centralized module for managing application internationalization (i18n) language resources.
 * Provides language configurations for Chinese (Simplified), English (US), and Vietnamese.
 * 
 * @module LanguageRegistry
 */

import { cnLang } from './343';
import { usLang } from './344';
import { vnLang } from './345';

/**
 * Supported locale codes following BCP 47 standard
 */
export type SupportedLocale = 'zh-CN' | 'en-US' | 'vi-VN';

/**
 * Language configuration object structure
 * Each language pack should implement this interface with localized strings
 */
export interface LanguageConfig {
  [key: string]: string | LanguageConfig;
}

/**
 * Language registry mapping locale codes to their respective language configurations
 */
export interface LanguageRegistry {
  /** Chinese (Simplified) - 简体中文 */
  'zh-CN': LanguageConfig;
  /** English (United States) */
  'en-US': LanguageConfig;
  /** Vietnamese - Tiếng Việt */
  'vi-VN': LanguageConfig;
}

/**
 * Default language registry containing all supported locales
 * 
 * @example
 *