/**
 * HSL color representation
 */
export interface HSLColor {
  /** Hue (0-360) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Lightness (0-1) */
  l: number;
  /** Color source identifier */
  source?: string;
}

/**
 * Color change event data
 */
export interface ColorChangeData {
  /** Hue (0-360) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Lightness (0-1) */
  l: number;
  /** Color source identifier */
  source: string;
}

/**
 * Props for SliderSwatch component
 */
export interface SliderSwatchProps {
  /** HSL color value */
  hsl: HSLColor;
  /** Lightness offset (0-1) */
  offset: number;
  /** Click event handler */
  onClick?: (color: ColorChangeData, event: React.MouseEvent<HTMLDivElement>) => void;
  /** Whether this swatch is currently active */
  active?: boolean;
  /** Whether this is the first swatch in the slider */
  first?: boolean;
  /** Whether this is the last swatch in the slider */
  last?: boolean;
}

/**
 * A single color swatch component for use in a slider control.
 * Represents a specific lightness value along the HSL spectrum.
 */
export declare const SliderSwatch: React.FC<SliderSwatchProps>;

export default SliderSwatch;