/**
 * Material Design Color Palette
 * Provides a comprehensive set of color definitions following Material Design guidelines.
 * Each color family includes base, lighten, darken, and accent variations.
 */

/**
 * Color shade definition for a single color family
 * Includes base color, 5 lighter shades, 4 darker shades, and 4 accent colors
 */
interface ColorShades {
  /** Base color of the palette */
  base: string;
  /** Lightest shade (90% lighter) */
  lighten5: string;
  /** Very light shade (80% lighter) */
  lighten4: string;
  /** Light shade (60% lighter) */
  lighten3: string;
  /** Medium light shade (40% lighter) */
  lighten2: string;
  /** Slightly lighter shade (20% lighter) */
  lighten1: string;
  /** Slightly darker shade (20% darker) */
  darken1: string;
  /** Medium dark shade (40% darker) */
  darken2: string;
  /** Dark shade (60% darker) */
  darken3: string;
  /** Darkest shade (80% darker) */
  darken4: string;
  /** Accent color variant 1 (lightest accent) */
  accent1: string;
  /** Accent color variant 2 (light accent) */
  accent2: string;
  /** Accent color variant 3 (medium accent) */
  accent3: string;
  /** Accent color variant 4 (darkest accent) */
  accent4: string;
}

/**
 * Simplified color shade definition for neutral colors
 * Only includes base and lightness variations (no accent colors)
 */
interface NeutralColorShades {
  /** Base color of the palette */
  base: string;
  /** Lightest shade */
  lighten5: string;
  /** Very light shade */
  lighten4: string;
  /** Light shade */
  lighten3: string;
  /** Medium light shade */
  lighten2: string;
  /** Slightly lighter shade */
  lighten1: string;
  /** Slightly darker shade */
  darken1: string;
  /** Medium dark shade */
  darken2: string;
  /** Dark shade */
  darken3: string;
  /** Darkest shade */
  darken4: string;
}

/**
 * Basic shades (black, white, transparent)
 */
interface BasicShades {
  /** Pure black (#000000) */
  black: string;
  /** Pure white (#ffffff) */
  white: string;
  /** Transparent color */
  transparent: string;
}

/**
 * Complete Material Design color palette
 * Contains all color families and basic shades
 */
interface MaterialColors {
  /** Red color family */
  red: Readonly<ColorShades>;
  /** Pink color family */
  pink: Readonly<ColorShades>;
  /** Purple color family */
  purple: Readonly<ColorShades>;
  /** Deep purple color family */
  deepPurple: Readonly<ColorShades>;
  /** Indigo color family */
  indigo: Readonly<ColorShades>;
  /** Blue color family */
  blue: Readonly<ColorShades>;
  /** Light blue color family */
  lightBlue: Readonly<ColorShades>;
  /** Cyan color family */
  cyan: Readonly<ColorShades>;
  /** Teal color family */
  teal: Readonly<ColorShades>;
  /** Green color family */
  green: Readonly<ColorShades>;
  /** Light green color family */
  lightGreen: Readonly<ColorShades>;
  /** Lime color family */
  lime: Readonly<ColorShades>;
  /** Yellow color family */
  yellow: Readonly<ColorShades>;
  /** Amber color family */
  amber: Readonly<ColorShades>;
  /** Orange color family */
  orange: Readonly<ColorShades>;
  /** Deep orange color family */
  deepOrange: Readonly<ColorShades>;
  /** Brown color family (no accents) */
  brown: Readonly<NeutralColorShades>;
  /** Blue grey color family (no accents) */
  blueGrey: Readonly<NeutralColorShades>;
  /** Grey color family (no accents) */
  grey: Readonly<NeutralColorShades>;
  /** Basic shades (black, white, transparent) */
  shades: Readonly<BasicShades>;
}

/**
 * Default export: Frozen Material Design color palette
 * All color objects are immutable (Object.freeze)
 */
declare const colors: Readonly<MaterialColors>;

export default colors;