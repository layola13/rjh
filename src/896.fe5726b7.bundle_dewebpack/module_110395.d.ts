/**
 * CSS module definition for scale-able component
 * Provides transform origin styling for scalable elements
 */

/**
 * CSS module exports containing scale-able class styles
 */
declare module '*.css' {
  const styles: {
    /**
     * Scale-able class that sets transform origin to top-left (0%, 0%)
     * Used for elements that need to scale from their top-left corner
     */
    'scale-able': string;
  };
  export default styles;
}

/**
 * Module loader function signature
 * @param exports - Module exports object
 * @param module - Module metadata object
 * @param require - Module require function
 */
declare function moduleLoader(
  exports: Record<string, unknown>,
  module: { id: string | number; exports: unknown },
  require: (moduleId: number) => CssLoaderFunction
): void;

/**
 * CSS loader function that processes CSS content
 * @param sourceMap - Whether to include source maps
 * @returns CSS loader instance with push method
 */
interface CssLoaderFunction {
  (sourceMap: boolean): {
    push: (entry: [string | number, string, string]) => void;
  };
}

/**
 * CSS content for the scale-able component
 */
type CssContent = [
  moduleId: string | number,
  styles: string,
  sourceMap: string
];

export {};