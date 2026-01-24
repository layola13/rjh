/**
 * Localization strings for formula-related UI actions
 * Contains translation keys for formula toggle and clone operations
 */
declare module 'module_0afa' {
  /**
   * Interface defining localization strings for formula features
   */
  interface FormulaLocalization {
    /**
     * Text for opening a new formula dialog or panel
     * @example "open new formula"
     */
    openToggleFormula: string;

    /**
     * Text for cloning all formulas or related content
     * @example "cloneAll"
     */
    cloneAll: string;
  }

  /**
   * Exported localization object containing formula-related strings
   */
  const localization: FormulaLocalization;

  export = localization;
}