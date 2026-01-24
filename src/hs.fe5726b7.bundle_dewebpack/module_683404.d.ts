/**
 * CSS module exports type definition
 * Module: module_683404
 * Original ID: 683404
 */

/**
 * CSS module loader function type
 * @param sourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method
 */
type CSSLoaderFunction = (sourceMap: boolean) => {
  /**
   * Pushes CSS content to the loader
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [string, string]): void;
};

/**
 * Webpack module context
 */
interface WebpackModuleContext {
  /** Module identifier */
  id: string;
  /** Module exports object */
  exports: unknown;
}

/**
 * CSS Styles Definition
 * Contains LiveHint component positioning styles and Homestyler UI component styles
 */
declare module 'module_683404' {
  /**
   * LiveHint iframe positioning class
   * Applies relative positioning with -14px top offset
   */
  export const iframeLivehint: string;

  /**
   * Customized modeling LiveHint positioning class
   * Applies relative positioning with 38px top offset
   */
  export const customizedModelingLivehint: string;

  /**
   * Toolbar LiveHint positioning class
   * Applies relative positioning with -13px top offset
   */
  export const toolbarLivehint: string;

  /**
   * Default LiveHint positioning class
   * Applies relative positioning with no top offset
   */
  export const defaultLivehint: string;

  /**
   * Homestyler notice action link class
   * Applies brand color and pointer cursor
   */
  export const homestylerNoticeAction: string;

  /**
   * Homestyler notice content container class
   * Max width 650px with hidden overflow
   */
  export const homestylerNoticeContent: string;

  /**
   * Normal message wrapper class
   * Flexible auto layout with hidden overflow and vertical padding
   */
  export const normalMessageWrapper: string;

  /**
   * LiveHint content class
   * Multi-line text with ellipsis (max 2 lines)
   */
  export const hsLivehintContent: string;

  /**
   * No animation utility class
   * Disables all CSS animations with !important flag
   */
  export const noAnimation: string;
}

/**
 * Module factory function signature
 * @param context - Webpack module context object
 * @param exports - Module exports target
 * @param require - Webpack require function for loading dependencies
 */
export type ModuleFactory = (
  context: WebpackModuleContext,
  exports: unknown,
  require: (moduleId: number) => CSSLoaderFunction
) => void;