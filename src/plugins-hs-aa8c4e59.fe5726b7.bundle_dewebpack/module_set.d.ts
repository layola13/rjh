/**
 * Module: module_set
 * Original ID: set
 */

/**
 * Sets the flag to control whether the import confirmation dialog should be displayed.
 * 
 * @param shouldHide - When true, the import confirmation dialog will be suppressed
 */
declare function setDontShowImportConfirmDialog(shouldHide: boolean): void;

/**
 * Interface representing an object that manages import confirmation dialog preferences
 */
interface ImportConfirmDialogManager {
  /**
   * Internal flag indicating whether the import confirmation dialog should be hidden
   * @internal
   */
  _dontShowImportConfirmDialog: boolean;

  /**
   * Sets whether to hide the import confirmation dialog
   * @param shouldHide - When true, suppresses the import confirmation dialog
   */
  setDontShowImportConfirmDialog(shouldHide: boolean): void;
}

export { ImportConfirmDialogManager, setDontShowImportConfirmDialog };