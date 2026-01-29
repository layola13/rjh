export interface TinyColorOptions {
  format?: string;
  gradientType?: string;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
  a: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
  a: number;
}

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface PercentageRGB {
  r: string;
  g: string;
  b: string;
  a: number;
}

type ColorInput = string | number | RGB | HSL | HSV | TinyColor;

const BRIGHTNESS_RED_WEIGHT = 299;
const BRIGHTNESS_GREEN_WEIGHT = 587;
const BRIGHTNESS_BLUE_WEIGHT = 114;
const BRIGHTNESS_DIVISOR = 1000;
const DARK_THRESHOLD = 128;

const LUMINANCE_RED_WEIGHT = 0.2126;
const LUMINANCE_GREEN_WEIGHT = 0.7152;
const LUMINANCE_BLUE_WEIGHT = 0.0722;
const LUMINANCE_THRESHOLD = 0.03928;
const LUMINANCE_DIVISOR = 12.92;
const LUMINANCE_OFFSET = 0.055;
const LUMINANCE_SCALE = 1.055;
const LUMINANCE_GAMMA = 2.4;

const PERCENT_MULTIPLIER = 100;
const RGB_MAX = 255;
const HUE_MAX = 360;
const ALPHA_PRECISION = 100;

export class TinyColor {
  public originalInput: ColorInput;
  public r: number;
  public g: number;
  public b: number;
  public a: number;
  public roundA: number;
  public format: string;
  public gradientType?: string;
  public isValid: boolean;

  constructor(color: ColorInput = "", options: TinyColorOptions = {}) {
    if (color instanceof TinyColor) {
      return color;
    }

    let inputColor: ColorInput = color;
    if (typeof color === "number") {
      inputColor = numberInputToObject(color);
    }

    this.originalInput = color;

    const rgb = inputToRGB(inputColor);
    this.originalInput = color;
    this.r = rgb.r;
    this.g = rgb.g;
    this.b = rgb.b;
    this.a = rgb.a;
    this.roundA = Math.round(ALPHA_PRECISION * this.a) / ALPHA_PRECISION;
    this.format = options.format ?? rgb.format;
    this.gradientType = options.gradientType;

    if (this.r < 1) {
      this.r = Math.round(this.r);
    }
    if (this.g < 1) {
      this.g = Math.round(this.g);
    }
    if (this.b < 1) {
      this.b = Math.round(this.b);
    }

    this.isValid = rgb.ok;
  }

  public isDark(): boolean {
    return this.getBrightness() < DARK_THRESHOLD;
  }

  public isLight(): boolean {
    return !this.isDark();
  }

  public getBrightness(): number {
    const rgb = this.toRgb();
    return (BRIGHTNESS_RED_WEIGHT * rgb.r + BRIGHTNESS_GREEN_WEIGHT * rgb.g + BRIGHTNESS_BLUE_WEIGHT * rgb.b) / BRIGHTNESS_DIVISOR;
  }

  public getLuminance(): number {
    const rgb = this.toRgb();
    const red = rgb.r / RGB_MAX;
    const green = rgb.g / RGB_MAX;
    const blue = rgb.b / RGB_MAX;

    const redLuminance = red <= LUMINANCE_THRESHOLD ? red / LUMINANCE_DIVISOR : Math.pow((red + LUMINANCE_OFFSET) / LUMINANCE_SCALE, LUMINANCE_GAMMA);
    const greenLuminance = green <= LUMINANCE_THRESHOLD ? green / LUMINANCE_DIVISOR : Math.pow((green + LUMINANCE_OFFSET) / LUMINANCE_SCALE, LUMINANCE_GAMMA);
    const blueLuminance = blue <= LUMINANCE_THRESHOLD ? blue / LUMINANCE_DIVISOR : Math.pow((blue + LUMINANCE_OFFSET) / LUMINANCE_SCALE, LUMINANCE_GAMMA);

    return LUMINANCE_RED_WEIGHT * redLuminance + LUMINANCE_GREEN_WEIGHT * greenLuminance + LUMINANCE_BLUE_WEIGHT * blueLuminance;
  }

  public getAlpha(): number {
    return this.a;
  }

  public setAlpha(alpha: number): this {
    this.a = boundAlpha(alpha);
    this.roundA = Math.round(ALPHA_PRECISION * this.a) / ALPHA_PRECISION;
    return this;
  }

  public isMonochrome(): boolean {
    return this.toHsl().s === 0;
  }

  public toHsv(): HSV {
    const hsv = rgbToHsv(this.r, this.g, this.b);
    return {
      h: HUE_MAX * hsv.h,
      s: hsv.s,
      v: hsv.v,
      a: this.a
    };
  }

  public toHsvString(): string {
    const hsv = rgbToHsv(this.r, this.g, this.b);
    const hue = Math.round(HUE_MAX * hsv.h);
    const saturation = Math.round(PERCENT_MULTIPLIER * hsv.s);
    const value = Math.round(PERCENT_MULTIPLIER * hsv.v);

    return this.a === 1
      ? `hsv(${hue}, ${saturation}%, ${value}%)`
      : `hsva(${hue}, ${saturation}%, ${value}%, ${this.roundA})`;
  }

  public toHsl(): HSL {
    const hsl = rgbToHsl(this.r, this.g, this.b);
    return {
      h: HUE_MAX * hsl.h,
      s: hsl.s,
      l: hsl.l,
      a: this.a
    };
  }

  public toHslString(): string {
    const hsl = rgbToHsl(this.r, this.g, this.b);
    const hue = Math.round(HUE_MAX * hsl.h);
    const saturation = Math.round(PERCENT_MULTIPLIER * hsl.s);
    const lightness = Math.round(PERCENT_MULTIPLIER * hsl.l);

    return this.a === 1
      ? `hsl(${hue}, ${saturation}%, ${lightness}%)`
      : `hsla(${hue}, ${saturation}%, ${lightness}%, ${this.roundA})`;
  }

  public toHex(allow3Char: boolean = false): string {
    return rgbToHex(this.r, this.g, this.b, allow3Char);
  }

  public toHexString(allow3Char: boolean = false): string {
    return "#" + this.toHex(allow3Char);
  }

  public toHex8(allow4Char: boolean = false): string {
    return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
  }

  public toHex8String(allow4Char: boolean = false): string {
    return "#" + this.toHex8(allow4Char);
  }

  public toHexShortString(allowShort: boolean = false): string {
    return this.a === 1 ? this.toHexString(allowShort) : this.toHex8String(allowShort);
  }

  public toRgb(): RGBA {
    return {
      r: Math.round(this.r),
      g: Math.round(this.g),
      b: Math.round(this.b),
      a: this.a
    };
  }

  public toRgbString(): string {
    const red = Math.round(this.r);
    const green = Math.round(this.g);
    const blue = Math.round(this.b);

    return this.a === 1
      ? `rgb(${red}, ${green}, ${blue})`
      : `rgba(${red}, ${green}, ${blue}, ${this.roundA})`;
  }

  public toPercentageRgb(): PercentageRGB {
    const toPercent = (value: number): string => {
      return `${Math.round(PERCENT_MULTIPLIER * bound01(value, RGB_MAX))}%`;
    };

    return {
      r: toPercent(this.r),
      g: toPercent(this.g),
      b: toPercent(this.b),
      a: this.a
    };
  }

  public toPercentageRgbString(): string {
    const toPercentValue = (value: number): number => {
      return Math.round(PERCENT_MULTIPLIER * bound01(value, RGB_MAX));
    };

    return this.a === 1
      ? `rgb(${toPercentValue(this.r)}%, ${toPercentValue(this.g)}%, ${toPercentValue(this.b)}%)`
      : `rgba(${toPercentValue(this.r)}%, ${toPercentValue(this.g)}%, ${toPercentValue(this.b)}%, ${this.roundA})`;
  }

  public toName(): string | false {
    if (this.a === 0) {
      return "transparent";
    }

    if (this.a < 1) {
      return false;
    }

    const hexValue = "#" + rgbToHex(this.r, this.g, this.b, false);
    for (const [name, hex] of Object.entries(names)) {
      if (hexValue === hex) {
        return name;
      }
    }

    return false;
  }

  public toString(format?: string): string {
    const formatSet = Boolean(format);
    const selectedFormat = format ?? this.format;
    let result: string | false = false;
    const hasAlpha = this.a < 1 && this.a >= 0;

    if (formatSet || !hasAlpha || !selectedFormat.startsWith("hex") && selectedFormat !== "name") {
      if (selectedFormat === "rgb") {
        result = this.toRgbString();
      }
      if (selectedFormat === "prgb") {
        result = this.toPercentageRgbString();
      }
      if (selectedFormat === "hex" || selectedFormat === "hex6") {
        result = this.toHexString();
      }
      if (selectedFormat === "hex3") {
        result = this.toHexString(true);
      }
      if (selectedFormat === "hex4") {
        result = this.toHex8String(true);
      }
      if (selectedFormat === "hex8") {
        result = this.toHex8String();
      }
      if (selectedFormat === "name") {
        result = this.toName();
      }
      if (selectedFormat === "hsl") {
        result = this.toHslString();
      }
      if (selectedFormat === "hsv") {
        result = this.toHsvString();
      }

      return result || this.toHexString();
    }

    if (selectedFormat === "name" && this.a === 0) {
      return this.toName() as string;
    }

    return this.toRgbString();
  }

  public toNumber(): number {
    return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
  }

  public clone(): TinyColor {
    return new TinyColor(this.toString());
  }

  public lighten(amount: number = 10): TinyColor {
    const hsl = this.toHsl();
    hsl.l += amount / PERCENT_MULTIPLIER;
    hsl.l = clamp01(hsl.l);
    return new TinyColor(hsl);
  }

  public brighten(amount: number = 10): TinyColor {
    const rgb = this.toRgb();
    rgb.r = Math.max(0, Math.min(RGB_MAX, rgb.r - Math.round(-amount / PERCENT_MULTIPLIER * RGB_MAX)));
    rgb.g = Math.max(0, Math.min(RGB_MAX, rgb.g - Math.round(-amount / PERCENT_MULTIPLIER * RGB_MAX)));
    rgb.b = Math.max(0, Math.min(RGB_MAX, rgb.b - Math.round(-amount / PERCENT_MULTIPLIER * RGB_MAX)));
    return new TinyColor(rgb);
  }

  public darken(amount: number = 10): TinyColor {
    const hsl = this.toHsl();
    hsl.l -= amount / PERCENT_MULTIPLIER;
    hsl.l = clamp01(hsl.l);
    return new TinyColor(hsl);
  }

  public tint(amount: number = 10): TinyColor {
    return this.mix("white", amount);
  }

  public shade(amount: number = 10): TinyColor {
    return this.mix("black", amount);
  }

  public desaturate(amount: number = 10): TinyColor {
    const hsl = this.toHsl();
    hsl.s -= amount / PERCENT_MULTIPLIER;
    hsl.s = clamp01(hsl.s);
    return new TinyColor(hsl);
  }

  public saturate(amount: number = 10): TinyColor {
    const hsl = this.toHsl();
    hsl.s += amount / PERCENT_MULTIPLIER;
    hsl.s = clamp01(hsl.s);
    return new TinyColor(hsl);
  }

  public greyscale(): TinyColor {
    return this.desaturate(PERCENT_MULTIPLIER);
  }

  public spin(degrees: number): TinyColor {
    const hsl = this.toHsl();
    const hue = (hsl.h + degrees) % HUE_MAX;
    hsl.h = hue < 0 ? HUE_MAX + hue : hue;
    return new TinyColor(hsl);
  }

  public mix(color: ColorInput, amount: number = 50): TinyColor {
    const rgb1 = this.toRgb();
    const rgb2 = new TinyColor(color).toRgb();
    const weight = amount / PERCENT_MULTIPLIER;

    return new TinyColor({
      r: (rgb2.r - rgb1.r) * weight + rgb1.r,
      g: (rgb2.g - rgb1.g) * weight + rgb1.g,
      b: (rgb2.b - rgb1.b) * weight + rgb1.b,
      a: (rgb2.a - rgb1.a) * weight + rgb1.a
    });
  }

  public analogous(results: number = 6, slices: number = 30): TinyColor[] {
    const hsl = this.toHsl();
    const step = HUE_MAX / slices;
    const colors: TinyColor[] = [this];

    hsl.h = (hsl.h - (step * results >> 1) + 720) % HUE_MAX;

    while (--results) {
      hsl.h = (hsl.h + step) % HUE_MAX;
      colors.push(new TinyColor(hsl));
    }

    return colors;
  }

  public complement(): TinyColor {
    const hsl = this.toHsl();
    hsl.h = (hsl.h + 180) % HUE_MAX;
    return new TinyColor(hsl);
  }

  public monochromatic(results: number = 6): TinyColor[] {
    const hsv = this.toHsv();
    const { h: hue, s: saturation } = hsv;
    let { v: value } = hsv;
    const colors: TinyColor[] = [];
    const step = 1 / results;

    while (results--) {
      colors.push(new TinyColor({ h: hue, s: saturation, v: value }));
      value = (value + step) % 1;
    }

    return colors;
  }

  public splitcomplement(): TinyColor[] {
    const hsl = this.toHsl();
    const hue = hsl.h;

    return [
      this,
      new TinyColor({ h: (hue + 72) % HUE_MAX, s: hsl.s, l: hsl.l }),
      new TinyColor({ h: (hue + 216) % HUE_MAX, s: hsl.s, l: hsl.l })
    ];
  }

  public onBackground(background: ColorInput): TinyColor {
    const foreground = this.toRgb();
    const bg = new TinyColor(background).toRgb();
    const alpha = foreground.a + bg.a * (1 - foreground.a);

    return new TinyColor({
      r: (foreground.r * foreground.a + bg.r * bg.a * (1 - foreground.a)) / alpha,
      g: (foreground.g * foreground.a + bg.g * bg.a * (1 - foreground.a)) / alpha,
      b: (foreground.b * foreground.a + bg.b * bg.a * (1 - foreground.a)) / alpha,
      a: alpha
    });
  }

  public triad(): TinyColor[] {
    return this.polyad(3);
  }

  public tetrad(): TinyColor[] {
    return this.polyad(4);
  }

  public polyad(count: number): TinyColor[] {
    const hsl = this.toHsl();
    const hue = hsl.h;
    const colors: TinyColor[] = [this];
    const step = HUE_MAX / count;

    for (let i = 1; i < count; i++) {
      colors.push(new TinyColor({ h: (hue + i * step) % HUE_MAX, s: hsl.s, l: hsl.l }));
    }

    return colors;
  }

  public equals(color: ColorInput): boolean {
    return this.toRgbString() === new TinyColor(color).toRgbString();
  }
}

export function tinycolor(color: ColorInput = "", options: TinyColorOptions = {}): TinyColor {
  return new TinyColor(color, options);
}

// Utility functions (imported from other modules in original code)
declare function numberInputToObject(input: number): RGB;
declare function inputToRGB(input: ColorInput): RGB & { ok: boolean; format: string };
declare function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number };
declare function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number };
declare function rgbToHex(r: number, g: number, b: number, allow3Char: boolean): string;
declare function rgbaToHex(r: number, g: number, b: number, a: number, allow4Char: boolean): string;
declare function boundAlpha(alpha: number): number;
declare function bound01(value: number, max: number): number;
declare function clamp01(value: number): number;
declare const names: Record<string, string>;