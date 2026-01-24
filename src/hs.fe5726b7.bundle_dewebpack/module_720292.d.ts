/**
 * CSS Module Loader Type Definitions
 * 
 * This module loads and exports CSS styles with embedded font-face declarations
 * and various loading/progress indicator styles for a web application.
 * 
 * @module CSSStyleLoader
 */

/**
 * CSS Module Loader Function
 * 
 * Webpack module pattern that loads CSS content with asset URL resolution.
 * This module handles font loading, loading animations, and progress indicators.
 * 
 * @param exports - The module exports object
 * @param module - The current module instance
 * @param require - The require function for importing dependencies
 */
declare module 'CSSStyleLoader' {
  /**
   * Asset URL resolver function
   * Converts asset module references to publicly accessible URLs
   */
  type AssetUrlResolver = (assetModule: unknown) => string;

  /**
   * CSS Loader push function signature
   * Pushes CSS content array to the style loader
   * 
   * @param content - Tuple containing module ID and CSS string
   */
  type CSSLoaderPush = (content: [string, string]) => void;

  /**
   * CSS Loader instance with push method
   */
  interface CSSLoader {
    push: CSSLoaderPush;
  }

  /**
   * Module exports containing the CSS loader instance
   */
  interface ModuleExports {
    /** The CSS loader instance */
    loader: CSSLoader;
    
    /** Module identifier */
    id: string;
  }

  /**
   * Asset module IDs used in this CSS module
   */
  interface AssetModules {
    /** icomoon.eot font file */
    readonly ICOMOON_EOT: 549434;
    
    /** icomoon.woff font file */
    readonly ICOMOON_WOFF: 252628;
    
    /** icomoon.ttf font file */
    readonly ICOMOON_TTF: 259236;
    
    /** icomoon.svg font file */
    readonly ICOMOON_SVG: 943528;
    
    /** Image placeholder asset */
    readonly IMAGE_PLACEHOLDER: 5463;
    
    /** Cannot show image placeholder */
    readonly CANT_SHOW_IMAGE: 694160;
  }

  /**
   * CSS class definitions exported by this module
   */
  interface CSSClasses {
    /** Full screen overlay cover */
    fullcover: string;
    
    /** Grey colored overlay variant */
    'fullcover.greycolor': string;
    
    /** Centered page element */
    pagecenter: string;
    
    /** Loading SVG container */
    loadingsvg: string;
    
    /** Circular loader animation */
    loader: string;
    
    /** Homestyler brand text */
    homestyler_text: string;
    
    /** Rotating SVG target container */
    rotatesvgtarget: string;
    
    /** Centered panel */
    panelcenter: string;
    
    /** Centered container */
    containercenter: string;
    
    /** Left-aligned container */
    containerleft: string;
    
    /** Image placeholder background */
    imgplaceholder: string;
    
    /** Cannot show image state */
    cantshowimg: string;
    
    /** No image state */
    noimg: string;
    
    /** 2D content loading color */
    loading2dcontentcolor: string;
    
    /** Progress indicator container */
    'progress-indicator': string;
    
    /** Progress bar element */
    progress: string;
    
    /** Info-styled progress bar */
    'progress-bar-info': string;
    
    /** Failed progress state */
    'progress-failed': string;
    
    /** Status text display */
    statustext: string;
  }

  /**
   * Font face configuration for icomoon icon font
   */
  interface FontFaceConfig {
    /** Font family name */
    fontFamily: 'icomoon';
    
    /** Font file URLs in various formats */
    sources: {
      eot: string;
      woff: string;
      truetype: string;
      svg: string;
    };
    
    /** Font weight */
    fontWeight: 'normal';
    
    /** Font style */
    fontStyle: 'normal';
  }

  /**
   * Animation keyframes definition
   */
  interface RotateAnimation {
    /** Animation name */
    name: 'rotateit';
    
    /** Animation duration in seconds */
    duration: 1.5;
    
    /** Animation timing function */
    timingFunction: 'linear';
    
    /** Animation iteration count */
    iterationCount: 'infinite';
    
    /** Rotation transform from 0 to 360 degrees */
    transform: {
      from: 'rotate(0deg)';
      to: 'rotate(360deg)';
    };
  }

  export type { 
    AssetUrlResolver, 
    CSSLoader, 
    ModuleExports, 
    AssetModules, 
    CSSClasses,
    FontFaceConfig,
    RotateAnimation
  };
}