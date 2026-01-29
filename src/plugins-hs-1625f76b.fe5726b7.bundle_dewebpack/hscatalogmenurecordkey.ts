export const HSCatalogMenuRecordKey = {
  NEW_STATUS_FOR_CUSTOMIZE_CW: "NEW_STATUS_FOR_CUSTOMIZE_CW",
  NEW_STATUS_FOR_CREATE_STRUCTURE_ROOF: "NEW_STATUS_FOR_CREATE_STRUCTURE_ROOF",
  NEW_STATUS_FOR_ROOFS_DRAWING: "NEW_STATUS_FOR_ROOFS_DRAWING",
  UPDATE_STATUS_TEMPLATE_DATA: "UPDATE_STATUS_TEMPLATE_DATA",
  NEW_STATUS_FOR_CREATE_OUTDOOR: "NEW_STATUS_FOR_CREATE_OUTDOOR",
  NEW_STATUS_FOR_CREATE_POLYGON_WALL: "NEW_STATUS_FOR_CREATE_POLYGON_WALL",
  NEW_STATUS_FOR_CREATE_STRUCTURE_STAIR: "NEW_STATUS_FOR_CREATE_STRUCTURE_STAIR"
} as const;

export type HSCatalogMenuRecordKeyType = typeof HSCatalogMenuRecordKey[keyof typeof HSCatalogMenuRecordKey];

export interface MerchantPageType {
  LANDING_PAGE: "landing_page";
  SHOP_LIST_PAGE: "shop_list_page";
  PRODUCT_PAGE: "product_page";
}

export interface IdType {
  Recent: "recentid";
  UploadModel: "uploadmodel";
  StylerTemplateId: "stylertemplate";
}

export interface TeamBrandPageType {
  BRAND_LIST_PAGE: "brand_list_page";
  PRODUCT_PAGE: "product_page";
  BRAND_LIST_PAGE_SEARCH: "brand_list_page_search";
}

export interface CatalogConfig {
  MERCHANT_PAGE_TYPE: MerchantPageType;
  ID: IdType;
  TEAM_BRAND_PAGE_TYPE: TeamBrandPageType;
}

const catalogConfig: CatalogConfig = {
  MERCHANT_PAGE_TYPE: {
    LANDING_PAGE: "landing_page",
    SHOP_LIST_PAGE: "shop_list_page",
    PRODUCT_PAGE: "product_page"
  },
  ID: {
    Recent: "recentid",
    UploadModel: "uploadmodel",
    StylerTemplateId: "stylertemplate"
  },
  TEAM_BRAND_PAGE_TYPE: {
    BRAND_LIST_PAGE: "brand_list_page",
    PRODUCT_PAGE: "product_page",
    BRAND_LIST_PAGE_SEARCH: "brand_list_page_search"
  }
};

export default catalogConfig;