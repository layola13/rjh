/**
 * View model type constants for edit operations
 * Used to identify different types of view models in the editing context
 */
export declare enum EditViewModelType {
  /** Section view model identifier */
  EDIT_VIEW_MODEL_SECTION = "sectionviewmodel",
  
  /** Elevation view model identifier */
  EDIT_VIEW_MODEL_ELEVATION = "elevationviewmodel"
}

/**
 * Legacy export structure containing edit view model type constants
 * @deprecated Consider using EditViewModelType enum directly
 */
export interface S {
  /** Constant for section view model type */
  readonly EDIT_VIEW_MODEL_SECTION: "sectionviewmodel";
  
  /** Constant for elevation view model type */
  readonly EDIT_VIEW_MODEL_ELEVATION: "elevationviewmodel";
}

/**
 * Export of view model type constants
 */
export declare const S: S;