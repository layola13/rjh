/**
 * CSS module exports for diyFileUploader component styles
 * @module module_268387
 * @description Defines styles for a custom file uploader component with progress tracking
 */

/**
 * CSS Module Loader Function Type
 * @param sourceMaps - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method for adding styles
 */
type CSSLoaderFunction = (sourceMaps: boolean) => {
  push(args: [string, string, string]): void;
};

/**
 * Webpack Module Exports Interface
 * @description Standard webpack module structure for CSS/style exports
 */
interface WebpackModuleExports {
  /** Module identifier */
  id: string;
  /** Exported CSS content or loader */
  exports: unknown;
}

/**
 * Webpack Require Function
 * @description Internal webpack module resolution function
 * @param moduleId - Numeric identifier of the module to require
 * @returns The required module's loader function
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFunction;

/**
 * CSS Module Export Function
 * @description Exports CSS styles for the diyFileUploader component
 * @param module - Webpack module object containing id and exports
 * @param exports - Module exports object (unused in this CSS module)
 * @param require - Webpack require function for loading dependencies
 * 
 * @remarks
 * This module defines styles for:
 * - Main uploader container (.diyFileUploader) - Flexbox centered layout
 * - Progress bar (.progress) - Upload progress indicator
 * - Progress container (.changeloaderProcess) - 400px wide progress wrapper
 * - Cloud icon (.uploadcloud) - 200x160px background image container
 * - Upload button text (.uploadbtntext) - 140px wide text container
 * - Picture uploader variant (.fileUploaderPicture) - 420x50px alternative layout
 */
declare function cssModuleExport(
  module: WebpackModuleExports,
  exports: unknown,
  require: WebpackRequire
): void;

/**
 * CSS Content String
 * @description Raw CSS rules for the diyFileUploader component
 */
declare const cssContent: `
.diyFileUploader {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: auto!important;
  width: auto!important;
  margin-top: 20px;
}
.diyFileUploader .progress {
  margin-bottom: 20px;
}
.diyFileUploader .changeloaderProcess {
  padding-left: 0;
  padding-right: 0;
  width: 400px;
}
.diyFileUploader .uploadcloud {
  width: 200px;
  height: 160px;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0 auto;
}
.diyFileUploader .uploadbtntext {
  width: 140px;
}
.diyFileUploader .uploadbtntext.upload {
  position: relative;
}
.fileUploaderPicture {
  align-items: flex-start;
  justify-content: flex-start;
  width: 420px;
  height: 50px;
}
`;

/**
 * Module Export Type
 * @description Type definition for the entire CSS module
 */
export type CSSModule = typeof cssContent;

export default cssModuleExport;