import { TinyColor } from './TinyColor';

interface ColorRange {
  name: string;
  hueRange: [number, number] | null;
  lowerBounds: [number, number][];
}

interface ColorDefinition {
  name: string;
  hueRange: [number, number] | null;
  lowerBounds: [number, number][];
  saturationRange: [number, number];
  brightnessRange: [number, number];
}

interface RandomColorOptions {
  hue?: string | number;
  luminosity?: 'bright' | 'dark' | 'light' | 'random';
  count?: number | null;
  seed?: number;
  alpha?: number;
}

export const bounds: ColorRange[] = [
  {
    name: 'monochrome',
    hueRange: null,
    lowerBounds: [[0, 0], [100, 0]]
  },
  {
    name: 'red',
    hueRange: [-26, 18],
    lowerBounds: [[20, 100], [30, 92], [40, 89], [50, 85], [60, 78], [70, 70], [80, 60], [90, 55], [100, 50]]
  },
  {
    name: 'orange',
    hueRange: [19, 46],
    lowerBounds: [[20, 100], [30, 93], [40, 88], [50, 86], [60, 85], [70, 70], [100, 70]]
  },
  {
    name: 'yellow',
    hueRange: [47, 62],
    lowerBounds: [[25, 100], [40, 94], [50, 89], [60, 86], [70, 84], [80, 82], [90, 80], [100, 75]]
  },
  {
    name: 'green',
    hueRange: [63, 178],
    lowerBounds: [[30, 100], [40, 90], [50, 85], [60, 81], [70, 74], [80, 64], [90, 50], [100, 40]]
  },
  {
    name: 'blue',
    hueRange: [179, 257],
    lowerBounds: [[20, 100], [30, 86], [40, 80], [50, 74], [60, 60], [70, 52], [80, 44], [90, 39], [100, 35]]
  },
  {
    name: 'purple',
    hueRange: [258, 282],
    lowerBounds: [[20, 100], [30, 87], [40, 79], [50, 70], [60, 65], [70, 59], [80, 52], [90, 45], [100, 42]]
  },
  {
    name: 'pink',
    hueRange: [283, 334],
    lowerBounds: [[20, 100], [30, 90], [40, 86], [60, 84], [80, 80], [90, 75], [100, 73]]
  }
];

export function random(options: RandomColorOptions = {}): TinyColor | TinyColor[] {
  if (options.count !== undefined && options.count !== null) {
    const count = options.count;
    const colors: TinyColor[] = [];
    
    for (options.count = undefined; colors.length < count;) {
      options.count = null;
      if (options.seed) {
        options.seed += 1;
      }
      colors.push(random(options) as TinyColor);
    }
    
    options.count = count;
    return colors;
  }

  const hue = pickHue(options.hue, options.seed);
  const saturation = pickSaturation(hue, options);
  const brightness = pickBrightness(hue, saturation, options);

  const hsvColor: { h: number; s: number; v: number; a?: number } = {
    h: hue,
    s: saturation,
    v: brightness
  };

  if (options.alpha !== undefined) {
    hsvColor.a = options.alpha;
  }

  return new TinyColor(hsvColor);
}

function pickHue(hueOption: string | number | undefined, seed: number | undefined): number {
  const hueRange = getHueRange(hueOption);
  let hue = randomWithinRange(hueRange, seed);

  if (hue < 0) {
    hue = 360 + hue;
  }

  return hue;
}

function getHueRange(hueInput: string | number | undefined): [number, number] {
  const parsedHue = parseInt(String(hueInput), 10);
  
  if (!Number.isNaN(parsedHue) && parsedHue < 360 && parsedHue > 0) {
    return [parsedHue, parsedHue];
  }

  if (typeof hueInput === 'string') {
    const colorRange = bounds.find(range => range.name === hueInput);
    
    if (colorRange) {
      const colorDef = defineColor(colorRange);
      if (colorDef.hueRange) {
        return colorDef.hueRange;
      }
    }

    const tinyColor = new TinyColor(hueInput);
    if (tinyColor.isValid) {
      const hsvHue = tinyColor.toHsv().h;
      return [hsvHue, hsvHue];
    }
  }

  return [0, 360];
}

function pickSaturation(hue: number, options: RandomColorOptions): number {
  if (options.hue === 'monochrome') {
    return 0;
  }

  if (options.luminosity === 'random') {
    return randomWithinRange([0, 100], options.seed);
  }

  const saturationRange = getColorInfo(hue).saturationRange;
  let minSaturation = saturationRange[0];
  let maxSaturation = saturationRange[1];

  switch (options.luminosity) {
    case 'bright':
      minSaturation = 55;
      break;
    case 'dark':
      minSaturation = maxSaturation - 10;
      break;
    case 'light':
      maxSaturation = 55;
      break;
  }

  return randomWithinRange([minSaturation, maxSaturation], options.seed);
}

function pickBrightness(hue: number, saturation: number, options: RandomColorOptions): number {
  let minBrightness = getMinimumBrightness(hue, saturation);
  let maxBrightness = 100;

  switch (options.luminosity) {
    case 'dark':
      maxBrightness = minBrightness + 20;
      break;
    case 'light':
      minBrightness = (maxBrightness + minBrightness) / 2;
      break;
    case 'random':
      minBrightness = 0;
      maxBrightness = 100;
      break;
  }

  return randomWithinRange([minBrightness, maxBrightness], options.seed);
}

function getMinimumBrightness(hue: number, saturation: number): number {
  const lowerBounds = getColorInfo(hue).lowerBounds;

  for (let i = 0; i < lowerBounds.length - 1; i++) {
    const s1 = lowerBounds[i][0];
    const v1 = lowerBounds[i][1];
    const s2 = lowerBounds[i + 1][0];
    const v2 = lowerBounds[i + 1][1];

    if (saturation >= s1 && saturation <= s2) {
      const slope = (v2 - v1) / (s2 - s1);
      return slope * saturation + (v1 - slope * s1);
    }
  }

  return 0;
}

function getColorInfo(hue: number): ColorDefinition {
  let adjustedHue = hue;
  
  if (adjustedHue >= 334 && adjustedHue <= 360) {
    adjustedHue -= 360;
  }

  for (const colorRange of bounds) {
    const colorDef = defineColor(colorRange);
    if (colorDef.hueRange && adjustedHue >= colorDef.hueRange[0] && adjustedHue <= colorDef.hueRange[1]) {
      return colorDef;
    }
  }

  throw new Error('Color not found');
}

function randomWithinRange(range: [number, number], seed: number | undefined): number {
  if (seed === undefined) {
    return Math.floor(range[0] + Math.random() * (range[1] + 1 - range[0]));
  }

  const max = range[1] || 1;
  const min = range[0] || 0;
  const seededRandom = (seed = (9301 * seed + 49297) % 233280) / 233280;

  return Math.floor(min + seededRandom * (max - min));
}

function defineColor(colorRange: ColorRange): ColorDefinition {
  const lowerBounds = colorRange.lowerBounds;
  const saturationMin = lowerBounds[0][0];
  const saturationMax = lowerBounds[lowerBounds.length - 1][0];
  const brightnessMin = lowerBounds[lowerBounds.length - 1][1];
  const brightnessMax = lowerBounds[0][1];

  return {
    name: colorRange.name,
    hueRange: colorRange.hueRange,
    lowerBounds: colorRange.lowerBounds,
    saturationRange: [saturationMin, saturationMax],
    brightnessRange: [brightnessMin, brightnessMax]
  };
}