/**
 * Material Design Color Palette
 * 
 * A comprehensive collection of Material Design color definitions including all color variants
 * (lighten, darken, accent) for each primary color, plus neutral shades.
 * 
 * @see https://material.io/design/color/the-color-system.html
 */

/**
 * Color variant interface defining all possible shades for a Material Design color
 */
export interface MaterialColorVariants {
  /** Base color value */
  base: string;
  /** Lightest variant (90% lighter) */
  lighten5: string;
  /** Very light variant (80% lighter) */
  lighten4: string;
  /** Light variant (60% lighter) */
  lighten3: string;
  /** Medium light variant (40% lighter) */
  lighten2: string;
  /** Slightly light variant (20% lighter) */
  lighten1: string;
  /** Slightly dark variant (20% darker) */
  darken1: string;
  /** Medium dark variant (40% darker) */
  darken2: string;
  /** Dark variant (60% darker) */
  darken3: string;
  /** Darkest variant (80% darker) */
  darken4: string;
  /** Lightest accent color */
  accent1: string;
  /** Light accent color */
  accent2: string;
  /** Medium accent color */
  accent3: string;
  /** Dark accent color */
  accent4: string;
}

/**
 * Color variant interface for colors without accent variants (Brown, Blue Grey, Grey)
 */
export interface MaterialColorVariantsNoAccent {
  /** Base color value */
  base: string;
  /** Lightest variant (90% lighter) */
  lighten5: string;
  /** Very light variant (80% lighter) */
  lighten4: string;
  /** Light variant (60% lighter) */
  lighten3: string;
  /** Medium light variant (40% lighter) */
  lighten2: string;
  /** Slightly light variant (20% lighter) */
  lighten1: string;
  /** Slightly dark variant (20% darker) */
  darken1: string;
  /** Medium dark variant (40% darker) */
  darken2: string;
  /** Dark variant (60% darker) */
  darken3: string;
  /** Darkest variant (80% darker) */
  darken4: string;
}

/**
 * Neutral shades (black, white, transparent)
 */
export interface MaterialShades {
  /** Pure black (#000000) */
  black: string;
  /** Pure white (#ffffff) */
  white: string;
  /** Transparent color */
  transparent: string;
}

/**
 * Complete Material Design color palette
 */
export interface MaterialColors {
  /** Red color variants */
  red: MaterialColorVariants;
  /** Pink color variants */
  pink: MaterialColorVariants;
  /** Purple color variants */
  purple: MaterialColorVariants;
  /** Deep Purple color variants */
  deepPurple: MaterialColorVariants;
  /** Indigo color variants */
  indigo: MaterialColorVariants;
  /** Blue color variants */
  blue: MaterialColorVariants;
  /** Light Blue color variants */
  lightBlue: MaterialColorVariants;
  /** Cyan color variants */
  cyan: MaterialColorVariants;
  /** Teal color variants */
  teal: MaterialColorVariants;
  /** Green color variants */
  green: MaterialColorVariants;
  /** Light Green color variants */
  lightGreen: MaterialColorVariants;
  /** Lime color variants */
  lime: MaterialColorVariants;
  /** Yellow color variants */
  yellow: MaterialColorVariants;
  /** Amber color variants */
  amber: MaterialColorVariants;
  /** Orange color variants */
  orange: MaterialColorVariants;
  /** Deep Orange color variants */
  deepOrange: MaterialColorVariants;
  /** Brown color variants (no accent colors) */
  brown: MaterialColorVariantsNoAccent;
  /** Blue Grey color variants (no accent colors) */
  blueGrey: MaterialColorVariantsNoAccent;
  /** Grey color variants (no accent colors) */
  grey: MaterialColorVariantsNoAccent;
  /** Neutral shades (black, white, transparent) */
  shades: MaterialShades;
}

/**
 * Default export: Complete Material Design color palette
 */
declare const colors: Readonly<MaterialColors>;

export default colors;