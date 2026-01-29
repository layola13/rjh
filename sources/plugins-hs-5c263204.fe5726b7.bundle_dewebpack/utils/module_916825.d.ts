/**
 * Webpack asset module that exports the public path to a feedback camera SVG icon.
 * This module represents a static asset reference used in the application's feedback system.
 * 
 * @module FeedbackCameraAsset
 */

/**
 * The public URL path to the feedback camera SVG icon asset.
 * This path is resolved at build time and points to the bundled asset location.
 * 
 * @constant
 * @type {string}
 * @example
 * // Usage in a component:
 * import feedbackCameraIcon from './feedback-camera-asset';
 * <img src={feedbackCameraIcon} alt="Feedback Camera" />
 */
declare const feedbackCameraAssetPath: string;

export default feedbackCameraAssetPath;