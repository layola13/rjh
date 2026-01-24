/**
 * Loadable Mixin
 * Provides loading state and progress indicator functionality for Vue components
 */

import Vue, { VNode, CreateElement } from 'vue';
import VProgressLinear from '../../components/VProgressLinear';

/**
 * Props for the Loadable mixin
 */
interface LoadableProps {
  /**
   * Controls the loading state
   * - false: not loading
   * - true: loading with default color
   * - string: loading with custom color
   */
  loading: boolean | string;

  /**
   * Height of the progress loader in pixels
   * @default 2
   */
  loaderHeight: number | string;
}

/**
 * Methods provided by the Loadable mixin
 */
interface LoadableMethods {
  /**
   * Generates the progress indicator VNode
   * @returns VNode for the progress indicator, or null if not loading
   */
  genProgress(): VNode | null;
}

/**
 * Loadable Mixin Declaration
 * Adds loading state management and progress indicator rendering to components
 */
declare const Loadable: Vue.extend<{}, LoadableMethods, {}, LoadableProps> & {
  name: 'loadable';
  props: {
    loading: {
      type: [BooleanConstructor, StringConstructor];
      default: false;
    };
    loaderHeight: {
      type: [NumberConstructor, StringConstructor];
      default: 2;
    };
  };
  methods: {
    /**
     * Generates a progress linear component
     * Returns null when loading is false
     * Uses slot content if provided, otherwise creates VProgressLinear component
     * Color is determined by loading prop value or falls back to 'primary'
     */
    genProgress(): VNode | null;
  };
};

export default Loadable;