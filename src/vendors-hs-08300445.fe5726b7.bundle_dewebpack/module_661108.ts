const IPHONE_REGEX = /iPhone/i;
const IPOD_REGEX = /iPod/i;
const IPAD_REGEX = /iPad/i;
const ANDROID_MOBILE_REGEX = /\bAndroid(?:.+)Mobile\b/i;
const ANDROID_REGEX = /Android/i;
const AMAZON_PHONE_REGEX = /\bAndroid(?:.+)SD4930UR\b/i;
const AMAZON_TABLET_REGEX = /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i;
const WINDOWS_PHONE_REGEX = /Windows Phone/i;
const WINDOWS_ARM_REGEX = /\bWindows(?:.+)ARM\b/i;
const BLACKBERRY_REGEX = /BlackBerry/i;
const BLACKBERRY10_REGEX = /BB10/i;
const OPERA_MINI_REGEX = /Opera Mini/i;
const CHROME_MOBILE_REGEX = /\b(CriOS|Chrome)(?:.+)Mobile/i;
const FIREFOX_MOBILE_REGEX = /Mobile(?:.+)Firefox\b/i;
const OKHTTP_REGEX = /\bokhttp\b/i;

interface DeviceCategory {
  phone: boolean;
  ipod?: boolean;
  tablet: boolean;
  device: boolean;
}

interface OtherDevices {
  blackberry: boolean;
  blackberry10: boolean;
  opera: boolean;
  firefox: boolean;
  chrome: boolean;
  device: boolean;
}

interface MobileDetection {
  apple: DeviceCategory;
  amazon: DeviceCategory;
  android: DeviceCategory;
  windows: DeviceCategory;
  other: OtherDevices;
  any: boolean;
  phone: boolean;
  tablet: boolean;
}

interface MobileDetector extends MobileDetection {
  isMobile: (userAgent?: string) => MobileDetection;
}

function testUserAgent(regex: RegExp, userAgent: string): boolean {
  return regex.test(userAgent);
}

function isMobile(userAgent?: string): MobileDetection {
  let cleanedUserAgent = userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : '');
  
  const fbanSplit = cleanedUserAgent.split('[FBAN');
  if (fbanSplit[1] !== undefined) {
    cleanedUserAgent = fbanSplit[0];
  }
  
  const twitterSplit = cleanedUserAgent.split('Twitter');
  if (twitterSplit[1] !== undefined) {
    cleanedUserAgent = twitterSplit[0];
  }

  const detection: MobileDetection = {
    apple: {
      phone: testUserAgent(IPHONE_REGEX, cleanedUserAgent) && !testUserAgent(WINDOWS_PHONE_REGEX, cleanedUserAgent),
      ipod: testUserAgent(IPOD_REGEX, cleanedUserAgent),
      tablet: !testUserAgent(IPHONE_REGEX, cleanedUserAgent) && testUserAgent(IPAD_REGEX, cleanedUserAgent) && !testUserAgent(WINDOWS_PHONE_REGEX, cleanedUserAgent),
      device: (testUserAgent(IPHONE_REGEX, cleanedUserAgent) || testUserAgent(IPOD_REGEX, cleanedUserAgent) || testUserAgent(IPAD_REGEX, cleanedUserAgent)) && !testUserAgent(WINDOWS_PHONE_REGEX, cleanedUserAgent)
    },
    amazon: {
      phone: testUserAgent(AMAZON_PHONE_REGEX, cleanedUserAgent),
      tablet: !testUserAgent(AMAZON_PHONE_REGEX, cleanedUserAgent) && testUserAgent(AMAZON_TABLET_REGEX, cleanedUserAgent),
      device: testUserAgent(AMAZON_PHONE_REGEX, cleanedUserAgent) || testUserAgent(AMAZON_TABLET_REGEX, cleanedUserAgent)
    },
    android: {
      phone: (!testUserAgent(WINDOWS_PHONE_REGEX, cleanedUserAgent) && testUserAgent(AMAZON_PHONE_REGEX, cleanedUserAgent)) || (!testUserAgent(WINDOWS_PHONE_REGEX, cleanedUserAgent) && testUserAgent(ANDROID_MOBILE_REGEX, cleanedUserAgent)),
      tablet: !testUserAgent(WINDOWS_PHONE_REGEX, cleanedUserAgent) && !testUserAgent(AMAZON_PHONE_REGEX, cleanedUserAgent) && !testUserAgent(ANDROID_MOBILE_REGEX, cleanedUserAgent) && (testUserAgent(AMAZON_TABLET_REGEX, cleanedUserAgent) || testUserAgent(ANDROID_REGEX, cleanedUserAgent)),
      device: (!testUserAgent(WINDOWS_PHONE_REGEX, cleanedUserAgent) && (testUserAgent(AMAZON_PHONE_REGEX, cleanedUserAgent) || testUserAgent(AMAZON_TABLET_REGEX, cleanedUserAgent) || testUserAgent(ANDROID_MOBILE_REGEX, cleanedUserAgent) || testUserAgent(ANDROID_REGEX, cleanedUserAgent))) || testUserAgent(OKHTTP_REGEX, cleanedUserAgent)
    },
    windows: {
      phone: testUserAgent(WINDOWS_PHONE_REGEX, cleanedUserAgent),
      tablet: testUserAgent(WINDOWS_ARM_REGEX, cleanedUserAgent),
      device: testUserAgent(WINDOWS_PHONE_REGEX, cleanedUserAgent) || testUserAgent(WINDOWS_ARM_REGEX, cleanedUserAgent)
    },
    other: {
      blackberry: testUserAgent(BLACKBERRY_REGEX, cleanedUserAgent),
      blackberry10: testUserAgent(BLACKBERRY10_REGEX, cleanedUserAgent),
      opera: testUserAgent(OPERA_MINI_REGEX, cleanedUserAgent),
      firefox: testUserAgent(FIREFOX_MOBILE_REGEX, cleanedUserAgent),
      chrome: testUserAgent(CHROME_MOBILE_REGEX, cleanedUserAgent),
      device: testUserAgent(BLACKBERRY_REGEX, cleanedUserAgent) || testUserAgent(BLACKBERRY10_REGEX, cleanedUserAgent) || testUserAgent(OPERA_MINI_REGEX, cleanedUserAgent) || testUserAgent(FIREFOX_MOBILE_REGEX, cleanedUserAgent) || testUserAgent(CHROME_MOBILE_REGEX, cleanedUserAgent)
    },
    any: false,
    phone: false,
    tablet: false
  };

  detection.any = detection.apple.device || detection.android.device || detection.windows.device || detection.other.device;
  detection.phone = detection.apple.phone || detection.android.phone || detection.windows.phone;
  detection.tablet = detection.apple.tablet || detection.android.tablet || detection.windows.tablet;

  return detection;
}

const mobileDetector: MobileDetector = {
  ...isMobile(),
  isMobile
};

export default mobileDetector;