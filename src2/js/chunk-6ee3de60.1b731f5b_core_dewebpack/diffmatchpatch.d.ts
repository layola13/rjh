/**
 * Represents the type of difference operation in a diff comparison
 */
export enum DiffOperation {
  /** Deletion operation */
  DIFF_DELETE = -1,
  /** Insertion operation */
  DIFF_INSERT = 1,
  /** Equal/unchanged operation */
  DIFF_EQUAL = 0
}

/**
 * Represents a single diff operation as a tuple
 * [0] - The operation type (delete/insert/equal)
 * [1] - The text content associated with the operation
 */
export type Diff = [DiffOperation, string];

/**
 * Represents a patch object that contains a set of diffs along with positional metadata
 */
export class PatchObject {
  /** Array of diff operations in this patch */
  diffs: Diff[];
  
  /** Starting position in the source text */
  start1: number;
  
  /** Starting position in the destination text */
  start2: number;
  
  /** Length of the patch in the source text */
  length1: number;
  
  /** Length of the patch in the destination text */
  length2: number;

  constructor();

  /**
   * Converts the patch to a unified diff format string
   * @returns Unified diff format representation of the patch
   */
  toString(): string;
}

/**
 * Main class for performing diff, match, and patch operations
 */
export class DiffMatchPatch {
  /** Timeout in seconds for diff operations (0 for no timeout) */
  diffTimeout: number;
  
  /** Cost of an edit operation for cleanup efficiency */
  diffEditCost: number;
  
  /** Threshold for match quality (0.0 = perfection, 1.0 = very loose) */
  matchThreshold: number;
  
  /** Distance to search for patterns (0 = exact location, 1000+ = very loose) */
  matchDistance: number;
  
  /** Threshold for deleting patches during application */
  patchDeleteThreshold: number;
  
  /** Number of characters of context to include around each patch */
  patchMargin: number;
  
  /** Maximum number of bits in a pattern for bitap algorithm */
  matchMaxBits: number;

  constructor();

  /**
   * Finds the differences between two texts
   * @param text1 - Old string to be diffed
   * @param text2 - New string to be diffed
   * @param checkLines - Optional speedup flag for line-mode diffs
   * @param deadline - Optional deadline timestamp for diff operation
   * @returns Array of diff tuples
   */
  diff_main(text1: string, text2: string, checkLines?: boolean, deadline?: number): Diff[];

  /**
   * Determines the common prefix of two strings
   * @param text1 - First string
   * @param text2 - Second string
   * @returns Length of common prefix
   */
  diff_commonPrefix(text1: string, text2: string): number;

  /**
   * Determines the common suffix of two strings
   * @param text1 - First string
   * @param text2 - Second string
   * @returns Length of common suffix
   */
  diff_commonSuffix(text1: string, text2: string): number;

  /**
   * Reduces the number of edits by eliminating semantically trivial equalities
   * @param diffs - Array of diff tuples to be cleaned up
   */
  diff_cleanupSemantic(diffs: Diff[]): void;

  /**
   * Reduces the number of edits by eliminating operationally trivial equalities
   * @param diffs - Array of diff tuples to be cleaned up
   */
  diff_cleanupSemanticLossless(diffs: Diff[]): void;

  /**
   * Reduces the number of edits by eliminating operationally trivial equalities
   * @param diffs - Array of diff tuples to be cleaned up
   */
  diff_cleanupEfficiency(diffs: Diff[]): void;

  /**
   * Reorders and merges like edit sections
   * @param diffs - Array of diff tuples to be merged
   */
  diff_cleanupMerge(diffs: Diff[]): void;

  /**
   * Locates the best instance of pattern in text near expected location
   * @param text - The text to search
   * @param pattern - The pattern to search for
   * @param location - Expected location of the pattern
   * @returns Best match index or -1 if no match found
   */
  match_main(text: string, pattern: string, location: number): number;

  /**
   * Computes a list of patches to turn text1 into text2
   * @param text1OrDiffs - Old text or array of diffs
   * @param text2OrUndefined - New text (if first param is text) or undefined
   * @param diffsOrUndefined - Optional precomputed diffs
   * @returns Array of patch objects
   */
  patch_make(text1OrDiffs: string | Diff[], text2OrUndefined?: string | Diff[], diffsOrUndefined?: Diff[]): PatchObject[];

  /**
   * Merges a set of patches onto the text
   * @param patches - Array of patch objects
   * @param text - Text to patch
   * @returns Tuple of [patched text, array of success flags]
   */
  patch_apply(patches: PatchObject[], text: string): [string, boolean[]];

  /**
   * Adds padding to patches for cleaner application
   * @param patches - Array of patch objects
   * @returns The padding string added
   */
  patch_addPadding(patches: PatchObject[]): string;

  /**
   * Splits patches that are longer than the maximum limit
   * @param patches - Array of patch objects to be split
   */
  patch_splitMax(patches: PatchObject[]): void;

  /**
   * Converts patches to a textual representation
   * @param patches - Array of patch objects
   * @returns Text representation of patches
   */
  patch_toText(patches: PatchObject[]): string;

  /**
   * Parses a textual representation of patches
   * @param textline - Text representation of patches
   * @returns Array of patch objects
   */
  patch_fromText(textline: string): PatchObject[];

  /**
   * Creates a deep copy of patches array
   * @param patches - Array of patch objects to copy
   * @returns Deep copied array of patch objects
   */
  patch_deepCopy(patches: PatchObject[]): PatchObject[];

  /**
   * Converts diff array to delta string format
   * @param diffs - Array of diff tuples
   * @returns Delta string representation
   */
  diff_toDelta(diffs: Diff[]): string;

  /**
   * Converts delta string back to diff array
   * @param text1 - Source text
   * @param delta - Delta string
   * @returns Array of diff tuples
   */
  diff_fromDelta(text1: string, delta: string): Diff[];

  /**
   * Computes Levenshtein distance from diffs
   * @param diffs - Array of diff tuples
   * @returns Edit distance
   */
  diff_levenshtein(diffs: Diff[]): number;

  /**
   * Converts diffs to pretty HTML representation
   * @param diffs - Array of diff tuples
   * @returns HTML string
   */
  diff_prettyHtml(diffs: Diff[]): string;

  /**
   * Computes the source text from diffs
   * @param diffs - Array of diff tuples
   * @returns Source text (text1)
   */
  diff_text1(diffs: Diff[]): string;

  /**
   * Computes the destination text from diffs
   * @param diffs - Array of diff tuples
   * @returns Destination text (text2)
   */
  diff_text2(diffs: Diff[]): string;

  /**
   * Computes the index in text2 that corresponds to index in text1
   * @param diffs - Array of diff tuples
   * @param location - Location within text1
   * @returns Location within text2
   */
  diff_xIndex(diffs: Diff[], location: number): number;

  /**
   * Splits text into lines and performs diff on line level
   * @param text1 - Old string
   * @param text2 - New string
   * @returns Object containing character representations and line array
   */
  diff_linesToChars(text1: string, text2: string): {
    chars1: string;
    chars2: string;
    lineArray: string[];
  };

  /**
   * Converts character-level diffs back to line-level
   * @param diffs - Array of diff tuples with character codes
   * @param lineArray - Array of unique strings (lines)
   */
  diff_charsToLines(diffs: Diff[], lineArray: string[]): void;
}

/**
 * Returns the minimum of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns Minimum value
 */
export function min(a: number, b: number): number;

/**
 * Returns the maximum of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns Maximum value
 */
export function max(a: number, b: number): number;