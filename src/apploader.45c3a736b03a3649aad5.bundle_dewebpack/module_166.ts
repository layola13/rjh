interface MtopConfig {
  MTOPPREFIX: string;
  MTOPSUBDOMAIN: string;
  MTOPMAINDOMIAN: string;
  PAGEDOMAIN: string;
}

interface PlatformLoginUrls {
  ihomeDecoration: string;
  enterprise: string;
  ihomeServiceProvider: string;
  ihomeStore: string;
  ihomeSupplier: string;
  ihomeXmerchant: string;
  toApplyBiz: string;
  ihomeFactory: string;
  designMerchant: string;
}

interface AppConfig {
  homestyler: MtopConfig;
  ea: MtopConfig;
  HOST: string;
  TOOL_LICENSE_FAILURE: string;
  HAI_XUN_TOOL_LICENSE_FAILURE: string;
  PLATFORM_LOGIN_URL: PlatformLoginUrls;
  IPASSPORT_SERVER: string;
  PASSPORT_SERVER: string;
  NETWORK_CHECK_IMG: string;
  LOG_SERVICE_API_SERVER: string;
  DEPLOY_3D_RES_BUCKET: string;
  HINT_ON_NULL_VERSION: string;
  HINT_ON_LOGIN_ERROR: string;
  DEFAULT_TITLE: string;
  DEFAULT_FAV_ICON: string;
  DEFAULT_LOADING_IMG: string;
  DEFAULT_LOADING_DESCRIPTION: string;
  DEFAULT_LOGO_IMG: string;
}

const config: AppConfig = {
  homestyler: {
    MTOPPREFIX: "acs",
    MTOPSUBDOMAIN: "m",
    MTOPMAINDOMIAN: "shejijia.com",
    PAGEDOMAIN: "shejijia.com"
  },
  ea: {
    MTOPPREFIX: "acs",
    MTOPSUBDOMAIN: "m",
    MTOPMAINDOMIAN: "taobao.com",
    PAGEDOMAIN: "shejijia.com"
  },
  HOST: "https://3d.shejijia.com/",
  TOOL_LICENSE_FAILURE: "https://www.shejijia.com/hs-statics/auth/failure.html",
  HAI_XUN_TOOL_LICENSE_FAILURE: "https://seller.shejijia.com/static/authfallback.html?scene=haixun_private",
  PLATFORM_LOGIN_URL: {
    ihomeDecoration: "https://seller.shejijia.com/ea/login?login_type=ea&from_channel=3d&channel_env=ihomeDecoration",
    enterprise: "https://zhizao.meipingmeiwu.com/ea/login?login_type=ea&from_channel=3d&channel_env=enterprise",
    ihomeServiceProvider: "https://zhizao.meipingmeiwu.com/ea/login?domain=ihomeServiceProvider&login_type=ea&from_channel=3d&channel_env=ihomeServiceProvider",
    ihomeStore: "https://zhizao.meipingmeiwu.com/ea/login?domain=ihomeStore&login_type=ea&from_channel=3d&channel_env=ihomeStore",
    ihomeSupplier: "https://zhizao.meipingmeiwu.com/ea/login?domain=ihomeSupplier&login_type=ea&from_channel=3d&channel_env=ihomeSupplier",
    ihomeXmerchant: "https://jia.taobao.com/ea/login?domain=ihomeXmerchant&login_type=ea&from_channel=3d&channel_env=ihomeXmerchant",
    toApplyBiz: "https://jia.taobao.com/ea/login?domain=ihomeXmerchant&login_type=ea&from_channel=3d&channel_env=toApplyBiz",
    ihomeFactory: "https://zhizao.meipingmeiwu.com/ea/login?domain=ihomeFactory&login_type=ea&from_channel=3d&channel_env=ihomeFactory",
    designMerchant: "https://jia.taobao.com/user/login?fullScreen=1"
  },
  IPASSPORT_SERVER: "https://ipassport.shejijia.com/",
  PASSPORT_SERVER: "https://passport.shejijia.com/",
  NETWORK_CHECK_IMG: "https://3d.shejijia.com/3D_NETWORK_TEST.png",
  LOG_SERVICE_API_SERVER: "https://log.shejijia.com/api/rest/v1.0/user/track",
  DEPLOY_3D_RES_BUCKET: "cn-prod-3d-shejijia-com",
  HINT_ON_NULL_VERSION: "null-version",
  HINT_ON_LOGIN_ERROR: "login-error",
  DEFAULT_TITLE: "居然设计家AI设计平台-室内装修效果图在线AI设计",
  DEFAULT_FAV_ICON: "https://3d-assets.shejijia.com/v2/image/logo/homestyler.ico",
  DEFAULT_LOADING_IMG: "https://3d-assets.shejijia.com/v2/image/logo/loading_no_word_newfp.gif",
  DEFAULT_LOADING_DESCRIPTION: "— 为居设计，用心造家 —",
  DEFAULT_LOGO_IMG: "https://3d-assets.shejijia.com/v2/image/logo/pageheaderlargelogo.svg"
};

export default config;