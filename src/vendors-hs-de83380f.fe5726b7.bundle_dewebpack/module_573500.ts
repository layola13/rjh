import { rgbToRgb, hsvToRgb, hslToRgb, parseIntFromHex, convertHexToDecimal } from './color-conversions';
import { names as colorNames } from './color-names';
import { convertToPercentage, boundAlpha } from './util';

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface RGBA extends RGB {
  a: number;
}

interface HSV {
  h: number;
  s: number;
  v: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

type ColorInput = string | RGB | RGBA | HSV | HSL | Record<string, unknown>;

type ColorFormat = 'rgb' | 'prgb' | 'hex' | 'hex8' | 'hsl' | 'hsv' | 'name';

interface ColorObject {
  r?: number | string;
  g?: number | string;
  b?: number | string;
  h?: number | string;
  s?: number | string;
  v?: number | string;
  l?: number | string;
  a?: number | string;
  format?: ColorFormat;
}

interface ColorResult {
  ok: boolean;
  format: ColorFormat | false;
  r: number;
  g: number;
  b: number;
  a: number;
}

const NUMBER_PATTERN = '(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)';
const RGB_PATTERN = `[\\s|\\(]+(${NUMBER_PATTERN})[, |\\s]+(${NUMBER_PATTERN})[, |\\s]+(${NUMBER_PATTERN})\\s*\\)?`;
const RGBA_PATTERN = `[\\s|\\(]+(${NUMBER_PATTERN})[, |\\s]+(${NUMBER_PATTERN})[, |\\s]+(${NUMBER_PATTERN})[, |\\s]+(${NUMBER_PATTERN})\\s*\\)?`;

const MATCHERS = {
  CSS_UNIT: new RegExp(NUMBER_PATTERN),
  rgb: new RegExp('rgb' + RGB_PATTERN),
  rgba: new RegExp('rgba' + RGBA_PATTERN),
  hsl: new RegExp('hsl' + RGB_PATTERN),
  hsla: new RegExp('hsla' + RGBA_PATTERN),
  hsv: new RegExp('hsv' + RGB_PATTERN),
  hsva: new RegExp('hsva' + RGBA_PATTERN),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};

export function stringInputToObject(input: string): ColorObject | false {
  const trimmedInput = input.trim().toLowerCase();
  
  if (trimmedInput.length === 0) {
    return false;
  }

  let isNamedColor = false;
  let processedInput = trimmedInput;

  if (colorNames[trimmedInput]) {
    processedInput = colorNames[trimmedInput];
    isNamedColor = true;
  } else if (trimmedInput === 'transparent') {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: 'name'
    };
  }

  let match = MATCHERS.rgb.exec(processedInput);
  if (match) {
    return { r: match[1], g: match[2], b: match[3] };
  }

  match = MATCHERS.rgba.exec(processedInput);
  if (match) {
    return { r: match[1], g: match[2], b: match[3], a: match[4] };
  }

  match = MATCHERS.hsl.exec(processedInput);
  if (match) {
    return { h: match[1], s: match[2], l: match[3] };
  }

  match = MATCHERS.hsla.exec(processedInput);
  if (match) {
    return { h: match[1], s: match[2], l: match[3], a: match[4] };
  }

  match = MATCHERS.hsv.exec(processedInput);
  if (match) {
    return { h: match[1], s: match[2], v: match[3] };
  }

  match = MATCHERS.hsva.exec(processedInput);
  if (match) {
    return { h: match[1], s: match[2], v: match[3], a: match[4] };
  }

  match = MATCHERS.hex8.exec(processedInput);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: isNamedColor ? 'name' : 'hex8'
    };
  }

  match = MATCHERS.hex6.exec(processedInput);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: isNamedColor ? 'name' : 'hex'
    };
  }

  match = MATCHERS.hex4.exec(processedInput);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      a: convertHexToDecimal(match[4] + match[4]),
      format: isNamedColor ? 'name' : 'hex8'
    };
  }

  match = MATCHERS.hex3.exec(processedInput);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      format: isNamedColor ? 'name' : 'hex'
    };
  }

  return false;
}

export function isValidCSSUnit(value: unknown): boolean {
  return Boolean(MATCHERS.CSS_UNIT.exec(String(value)));
}

export function inputToRGB(input: ColorInput): ColorResult {
  let rgb: RGB = { r: 0, g: 0, b: 0 };
  let alpha = 1;
  let saturation: string | null = null;
  let lightness: string | null = null;
  let value: string | null = null;
  let isValid = false;
  let detectedFormat: ColorFormat | false = false;

  let processedInput = input;

  if (typeof input === 'string') {
    const parsed = stringInputToObject(input);
    if (parsed !== false) {
      processedInput = parsed;
    }
  }

  if (typeof processedInput === 'object' && processedInput !== null) {
    const colorObj = processedInput as ColorObject;

    if (isValidCSSUnit(colorObj.r) && isValidCSSUnit(colorObj.g) && isValidCSSUnit(colorObj.b)) {
      rgb = rgbToRgb(colorObj.r!, colorObj.g!, colorObj.b!);
      isValid = true;
      detectedFormat = String(colorObj.r).substr(-1) === '%' ? 'prgb' : 'rgb';
    } else if (isValidCSSUnit(colorObj.h) && isValidCSSUnit(colorObj.s) && isValidCSSUnit(colorObj.v)) {
      saturation = convertToPercentage(colorObj.s!);
      value = convertToPercentage(colorObj.v!);
      rgb = hsvToRgb(colorObj.h!, saturation, value);
      isValid = true;
      detectedFormat = 'hsv';
    } else if (isValidCSSUnit(colorObj.h) && isValidCSSUnit(colorObj.s) && isValidCSSUnit(colorObj.l)) {
      saturation = convertToPercentage(colorObj.s!);
      lightness = convertToPercentage(colorObj.l!);
      rgb = hslToRgb(colorObj.h!, saturation, lightness);
      isValid = true;
      detectedFormat = 'hsl';
    }

    if (Object.prototype.hasOwnProperty.call(colorObj, 'a')) {
      alpha = colorObj.a as number;
    }
  }

  const boundedAlpha = boundAlpha(alpha);

  return {
    ok: isValid,
    format: colorObj.format ?? detectedFormat,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a: boundedAlpha
  };
}