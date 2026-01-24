/**
 * CSS Module Declaration
 * 
 * This module exports CSS styles for a dialog/modal component with form elements,
 * buttons, image upload functionality, and overlay effects.
 * 
 * @module CSSModuleStyles
 */

/**
 * CSS class names available in this module
 */
export interface CSSModuleClasses {
  /** Base button styles with border-radius, padding, and margin */
  btn: string;
  
  /** Primary button variant with blue background (#4d9bd6) */
  'btn-primary': string;
  
  /** Default button variant with white background and gray border */
  'btn-default': string;
  
  /** Fixed overlay covering the entire viewport with semi-transparent background */
  modalCover: string;
  
  /** Picture view container component */
  'hs-pictureView': string;
  
  /** Image element within picture view, centered and full-size */
  img: string;
  
  /** Semi-transparent mask overlay with loading/error states */
  maskBkg: string;
  
  /** Animated loading spinner symbol (rotating animation) */
  loadingMaskSymbol: string;
  
  /** Error state symbol displayed on mask */
  errorMaskSymbol: string;
  
  /** Root container for popup/modal dialogs */
  popupcontainer: string;
  
  /** Dialog wrapper for group-related modals */
  'mygroup-dialog': string;
  
  /** Material Design style overlay (z-index: 3002) */
  'md-overlay': string;
  
  /** Main popup window with rounded corners and shadow */
  popupwindows: string;
  
  /** Inner wrapper for window content with border-radius */
  windowWrapper: string;
  
  /** Header section with title and close button */
  windowHeader: string;
  
  /** Dialog title text (20px, bold, dark gray) */
  title: string;
  
  /** Close button positioned in top-right corner */
  closeBtn: string;
  
  /** Main content area of the window */
  windowContents: string;
  
  /** Form container with left padding */
  designform: string;
  
  /** Main form fields container */
  mainfields: string;
  
  /** Form row layout (flexbox, 30px bottom margin) */
  'form-row': string;
  
  /** Form label aligned to the right (4em width) */
  'form-label': string;
  
  /** Required field indicator (red asterisk) */
  'label-required': string;
  
  /** Form row content wrapper */
  'form-row-content': string;
  
  /** Character count display for input fields */
  'design-name-length': string;
  
  /** Error message hints styled in red */
  'error-hints': string;
  
  /** Title form field section */
  'form-title': string;
  
  /** Upload section for image/file uploads */
  'form-upload': string;
  
  /** Clickable upload area (100x100px) */
  'upload-zone': string;
  
  /** Placeholder shown when no file is uploaded */
  'upload-placeholder': string;
  
  /** Upload action buttons and tips */
  'upload-actions': string;
  
  /** Helper text for upload functionality */
  'upload-tips': string;
  
  /** Restore/reset button for uploads */
  restore: string;
  
  /** Disabled state for restore button */
  disabled: string;
  
  /** Action buttons container (save/cancel) */
  actionbuttons: string;
  
  /** Cancel button (gray background, rounded) */
  'cancel-design': string;
  
  /** Save button (blue background, rounded) */
  'save-design': string;
  
  /** Focus state for form inputs */
  focus: string;
  
  /** Error state styling for form elements */
  error: string;
  
  /** Icon font view container */
  'hs-iconfont-view': string;
}

/**
 * CSS Module export
 * Contains all style definitions for the dialog component
 */
declare const styles: CSSModuleClasses;

export default styles;

/**
 * CSS Module Loader Function Type
 * 
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns Array containing module metadata and CSS content
 */
export type CSSLoaderFunction = (useSourceMap: boolean) => Array<[string, string]>;

/**
 * Module metadata
 */
export interface ModuleInfo {
  /** Unique module identifier */
  id: string | number;
  
  /** CSS content as string */
  css: string;
  
  /** Optional source map data */
  sourceMap?: unknown;
}