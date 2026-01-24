/**
 * Model capture utility module
 * Provides functionality to capture 3D model screenshots with automatic camera positioning
 */

/**
 * Takes a capture/screenshot of 3D models in the scene
 * Automatically positions camera to frame selected models optimally
 * 
 * @param modelFilters - Optional array of models to include in the capture. If empty, captures active layer
 * @returns Promise resolving to a base64-encoded JPEG image data URL
 * 
 * @example
 *