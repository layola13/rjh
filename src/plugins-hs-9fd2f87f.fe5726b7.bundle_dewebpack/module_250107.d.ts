/**
 * Module: module_250107
 * Utilities for checking if catalog items can be copied or cut
 */

/**
 * Metadata information for a catalog item
 */
interface ItemMetadata {
  /** Content type identifier for the item */
  contentType: ContentType;
}

/**
 * Represents a catalog item that can be checked for copy/cut operations
 */
interface CatalogItem {
  /** Optional metadata associated with the item */
  metadata?: ItemMetadata;
}

/**
 * Content type with type checking capability
 */
interface ContentType {
  /**
   * Checks if this content type is of a specific type
   * @param type - The type to check against
   * @returns True if this content type matches the given type
   */
  isTypeOf(type: unknown): boolean;
}

/**
 * Catalog content type enumeration
 */
interface ContentTypeEnum {
  /** Array of content types that cannot be copied */
  ext_Uncopyable: unknown[];
  /** Array of content types that cannot be cut */
  ext_Uncuttable: unknown[];
}

/**
 * Global catalog namespace
 */
declare namespace HSCatalog {
  /** Content type enumerations for the catalog */
  const ContentTypeEnum: ContentTypeEnum;
}

/**
 * Determines if a catalog item can be copied
 * @param item - The catalog item to check
 * @returns True if the item can be copied, false if it's marked as uncopyable
 */
export function isCopyable(item: CatalogItem): boolean;

/**
 * Determines if a catalog item can be cut (moved)
 * @param item - The catalog item to check
 * @returns True if the item can be cut, false if it's marked as uncuttable
 */
export function isCuttable(item: CatalogItem): boolean;