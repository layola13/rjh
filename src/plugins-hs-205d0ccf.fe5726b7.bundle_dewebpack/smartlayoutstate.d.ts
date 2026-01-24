/**
 * SmartLayoutState module for managing smart layout generation workflow
 */

/**
 * Smart layout task status enum
 */
export enum SmartLayoutState {
  /** Initial state before any task submission */
  Initial = -1,
  /** Task is queued and waiting to be processed */
  Queneing = 0,
  /** Task is currently being calculated */
  Calculating = 1,
  /** Task completed successfully */
  Success = 2,
  /** Task failed with error */
  Error = 3,
}

/**
 * Design information structure
 */
export interface DesignInfo {
  /** Unique design identifier */
  designId: string;
  /** Design version number */
  designVersion: string;
}

/**
 * Layout result item
 */
export interface LayoutResult {
  /** Unique result identifier */
  id: string;
  /** Layout name/title */
  name: string;
  /** Primary preview image URL */
  imgUrl1: string;
  /** Secondary preview image URL (higher quality) */
  imgUrl2?: string;
  /** Design JSON data URL */
  designJsonUrl: string;
}

/**
 * Task status response from backend
 */
export interface TaskStatusResponse {
  /** Current task status */
  taskStatus: SmartLayoutState;
  /** Task start timestamp (milliseconds) */
  taskStartTime?: number;
  /** Array of generated layout results */
  resultList?: LayoutResult[];
  /** Task description or error message */
  taskDesc?: string;
}

/**
 * Smart layout dialog props
 */
export interface SmartLayoutDialogProps {
  /** Function to check if conditions are met for layout generation */
  checkCondition: () => boolean;
  /** Maximum time allowed for calculation (milliseconds) */
  MAX_TIME: number;
  /** Function to retrieve current design information */
  getDesignInfo: () => DesignInfo;
  /** Function to fetch current task result from backend */
  getTaskResult: () => Promise<TaskStatusResponse>;
  /** Callback invoked after successful task submission */
  submitCallback: () => void;
}

/**
 * Modal configuration for basic dialogs
 */
export interface ModalConfig {
  /** CSS class name for the modal */
  className?: string;
  /** Modal title text */
  title?: string;
  /** React content to render in modal body */
  content?: React.ReactNode;
  /** Whether to show confirmation checkbox */
  enableCheckbox?: boolean;
  /** Hide cancel button flag */
  hideCancelButton?: boolean;
  /** Hide OK button flag */
  hideOkButton?: boolean;
  /** Show/hide footer section */
  showFooter?: boolean;
  /** CSS class for modal container */
  containerClassName?: string;
}

/**
 * Opens the smart layout dialog modal
 * @param props - Configuration props for the smart layout workflow
 * @returns Modal instance reference
 */
export declare function showSmartLayoutDialog(
  props: SmartLayoutDialogProps
): unknown;