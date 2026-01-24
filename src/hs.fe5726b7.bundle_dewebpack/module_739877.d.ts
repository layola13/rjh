/**
 * Webpack asset module that exports the URL path to a static SVG image.
 * This module represents a bundled asset reference for 'picture.666a5e37.svg'.
 * 
 * In a modern TypeScript project, this would typically be handled by:
 * - Import assertions: import pictureUrl from './assets/picture.svg' assert { type: 'asset' }
 * - TypeScript module declarations for asset types
 * - Build tool static asset handling (Vite, esbuild, etc.)
 */

/**
 * The URL path to the picture.svg asset, including content hash for cache busting.
 * The hash (666a5e37) ensures unique URLs when file content changes.
 */
declare const assetUrl: string;

export default assetUrl;