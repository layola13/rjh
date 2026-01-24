/**
 * CSS Module Export Type Definition
 * Module: module_14489
 * Original ID: 14489
 * 
 * This module exports CSS styles for the property bar axial rotation component.
 */

/**
 * CSS module export function signature
 * @param exports - The module exports object
 * @param cssLoader - CSS loader factory function that processes CSS content
 * @param moduleId - Webpack module identifier
 */
declare module 'module_14489' {
  /**
   * CSS content for axial rotation property bar styles
   * Includes styling for:
   * - .property-bar-axialrotation container
   * - .homestyler-axial-rotation component (210px width)
   * - .axial-label-wrap and .axial-label flex layout
   * - .axial-rotation-label text styling (12px, #888888 color, with margins)
   */
  const styles: string;
  export default styles;
}

/**
 * Module loader function type
 * @param moduleExports - The exports object to be populated
 * @param cssLoaderFactory - Factory function that creates a CSS loader (returns false for non-HMR mode)
 * @param moduleContext - Context object containing module metadata (id, filename, etc.)
 */
type CSSModuleLoader = (
  moduleExports: { exports: unknown; id: string },
  cssLoaderFactory: (hotModuleReplacement: boolean) => {
    push: (entry: [string, string, string]) => void;
  },
  moduleContext: { id: string }
) => void;

/**
 * CSS content structure
 */
interface CSSModuleEntry {
  /** Module identifier */
  readonly moduleId: string;
  /** Raw CSS content string */
  readonly cssContent: string;
  /** Source map (empty string when not available) */
  readonly sourceMap: string;
}

/**
 * Parsed CSS rules for this module
 */
interface AxialRotationStyles {
  /** Main container class */
  'property-bar-axialrotation': {
    'homestyler-axial-rotation': {
      width: '210px';
      'axial-label-wrap': {
        'axial-label': {
          alignItems: 'flex-start';
          justifyContent: 'flex-start';
        };
      };
    };
    'axial-rotation-label': {
      fontSize: '12px';
      color: '#888888';
      display: 'inline-block';
      marginBottom: '12px';
      marginTop: '8px';
    };
  };
}

export { CSSModuleLoader, CSSModuleEntry, AxialRotationStyles };