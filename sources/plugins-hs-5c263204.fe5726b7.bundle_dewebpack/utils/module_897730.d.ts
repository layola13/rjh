/**
 * Webpack asset module that exports the URL path to a Copilot GIF image.
 * This module represents a static asset reference that has been processed by Webpack's asset/resource loader.
 * 
 * @module CopilotAssetModule
 */

/**
 * The public URL path to the copilot.gif asset.
 * This path is resolved by the Webpack bundler and includes the content hash for cache busting.
 * 
 * Format: "assets/copilot.[hash].gif"
 * Example: "assets/copilot.fedcb77d.gif"
 */
declare const copilotAssetUrl: string;

export default copilotAssetUrl;