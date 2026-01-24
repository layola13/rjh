/**
 * CSS module exports type definition
 * This module exports CSS styles for a file uploader component with various layout utilities
 */

/**
 * CSS Module function type that returns an array for style injection
 * @param shouldUseSourceMap - Flag to determine if source maps should be included
 * @returns Array containing module metadata and CSS content
 */
type CssModuleLoader = (shouldUseSourceMap: boolean) => {
  push: (entry: [string, string]) => void;
};

/**
 * Webpack module export function signature
 * @param exports - Module exports object
 * @param module - Current module metadata
 * @param require - Webpack require function to load dependencies
 */
declare function initCssModule(
  exports: { exports: any },
  module: { id: string },
  require: (moduleId: number) => CssModuleLoader
): void;

/**
 * CSS class names available in this module
 */
export interface CssModuleClasses {
  /** Clearfix utility - clears floats after element */
  clearfloat: string;
  
  /** Float left utility */
  fl: string;
  
  /** Float right utility */
  fr: string;
  
  /** Box-sizing border-box utility with vendor prefixes */
  'box-sizing': string;
  
  /** Main container for DIY file uploader with flexbox layout */
  diyFilesUploaderContainer: string;
  
  /** File processing display area */
  fileProcesser: string;
  
  /** Picture name display element */
  'picture-name': string;
  
  /** Modified file processor for removal flow */
  removeFileProcesser: string;
  
  /** Error page container */
  errorPage: string;
  
  /** Question icon styling */
  questionIcon: string;
  
  /** Action button styling */
  actionButton: string;
  
  /** Loader progress bar container */
  loaderProgress: string;
  
  /** Modified loader progress for removal flow */
  removeLoaderProgress: string;
  
  /** Container bottom section for tile removal */
  removeTilesUploaderContainerBottom: string;
  
  /** Upload form wrapper */
  uploadFormWrapper: string;
  
  /** Upload reload button */
  uploadReloadBtn: string;
  
  /** Upload image preview container */
  uploadImg: string;
  
  /** Upload form division */
  uploadFormDiv: string;
  
  /** Upload form element */
  uploadForm: string;
  
  /** Error tabs display */
  errorTabs: string;
  
  /** Upload form list item */
  uploadFormLi: string;
  
  /** Required field indicator */
  required: string;
  
  /** Upload list item */
  uploadLi: string;
  
  /** Error input styling */
  errorInput: string;
  
  /** Upload form list item end section */
  uploadFormLiEnd: string;
  
  /** Error division styling */
  errorDiv: string;
  
  /** Lock icon/button container */
  lock: string;
  
  /** Size remarks section */
  sizeRemarks: string;
  
  /** Error size tabs display */
  errorSizeTabs: string;
  
  /** Input length container */
  inputLength: string;
  
  /** Upload form footer */
  uploadFormFooter: string;
  
  /** DIY user guide wrapper */
  diyUserguideWrap: string;
  
  /** DIY user guide main container */
  diyUserguide: string;
  
  /** Guide container section */
  guideContainer: string;
  
  /** Individual guide item */
  guide: string;
  
  /** Guide icon display */
  icon: string;
  
  /** Guide tip text */
  tip: string;
  
  /** State indicator group */
  stateGroup: string;
  
  /** Active state indicator */
  active: string;
  
  /** Navigation arrow */
  arrow: string;
  
  /** Message dialog cancel button override */
  'msg-dialog-cancel-btn': string;
}

/**
 * Default export - CSS module class mappings
 */
declare const styles: CssModuleClasses;
export default styles;