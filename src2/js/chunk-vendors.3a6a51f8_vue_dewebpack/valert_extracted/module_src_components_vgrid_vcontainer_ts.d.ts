/**
 * VContainer component type definitions
 * A responsive container component from Vuetify's grid system
 */

import Vue, { VNode, VNodeData, CreateElement, RenderContext } from 'vue';

/**
 * Props interface for VContainer component
 */
interface VContainerProps {
  /**
   * Sets the DOM id on the component
   */
  id?: string;

  /**
   * Specify a custom tag used on the root element
   * @default "div"
   */
  tag?: string;

  /**
   * Removes viewport maximum-width size breakpoints
   * @default false
   */
  fluid?: boolean;
}

/**
 * VContainer component definition
 * A functional component that provides a centered and horizontally-padded container
 */
interface VContainer extends Vue {
  /**
   * Component name
   */
  readonly name: 'v-container';

  /**
   * Indicates this is a functional component
   */
  readonly functional: true;

  /**
   * Component props
   */
  readonly props: VContainerProps;

  /**
   * Render function for the functional component
   * @param createElement - Vue's createElement function
   * @param context - Render context containing props, data, and children
   * @returns Virtual DOM node
   */
  render(
    createElement: CreateElement,
    context: RenderContext<VContainerProps>
  ): VNode;
}

/**
 * VContainer component constructor
 */
declare const VContainer: VContainer;

export default VContainer;