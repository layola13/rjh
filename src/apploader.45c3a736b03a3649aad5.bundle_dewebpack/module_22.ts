interface QueryStrings {
  env?: string;
  packageId?: string;
  preciseFP?: string;
  hxrr?: string;
  version?: string;
  enableInternalNet?: string;
  serviceType?: string;
  caseId?: string;
}

interface MetaElement extends HTMLMetaElement {
  version?: HTMLMetaElement;
  newFpVersion?: HTMLMetaElement;
  tpzzVersion?: HTMLMetaElement;
  appconfig?: HTMLMetaElement;
}

interface AppVersionConfig {
  versionType?: string;
  webConfigVersion: {
    paths: string[];
  };
}

interface APIResponse {
  ret: string[];
  data?: {
    result?: {
      toolVersion?: string;
      storeId?: string;
      libraryId?: string;
    };
    storeId?: string;
    libraryId?: string;
  };
  status?: {
    code: number;
  };
}

interface TpzzEnvInfo {
  storeId?: string;
  libraryId?: string;
  publishEnv: string;
  serviceType?: string;
  caseId?: string;
}

interface UserVersionCache {
  expirTime: number;
  version: string;
}

interface EnvConfig {
  configEnv: string;
  biz: string;
}

interface LoadConfigParams {
  version: string;
  configEnv?: string;
  biz: string;
  env?: string;
  appconfig: string;
  packageId?: string;
}

declare global {
  interface Window {
    AppVersionConfig: AppVersionConfig;
    publishVersion: string;
    publishVersionByType?: string;
    globalClientUser?: unknown;
  }
}

import DEFAULT_CONFIG from './166';
import NetworkMonitor from './471';
import showAlert from './564';
import initializeTracking from './316';
import {
  getQueryStringsFromUrl,
  isZhiZao,
  getAPIPromise,
  hintOnNullVersion,
  getEnvByAppconfig,
  isEarlierThan,
  check32BitBrowser,
  hintOnLoginError,
  jumpToTargetUrl,
  isNewFpTool
} from './734';
import showNotification from './496';
import showNetworkTip from './329';
import { loadTitle, loadFavIcon, LoadingImage, loadIndexByUser } from './404';
import NetworkUtils from './901';
import ERROR_CODES from './728';

const USER_VERSION_STORAGE_KEY = '_vtool_user_version_';
const NETWORK_CHECK_TIMEOUT = 5000;

/**
 * Load application configuration and initialize scripts
 */
function loadAppConfig(publishVersion: string, appConfigName: string): void {
  if (!publishVersion || !appConfigName) {
    alert('未获取到对应的配置信息，请联系客服解决！');
    return;
  }

  const isProduction = typeof appConfigName === 'string' && appConfigName.includes('prod');

  try {
    if (appConfigName.includes('tpzz') || biz === 'global') {
      loadTitle(DEFAULT_CONFIG.DEFAULT_TITLE);
      loadFavIcon(DEFAULT_CONFIG.DEFAULT_FAV_ICON);
    } else {
      const isNewTool = isNewFpTool(publishVersion, biz, appConfigName);
      const isHaiXun = queryParams.hxrr === 'true';

      if (isHaiXun || !isNewTool) {
        LoadingImage(isNewTool, isProduction, isHaiXun);
      } else {
        loadIndexByUser(biz, env);
      }
    }
  } catch (error) {
    // Silent error handling
  }

  const cdnDomain = isProduction
    ? 'https://g.alicdn.com'
    : 'https://dev.g.alicdn.com';

  const configUrl = `${cdnDomain}/tpsjj/homestyler-webapp-config/${publishVersion}/webapp.config-${appConfigName}.json`;

  fetch(configUrl)
    .then((response) => response.json())
    .then((config: AppVersionConfig) => {
      window.AppVersionConfig = config;
      window.publishVersion = publishVersion;

      if (config.versionType) {
        window.publishVersionByType = `${config.versionType}_${publishVersion}`;
      }

      config.webConfigVersion.paths.forEach((scriptPath) => {
        const scriptElement = document.createElement('script');
        scriptElement.src = scriptPath;
        scriptElement.async = false;
        document.getElementsByTagName('body')[0].append(scriptElement);
      });
    })
    .catch(() => {
      alert('未获取到对应的配置信息，请联系客服解决！');
    });
}

/**
 * Get effective tool version from API response or fallback
 */
function getEffectiveVersion(response: APIResponse | undefined, biz: string): string {
  const result = response?.data?.result;
  let version = '';

  if (response?.ret?.[0]?.includes('SUCCESS') && result?.toolVersion) {
    version = result.toolVersion;
  } else if (userChosenVersion && ['global'].includes(biz) && !isZhiZao()) {
    if (userChosenVersion === 'new' && newFpVersionMeta?.content) {
      version = newFpVersionMeta.content;
    } else if (userChosenVersion === 'old' && versionMeta?.content) {
      version = versionMeta.content;
    }
  }

  return version;
}

/**
 * Fetch user gray version and load configuration
 */
function fetchUserVersion(params: LoadConfigParams): void {
  const { version, appconfig, biz, env, packageId } = params;
  let effectiveVersion = version;

  if (typeof appconfig === 'string' && isZhiZao()) {
    getAPIPromise('getTpzzEnv', biz, env, { packageId })
      .then((tpzzEnvResponse) => {
        const publishEnv = appconfig.includes('tpzz') ? 'tpzz' : 'public';
        const serviceType = queryParams.serviceType;
        const caseId = queryParams.caseId;

        const tpzzEnvInfo: TpzzEnvInfo = {
          storeId: tpzzEnvResponse?.data?.storeId,
          libraryId: tpzzEnvResponse?.data?.libraryId,
          publishEnv,
          serviceType,
          caseId
        };

        getAPIPromise('getUserGrayVersion', biz, env, { tpzzEnvInfo })
          .then((grayVersionResponse) => {
            const result = grayVersionResponse.data?.result;

            if (grayVersionResponse?.ret[0]?.includes('SUCCESS') && result?.toolVersion) {
              effectiveVersion = result.toolVersion;
              loadAppConfig(effectiveVersion, appconfig);
            } else {
              hintOnNullVersion(
                queryParams,
                'Error: after request getUserGrayVersion',
                ERROR_CODES.getUserGrayVersion,
                grayVersionResponse?.ret?.[0]
              );
            }
          })
          .catch((error) => {
            hintOnNullVersion(
              queryParams,
              'Error: while request getUserGrayVersion',
              ERROR_CODES.getUserGrayVersion,
              error?.ret?.[0]
            );
          });
      })
      .catch((error) => {
        hintOnNullVersion(
          queryParams,
          'Error: while request getTpzzEnv',
          ERROR_CODES.getTpzzEnv,
          error?.ret?.[0]
        );
      });
  } else {
    getAPIPromise('getUserGrayVersion', biz, env)
      .then((response) => {
        effectiveVersion = getEffectiveVersion(response, biz) || effectiveVersion;
        loadAppConfig(effectiveVersion, appconfig);
      })
      .catch(() => {
        effectiveVersion = getEffectiveVersion(undefined, biz) || effectiveVersion;
        loadAppConfig(effectiveVersion, appconfig);
      });
  }
}

// Parse URL query parameters
const queryParams: QueryStrings = getQueryStringsFromUrl(location.search);

// Extract meta tag content
const metaTags = document.getElementsByTagName('meta') as unknown as MetaElement;
const versionMeta = metaTags.version;
const newFpVersionMeta = metaTags.newFpVersion;
const tpzzVersionMeta = metaTags.tpzzVersion;
const appConfigMeta = metaTags.appconfig;
const appConfig = appConfigMeta?.content;

// Extract environment variables
const env = queryParams.env;
const packageId = queryParams.packageId;
const { configEnv, biz }: EnvConfig = getEnvByAppconfig(appConfig, env);
const preciseFP = queryParams.preciseFP;
const isHaiXun = queryParams.hxrr === 'true';

// Check for cached version
let toolVersion: string | undefined;
const cachedVersionData = localStorage.getItem(USER_VERSION_STORAGE_KEY);

if (cachedVersionData) {
  const { expirTime, version }: UserVersionCache = JSON.parse(cachedVersionData);

  if (Date.now() <= expirTime && version) {
    let effectiveAppConfig = appConfig;

    if (isZhiZao() && isEarlierThan(version, '0.0.1000')) {
      const configParts = appConfig?.split('-') ?? [];
      configParts[configParts.length - 1] = 'tpzz';
      effectiveAppConfig = configParts.join('-');
    }

    toolVersion = version;
    if (effectiveAppConfig) {
      loadAppConfig(toolVersion, effectiveAppConfig);
    }
  } else {
    localStorage.removeItem(USER_VERSION_STORAGE_KEY);
  }
}

// Perform network and browser checks
try {
  const networkDetector = new NetworkUtils.NetworkDetect(biz);
  const checkPromises: Promise<unknown>[] = [
    check32BitBrowser(),
    networkDetector.detectOpenToolNetwork(DEFAULT_CONFIG.NETWORK_CHECK_IMG)
  ];

  const enableInternalNet = !isZhiZao() && queryParams.enableInternalNet === 'true';

  if (enableInternalNet) {
    checkPromises.push(networkDetector.detectinternalNetwork());
  }

  Promise.allSettled(checkPromises).then((results) => {
    if (results?.[0]?.status === 'fulfilled' && results[0].value) {
      const message = biz === 'global'
        ? 'It is detected that your browser version is 32-bit. Please upgrade your browser version for better experience.'
        : '检测到您的浏览器版本为32bit，建议升级您的浏览器版本';
      showNotification(message);
    }

    if (enableInternalNet && results[2]?.status === 'fulfilled') {
      const networkMessages = results[2].value as string[];
      if (networkMessages?.length > 0) {
        showNetworkTip(networkMessages[0], true);
        setTimeout(() => {
          showNetworkTip(networkMessages[1], false);
        }, NETWORK_CHECK_TIMEOUT);
      }
    }
  });
} catch (error) {
  // Silent error handling
}

// Initialize monitoring
const monitor = new NetworkMonitor({ biz });
monitor.start();

// Get user's version preference
const userChosenVersion = localStorage.getItem(
  `${window.location.hostname}/3d.tool.fp.version::user-choose-fp-version`
);

// Determine version to load
if (!toolVersion && queryParams.version) {
  toolVersion = queryParams.version;
  if (appConfig) {
    loadAppConfig(toolVersion, appConfig);
  }
} else if (
  !toolVersion &&
  ['homestyler', 'ea'].includes(biz) &&
  !isZhiZao() &&
  preciseFP === 'true' &&
  newFpVersionMeta?.content
) {
  toolVersion = newFpVersionMeta.content;
  if (appConfig) {
    loadAppConfig(toolVersion, appConfig);
  }
} else if (
  !toolVersion &&
  ['homestyler', 'ea'].includes(biz) &&
  !isZhiZao() &&
  preciseFP === 'false' &&
  versionMeta?.content
) {
  toolVersion = versionMeta.content;
  if (appConfig) {
    loadAppConfig(toolVersion, appConfig);
  }
} else if (!toolVersion && (tpzzVersionMeta || versionMeta || newFpVersionMeta)) {
  toolVersion = versionMeta?.content;

  if (newFpVersionMeta && !isZhiZao() && biz !== 'global') {
    toolVersion = newFpVersionMeta.content;
  } else if (tpzzVersionMeta && isZhiZao()) {
    toolVersion = tpzzVersionMeta.content;
  }

  const handleLoginError = (errorSource: string, errorMessage?: string): void => {
    monitor.sendPV();

    if (isZhiZao()) {
      hintOnLoginError(queryParams, 'Error: after request checkUserLoginStatus', errorSource, errorMessage);
    } else if (appConfig?.includes('homestyler')) {
      if (toolVersion && appConfig) {
        loadAppConfig(toolVersion, appConfig);
      }
    } else {
      showAlert(biz, env);
    }
  };

  getAPIPromise('checkUserLoginStatus', biz, env)
    .then((loginResponse) => {
      const isSuccess =
        (loginResponse?.ret?.[0]?.includes('SUCCESS') && loginResponse.data) ||
        (loginResponse?.status?.code === 0);

      if (isSuccess) {
        if (biz === 'ea' || (biz === 'homestyler' && isHaiXun)) {
          const licenseFailureUrl =
            biz === 'homestyler' && isHaiXun
              ? DEFAULT_CONFIG.HAI_XUN_TOOL_LICENSE_FAILURE
              : DEFAULT_CONFIG.TOOL_LICENSE_FAILURE;

          getAPIPromise('checkUserLicenceStatus', biz, env)
            .then((licenseResponse) => {
              if (
                licenseResponse?.ret?.[0]?.includes('SUCCESS') &&
                licenseResponse.data?.result
              ) {
                fetchUserVersion({
                  version: toolVersion!,
                  configEnv,
                  biz,
                  env,
                  appconfig: appConfig!,
                  packageId
                });
              } else {
                jumpToTargetUrl(licenseFailureUrl);
              }
            })
            .catch(() => {
              jumpToTargetUrl(licenseFailureUrl);
            });
        } else {
          fetchUserVersion({
            version: toolVersion!,
            configEnv,
            biz,
            env,
            appconfig: appConfig!
          });

          if (window.globalClientUser) {
            window.globalClientUser = null;
          }

          monitor.setAdskUser(loginResponse.data);
          monitor.sendUV('eLoading');
        }
      } else {
        handleLoginError(ERROR_CODES.checkUserLoginStatus, loginResponse?.ret?.[0]);
      }
    })
    .catch((error) => {
      handleLoginError(ERROR_CODES.checkUserLoginStatus, error?.ret?.[0]);
    });
}

// Initialize tracking for specific business types
if (['homestyler', 'global'].includes(biz) && appConfig) {
  initializeTracking(biz, env, monitor.sendUV.bind(monitor));
}