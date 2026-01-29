import { rgbToHsv, rgbToHex, inputToRGB } from '@ctrl/tinycolor';

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSV {
  h: number;
  s: number;
  v: number;
}

interface GenerateOptions {
  theme?: 'dark' | 'light';
  backgroundColor?: string;
}

interface DarkColorMap {
  index: number;
  opacity: number;
}

interface PaletteColor extends Array<string> {
  primary?: string;
}

interface PresetColors {
  [key: string]: PaletteColor;
}

const HUE_STEP = 2;
const SATURATION_STEP = 0.16;
const SATURATION_STEP_2 = 0.05;
const BRIGHTNESS_STEP_1 = 0.05;
const BRIGHTNESS_STEP_2 = 0.15;
const LIGHT_COLOR_COUNT = 5;
const DARK_COLOR_COUNT = 4;

const DARK_COLOR_MAP: DarkColorMap[] = [
  { index: 7, opacity: 0.15 },
  { index: 6, opacity: 0.25 },
  { index: 5, opacity: 0.3 },
  { index: 5, opacity: 0.45 },
  { index: 5, opacity: 0.65 },
  { index: 5, opacity: 0.85 },
  { index: 4, opacity: 0.9 },
  { index: 3, opacity: 0.95 },
  { index: 2, opacity: 0.97 },
  { index: 1, opacity: 0.98 }
];

function toHsv(rgb: RGB): HSV {
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  return {
    h: hsv.h * 360,
    s: hsv.s,
    v: hsv.v
  };
}

function toHex(rgb: RGB): string {
  return `#${rgbToHex(rgb.r, rgb.g, rgb.b, false)}`;
}

function getHue(hsv: HSV, index: number, isLight: boolean): number {
  let hue: number;
  const hueValue = Math.round(hsv.h);
  
  if (hueValue >= 60 && hueValue <= 240) {
    hue = isLight ? hueValue - HUE_STEP * index : hueValue + HUE_STEP * index;
  } else {
    hue = isLight ? hueValue + HUE_STEP * index : hueValue - HUE_STEP * index;
  }
  
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  
  return hue;
}

function getSaturation(hsv: HSV, index: number, isLight: boolean): number {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  
  let saturation: number;
  
  if (isLight) {
    saturation = hsv.s - SATURATION_STEP * index;
  } else if (index === DARK_COLOR_COUNT) {
    saturation = hsv.s + SATURATION_STEP;
  } else {
    saturation = hsv.s + SATURATION_STEP_2 * index;
  }
  
  if (saturation > 1) {
    saturation = 1;
  }
  
  if (isLight && index === LIGHT_COLOR_COUNT && saturation > 0.1) {
    saturation = 0.1;
  }
  
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  
  return Number(saturation.toFixed(2));
}

function getValue(hsv: HSV, index: number, isLight: boolean): number {
  let value: number;
  
  if (isLight) {
    value = hsv.v + BRIGHTNESS_STEP_1 * index;
  } else {
    value = hsv.v - BRIGHTNESS_STEP_2 * index;
  }
  
  if (value > 1) {
    value = 1;
  }
  
  return Number(value.toFixed(2));
}

function mix(rgb1: RGB, rgb2: RGB, amount: number): RGB {
  const percentage = amount / 100;
  return {
    r: (rgb2.r - rgb1.r) * percentage + rgb1.r,
    g: (rgb2.g - rgb1.g) * percentage + rgb1.g,
    b: (rgb2.b - rgb1.b) * percentage + rgb1.b
  };
}

export function generate(color: string, options: GenerateOptions = {}): string[] {
  const patterns: string[] = [];
  const rgb = inputToRGB(color);
  
  for (let i = LIGHT_COLOR_COUNT; i > 0; i -= 1) {
    const hsv = toHsv(rgb);
    const colorHex = toHex(inputToRGB({
      h: getHue(hsv, i, true),
      s: getSaturation(hsv, i, true),
      v: getValue(hsv, i, true)
    }));
    patterns.push(colorHex);
  }
  
  patterns.push(toHex(rgb));
  
  for (let i = 1; i <= DARK_COLOR_COUNT; i += 1) {
    const hsv = toHsv(rgb);
    const colorHex = toHex(inputToRGB({
      h: getHue(hsv, i, false),
      s: getSaturation(hsv, i, false),
      v: getValue(hsv, i, false)
    }));
    patterns.push(colorHex);
  }
  
  if (options.theme === 'dark') {
    return DARK_COLOR_MAP.map(item => {
      const backgroundColor = inputToRGB(options.backgroundColor || '#141414');
      const patternColor = inputToRGB(patterns[item.index]);
      const mixed = mix(backgroundColor, patternColor, item.opacity * 100);
      return toHex(mixed);
    });
  }
  
  return patterns;
}

export const presetPrimaryColors = {
  red: '#F5222D',
  volcano: '#FA541C',
  orange: '#FA8C16',
  gold: '#FAAD14',
  yellow: '#FADB14',
  lime: '#A0D911',
  green: '#52C41A',
  cyan: '#13C2C2',
  blue: '#1890FF',
  geekblue: '#2F54EB',
  purple: '#722ED1',
  magenta: '#EB2F96',
  grey: '#666666'
};

export const presetPalettes: PresetColors = {};
export const presetDarkPalettes: PresetColors = {};

Object.keys(presetPrimaryColors).forEach(key => {
  const colors = generate(presetPrimaryColors[key as keyof typeof presetPrimaryColors]) as PaletteColor;
  colors.primary = colors[5];
  presetPalettes[key] = colors;
  
  const darkColors = generate(presetPrimaryColors[key as keyof typeof presetPrimaryColors], {
    theme: 'dark',
    backgroundColor: '#141414'
  }) as PaletteColor;
  darkColors.primary = darkColors[5];
  presetDarkPalettes[key] = darkColors;
});

export const red = presetPalettes.red;
export const volcano = presetPalettes.volcano;
export const gold = presetPalettes.gold;
export const orange = presetPalettes.orange;
export const yellow = presetPalettes.yellow;
export const lime = presetPalettes.lime;
export const green = presetPalettes.green;
export const cyan = presetPalettes.cyan;
export const blue = presetPalettes.blue;
export const geekblue = presetPalettes.geekblue;
export const purple = presetPalettes.purple;
export const magenta = presetPalettes.magenta;
export const grey = presetPalettes.grey;