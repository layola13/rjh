/**
 * VSpacer component - A flexible spacer component for grid layouts
 * Used to create spacing between elements in Vuetify grid system
 */

/**
 * Creates a simple functional spacer component
 * @returns A Vue functional component that renders a div with v-spacer class
 */
declare const _default: ReturnType<typeof createSimpleFunctional>;

export default _default;

/**
 * Helper function type for creating simple functional components
 * @param name - Component name identifier
 * @param tag - HTML tag to render
 * @param className - CSS class name to apply
 */
declare function createSimpleFunctional(
  name: string,
  tag: string,
  className: string
): any;