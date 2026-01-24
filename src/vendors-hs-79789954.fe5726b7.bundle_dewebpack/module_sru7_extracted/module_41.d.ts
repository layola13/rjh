/**
 * Ligature Glyph State Manager
 * Handles OpenType ligature substitution by setting glyph states and marking components as deleted.
 */

/**
 * Represents a ligature substitution operation
 */
interface LigatureSubstitution {
  /** The ligature glyph ID that replaces the component glyphs */
  ligGlyph: number | string;
  /** Array of component glyph IDs that form the ligature */
  components: ReadonlyArray<number | string>;
}

/**
 * Represents a glyph entry with state management capabilities
 */
interface GlyphEntry {
  /**
   * Sets the state of the glyph entry
   * @param key - The state property key (e.g., tag name or "deleted")
   * @param value - The state value to set
   */
  setState(key: string, value: string | number | boolean): void;
}

/**
 * Ligature substitution event data
 */
interface LigatureEvent {
  /** The tag or category identifier for the ligature */
  tag: string;
  /** The ligature substitution details */
  substitution: LigatureSubstitution;
}

/**
 * Applies a ligature substitution to a sequence of glyph entries.
 * Sets the first glyph to the ligature glyph and marks all component glyphs as deleted.
 * 
 * @param event - The ligature substitution event containing tag and substitution data
 * @param glyphEntries - Array of glyph entries to modify
 * @param startIndex - The starting index in the glyph entries array
 * 
 * @remarks
 * This function modifies glyph entries in place:
 * - The glyph at `startIndex` is set to the ligature glyph with the specified tag
 * - All subsequent component glyphs are marked as deleted
 * 
 * @example
 *