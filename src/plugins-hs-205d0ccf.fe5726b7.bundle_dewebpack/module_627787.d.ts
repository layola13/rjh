/**
 * CSS module for "goto-teaching" component styling
 * Provides theme variants (light/black) and interactive states
 */

/**
 * Webpack module loader function type
 * @param e - Module exports object
 * @param t - Module metadata/context
 * @param n - Webpack require function for loading dependencies
 */
declare function webpackCssModule(
  e: WebpackModuleExports,
  t: WebpackModuleContext,
  n: WebpackRequireFunction
): void;

/**
 * Webpack module exports container
 */
interface WebpackModuleExports {
  /** Unique module identifier */
  id: string | number;
  /** Module exports value (typically CSS string array for style modules) */
  exports: CssModuleExports;
}

/**
 * CSS module exports from css-loader
 */
interface CssModuleExports {
  /**
   * Push CSS content to the loader's internal array
   * @param data - Tuple of [moduleId, cssContent, sourceMap?]
   */
  push(data: [string | number, string, boolean?]): void;
}

/**
 * Webpack module context/metadata
 */
interface WebpackModuleContext {
  /** Module ID */
  id?: string | number;
  /** Whether module is loaded */
  loaded?: boolean;
  /** Parent module references */
  parents?: string[];
}

/**
 * Webpack's internal require function
 * @param moduleId - ID of the module to load
 * @returns The loaded module's exports
 */
interface WebpackRequireFunction {
  (moduleId: number | string): unknown;
  /** Cache of loaded modules */
  c?: Record<string, WebpackModuleExports>;
  /** Exposed modules registry */
  m?: Record<string, Function>;
}

/**
 * CSS class definitions for goto-teaching component
 */
declare namespace GotoTeachingStyles {
  /**
   * Root container styles
   * - Cursor: pointer for interactivity
   * - Flexbox layout with vertical centering
   * - Fixed height of 24px
   */
  interface RootClass {
    cursor: 'pointer';
    display: 'flex';
    alignItems: 'center';
    height: '24px';
  }

  /**
   * Split/divider element styles
   * - Width: 14px, Height: 24px
   * - Font size: 14px, Line height: 24px
   * - Overflow hidden with left padding
   */
  interface SplitClass {
    width: '14px';
    height: '24px';
    fontSize: '14px';
    lineHeight: '24px';
    overflow: 'hidden';
    paddingLeft: '14px';
  }

  /**
   * Title text styles
   * - Right padding: 6px
   * - Custom font: AlibabaPuHuiTi-Bold
   * - Smooth transition: 0.2s linear
   */
  interface TitleClass {
    paddingRight: '6px';
    fontFamily: 'AlibabaPuHuiTi-Bold';
    transition: 'all 0.2s linear';
  }

  /**
   * Icon container styles
   * - Circular: 16px diameter
   * - Centered content via flexbox
   * - Font size: 8px
   * - Smooth transition: 0.2s linear
   */
  interface IconClass {
    width: '16px';
    height: '16px';
    borderRadius: '16px';
    overflow: 'hidden';
    fontSize: '8px';
    display: 'flex';
    alignItems: 'center';
    justifyContent: 'center';
    transition: 'all 0.2s linear';
  }

  /**
   * Light theme variant colors
   * - Split: #60646f with gradient to #f5f5f5
   * - Title: #33353b on #f5f5f5 background
   * - Icon: #ffffff on #000000 background
   */
  interface LightTheme {
    split: {
      color: '#60646f';
      backgroundImage: 'linear-gradient(to right, rgba(245, 245, 245, 0.1), #f5f5f5 60%, #f5f5f5 100%)';
    };
    title: {
      color: '#33353b';
      backgroundColor: '#f5f5f5';
    };
    icon: {
      backgroundColor: '#000000';
      color: '#fff';
    };
  }

  /**
   * Black/dark theme variant colors
   * - Split: #cccccd with gradient to #434447
   * - Title: #ffffff on #434447 background
   * - Icon: #2b2c2e on #ffffff background
   */
  interface BlackTheme {
    split: {
      color: '#cccccd';
      backgroundImage: 'linear-gradient(to right, rgba(67, 68, 71, 0.1), #434447 60%, #434447 100%)';
    };
    title: {
      color: '#fff';
      backgroundColor: '#434447';
    };
    icon: {
      backgroundColor: '#fff';
      color: '#2b2c2e';
    };
  }

  /**
   * Hover state styles
   * - Title color: #396efe (blue accent)
   * - Icon background: #396efe (blue accent)
   */
  interface HoverState {
    title: {
      color: '#396efe';
    };
    icon: {
      backgroundColor: '#396efe';
    };
  }
}

export { GotoTeachingStyles, webpackCssModule };