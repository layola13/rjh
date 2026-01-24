/**
 * Device detection result containing information about the current device type and platform.
 */
export interface DeviceDetectionResult {
  /** Apple device detection results */
  apple: {
    /** True if device is an iPhone */
    phone: boolean;
    /** True if device is an iPod */
    ipod: boolean;
    /** True if device is an iPad */
    tablet: boolean;
    /** True if device is a universal iOS app on Mac */
    universal: boolean;
    /** True if device is any Apple device */
    device: boolean;
  };
  /** Amazon device detection results */
  amazon: {
    /** True if device is an Amazon phone */
    phone: boolean;
    /** True if device is an Amazon tablet (Kindle Fire, etc.) */
    tablet: boolean;
    /** True if device is any Amazon device */
    device: boolean;
  };
  /** Android device detection results */
  android: {
    /** True if device is an Android phone */
    phone: boolean;
    /** True if device is an Android tablet */
    tablet: boolean;
    /** True if device is any Android device */
    device: boolean;
  };
  /** Windows device detection results */
  windows: {
    /** True if device is a Windows Phone */
    phone: boolean;
    /** True if device is a Windows tablet */
    tablet: boolean;
    /** True if device is any Windows mobile device */
    device: boolean;
  };
  /** Other device detection results */
  other: {
    /** True if device is a BlackBerry (legacy) */
    blackberry: boolean;
    /** True if device is a BlackBerry 10 */
    blackberry10: boolean;
    /** True if browser is Opera Mini */
    opera: boolean;
    /** True if browser is Firefox Mobile */
    firefox: boolean;
    /** True if browser is Chrome Mobile */
    chrome: boolean;
    /** True if device is any other recognized mobile device */
    device: boolean;
  };
  /** True if any mobile device is detected */
  any: boolean;
  /** True if device is any phone */
  phone: boolean;
  /** True if device is any tablet */
  tablet: boolean;
}

/**
 * Navigator-like object for device detection.
 */
export interface NavigatorInput {
  /** User agent string */
  userAgent: string;
  /** Platform identifier */
  platform: string;
  /** Maximum number of simultaneous touch points */
  maxTouchPoints?: number;
}

/**
 * Detects the device type and platform based on user agent and navigator information.
 * 
 * @param input - User agent string, navigator-like object, or undefined to use global navigator
 * @returns Device detection result with platform and device type information
 */
export default function detectDevice(input?: string | NavigatorInput): DeviceDetectionResult;