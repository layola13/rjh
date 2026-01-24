/**
 * CSS module exports for file uploader component styles
 * @module FileUploaderStyles
 */

/**
 * Webpack CSS loader function signature
 * @param insertStylesFn - Function from css-loader to insert styles
 * @returns Array containing module metadata and CSS content
 */
declare function fileUploaderStylesModule(
  exports: CSSModuleExports,
  require: WebpackRequire,
  cssLoaderInsertStyles: CSSLoaderInsertStylesFunction
): void;

export = fileUploaderStylesModule;

/**
 * CSS module exports interface
 */
interface CSSModuleExports {
  /** Module identifier */
  id: string | number;
  /** Exported CSS classes/styles */
  exports: Record<string, string>;
}

/**
 * Webpack require function type
 */
interface WebpackRequire {
  (moduleId: number | string): unknown;
}

/**
 * CSS loader insert styles function
 * Processes and injects CSS into the document
 * @param sourceMap - Whether to include source maps
 * @returns CSS loader result with push method
 */
interface CSSLoaderInsertStylesFunction {
  (sourceMap: boolean): CSSLoaderResult;
}

/**
 * CSS loader result with push method for adding CSS content
 */
interface CSSLoaderResult {
  /**
   * Pushes CSS content to the loader
   * @param content - Tuple of [moduleId, cssString, sourceMap?]
   */
  push(content: [string | number, string, string?]): void;
}

/**
 * CSS class names exported by this module
 */
declare namespace FileUploaderStyles {
  /**
   * Main file uploader container
   * - Flexbox layout (column direction)
   * - Center-aligned content
   * - Full width and height
   */
  export const fileUploader: string;

  /**
   * Progress indicator within uploader
   * - Bottom margin: 20px
   */
  export const progress: string;

  /**
   * File processor action button
   * - Width: 100px
   * - Center-aligned text
   * - Light gray background (#f2f2f2)
   * - Hover state: darker gray (#E9E9E9)
   */
  export const fileProcesserActionBtn: string;

  /**
   * Change loader process container
   * - No horizontal padding
   * - Fixed width: 400px
   */
  export const changeloaderProcess: string;

  /**
   * Upload cloud icon/image
   * - Size: 200px × 160px
   * - Centered background image (contain, no-repeat)
   * - Centered with auto margins
   */
  export const uploadcloud: string;

  /**
   * Upload button text container
   * - Width: 140px
   * - When in 'upload' state: positioned relatively with top offset -30px
   */
  export const uploadbtntext: string;

  /**
   * Picture-specific uploader variant
   * - Flex-start alignment
   * - Fixed size: 420px × 50px
   */
  export const fileUploaderPicture: string;
}