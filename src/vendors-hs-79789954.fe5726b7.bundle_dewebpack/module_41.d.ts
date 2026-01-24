/**
 * Ligature substitution handler for OpenType font processing.
 * Applies a ligature glyph substitution and marks component glyphs as deleted.
 */

/**
 * Represents a ligature substitution configuration
 */
interface LigatureSubstitution {
  /**
   * The ligature glyph ID that replaces the component glyphs
   */
  ligGlyph: number | string;
  
  /**
   * Array of component glyph IDs that form the ligature
   */
  components: Array<number | string>;
}

/**
 * Represents a glyph substitution event
 */
interface GlyphSubstitutionEvent {
  /**
   * The type or category of the substitution
   */
  tag: string;
  
  /**
   * Ligature substitution data
   */
  substitution: LigatureSubstitution;
}

/**
 * Represents a glyph state in the processing pipeline
 */
interface GlyphState {
  /**
   * Sets the state of the glyph
   * @param stateKey - The state property to modify
   * @param stateValue - The value to set (e.g., glyph ID or boolean flag)
   */
  setState(stateKey: string, stateValue: string | number | boolean): void;
}

/**
 * Processes a ligature substitution by replacing component glyphs with a single ligature glyph.
 * The first glyph receives the ligature glyph ID, while subsequent component glyphs are marked as deleted.
 * 
 * @param event - The ligature substitution event containing the ligature glyph and components
 * @param glyphStates - Array of glyph states to be modified
 * @param startIndex - The starting index in the glyph states array where substitution begins
 */
declare function applyLigatureSubstitution(
  event: GlyphSubstitutionEvent,
  glyphStates: GlyphState[],
  startIndex: number
): void;