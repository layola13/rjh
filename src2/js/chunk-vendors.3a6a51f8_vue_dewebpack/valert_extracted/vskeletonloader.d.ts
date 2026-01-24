/**
 * VSkeletonLoader Component Module
 * 
 * Provides skeleton loading placeholder component for async content.
 * Useful for improving perceived performance during data fetching.
 */

/**
 * VSkeletonLoader component instance type
 * Represents a skeleton loader component for displaying loading states
 */
export interface VSkeletonLoaderComponent {
  /** Component name identifier */
  readonly name: string;
  /** Component render function or template */
  render?: () => unknown;
  /** Component props definition */
  props?: Record<string, unknown>;
  /** Component setup function (Composition API) */
  setup?: (props: Record<string, unknown>, context: unknown) => unknown;
}

/**
 * Default VSkeletonLoader component export
 * Main skeleton loader component for creating loading placeholders
 */
export declare const VSkeletonLoader: VSkeletonLoaderComponent;

/**
 * Default export of VSkeletonLoader component
 */
export default VSkeletonLoader;