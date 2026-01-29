import { TinyColor } from '@ctrl/tinycolor';

const HUE_STEP = 2;
const SATURATION_STEP = 0.16;
const SATURATION_STEP_2 = 0.05;
const BRIGHTNESS_STEP_1 = 0.05;
const BRIGHTNESS_STEP_2 = 0.15;
const LIGHT_COLOR_COUNT = 5;
const DARK_COLOR_COUNT = 4;

interface DarkColorMap {
  index: number;
  opacity: number;
}

const DARK_COLOR_MAPS: DarkColorMap[] = [
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

interface HsvColor {
  h: number;
  s: number;
  v: number;
}

interface GenerateOptions {
  theme?: 'dark' | 'light';
  backgroundColor?: string;
}

function getHue(hsv: HsvColor, step: number, isLight: boolean): number {
  let hue: number;
  
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = isLight ? Math.round(hsv.h) - HUE_STEP * step : Math.round(hsv.h) + HUE_STEP * step;
  } else {
    hue = isLight ? Math.round(hsv.h) + HUE_STEP * step : Math.round(hsv.h) - HUE_STEP * step;
  }
  
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  
  return hue;
}

function getSaturation(hsv: HsvColor, step: number, isLight: boolean): number {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  
  let saturation: number;
  
  if (isLight) {
    saturation = hsv.s - SATURATION_STEP * step;
  } else if (step === DARK_COLOR_COUNT) {
    saturation = hsv.s + SATURATION_STEP;
  } else {
    saturation = hsv.s + SATURATION_STEP_2 * step;
  }
  
  if (saturation > 1) {
    saturation = 1;
  }
  
  if (isLight && step === LIGHT_COLOR_COUNT && saturation > 0.1) {
    saturation = 0.1;
  }
  
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  
  return Number(saturation.toFixed(2));
}

function getValue(hsv: HsvColor, step: number, isLight: boolean): number {
  let value: number;
  
  if (isLight) {
    value = hsv.v + BRIGHTNESS_STEP_1 * step;
  } else {
    value = hsv.v - BRIGHTNESS_STEP_2 * step;
  }
  
  if (value > 1) {
    value = 1;
  }
  
  return Number(value.toFixed(2));
}

export function generate(color: string, options: GenerateOptions = {}): string[] {
  const patterns: string[] = [];
  const baseColor = new TinyColor(color);
  
  for (let step = LIGHT_COLOR_COUNT; step > 0; step -= 1) {
    const hsv = baseColor.toHsv();
    const lightColor = new TinyColor({
      h: getHue(hsv, step, true),
      s: getSaturation(hsv, step, true),
      v: getValue(hsv, step, true)
    }).toHexString();
    patterns.push(lightColor);
  }
  
  patterns.push(baseColor.toHexString());
  
  for (let step = 1; step <= DARK_COLOR_COUNT; step += 1) {
    const hsv = baseColor.toHsv();
    const darkColor = new TinyColor({
      h: getHue(hsv, step, false),
      s: getSaturation(hsv, step, false),
      v: getValue(hsv, step, false)
    }).toHexString();
    patterns.push(darkColor);
  }
  
  if (options.theme === 'dark') {
    return DARK_COLOR_MAPS.map(({ index, opacity }) => {
      const backgroundColor = options.backgroundColor || '#141414';
      return new TinyColor(backgroundColor)
        .mix(patterns[index], opacity * 100)
        .toHexString();
    });
  }
  
  return patterns;
}

export interface PresetColors {
  red: string;
  volcano: string;
  orange: string;
  gold: string;
  yellow: string;
  lime: string;
  green: string;
  cyan: string;
  blue: string;
  geekblue: string;
  purple: string;
  magenta: string;
  grey: string;
}

export interface ColorPalette extends Array<string> {
  primary?: string;
}

export type Palettes = Record<keyof PresetColors, ColorPalette>;

export const presetPrimaryColors: PresetColors = {
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

export const presetPalettes: Palettes = {} as Palettes;
export const presetDarkPalettes: Palettes = {} as Palettes;

Object.keys(presetPrimaryColors).forEach((colorKey) => {
  const key = colorKey as keyof PresetColors;
  const palette = generate(presetPrimaryColors[key]) as ColorPalette;
  palette.primary = palette[5];
  presetPalettes[key] = palette;
  
  const darkPalette = generate(presetPrimaryColors[key], {
    theme: 'dark',
    backgroundColor: '#141414'
  }) as ColorPalette;
  darkPalette.primary = darkPalette[5];
  presetDarkPalettes[key] = darkPalette;
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