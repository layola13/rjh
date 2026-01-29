interface LoadingConfig {
  title?: string;
  favIcon?: string;
  loadingImg?: string;
  loadingDescription?: string;
  logoImg?: string;
  logoTitle?: string;
}

interface QueryStrings {
  biz_tag?: string;
  mpdomain?: string;
  [key: string]: string | undefined;
}

interface EnterpriseCodeParams {
  enterpriseCode: string;
  customTypeList: string[];
}

interface APIConfig {
  headers: {
    "ea-business-domain": string;
  };
}

interface CustomResultItem {
  customType: string;
  firstImageName?: string;
  firstImage?: string;
}

interface APIResponse {
  ret?: string[];
  data?: {
    result?: CustomResultItem[];
  };
}

const DEFAULT_TITLE = "默认标题";
const DEFAULT_FAV_ICON = "/favicon.ico";
const DEFAULT_LOADING_IMG = "/loading.gif";
const DEFAULT_LOADING_DESCRIPTION = "加载中...";
const DEFAULT_LOGO_IMG = "/logo.png";

const CUSTOM_TYPE_TITLE_IMAGE = "TITLE_IMAGE";
const CUSTOM_TYPE_LOADING_LOGO = "3D_TOOL_LOADING_LOGO";

export function loadFavIcon(iconUrl: string): void {
  const iconElement = document.getElementById("shortcut-icon") as HTMLLinkElement | null;
  if (iconElement) {
    iconElement.setAttribute("href", iconUrl);
  }
}

export function loadTitle(title: string | undefined): void {
  if (title) {
    document.title = title;
  }
}

function renderLoadingUI(config: LoadingConfig = {}): void {
  const {
    title,
    favIcon,
    loadingImg,
    loadingDescription,
    logoImg,
    logoTitle
  } = config;

  loadTitle(title);
  if (favIcon) {
    loadFavIcon(favIcon);
  }

  const container = document.querySelector(".load-container");
  if (!container) {
    return;
  }

  const loadingImage = document.createElement("img");
  loadingImage.className = "loading-img";
  loadingImage.src = loadingImg || "";

  const logoHeading = document.createElement("h1");
  logoHeading.className = "loading-logo";

  const logoTitleSpan = document.createElement("span");
  logoTitleSpan.className = "logo-title";

  if (logoImg) {
    const logoImage = document.createElement("img");
    logoImage.className = "logo-img";
    logoImage.src = logoImg;
    logoTitleSpan.appendChild(logoImage);
  } else if (logoTitle) {
    logoTitleSpan.innerHTML = logoTitle;
  }

  logoHeading.appendChild(logoTitleSpan);

  const description = document.createElement("p");
  description.className = "loading-desc";
  description.innerHTML = loadingDescription || "";

  container.appendChild(loadingImage);
  container.appendChild(logoHeading);
  container.appendChild(description);
}

export function LoadingImage(
  useNewVersion: boolean,
  isProduction: boolean,
  useHaixunStyle: boolean
): void {
  loadTitle(DEFAULT_TITLE);
  loadFavIcon(DEFAULT_FAV_ICON);

  const container = document.querySelector(".load-container");
  if (!container) {
    return;
  }

  const image = document.createElement("img");
  const envPrefix = isProduction ? "" : "pre-";
  const styleType = useHaixunStyle ? "haixun-loading" : "bootloader-loading";
  const versionSuffix = useNewVersion && !useHaixunStyle ? "-newfp" : "";
  
  const imageUrl = `https://${envPrefix}3d-assets.shejijia.com/v2/image/logo/${styleType}${versionSuffix}.gif`;
  
  image.src = imageUrl;
  container.appendChild(image);
}

export function loadIndexByUser(
  apiEndpoint: string,
  apiToken: string
): void {
  const defaultConfig: LoadingConfig = {
    title: DEFAULT_TITLE,
    favIcon: DEFAULT_FAV_ICON,
    loadingImg: DEFAULT_LOADING_IMG,
    loadingDescription: DEFAULT_LOADING_DESCRIPTION,
    logoImg: DEFAULT_LOGO_IMG,
    logoTitle: ""
  };

  const queryStrings = getQueryStringsFromUrl(location.search);
  const bizTag = queryStrings?.biz_tag || "";

  if (!bizTag) {
    renderLoadingUI(defaultConfig);
    return;
  }

  const requestParams: EnterpriseCodeParams = {
    enterpriseCode: bizTag,
    customTypeList: [CUSTOM_TYPE_LOADING_LOGO, CUSTOM_TYPE_TITLE_IMAGE]
  };

  const requestConfig: APIConfig = {
    headers: {
      "ea-business-domain": queryStrings?.mpdomain || ""
    }
  };

  getAPIPromise("getEnterpriseCode", apiEndpoint, apiToken, requestParams, requestConfig)
    .then((response: APIResponse) => {
      const isSuccess = response.ret?.length && response.ret[0].includes("SUCCESS");
      const resultList = response.data?.result;

      if (!isSuccess || !Array.isArray(resultList)) {
        return Promise.reject(new Error("Invalid API response"));
      }

      const titleConfig = resultList.find(
        (item) => item.customType === CUSTOM_TYPE_TITLE_IMAGE
      );
      if (titleConfig) {
        if (titleConfig.firstImageName) {
          defaultConfig.title = titleConfig.firstImageName;
        }
        if (titleConfig.firstImage) {
          defaultConfig.favIcon = titleConfig.firstImage;
        }
      }

      const logoConfig = resultList.find(
        (item) => item.customType === CUSTOM_TYPE_LOADING_LOGO
      );
      if (logoConfig) {
        if (logoConfig.firstImageName) {
          defaultConfig.loadingDescription = logoConfig.firstImageName;
        }
        if (logoConfig.firstImage) {
          defaultConfig.logoImg = logoConfig.firstImage;
        }
      }

      renderLoadingUI(defaultConfig);
    })
    .catch((error: unknown) => {
      console.error(error);
      renderLoadingUI({
        loadingImg: DEFAULT_LOADING_IMG
      });
    });
}

function getQueryStringsFromUrl(search: string): QueryStrings | null {
  if (!search) {
    return null;
  }
  
  const params = new URLSearchParams(search);
  const result: QueryStrings = {};
  
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
}

function getAPIPromise(
  endpoint: string,
  apiUrl: string,
  token: string,
  params: EnterpriseCodeParams,
  config: APIConfig
): Promise<APIResponse> {
  return fetch(`${apiUrl}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...config.headers
    },
    body: JSON.stringify(params)
  }).then((response) => response.json());
}