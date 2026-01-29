export interface MyWorkbenchUrlConfig {
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

export interface CadAutoBuilWallOpeningProduct {
  InDoor: string;
  InDoorSliding: string;
  OutDoor: string;
  Window: string;
  FloorWindow: string;
  Hole: string;
}

export interface EaApiHost {
  EZHOME_RENDER_JOB_MANAGEMENT_SERVER: string;
  EZHOME_SSJ_API_SERVER: string;
  EZHOME_SSJ_BOM_API_SERVER: string;
  EZHOME_AUTOSTYLER_SERVER: string;
  MEMBER_CENTER_URL: string;
  PASSPORT_SERVER: string;
  IPASSPORT_SERVER: string;
}

export interface CnamePatternMap {
  hosts: string[];
  cnamePattern: string;
  count: number;
}

export interface ModelLibraryPoolItem {
  poolId: number;
  categoryId: string;
}

export interface ModelLibraryPool {
  high_quality: ModelLibraryPoolItem;
  high_commission: ModelLibraryPoolItem;
}

export interface Configuration {
  GUIDE_COPY_DESIGNID: string;
  EZHOME_RENDER_JOB_MANAGEMENT_SERVER: string;
  GLOBAL_WEBSITE_API: string;
  EZHOME_FLOORPLAN_SERVER: string;
  EZHOME_PANOVIEWER_URL: string;
  EZHOME_VIDEOEDITOR_URL: string;
  EZHOME_PANO_LIGHTMIX_URL: string;
  EZHOME_RAYTRACE_URL: string;
  EZHOME_HELP_CENTER: string;
  EZHOME_HELP_CENTER_HOTKEYS: string;
  EZHOME_HELP_CENTER_DESIGN_FILTER: string;
  EZHOME_HELP_CENTER_VIDEOS: string;
  EZHOME_WELCOME_HELP_CENTER_VIDEOS: string;
  EZHOME_DESIGN_CASE: string;
  EZHOME_DESIGN_MODEL: string;
  EZHOME_SIGNIN_SERVER: string;
  EZHOME_SSJ_API_SERVER: string;
  EZHOME_SSJ_BOM_API_SERVER: string;
  HELP_LANGUAGE_SWITCH: boolean;
  EZHOME_RENDER_INTENSITYMULTIPLIER_THRESHOLD: number;
  EZHOME_RENDER_EXPOSURE_CALIBRATION_ENABLE: boolean;
  SITE_HOME: string;
  USERCENTER_URL: string;
  MY_WORKBENCH_URL: MyWorkbenchUrlConfig;
  STATIC_VERIFICATION_URL: string;
  MESSAGECENTER_URL: string;
  EZHOME_S3_URL_TAGGING: string;
  EZHOME_EXPORT_SCENE_SERVER: string;
  EZHOME_AUTOSTYLER_SERVER: string;
  MALL_URL: string;
  BRAND_FILTER_SURVEY: string;
  ENABLE_BRAND_FILTER_SURVEY: boolean;
  PASSPORT_SERVER: string;
  IPASSPORT_SERVER: string;
  IPASSPORT_PAGE_URL: string;
  MEMBER_CENTER_URL: string;
  DESIGNER_PAGE: string;
  TAOBAOLOGOUTURI: string;
  JIATAOBAO: string;
  TAOBAO_LOGIN_ENV: string;
  OAUTH_WEB_CLIENT_ID: string;
  OAUTH_TOKEN_COOKIE_NAME: string;
  SSO_USER_COOKIE_NAME: string;
  IHOME_EDITOR_URL: string;
  CAD_AUTO_BUILD_WALL_OPENING_PRODUCT: CadAutoBuilWallOpeningProduct;
  PLATFORM_LOGOUT_URL: string;
  PLATFORM_LOGIN_ENV: string;
  EAAPIHOST: EaApiHost;
  CNAME_PATTERN_MAPS: CnamePatternMap[];
  MODEL_LIBRARY_POOL: ModelLibraryPool;
}

const configuration: Configuration = {
  GUIDE_COPY_DESIGNID: "630de38c-5b7c-4d96-b52e-fb3da1b6f353",
  EZHOME_RENDER_JOB_MANAGEMENT_SERVER: "https://api.shejijia.com/rendermw/api/renderjobmanager",
  GLOBAL_WEBSITE_API: "",
  EZHOME_FLOORPLAN_SERVER: "",
  EZHOME_PANOVIEWER_URL: "https://pano.shejijia.com",
  EZHOME_VIDEOEDITOR_URL: "https://ve.shejijia.com",
  EZHOME_PANO_LIGHTMIX_URL: "https://lightmix.shejijia.com",
  EZHOME_RAYTRACE_URL: "https://raytrace.shejijia.com",
  EZHOME_HELP_CENTER: "https://www.shejijia.com/toutiao/35523.html",
  EZHOME_HELP_CENTER_HOTKEYS: "https://www.shejijia.com/toutiao/29121.html",
  EZHOME_HELP_CENTER_DESIGN_FILTER: "https://bbs.shejijia.com/post/view/2969",
  EZHOME_HELP_CENTER_VIDEOS: "https://www.shejijia.com/xueyuan",
  EZHOME_WELCOME_HELP_CENTER_VIDEOS: "https://www.shejijia.com/xueyuan/category/list",
  EZHOME_DESIGN_CASE: "https://www.shejijia.com/design/",
  EZHOME_DESIGN_MODEL: "https://www.shejijia.com/model",
  EZHOME_SIGNIN_SERVER: "https://rms.homestyler.com/sso",
  EZHOME_SSJ_API_SERVER: "https://api.shejijia.com/",
  EZHOME_SSJ_BOM_API_SERVER: "https://api.shejijia.com/package/api/v1/quotes/bom",
  HELP_LANGUAGE_SWITCH: false,
  EZHOME_RENDER_INTENSITYMULTIPLIER_THRESHOLD: 1.2,
  EZHOME_RENDER_EXPOSURE_CALIBRATION_ENABLE: true,
  SITE_HOME: "https://www.shejijia.com",
  USERCENTER_URL: "https://my.shejijia.com",
  MY_WORKBENCH_URL: {
    ihomeFactory: "https://saas.shejijia.com/factory/",
    ihomeServiceProvider: "https://saas.shejijia.com/software/",
    ihomeStore: "https://saas.shejijia.com/smartstore/",
    shejishi: "https://jia.taobao.com/designer/",
    ihomeDecoration: "https://saas.shejijia.com/decoration/",
    ihomeXmerchant: "https://saas.shejijia.com/jia/",
    toApplyBiz: "https://saas.shejijia.com/zhizao",
    icbu: "https://jia.taobao.com/icbu",
    designMerchant: "https://jia.taobao.com/workbench",
    ihomeXmerchant_mpmwsaas: "https://saas.shejijia.com/saas"
  },
  STATIC_VERIFICATION_URL: "https://www.shejijia.com/hs-statics/verification.html",
  MESSAGECENTER_URL: "https://my.shejijia.com/message/notice",
  EZHOME_S3_URL_TAGGING: "https://jr-prod-cms-assets.oss-cn-beijing.aliyuncs.com/floorplan/tag",
  EZHOME_EXPORT_SCENE_SERVER: "http://47.95.219.76:30051",
  EZHOME_AUTOSTYLER_SERVER: "https://api.shejijia.com/fpmw",
  MALL_URL: "https://mall.homestyler.com/cn",
  BRAND_FILTER_SURVEY: "https://wj.qq.com/s/2746971/d107",
  ENABLE_BRAND_FILTER_SURVEY: false,
  PASSPORT_SERVER: "https://passport.shejijia.com/",
  IPASSPORT_SERVER: "https://ipassport.shejijia.com/",
  IPASSPORT_PAGE_URL: "https://saas.shejijia.com/ea/bind-sjj",
  MEMBER_CENTER_URL: "https://api.shejijia.com/member",
  DESIGNER_PAGE: "https://www.shejijia.com/designer",
  TAOBAOLOGOUTURI: "https://login.taobao.com/member/logout.jhtml",
  JIATAOBAO: "https://jia.taobao.com/ihome-shejijia/login",
  TAOBAO_LOGIN_ENV: "prod",
  OAUTH_WEB_CLIENT_ID: "hs7dbc0d1026eb34829a7d71170fb3ae0a2d197b017b50a77887019b65074ddfc6",
  OAUTH_TOKEN_COOKIE_NAME: "oauth",
  SSO_USER_COOKIE_NAME: "user",
  IHOME_EDITOR_URL: "https://jia.taobao.com/ihome-design/user/homestyler",
  CAD_AUTO_BUILD_WALL_OPENING_PRODUCT: {
    InDoor: "a7a11e60-7473-4a3d-ae31-acad7f648c1b",
    InDoorSliding: "59c060a7-84c6-4d8e-9e10-c5f706a98d88",
    OutDoor: "61395840-eb0d-4868-970c-21e0dfb7fe97",
    Window: "df2487bf-ad58-48eb-94c1-376052c58542",
    FloorWindow: "a3017175-01da-4bbb-a3f4-aa896e3fa604",
    Hole: ""
  },
  PLATFORM_LOGOUT_URL: "https://havanalogin.taobao.com/logout.htm",
  PLATFORM_LOGIN_ENV: "prod",
  EAAPIHOST: {
    EZHOME_RENDER_JOB_MANAGEMENT_SERVER: "https://api.homestyler.taobao.com/rendermw/api/renderjobmanager",
    EZHOME_SSJ_API_SERVER: "https://api.homestyler.taobao.com/",
    EZHOME_SSJ_BOM_API_SERVER: "https://api.homestyler.taobao.com/package/api/v1/quotes/bom",
    EZHOME_AUTOSTYLER_SERVER: "https://api.homestyler.taobao.com/fpmw",
    MEMBER_CENTER_URL: "https://api.homestyler.taobao.com/member",
    PASSPORT_SERVER: "https://passport.homestyler.com.cn/",
    IPASSPORT_SERVER: "https://ipassport.homestyler.com.cn/"
  },
  CNAME_PATTERN_MAPS: [
    {
      hosts: ["jr-prod-pim-products.oss-cn-beijing.aliyuncs.com"],
      cnamePattern: "s4#index#.shejijia.com",
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
      poolId: 461124,
      categoryId: "b83889b5-0c42-4f26-99e0-8b10e9057b85"
    },
    high_commission: {
      poolId: 482490,
      categoryId: "d0ad903a-f92a-4e01-849d-c0399522b02b"
    }
  }
};

export default configuration;