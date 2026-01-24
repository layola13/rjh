/**
 * Sets the aspect ratio for the cropping window and updates the UI accordingly.
 * 
 * @param ratio - The desired aspect ratio:
 *   - `-1`: Auto ratio based on current window dimensions
 *   - `1.5`: Use current window aspect ratio
 *   - Other values: Use the specified ratio directly
 * 
 * @remarks
 * This method calculates the cropping window dimensions based on the specified ratio
 * and updates the internal state (width, height, left, top) before refreshing the UI.
 * 
 * @example
 *