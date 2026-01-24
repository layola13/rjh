/**
 * i18n 国际化模块类型定义
 * 提供多语言支持和语言切换功能
 */

/**
 * 支持的语言代码
 */
export type SupportedLanguage =
  | 'en_US'
  | 'es_ES'
  | 'fr_FR'
  | 'it_IT'
  | 'ja_JP'
  | 'pt_PT'
  | 'ru_RU'
  | 'zh_CN'
  | 'zh_TW'
  | 'de_DE'
  | 'id_ID'
  | 'in_ID'
  | 'pl_PL'
  | 'ko_KR';

/**
 * 语言代码映射类型
 */
export type LanguageCodeMapping = {
  en_US: 'en';
  zh_CN: 'zh';
  zh_TW: 'zh-tw';
  ja_JP: 'ja';
  fr_FR: 'fr';
  it_IT: 'it';
  pt_PT: 'pt';
  es_ES: 'es';
  ru_RU: 'ru';
  id_ID: 'id';
  in_ID: 'id';
  de_DE: 'de';
  ko_KR: 'ko';
  pl_PL: 'pl';
};

/**
 * 翻译资源结构
 */
export interface TranslationResource {
  translation: Record<string, unknown>;
}

/**
 * 语言资源映射
 */
export type LanguageResources = Record<SupportedLanguage, TranslationResource>;

/**
 * 语言代码到简短格式的映射
 * 用于将完整语言代码（如 en_US）转换为简短格式（如 en）
 */
export const toLanguage: LanguageCodeMapping;

/**
 * 初始化 i18next 国际化实例
 * 
 * @param language - 初始语言代码，默认为 'en_US'
 * @returns void
 * 
 * @remarks
 * - 首次调用时会初始化 i18next 实例并加载所有语言资源
 * - 后续调用会直接切换语言而不重新初始化
 * - 使用 React i18next 集成
 * - 默认回退语言为 'en_US'
 * - 禁用 HTML 转义以支持富文本翻译
 * 
 * @example
 *