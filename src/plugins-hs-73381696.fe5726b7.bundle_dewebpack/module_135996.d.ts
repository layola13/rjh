/**
 * Asset module declaration for noCeiling SVG icon
 * Exports the public URL path for the noCeiling.47ac4867.svg asset
 */
declare module '*/assets/noCeiling.47ac4867.svg' {
  /**
   * The public URL path to the noCeiling SVG asset
   * This path is resolved by the bundler at build time
   */
  const assetUrl: string;
  export default assetUrl;
}

/**
 * Generic SVG asset module declaration
 * Allows TypeScript to recognize SVG imports as string URLs
 */
declare module '*.svg' {
  /**
   * The public URL path to the SVG asset
   */
  const content: string;
  export default content;
}