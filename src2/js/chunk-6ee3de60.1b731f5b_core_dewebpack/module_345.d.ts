/**
 * Vietnamese language translations map
 * Maps English technical terms to their Vietnamese equivalents
 */

/**
 * Type definition for valid translation keys
 */
export type TranslationKey = 
  | 'inside'
  | 'outside'
  | 'pulling_height'
  | 'arch_height'
  | 'radius'
  | 'arc_length';

/**
 * Vietnamese language translation map
 * Provides translations for geometric and technical terms
 */
export declare const vnLang: ReadonlyMap<TranslationKey, string>;