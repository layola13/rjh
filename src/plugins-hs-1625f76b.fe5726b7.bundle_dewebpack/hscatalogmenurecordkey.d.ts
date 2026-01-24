/**
 * Catalog menu record key definitions for HS application
 * Includes page types, identifiers, and status flags for various catalog operations
 */

/**
 * Merchant page type identifiers
 */
export interface MerchantPageType {
  /** Landing page identifier */
  LANDING_PAGE: "landing_page";
  /** Shop list page identifier */
  SHOP_LIST_PAGE: "shop_list_page";
  /** Product page identifier */
  PRODUCT_PAGE: "product_page";
}

/**
 * Common ID types used in the catalog
 */
export interface CatalogId {
  /** Recent items identifier */
  Recent: "recentid";
  /** Upload model identifier */
  UploadModel: "uploadmodel";
  /** Styler template identifier */
  StylerTemplateId: "stylertemplate";
}

/**
 * Team brand page type identifiers
 */
export interface TeamBrandPageType {
  /** Brand list page identifier */
  BRAND_LIST_PAGE: "brand_list_page";
  /** Product page identifier */
  PRODUCT_PAGE: "product_page";
  /** Brand list page search identifier */
  BRAND_LIST_PAGE_SEARCH: "brand_list_page_search";
}

/**
 * Default catalog configuration object
 */
export interface HSCatalogMenuRecordKeyDefault {
  /** Merchant page type definitions */
  MERCHANT_PAGE_TYPE: MerchantPageType;
  /** Catalog ID definitions */
  ID: CatalogId;
  /** Team brand page type definitions */
  TEAM_BRAND_PAGE_TYPE: TeamBrandPageType;
}

/**
 * Status keys for catalog menu records
 * Used to track various creation and update operations
 */
export interface HSCatalogMenuRecordKey {
  /** New status flag for customize curtain wall */
  NEW_STATUS_FOR_CUSTOMIZE_CW: "NEW_STATUS_FOR_CUSTOMIZE_CW";
  /** New status flag for creating structure roof */
  NEW_STATUS_FOR_CREATE_STRUCTURE_ROOF: "NEW_STATUS_FOR_CREATE_STRUCTURE_ROOF";
  /** New status flag for roofs drawing */
  NEW_STATUS_FOR_ROOFS_DRAWING: "NEW_STATUS_FOR_ROOFS_DRAWING";
  /** Update status for template data */
  UPDATE_STATUS_TEMPLATE_DATA: "UPDATE_STATUS_TEMPLATE_DATA";
  /** New status flag for creating outdoor elements */
  NEW_STATUS_FOR_CREATE_OUTDOOR: "NEW_STATUS_FOR_CREATE_OUTDOOR";
  /** New status flag for creating polygon wall */
  NEW_STATUS_FOR_CREATE_POLYGON_WALL: "NEW_STATUS_FOR_CREATE_POLYGON_WALL";
  /** New status flag for creating structure stair */
  NEW_STATUS_FOR_CREATE_STRUCTURE_STAIR: "NEW_STATUS_FOR_CREATE_STRUCTURE_STAIR";
}

/**
 * Default export containing catalog configuration
 */
declare const _default: HSCatalogMenuRecordKeyDefault;
export default _default;

/**
 * Named export of status keys
 */
export { HSCatalogMenuRecordKey };