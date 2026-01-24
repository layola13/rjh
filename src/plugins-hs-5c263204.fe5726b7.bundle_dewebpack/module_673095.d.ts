/**
 * Hotkey modal container stylesheet module
 * Exports CSS styles for positioning a hotkey modal overlay
 */

/**
 * CSS module that defines styles for the hotkey modal container.
 * The container is positioned absolutely at the top-left corner with a high z-index
 * to ensure it appears above other UI elements.
 */
declare module 'hotkey-modal-styles' {
  /**
   * CSS class names exported by this module
   */
  interface HotkeyModalStyles {
    /**
     * Main container class for the hotkey modal
     * - Positioned absolutely at coordinates (0, 0)
     * - Z-index: 3000 to overlay other content
     */
    'hotkey-modal-container': string;
  }

  const styles: HotkeyModalStyles;
  export default styles;
}

/**
 * CSS content type definition for the module
 */
declare const cssContent: string;

/**
 * Module metadata
 */
export interface ModuleMetadata {
  /** Unique module identifier */
  readonly id: string | number;
  /** CSS content as string */
  readonly content: string;
  /** Indicates this is a CSS module (not sourcemapped) */
  readonly sourceMap: false;
}

export default cssContent;