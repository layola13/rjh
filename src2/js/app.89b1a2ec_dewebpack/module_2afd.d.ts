/**
 * Localization strings for formula-related UI components
 * Contains internationalized text labels for formula operations
 */
declare module 'formula-localization' {
  /**
   * Localization resource interface for formula UI
   */
  export interface FormulaLocalization {
    /**
     * Label for opening a new formula editor or dialog
     * @example "open new formula"
     */
    openToggleFormula: string;

    /**
     * Label for cloning all items or formulas
     * @example "cloneAll"
     */
    cloneAll: string;
  }

  /**
   * Default export containing the localization strings
   */
  const localization: FormulaLocalization;
  export default localization;
}