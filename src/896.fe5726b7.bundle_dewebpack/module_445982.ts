interface WorkbenchUrls {
  ihomeFactory: string;
  ihomeServiceProvider: string;
  ihomeStore: string;
  shejishi: string;
  ihomeDecoration: string;
  ihomeXmerchant: string;
  toApplyBiz: string;
  icbu: string;
  designMerchant: string;
  ihomeXmerchant_mpmwsaas: string;
}

interface CadAutoOpeningProduct {
  InDoor: string;
  InDoorSliding: string;
  OutDoor: string;
  Window: string;
  FloorWindow: string;
  Hole: string;
}

interface CnamePatternMap {
  hosts: string[];
  cnamePattern: string;
  count: number;
}

interface ModelLibraryPoolItem {
  poolId: number;
  categoryId: string;
}

interface ModelLibraryPool {
  high_quality: ModelLibraryPoolItem;
  high_commission: ModelLibraryPoolItem;
}

interface ApiHostOverrides {
  EZHOME_RENDER_JOB_MANAGEMENT_SERVER: string;
  EZHOME_SSJ_API_SERVER: string;
  EZHOME_SSJ_BOM_API_SERVER: string;
  EZHOME_AUTOSTYLER_SERVER: string;
  MEMBER_CENTER_URL: string;
  PASSPORT_SERVER: string;
  IPASSPORT_SERVER: string;
}

interface PartnerConfig {
  EZHOME_RENDER_JOB_MANAGEMENT_SERVER: string;
  EZHOME_RENDER_INTENSITYMULTIPLIER_THRESHOLD: number;
  EZHOME_RENDER_EXPOSURE_CALIBRATION_ENABLE: boolean;
  EZHOME_FLOORPLAN_SERVER: string;
  EZHOME_PANOVIEWER_URL: string;
  EZHOME_VIDEOEDITOR_URL: string;
  EZHOME_PANO_LIGHTMIX_URL: string;
  EZHOME_RAYTRACE_URL: string;
  EZHOME_SIGNIN_SERVER: string;
  EZHOME_SSJ_API_SERVER: string;
  EZHOME_SSJ_BOM_API_SERVER: string;
  EZHOME_HELP_CENTER: string;
  EZHOME_HELP_CENTER_HOTKEYS: string;
  EZHOME_HELP_CENTER_DESIGN_FILTER: string;
  EZHOME_HELP_CENTER_VIDEOS: string;
  EZHOME_WELCOME_HELP_CENTER_VIDEOS: string;
  EZHOME_DESIGN_CASE: string;
  EZHOME_DESIGN_MODEL: string;
  EZHOME_CURRENCY_SYMBOL: string;
  FAVORITES_TYPE: string;
  PAGINATION_ENABLE: boolean;
  CATALOG_CEILINGTILLE_GOTO_BUTTON_ENABLE: boolean;
  LOCALE: string;
  PRODUCTS_COLOR_ATTR_ID: string;
  PRODUCTS_PACKAGETYPE_ATTR_ID: string;
  PRODUCTS_CUSTOMIZED_PRODUCT_TYPE_ATTR_ID: string;
  PRODUCTS_IS_LOOP_TILE_ATTR_ID: string;
  PRODUCTS_IS_LOOP_TILE_TRUE_ID: string;
  PRODUCTS_ROOM_TYPE: string;
  PRODUCTS_ROOM_STYLE: string;
  PRODUCTS_WHOLEHOUSE_AREA_RANGE: string;
  PRODUCTS_WHOLEHOUSE_AREA: string;
  PRODUCTS_WHOLEHOUSE_BEDROOM_COUNT: string;
  PRODUCTS_WHOLEHOUSE_LIVEINGROOM_COUNT: string;
  PRODUCTS_WHOLEHOUSE_BATHROOM_COUNT: string;
  PRODUCTS_IS_2D_MODEL_ATTR_ID: string;
  PRODUCTS_IS_2D_MODEL_ATTR_VALUE: string[];
  ENABLE_AUTOSTYLER: boolean;
  USE_NEW_WELCOME_SCREEN: boolean;
  HELP_LANGUAGE_SWITCH: boolean;
  DEFAULT_DOOR_LOCK_IMG: string;
  DEFAULT_DOOR_PULL_IMG: string;
  CONFIG_REGION: boolean;
  SITE_HOME: string;
  USERCENTER_URL: string;
  MY_WORKBENCH_URL: WorkbenchUrls;
  STATIC_VERIFICATION_URL: string;
  MESSAGECENTER_URL: string;
  EZHOME_S3_URL_TAGGING: string;
  MALL_URL: string;
  MEMBER_CENTER_URL: string;
  DESIGNER_PAGE: string;
  FIRST_SAVE_NOT_SIGNIN_SURVEY: string;
  FIRST_SAVE_CANCEL_SAVE_SURVEY: string;
  FIRST_SAVE_SUCCESSFULLY_SURVEY: string;
  ENABLE_FIRST_SAVE_SURVEY: boolean;
  EXPORTDWG_SURVEY: string;
  ENABLE_EXPORTDWG_SURVEY: boolean;
  PASSPORT_SERVER: string;
  IPASSPORT_SERVER: string;
  OAUTH_WEB_CLIENT_ID: string;
  OAUTH_TOKEN_COOKIE_NAME: string;
  SSO_USER_COOKIE_NAME: string;
  EZHOME_AUTOSTYLER_SERVER: string;
  PLATFORM_LOGOUT_URL: string;
  PLATFORM_LOGIN_ENV: string;
  EAAPIHOST: ApiHostOverrides;
  TAOBAOLOGOUTURI: string;
  JIATAOBAO: string;
  TAOBAO_LOGIN_ENV: string;
  CAD_AUTO_BUILD_WALL_OPENING_PRODUCT: CadAutoOpeningProduct;
  GUIDE_COPY_DESIGNID: string;
  CNAME_PATTERN_MAPS: CnamePatternMap[];
  MODEL_LIBRARY_POOL: ModelLibraryPool;
}

declare global {
  interface Window {
    HSApp?: {
      PartnerConfig?: Partial<PartnerConfig>;
    };
  }
}

export function initPartnerConfig(): void {
  const config: PartnerConfig = {
    EZHOME_RENDER_JOB_MANAGEMENT_SERVER: "https://api.shejijia.test/rendermw/api/renderjobmanager",
    EZHOME_RENDER_INTENSITYMULTIPLIER_THRESHOLD: 1.2,
    EZHOME_RENDER_EXPOSURE_CALIBRATION_ENABLE: true,
    EZHOME_FLOORPLAN_SERVER: location.origin,
    EZHOME_PANOVIEWER_URL: "https://pano.shejijia.test/",
    EZHOME_VIDEOEDITOR_URL: "https://ve.shejijia.com",
    EZHOME_PANO_LIGHTMIX_URL: "https://pre-lightmix.shejijia.com",
    EZHOME_RAYTRACE_URL: "https://pre-raytrace.shejijia.com",
    EZHOME_SIGNIN_SERVER: "https://rms-shejijia.taobao.com/sso",
    EZHOME_SSJ_API_SERVER: "https://api.shejijia.test/",
    EZHOME_SSJ_BOM_API_SERVER: "https://api.shejijia.test/package/api/v1/quotes/bom",
    EZHOME_HELP_CENTER: "https://www.shejijia.com/toutiao/35523.html",
    EZHOME_HELP_CENTER_HOTKEYS: "https://www.shejijia.com/toutiao/29121.html",
    EZHOME_HELP_CENTER_DESIGN_FILTER: "https://bbs.shejijia.test/post/view/2969",
    EZHOME_HELP_CENTER_VIDEOS: "https://pre-www.shejijia.com/xueyuan",
    EZHOME_WELCOME_HELP_CENTER_VIDEOS: "https://www.shejijia.com/xueyuan/category/list",
    EZHOME_DESIGN_CASE: "https://www.shejijia.test/design/",
    EZHOME_DESIGN_MODEL: "https://www.shejijia.test/model",
    EZHOME_CURRENCY_SYMBOL: "￥",
    FAVORITES_TYPE: "favorites",
    PAGINATION_ENABLE: true,
    CATALOG_CEILINGTILLE_GOTO_BUTTON_ENABLE: true,
    LOCALE: "zh_CN",
    PRODUCTS_COLOR_ATTR_ID: "f89e5131-3ddb-4b55-b522-50205909c3e4",
    PRODUCTS_PACKAGETYPE_ATTR_ID: "55d5456e-a5d9-4725-970d-1404f8a8f6ab",
    PRODUCTS_CUSTOMIZED_PRODUCT_TYPE_ATTR_ID: "attr-customized-product-type",
    PRODUCTS_IS_LOOP_TILE_ATTR_ID: "attr-isLoopTile",
    PRODUCTS_IS_LOOP_TILE_TRUE_ID: "2609d6c4-cd3b-454a-91ab-5f2af66111c4",
    PRODUCTS_ROOM_TYPE: "204ec253-f720-4316-ab9b-4591fc17470e",
    PRODUCTS_ROOM_STYLE: "1094b167-9cf4-4606-ab11-4b351e49ab77",
    PRODUCTS_WHOLEHOUSE_AREA_RANGE: "attr-customized-roomsizerange",
    PRODUCTS_WHOLEHOUSE_AREA: "attr-customized-roomsize",
    PRODUCTS_WHOLEHOUSE_BEDROOM_COUNT: "attr-customized-bedroomcount",
    PRODUCTS_WHOLEHOUSE_LIVEINGROOM_COUNT: "attr-customized-livingroomcount",
    PRODUCTS_WHOLEHOUSE_BATHROOM_COUNT: "attr-customized-bathroomcount",
    PRODUCTS_IS_2D_MODEL_ATTR_ID: "f2ebc921-291a-42c6-be8d-e6f3019672fb",
    PRODUCTS_IS_2D_MODEL_ATTR_VALUE: [
      "001e1123-52fb-42d4-a4fe-beffcfc6749f",
      "c7caefaf-fc4d-4e40-960c-01445f43e949",
      "0ead8cb5-9726-4e12-9b8b-7b577fafa503"
    ],
    ENABLE_AUTOSTYLER: true,
    USE_NEW_WELCOME_SCREEN: true,
    HELP_LANGUAGE_SWITCH: true,
    DEFAULT_DOOR_LOCK_IMG: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/bom/doorlock.png",
    DEFAULT_DOOR_PULL_IMG: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/bom/doorpull.png",
    CONFIG_REGION: true,
    SITE_HOME: "https://www.shejijia.test",
    USERCENTER_URL: "https://my.shejijia.test",
    MY_WORKBENCH_URL: {
      ihomeFactory: "https://pre-saas.shejijia.com/factory/",
      ihomeServiceProvider: "https://pre-saas.shejijia.com/software/",
      ihomeStore: "https://pre-saas.shejijia.com/smartstore/",
      shejishi: "https://pre-jia.taobao.com/designer/",
      ihomeDecoration: "https://pre-saas.shejijia.com/decoration/",
      ihomeXmerchant: "https://pre-saas.shejijia.com/jia/",
      toApplyBiz: "https://pre-saas.shejijia.com/zhizao",
      icbu: "https://pre-jia.taobao.com/icbu",
      designMerchant: "https://pre-jia.taobao.com/workbench",
      ihomeXmerchant_mpmwsaas: "https://pre-saas.shejijia.com/saas"
    },
    STATIC_VERIFICATION_URL: "https://www.shejijia.test/hs-statics/verification.html",
    MESSAGECENTER_URL: "https://my.shejijia.test/message",
    EZHOME_S3_URL_TAGGING: "https://jr-alpha-cms-assets.oss-cn-beijing.aliyuncs.com/floorplan/tag",
    MALL_URL: "https://uat-mall.homestyler.com/cn",
    MEMBER_CENTER_URL: "https://api.shejijia.test/member",
    DESIGNER_PAGE: "https://www.shejijia.test/designer",
    FIRST_SAVE_NOT_SIGNIN_SURVEY: "https://www.lediaocha.com/pc/s/lnkwz67n",
    FIRST_SAVE_CANCEL_SAVE_SURVEY: "https://www.lediaocha.com/pc/s/p34r2mon",
    FIRST_SAVE_SUCCESSFULLY_SURVEY: "https://www.lediaocha.com/pc/s/q30rr543",
    ENABLE_FIRST_SAVE_SURVEY: false,
    EXPORTDWG_SURVEY: "https://wj.qq.com/s/2916317/e25d/",
    ENABLE_EXPORTDWG_SURVEY: true,
    PASSPORT_SERVER: "https://passport.shejijia.test/",
    IPASSPORT_SERVER: "https://ipassport.shejijia.test/",
    OAUTH_WEB_CLIENT_ID: "hs-uat-0acd53b79d4453df62e504ca449530d619ec3b6232cebf89dc3579a0268a7fcf",
    OAUTH_TOKEN_COOKIE_NAME: "oauth_uat",
    SSO_USER_COOKIE_NAME: "user_uat",
    EZHOME_AUTOSTYLER_SERVER: "https://api.shejijia.test/fpmw",
    PLATFORM_LOGOUT_URL: "https://havanalogin.taobao.net/logout.htm",
    PLATFORM_LOGIN_ENV: "daily",
    EAAPIHOST: {
      EZHOME_RENDER_JOB_MANAGEMENT_SERVER: "https://api.homestyler.taobao.net/rendermw/api/renderjobmanager",
      EZHOME_SSJ_API_SERVER: "https://api.homestyler.taobao.net/",
      EZHOME_SSJ_BOM_API_SERVER: "https://api.homestyler.taobao.net/package/api/v1/quotes/bom",
      EZHOME_AUTOSTYLER_SERVER: "https://api.homestyler.taobao.net/fpmw",
      MEMBER_CENTER_URL: "https://api.homestyler.taobao.net/member",
      PASSPORT_SERVER: "https://passport.homestyler.test/",
      IPASSPORT_SERVER: "https://ipassport.homestyler.test/"
    },
    TAOBAOLOGOUTURI: "https://login.daily.shejijia.test/member/logout.jhtml",
    JIATAOBAO: "https://pre-jia.taobao.com/ihome-shejijia/login",
    TAOBAO_LOGIN_ENV: "uat",
    CAD_AUTO_BUILD_WALL_OPENING_PRODUCT: {
      InDoor: "4dc3b138-ffa9-4dd9-97ca-5862c0bd3dfb",
      InDoorSliding: "44df6556-caaa-4aff-a096-c73cc271c3c3",
      OutDoor: "127accc2-db5a-4981-ad0e-1112113e40fe",
      Window: "df2487bf-ad58-48eb-94c1-376052c58542",
      FloorWindow: "b4705ee3-18e1-4199-a681-a9dd871d8905",
      Hole: ""
    },
    GUIDE_COPY_DESIGNID: "c1bafb2c-8a05-4684-9354-d6d351eb67af",
    CNAME_PATTERN_MAPS: [
      {
        hosts: [
          "juran-prod-assets.s3.cn-north-1.amazonaws.com.cn",
          "s3.homestyler.com/juran-prod-assets",
          "s3.cn-north-1.amazonaws.com.cn/juran-prod-assets"
        ],
        cnamePattern: "s4#index#.shejijia.com",
        count: 10
      },
      {
        hosts: [
          "juran-prod-contents.s3.cn-north-1.amazonaws.com.cn",
          "s3.homestyler.com/juran-prod-contents",
          "s3.cn-north-1.amazonaws.com.cn/juran-prod-contents"
        ],
        cnamePattern: "s5#index#.shejijia.com",
        count: 10
      },
      {
        hosts: [
          "ezhome-alpha-cms-assets.s3.cn-north-1.amazonaws.com.cn",
          "s3.homestyler.com/ezhome-alpha-cms-assets",
          "s3.cn-north-1.amazonaws.com.cn/ezhome-alpha-cms-assets"
        ],
        cnamePattern: "s1#index#.shejijia.com",
        count: 10
      },
      {
        hosts: [
          "juran-staging-contents.s3.cn-north-1.amazonaws.com.cn",
          "s3.homestyler.com/juran-staging-contents"
        ],
        cnamePattern: "ezhome-uat-pim-assets.oss-cn-beijing.aliyuncs.com",
        count: 10
      },
      {
        hosts: [
          "//juran-prod-assets-iso.oss-cn-beijing.aliyuncs.com",
          "//juran-prod-assets.oss-cn-beijing.aliyuncs.com"
        ],
        cnamePattern: "//a#index#.shejijia.com",
        count: 10
      }
    ],
    MODEL_LIBRARY_POOL: {
      high_quality: {
        poolId: 462145,
        categoryId: "ee3d20b5-90b1-4cef-b27d-1728e9b20a92"
      },
      high_commission: {
        poolId: 510003,
        categoryId: "b19647a5-f6da-4fb1-9f61-95e6aee63fed"
      }
    }
  };

  if (typeof window !== 'undefined') {
    window.HSApp = window.HSApp ?? {};
    window.HSApp.PartnerConfig = window.HSApp.PartnerConfig ?? {};
    Object.assign(window.HSApp.PartnerConfig, config);
  }
}