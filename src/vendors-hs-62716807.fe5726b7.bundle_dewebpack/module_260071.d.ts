/**
 * CSS module loader for Ant Design Empty component styles
 * @module EmptyComponentStyles
 */

/**
 * Webpack module loader function signature
 * @param exports - The module exports object
 * @param module - The module metadata object containing module ID
 * @param require - The webpack require function for loading dependencies
 */
declare function loadEmptyStyles(
  exports: NodeModule['exports'],
  module: NodeModule,
  require: NodeRequire
): void;

/**
 * Module metadata
 */
interface ModuleMetadata {
  /** Original module ID: 260071 */
  readonly id: number | string;
}

/**
 * CSS loader push method signature
 * Pushes CSS content into the style loader pipeline
 */
interface CSSLoaderExports {
  /**
   * Push CSS rules into the loader
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [string | number, string]): void;
}

/**
 * Webpack require function for loading CSS loader
 * @param moduleId - The CSS loader module ID (986380)
 * @returns CSS loader instance with push method
 */
declare function webpackRequire(moduleId: 986380): (
  sourceMap: boolean
) => CSSLoaderExports;

/**
 * Ant Design Empty component CSS class names
 */
declare namespace AntEmptyStyles {
  /** Base empty component container */
  const Empty: string;
  
  /** Empty state image container */
  const EmptyImage: string;
  
  /** Footer section for actions */
  const EmptyFooter: string;
  
  /** Normal size variant (default) */
  const EmptyNormal: string;
  
  /** Small size variant */
  const EmptySmall: string;
  
  /** Right-to-left layout direction */
  const EmptyRtl: string;
  
  /** Default illustration ellipse element */
  const EmptyImgDefaultEllipse: string;
  
  /** Default illustration path elements */
  const EmptyImgDefaultPath1: string;
  const EmptyImgDefaultPath2: string;
  const EmptyImgDefaultPath3: string;
  const EmptyImgDefaultPath4: string;
  const EmptyImgDefaultPath5: string;
  const EmptyImgDefaultG: string;
  
  /** Simple illustration elements */
  const EmptyImgSimpleEllipse: string;
  const EmptyImgSimpleG: string;
  const EmptyImgSimplePath: string;
}

export = AntEmptyStyles;