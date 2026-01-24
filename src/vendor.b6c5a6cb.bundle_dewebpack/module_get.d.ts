/**
 * Gets the current resize target dimensions.
 * 
 * @returns The resize target configuration object containing width and height properties,
 *          or undefined if no resize target has been set.
 */
function getResizeTo(): ResizeTarget | undefined {
    return this._resizeTo;
}

/**
 * Represents the target dimensions for resizing operations.
 */
interface ResizeTarget {
    /** The target width in pixels */
    width: number;
    /** The target height in pixels */
    height: number;
}

export type { ResizeTarget };
export { getResizeTo };