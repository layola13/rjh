import { TinyColor } from './710308';
import { convertToPercentage } from './488294';

interface RatioInput {
  r: number;
  g: number;
  b: number;
  a?: number;
}

interface PercentageRGB {
  r: string;
  g: string;
  b: string;
  a?: number;
}

export function fromRatio(input: RatioInput, options?: unknown): TinyColor {
  const rgb: PercentageRGB = {
    r: convertToPercentage(input.r),
    g: convertToPercentage(input.g),
    b: convertToPercentage(input.b)
  };
  
  if (input.a !== undefined) {
    rgb.a = Number(input.a);
  }
  
  return new TinyColor(rgb, options);
}

export function legacyRandom(): TinyColor {
  return new TinyColor({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
}