/**
 * Toggles the category display state.
 * This function sets the visibility flag for categories in the UI.
 * 
 * @param showCate - Category visibility flag. Defaults to 1 (visible).
 *                   Use 1 to show categories, 0 to hide them.
 */
declare function toggleShowCate(showCate?: number): void;

/**
 * Type definition for the category visibility value.
 * - 1: Category is visible
 * - 0: Category is hidden
 */
type CategoryVisibility = 0 | 1;

/**
 * Alternative strongly-typed version of the toggle function.
 * 
 * @param showCate - Category visibility state. Defaults to visible (1).
 */
declare function toggleShowCate(showCate?: CategoryVisibility): void;