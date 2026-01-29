interface VendorPrefix {
  (property: string): string;
}

interface VendorPrefixMap {
  O: VendorPrefix;
  Moz: VendorPrefix;
  Webkit: VendorPrefix;
  ms: VendorPrefix;
}

interface BrowserPrefixResult {
  animationEnd: string;
  transitionEnd: string;
  prefix: string;
}

interface CSSProperties {
  transform: string;
  end: string;
  property: string;
  timing: string;
  delay: string;
  duration: string;
}

const isBrowser = typeof document !== 'undefined';

function detectBrowserPrefix(): BrowserPrefixResult {
  const testElement = document.createElement('div').style;
  
  const vendorPrefixes: VendorPrefixMap = {
    O: (property: string): string => `o${property.toLowerCase()}`,
    Moz: (property: string): string => property.toLowerCase(),
    Webkit: (property: string): string => `webkit${property}`,
    ms: (property: string): string => `MS${property}`
  };

  const prefixKeys = Object.keys(vendorPrefixes) as Array<keyof VendorPrefixMap>;
  let cssPrefix = '';
  let transitionEndEvent: string | undefined;
  let animationEndEvent: string | undefined;

  for (let i = 0; i < prefixKeys.length; i++) {
    const vendor = prefixKeys[i];
    const transitionProperty = `${vendor}TransitionProperty`;
    
    if (transitionProperty in testElement) {
      cssPrefix = `-${vendor.toLowerCase()}`;
      transitionEndEvent = vendorPrefixes[vendor]('TransitionEnd');
      animationEndEvent = vendorPrefixes[vendor]('AnimationEnd');
      break;
    }
  }

  if (!transitionEndEvent && 'transitionProperty' in testElement) {
    transitionEndEvent = 'transitionend';
  }

  if (!animationEndEvent && 'animationName' in testElement) {
    animationEndEvent = 'animationend';
  }

  return {
    animationEnd: animationEndEvent || '',
    transitionEnd: transitionEndEvent || '',
    prefix: cssPrefix
  };
}

let prefix = '';
let transitionEndEvent = '';
let animationEndEvent = '';

if (isBrowser) {
  const browserPrefix = detectBrowserPrefix();
  prefix = browserPrefix.prefix;
  transitionEndEvent = browserPrefix.transitionEnd;
  animationEndEvent = browserPrefix.animationEnd;
}

export const transform = prefix ? `${prefix}-transform` : 'transform';
export const transitionEnd = transitionEndEvent;
export const animationEnd = animationEndEvent;
export const transitionProperty = prefix ? `${prefix}-transition-property` : 'transition-property';
export const transitionDuration = prefix ? `${prefix}-transition-duration` : 'transition-duration';
export const transitionDelay = prefix ? `${prefix}-transition-delay` : 'transition-delay';
export const transitionTiming = prefix ? `${prefix}-transition-timing-function` : 'transition-timing-function';
export const animationName = prefix ? `${prefix}-animation-name` : 'animation-name';
export const animationDuration = prefix ? `${prefix}-animation-duration` : 'animation-duration';
export const animationTiming = prefix ? `${prefix}-animation-delay` : 'animation-delay';
export const animationDelay = prefix ? `${prefix}-animation-timing-function` : 'animation-timing-function';

const cssProperties: CSSProperties = {
  transform,
  end: transitionEnd,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};

export default cssProperties;