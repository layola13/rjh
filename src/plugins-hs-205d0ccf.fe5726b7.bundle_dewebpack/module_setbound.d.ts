/**
 * Sets the frame boundary for the component
 * @param frameBound - The new frame boundary value to set
 * @returns Promise that resolves when state update completes
 */
declare function setBound<T = unknown>(frameBound: T): void | Promise<void>;

/**
 * Alternative: If this is a React component method
 */
interface ComponentState {
  /** The current frame boundary configuration */
  frameBound: unknown;
}

/**
 * Sets the frame boundary in component state
 * @param frameBound - The frame boundary value
 */
type SetBoundFunction = <T>(frameBound: T) => void;