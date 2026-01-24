/**
 * Webpack CSS module loader function
 * This module exports CSS styles for a pitch line visualization component
 * 
 * @param exports - The module exports object
 * @param require - The module require function (unused in this module)
 * @param moduleLoader - The CSS loader function from module 986380
 */
declare module "module_505988" {
  /**
   * CSS styles for the pitch line component
   * 
   * Structure:
   * - `.pitchLine`: Main container (100% width/height, relative positioning)
   * - `.pitchLine .line_area`: Absolute positioned flex container for lines
   * - `.pitchLine .line_area .line`: Individual line element (90px × 2px, white background)
   * - `.pitchLine .line_area .pitch_base_left/right`: Base pitch indicators (red background)
   * - `.pitchLine .line_area.pitch_snap .line`: Snap state styling (cyan background)
   * - `.pitchLine .line_area.line_disable`: Hidden state
   * - `.line_disable`: Global hide utility class
   */
  const styles: string;
  
  export = styles;
}

/**
 * Type definition for the CSS loader function
 */
declare function cssLoader(sourceMap: boolean): {
  /**
   * Pushes CSS content to the loader
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
};

/**
 * CSS class names available in this module
 */
export interface PitchLineStyles {
  /** Main container for pitch line visualization */
  pitchLine: string;
  
  /** Container area for individual line elements */
  line_area: string;
  
  /** Individual line element */
  line: string;
  
  /** Left base pitch indicator */
  pitch_base_left: string;
  
  /** Right base pitch indicator */
  pitch_base_right: string;
  
  /** Pitch snap active state */
  pitch_snap: string;
  
  /** Disabled/hidden state for line area */
  line_disable: string;
}