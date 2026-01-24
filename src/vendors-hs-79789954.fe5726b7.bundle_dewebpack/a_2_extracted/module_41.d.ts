/**
 * Ligature substitution handler for OpenType font processing.
 * Applies ligature glyph substitution and marks component glyphs as deleted.
 */

/**
 * Represents a substitution operation for a ligature glyph.
 */
interface LigatureSubstitution {
  /** The ligature glyph that replaces the component glyphs */
  ligGlyph: string | number;
  /** Array of component glyphs that form the ligature */
  components: Array<string | number>;
}

/**
 * Represents a glyph or text element with tag and substitution information.
 */
interface GlyphElement {
  /** The tag identifier for this element */
  tag: string;
  /** Ligature substitution data */
  substitution: LigatureSubstitution;
}

/**
 * Represents a glyph state object that can be modified during processing.
 */
interface GlyphState {
  /**
   * Sets the state of the glyph.
   * @param key - The state key to set
   * @param value - The state value (glyph identifier or boolean flag)
   */
  setState(key: string, value: string | number | boolean): void;
}

/**
 * Applies ligature substitution to a sequence of glyphs.
 * 
 * This function replaces multiple component glyphs with a single ligature glyph
 * and marks the original component glyphs as deleted.
 * 
 * @param element - The glyph element containing ligature substitution data
 * @param glyphStates - Array of glyph state objects to be modified
 * @param startIndex - The starting index in the glyphStates array
 * 
 * @example
 * // Replace "f" + "i" with "fi" ligature
 * const element = {
 *   tag: "ligature",
 *   substitution: {
 *     ligGlyph: "fi",
 *     components: ["f", "i"]
 *   }
 * };
 * applyLigatureSubstitution(element, glyphStates, 0);
 */
declare function applyLigatureSubstitution(
  element: GlyphElement,
  glyphStates: GlyphState[],
  startIndex: number
): void;

export { applyLigatureSubstitution, GlyphElement, LigatureSubstitution, GlyphState };