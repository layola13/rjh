interface NavigatorInfo {
  userAgent: string;
  platform: string;
  maxTouchPoints: number;
}

interface DeviceCategory {
  phone: boolean;
  ipod?: boolean;
  tablet: boolean;
  universal?: boolean;
  device: boolean;
}

interface OtherDeviceCategory {
  blackberry: boolean;
  blackberry10: boolean;
  opera: boolean;
  firefox: boolean;
  chrome: boolean;
  device: boolean;
}

interface DeviceDetectionResult {
  apple: DeviceCategory & { ipod: boolean; universal: boolean };
  amazon: DeviceCategory;
  android: DeviceCategory;
  windows: DeviceCategory;
  other: OtherDeviceCategory;
  any: boolean;
  phone: boolean;
  tablet: boolean;
}

const REGEX_IPHONE = /iPhone/i;
const REGEX_IPOD = /iPod/i;
const REGEX_IPAD = /iPad/i;
const REGEX_IOS_UNIVERSAL = /\biOS-universal(?:.+)Mac\b/i;
const REGEX_ANDROID_MOBILE = /\bAndroid(?:.+)Mobile\b/i;
const REGEX_ANDROID = /Android/i;
const REGEX_AMAZON_PHONE = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i;
const REGEX_AMAZON_TABLET = /Silk/i;
const REGEX_WINDOWS_PHONE = /Windows Phone/i;
const REGEX_WINDOWS_TABLET = /\bWindows(?:.+)ARM\b/i;
const REGEX_BLACKBERRY = /BlackBerry/i;
const REGEX_BLACKBERRY10 = /BB10/i;
const REGEX_OPERA_MINI = /Opera Mini/i;
const REGEX_CHROME_MOBILE = /\b(CriOS|Chrome)(?:.+)Mobile/i;
const REGEX_FIREFOX_MOBILE = /Mobile(?:.+)Firefox\b/i;

const MACINTEL_PLATFORM = "MacIntel";
const MIN_TOUCH_POINTS_FOR_IPAD = 1;

function isIPadOnMac(navigatorInfo: NavigatorInfo): boolean {
  return (
    navigatorInfo.platform === MACINTEL_PLATFORM &&
    typeof navigatorInfo.maxTouchPoints === "number" &&
    navigatorInfo.maxTouchPoints > MIN_TOUCH_POINTS_FOR_IPAD &&
    typeof (globalThis as any).MSStream === "undefined"
  );
}

function detectDevice(input?: string | Partial<NavigatorInfo>): DeviceDetectionResult {
  let navigatorInfo: NavigatorInfo = {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
  };

  if (!input || typeof navigator === "undefined") {
    if (typeof input === "string") {
      navigatorInfo.userAgent = input;
    } else if (input?.userAgent) {
      navigatorInfo = {
        userAgent: input.userAgent,
        platform: input.platform ?? "",
        maxTouchPoints: input.maxTouchPoints ?? 0
      };
    }
  } else {
    navigatorInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      maxTouchPoints: navigator.maxTouchPoints ?? 0
    };
  }

  let cleanedUserAgent = navigatorInfo.userAgent;
  const fbanSplit = cleanedUserAgent.split("[FBAN");
  if (fbanSplit[1] !== undefined) {
    cleanedUserAgent = fbanSplit[0];
  }

  const twitterSplit = cleanedUserAgent.split("Twitter");
  if (twitterSplit[1] !== undefined) {
    cleanedUserAgent = twitterSplit[0];
  }

  const testUserAgent = (regex: RegExp): boolean => regex.test(cleanedUserAgent);

  const result: DeviceDetectionResult = {
    apple: {
      phone: testUserAgent(REGEX_IPHONE) && !testUserAgent(REGEX_WINDOWS_PHONE),
      ipod: testUserAgent(REGEX_IPOD),
      tablet: !testUserAgent(REGEX_IPHONE) && (testUserAgent(REGEX_IPAD) || isIPadOnMac(navigatorInfo)) && !testUserAgent(REGEX_WINDOWS_PHONE),
      universal: testUserAgent(REGEX_IOS_UNIVERSAL),
      device: (testUserAgent(REGEX_IPHONE) || testUserAgent(REGEX_IPOD) || testUserAgent(REGEX_IPAD) || testUserAgent(REGEX_IOS_UNIVERSAL) || isIPadOnMac(navigatorInfo)) && !testUserAgent(REGEX_WINDOWS_PHONE)
    },
    amazon: {
      phone: testUserAgent(REGEX_AMAZON_PHONE),
      tablet: !testUserAgent(REGEX_AMAZON_PHONE) && testUserAgent(REGEX_AMAZON_TABLET),
      device: testUserAgent(REGEX_AMAZON_PHONE) || testUserAgent(REGEX_AMAZON_TABLET)
    },
    android: {
      phone: !testUserAgent(REGEX_WINDOWS_PHONE) && testUserAgent(REGEX_AMAZON_PHONE) || !testUserAgent(REGEX_WINDOWS_PHONE) && testUserAgent(REGEX_ANDROID_MOBILE),
      tablet: !testUserAgent(REGEX_WINDOWS_PHONE) && !testUserAgent(REGEX_AMAZON_PHONE) && !testUserAgent(REGEX_ANDROID_MOBILE) && (testUserAgent(REGEX_AMAZON_TABLET) || testUserAgent(REGEX_ANDROID)),
      device: !testUserAgent(REGEX_WINDOWS_PHONE) && (testUserAgent(REGEX_AMAZON_PHONE) || testUserAgent(REGEX_AMAZON_TABLET) || testUserAgent(REGEX_ANDROID_MOBILE) || testUserAgent(REGEX_ANDROID)) || testUserAgent(/\bokhttp\b/i)
    },
    windows: {
      phone: testUserAgent(REGEX_WINDOWS_PHONE),
      tablet: testUserAgent(REGEX_WINDOWS_TABLET),
      device: testUserAgent(REGEX_WINDOWS_PHONE) || testUserAgent(REGEX_WINDOWS_TABLET)
    },
    other: {
      blackberry: testUserAgent(REGEX_BLACKBERRY),
      blackberry10: testUserAgent(REGEX_BLACKBERRY10),
      opera: testUserAgent(REGEX_OPERA_MINI),
      firefox: testUserAgent(REGEX_FIREFOX_MOBILE),
      chrome: testUserAgent(REGEX_CHROME_MOBILE),
      device: testUserAgent(REGEX_BLACKBERRY) || testUserAgent(REGEX_BLACKBERRY10) || testUserAgent(REGEX_OPERA_MINI) || testUserAgent(REGEX_FIREFOX_MOBILE) || testUserAgent(REGEX_CHROME_MOBILE)
    },
    any: false,
    phone: false,
    tablet: false
  };

  result.any = result.apple.device || result.android.device || result.windows.device || result.other.device;
  result.phone = result.apple.phone || result.android.phone || result.windows.phone;
  result.tablet = result.apple.tablet || result.android.tablet || result.windows.tablet;

  return result;
}

export default detectDevice;