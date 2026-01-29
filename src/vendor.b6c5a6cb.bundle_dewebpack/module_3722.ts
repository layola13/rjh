interface DeviceInfo {
  tablet: boolean;
  phone: boolean;
  apple: {
    device: boolean;
  };
  android: {
    device: boolean;
  };
}

const isMobile: DeviceInfo = detectMobileDevice(window.navigator);

function detectMobileDevice(navigator: Navigator): DeviceInfo {
  // Implementation would be imported from the original module
  // This is a placeholder for the device detection logic
  return {
    tablet: false,
    phone: false,
    apple: { device: false },
    android: { device: false }
  };
}

interface RenderOptions {
  view: HTMLCanvasElement | null;
  antialias: boolean;
  forceFXAA: boolean;
  autoDensity: boolean;
  transparent: boolean;
  backgroundColor: number;
  clearBeforeRender: boolean;
  preserveDrawingBuffer: boolean;
  width: number;
  height: number;
  legacy: boolean;
}

interface Settings {
  MIPMAP_TEXTURES: number;
  ANISOTROPIC_LEVEL: number;
  RESOLUTION: number;
  FILTER_RESOLUTION: number;
  SPRITE_MAX_TEXTURES: number;
  SPRITE_BATCH_SIZE: number;
  RENDER_OPTIONS: RenderOptions;
  GC_MODE: number;
  GC_MAX_IDLE: number;
  GC_MAX_CHECK_COUNT: number;
  WRAP_MODE: number;
  SCALE_MODE: number;
  PRECISION_VERTEX: string;
  PRECISION_FRAGMENT: string;
  CAN_UPLOAD_SAME_BUFFER: boolean;
  CREATE_IMAGE_BITMAP: boolean;
  ROUND_PIXELS: boolean;
}

const MIN_IOS_VERSION_FOR_MAX_TEXTURES = 11;
const MIN_ANDROID_VERSION_FOR_MAX_TEXTURES = 7;
const MAX_TEXTURES_HIGH = 32;
const MAX_TEXTURES_LOW = 4;
const DEFAULT_SPRITE_BATCH_SIZE = 4096;
const DEFAULT_GC_MAX_IDLE = 3600;
const DEFAULT_GC_MAX_CHECK_COUNT = 600;
const WRAP_MODE_CLAMP_TO_EDGE = 33071;
const DEFAULT_CANVAS_WIDTH = 800;
const DEFAULT_CANVAS_HEIGHT = 600;

function calculateSpriteMaxTextures(deviceInfo: DeviceInfo): number {
  let supportsHighTextureCount = true;

  if (deviceInfo.tablet || deviceInfo.phone) {
    supportsHighTextureCount = false;

    if (deviceInfo.apple.device) {
      const iosVersionMatch = navigator.userAgent.match(/OS (\d+)_(\d+)?/);
      if (iosVersionMatch && parseInt(iosVersionMatch[1], 10) >= MIN_IOS_VERSION_FOR_MAX_TEXTURES) {
        supportsHighTextureCount = true;
      }
    }

    if (deviceInfo.android.device) {
      const androidVersionMatch = navigator.userAgent.match(/Android\s([0-9.]*)/);
      if (androidVersionMatch && parseInt(androidVersionMatch[1], 10) >= MIN_ANDROID_VERSION_FOR_MAX_TEXTURES) {
        supportsHighTextureCount = true;
      }
    }
  }

  return supportsHighTextureCount ? MAX_TEXTURES_HIGH : MAX_TEXTURES_LOW;
}

const settings: Settings = {
  MIPMAP_TEXTURES: 1,
  ANISOTROPIC_LEVEL: 0,
  RESOLUTION: 1,
  FILTER_RESOLUTION: 1,
  SPRITE_MAX_TEXTURES: calculateSpriteMaxTextures(isMobile),
  SPRITE_BATCH_SIZE: DEFAULT_SPRITE_BATCH_SIZE,
  RENDER_OPTIONS: {
    view: null,
    antialias: false,
    forceFXAA: false,
    autoDensity: false,
    transparent: false,
    backgroundColor: 0,
    clearBeforeRender: true,
    preserveDrawingBuffer: false,
    width: DEFAULT_CANVAS_WIDTH,
    height: DEFAULT_CANVAS_HEIGHT,
    legacy: false
  },
  GC_MODE: 0,
  GC_MAX_IDLE: DEFAULT_GC_MAX_IDLE,
  GC_MAX_CHECK_COUNT: DEFAULT_GC_MAX_CHECK_COUNT,
  WRAP_MODE: WRAP_MODE_CLAMP_TO_EDGE,
  SCALE_MODE: 1,
  PRECISION_VERTEX: "highp",
  PRECISION_FRAGMENT: isMobile.apple.device ? "highp" : "mediump",
  CAN_UPLOAD_SAME_BUFFER: !isMobile.apple.device,
  CREATE_IMAGE_BITMAP: false,
  ROUND_PIXELS: false
};

export { settings, isMobile };