interface ColorRGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface ColorHSL {
  h: number;
  s: number;
  l: number;
  a: number;
}

interface ColorHSV {
  h: number;
  s: number;
  v: number;
  a: number;
}

interface ColorInput {
  r?: number | string;
  g?: number | string;
  b?: number | string;
  a?: number | string;
  h?: number | string;
  s?: number | string;
  l?: number | string;
  v?: number | string;
  hex?: string;
  source?: string;
}

interface ColorState {
  hsl: ColorHSL;
  hex: string;
  rgb: ColorRGB;
  hsv: ColorHSV;
  oldHue: number;
  source?: string;
}

interface TinyColor {
  toHsl(): ColorHSL;
  toHsv(): ColorHSV;
  toRgb(): ColorRGB;
  toHex(): string;
  isValid(): boolean;
}

import forEach from 'lodash/forEach';
import tinycolor from 'tinycolor2';

const COLOR_PROPERTIES = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v'] as const;
const PERCENTAGE_REGEX = /^\d+%$/;
const HEX_BLACK = '000000';
const TRANSPARENT = 'transparent';
const HASH_CHAR = '#';
const LUMINANCE_THRESHOLD = 128;
const LUMINANCE_RED_WEIGHT = 299;
const LUMINANCE_GREEN_WEIGHT = 587;
const LUMINANCE_BLUE_WEIGHT = 114;
const LUMINANCE_DIVISOR = 1000;

export function simpleCheckForValidColor(color: ColorInput): ColorInput | false {
  let totalProperties = 0;
  let validProperties = 0;

  forEach(COLOR_PROPERTIES, (property) => {
    if (color[property]) {
      totalProperties += 1;

      if (!isNaN(color[property] as number)) {
        validProperties += 1;
      }

      if (property === 's' || property === 'l') {
        if (PERCENTAGE_REGEX.test(String(color[property]))) {
          validProperties += 1;
        }
      }
    }
  });

  return totalProperties === validProperties && color;
}

export function toState(color: ColorInput, hue?: number): ColorState {
  const tinyColorInstance: TinyColor = color.hex 
    ? tinycolor(color.hex) 
    : tinycolor(color);

  const hsl = tinyColorInstance.toHsl();
  const hsv = tinyColorInstance.toHsv();
  const rgb = tinyColorInstance.toRgb();
  const hex = tinyColorInstance.toHex();

  if (hsl.s === 0) {
    hsl.h = hue || 0;
    hsv.h = hue || 0;
  }

  return {
    hsl,
    hex: hex === HEX_BLACK && rgb.a === 0 ? TRANSPARENT : HASH_CHAR + hex,
    rgb,
    hsv,
    oldHue: color.h || hue || hsl.h,
    source: color.source
  };
}

export function isValidHex(hex: string): boolean {
  const hashOffset = String(hex).charAt(0) === HASH_CHAR ? 1 : 0;
  return hex.length !== 4 + hashOffset && hex.length < 7 + hashOffset && tinycolor(hex).isValid();
}

export function getContrastingColor(color?: ColorInput): string {
  if (!color) {
    return '#fff';
  }

  const state = toState(color);

  if (state.hex === TRANSPARENT) {
    return 'rgba(0, 0, 0, 0.4)';
  }

  const luminance = (
    LUMINANCE_RED_WEIGHT * state.rgb.r +
    LUMINANCE_GREEN_WEIGHT * state.rgb.g +
    LUMINANCE_BLUE_WEIGHT * state.rgb.b
  ) / LUMINANCE_DIVISOR;

  return luminance >= LUMINANCE_THRESHOLD ? '#000' : '#fff';
}

export const red: ColorState = {
  hsl: {
    a: 1,
    h: 0,
    l: 0.5,
    s: 1
  },
  hex: '#ff0000',
  rgb: {
    r: 255,
    g: 0,
    b: 0,
    a: 1
  },
  hsv: {
    h: 0,
    s: 1,
    v: 1,
    a: 1
  },
  oldHue: 0
};

export default {
  simpleCheckForValidColor,
  toState,
  isValidHex,
  getContrastingColor,
  red
};