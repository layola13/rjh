/**
 * Mobile device detection utility
 * Detects various mobile devices and platforms based on user agent strings
 */

/**
 * Device detection result for a specific platform
 */
interface PlatformDetection {
  /** Whether the device is a phone */
  phone: boolean;
  /** Whether the device is a tablet */
  tablet: boolean;
  /** Whether the device matches any form factor for this platform */
  device: boolean;
}

/**
 * Extended platform detection for Apple devices
 */
interface AppleDetection extends PlatformDetection {
  /** Whether the device is an iPod */
  ipod: boolean;
}

/**
 * Detection results for other/miscellaneous devices
 */
interface OtherDeviceDetection {
  /** Whether the device is a BlackBerry (legacy) */
  blackberry: boolean;
  /** Whether the device is a BlackBerry 10 */
  blackberry10: boolean;
  /** Whether the browser is Opera Mini */
  opera: boolean;
  /** Whether the browser is Firefox Mobile */
  firefox: boolean;
  /** Whether the browser is Chrome Mobile */
  chrome: boolean;
  /** Whether the device matches any other device type */
  device: boolean;
}

/**
 * Complete device detection result
 */
interface DeviceDetection {
  /** Apple device detection (iPhone, iPad, iPod) */
  apple: AppleDetection;
  /** Amazon device detection (Kindle Fire, etc.) */
  amazon: PlatformDetection;
  /** Android device detection */
  android: PlatformDetection;
  /** Windows device detection */
  windows: PlatformDetection;
  /** Other device types detection */
  other: OtherDeviceDetection;
  /** Whether any mobile device was detected */
  any: boolean;
  /** Whether a phone was detected (any platform) */
  phone: boolean;
  /** Whether a tablet was detected (any platform) */
  tablet: boolean;
}

/**
 * Device detection module with utility function
 */
interface MobileDetectionModule extends DeviceDetection {
  /** Function to perform device detection with custom user agent */
  isMobile: (userAgent?: string) => DeviceDetection;
}

// Regular expressions for device detection
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

/**
 * Tests a regular expression against a user agent string
 * @param pattern - Regular expression pattern to test
 * @param userAgent - User agent string to test against
 * @returns Whether the pattern matches the user agent
 */
function testUserAgent(pattern: RegExp, userAgent: string): boolean {
  return pattern.test(userAgent);
}

/**
 * Detects mobile device characteristics from user agent string
 * @param userAgent - Optional user agent string (defaults to navigator.userAgent)
 * @returns Device detection results for all platforms
 */
function detectMobileDevice(userAgent?: string): DeviceDetection {
  // Use provided user agent or browser's navigator.userAgent
  let cleanedUserAgent = userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : '');
  
  // Remove Facebook app identifier if present
  const facebookSplit = (cleanedUserAgent || '').split('[FBAN');
  if (facebookSplit[1] !== undefined) {
    cleanedUserAgent = facebookSplit[0];
  }
  
  // Remove Twitter app identifier if present
  const twitterSplit = cleanedUserAgent.split('Twitter');
  if (twitterSplit[1] !== undefined) {
    cleanedUserAgent = twitterSplit[0];
  }
  
  const detection: DeviceDetection = {
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
  
  // Set aggregate detection flags
  detection.any = detection.apple.device || detection.android.device || detection.windows.device || detection.other.device;
  detection.phone = detection.apple.phone || detection.android.phone || detection.windows.phone;
  detection.tablet = detection.apple.tablet || detection.android.tablet || detection.windows.tablet;
  
  return detection;
}

/**
 * Default export: Pre-detected device information with detection utility
 */
const mobileDetection: MobileDetectionModule = {
  ...detectMobileDevice(),
  isMobile: detectMobileDevice
};

export default mobileDetection;