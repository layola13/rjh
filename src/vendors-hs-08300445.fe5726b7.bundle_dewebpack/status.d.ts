/**
 * Status constants for diff operations
 */

/** Item was added in the new list */
export const STATUS_ADD = "add";

/** Item exists in both lists (kept) */
export const STATUS_KEEP = "keep";

/** Item was removed from the old list */
export const STATUS_REMOVE = "remove";

/** Item has been removed (past tense) */
export const STATUS_REMOVED = "removed";

/**
 * Status type for diff operations
 */
export type DiffStatus = typeof STATUS_ADD | typeof STATUS_KEEP | typeof STATUS_REMOVE | typeof STATUS_REMOVED;

/**
 * Key object with status information
 */
export interface KeyObject {
  /** Unique identifier for the item */
  key: string;
  /** Diff status of the item */
  status?: DiffStatus;
  /** Additional properties */
  [key: string]: unknown;
}

/**
 * Input key type - can be a primitive or an object with a key property
 */
export type KeyInput = string | number | { key: string | number; [key: string]: unknown };

/**
 * Wraps a key input into a standardized KeyObject
 * @param input - The key or object containing a key
 * @returns Normalized KeyObject with string key
 */
export function wrapKeyToObject(input: KeyInput): KeyObject;

/**
 * Parses an array of key inputs into normalized KeyObjects
 * @param keys - Array of keys or key objects to parse
 * @returns Array of normalized KeyObjects
 */
export function parseKeys(keys?: KeyInput[]): KeyObject[];

/**
 * Compares two lists of keys and returns a diff with status annotations
 * 
 * This function performs a diff operation between old and new key lists,
 * marking each item with STATUS_ADD, STATUS_KEEP, or STATUS_REMOVE.
 * Duplicate keys are handled by prioritizing KEEP status over REMOVE.
 * 
 * @param oldKeys - The original list of keys
 * @param newKeys - The updated list of keys
 * @returns Array of KeyObjects with status annotations indicating changes
 * 
 * @example
 *