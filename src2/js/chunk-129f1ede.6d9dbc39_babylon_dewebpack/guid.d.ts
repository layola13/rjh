/**
 * Guid utility class for generating RFC4122 version 4 compliant UUIDs
 * @module Guid
 */

/**
 * Utility class for generating globally unique identifiers (GUIDs/UUIDs)
 */
export declare class Guid {
  /**
   * Generates a new RFC4122 version 4 compliant UUID (GUID)
   * 
   * Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
   * - The '4' indicates UUID version 4 (random)
   * - The 'y' position will be one of [8, 9, a, b] to comply with variant bits
   * 
   * @returns A randomly generated UUID string in hyphenated format
   * 
   * @example
   *