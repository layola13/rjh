/**
 * CSS module declaration for property bar and help tooltip styles
 * Module ID: 547557
 * 
 * This module exports CSS styles for:
 * - Property bar status bar help image button
 * - Help tooltip text overflow handling
 * - Corner window component styling
 * - Right property bar specific styles
 * - Apply all window title layout
 */

declare module '*.css' {
  const content: string;
  export default content;
}

/**
 * CSS Module Loader Function Type
 * Represents a webpack CSS loader that processes and injects CSS content
 * 
 * @param moduleExports - The module exports object to be populated
 * @param moduleContext - The module context (unused in this case)
 * @param cssLoaderFactory - Factory function from webpack that creates CSS loaders
 * @returns void
 */
type CSSModuleLoader = (
  moduleExports: { exports: CSSModuleExports },
  moduleContext: unknown,
  cssLoaderFactory: CSSLoaderFactory
) => void;

/**
 * CSS Loader Factory Function Type
 * Creates a CSS loader with source map configuration
 * 
 * @param enableSourceMap - Whether to enable source map generation
 * @returns CSS loader instance with push method
 */
type CSSLoaderFactory = (enableSourceMap: boolean) => CSSLoader;

/**
 * CSS Loader Interface
 * Handles CSS content injection with module metadata
 */
interface CSSLoader {
  /**
   * Pushes CSS content to the loader
   * 
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [moduleId: string, cssContent: string]): void;
}

/**
 * CSS Module Exports Interface
 * Standard structure for CSS module exports in webpack
 */
interface CSSModuleExports {
  /** The processed CSS content as a string */
  id: string;
  /** String representation of the CSS */
  toString(): string;
}

/**
 * CSS Style Rules Interface
 * Describes the CSS classes and their purposes in this module
 */
interface PropertyBarStyles {
  /** Help image button SVG icon sizing in property bar status bar */
  '.propertybar.statusBar .contents li.helpImageBtn .imagebutton svg': {
    width: '15px';
  };
  
  /** Help tooltip text overflow prevention styles */
  '#helpTooltip .text-overflow': {
    wordBreak: 'keep-all';
    whiteSpace: 'nowrap';
    textAlign: 'center';
    fontSize: '0.8em';
  };
  
  /** Corner window container base styles */
  '.cornerWindow': {
    padding: '0px';
    width: '212px';
  };
  
  /** Corner window hint icon background styling */
  '.cornerWindow .hintIcon': {
    width: '100%';
    backgroundSize: '212px 90px';
    marginBottom: '0px';
    height: '100px';
    backgroundPositionX: '-12px';
  };
  
  /** Corner window hint text typography */
  '.cornerWindow .hintText': {
    fontSize: '12px';
    width: '212px';
    color: '#1c1c1c';
    lineHeight: '16px';
    textAlign: 'left';
  };
  
  /** Vertical divider spacing in corner window */
  '.cornerWindow_vdivider': {
    marginRight: '12px';
  };
  
  /** Divider height in right property bar */
  '.rightpropertybar .cornerWindow_divider': {
    height: '5px';
  };
  
  /** Frame number input container styling */
  '.cornerWindow_framenumber': {
    marginLeft: '20px';
    height: '30px';
  };
  
  /** Checkbox container positioning */
  '.cornerWindow_checkboxContainer': {
    marginTop: '5px';
    marginLeft: '62px';
  };
  
  /** Rotate button SVG container in right property bar card */
  '.rightpropertybar .card .rotateBtn .svgIconContainer': {
    marginLeft: '0';
    borderRadius: '2px';
    border: '1px solid #DCDCE1';
  };
  
  /** Hide unit display for window frame number input */
  '.right_length_input.cornerWindow_framenumber input[name=windowFrameNumber] ~ .unit': {
    display: 'none';
  };
  
  /** Apply all window title flexbox layout */
  '.applyall-window-title': {
    display: 'flex';
    lineHeight: '28px';
    alignItems: 'center';
    justifyContent: 'space-between';
  };
  
  /** Icon spacing in apply all window title */
  '.applyall-window-title .hs-iconfont-view': {
    marginRight: '10px';
  };
}

export type { CSSModuleLoader, CSSLoaderFactory, CSSLoader, CSSModuleExports, PropertyBarStyles };