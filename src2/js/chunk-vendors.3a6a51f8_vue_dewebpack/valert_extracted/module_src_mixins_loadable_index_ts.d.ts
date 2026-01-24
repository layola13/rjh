/**
 * Loadable mixin for Vue components
 * Provides loading state functionality with progress indicator
 */

import { VueConstructor } from 'vue';
import { VProgressLinear } from '../../components/VProgressLinear';

/**
 * Props for the Loadable mixin
 */
interface LoadableProps {
  /**
   * Controls the loading state
   * - `false`: No loading indicator
   * - `true`: Show loading indicator with default/primary color
   * - `string`: Show loading indicator with specified color
   * @default false
   */
  loading: boolean | string;

  /**
   * Height of the loader progress bar in pixels
   * @default 2
   */
  loaderHeight: number | string;
}

/**
 * Loadable mixin interface
 * Adds loading state management and progress indicator rendering to Vue components
 */
interface LoadableMixin {
  /**
   * Component props
   */
  readonly loading: boolean | string;
  readonly loaderHeight: number | string;
  readonly color?: string;

  /**
   * Vue slots
   */
  readonly $slots: {
    progress?: Vue.VNode[];
    [key: string]: Vue.VNode[] | undefined;
  };

  /**
   * Generates the progress indicator component
   * @returns VNode for the progress indicator or null if not loading
   */
  genProgress(): Vue.VNode | null;
}

/**
 * Loadable mixin declaration
 * Extends Vue components with loading state and progress indicator capabilities
 */
declare const Loadable: VueConstructor<Vue & LoadableMixin>;

export default Loadable;