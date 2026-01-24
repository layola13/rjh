/**
 * Dependent mixin for managing hierarchical component dependencies and active states.
 * Provides functionality to track and manage dependent child components that should
 * close when their parent becomes inactive.
 */

import { Vue } from 'vue/types/vue';

/**
 * Data structure for the dependent mixin
 */
interface DependentData {
  /** Whether to automatically close dependent children when this component becomes inactive */
  closeDependents: boolean;
  /** Current active state of the component */
  isActive: boolean;
  /** Marks this component as a dependent that can be managed by parent components */
  isDependent: boolean;
}

/**
 * Interface for components using the dependent mixin
 */
interface DependentComponent extends Vue {
  /** Data properties */
  closeDependents: boolean;
  isActive: boolean;
  isDependent: boolean;

  /** References */
  $refs: {
    content?: HTMLElement;
  };

  /** Optional overlay element */
  overlay?: {
    $el: HTMLElement;
  };

  /**
   * Recursively finds all open (active) dependent child components.
   * Only searches if closeDependents is true.
   * @returns Array of active dependent components
   */
  getOpenDependents(): DependentComponent[];

  /**
   * Collects all clickable DOM elements from open dependent children.
   * @returns Array of HTML elements that are clickable in dependent components
   */
  getOpenDependentElements(): HTMLElement[];

  /**
   * Gets all clickable elements for this component, including:
   * - Root element ($el)
   * - Content ref if exists
   * - Overlay element if exists
   * - All elements from nested open dependents
   * @returns Array of clickable HTML elements
   */
  getClickableDependentElements(): HTMLElement[];
}

/**
 * Vue mixin for managing dependent component relationships.
 * 
 * Use this mixin when you need:
 * - Child components to automatically close when parent becomes inactive
 * - Tracking of active state across component hierarchies
 * - Management of clickable areas including overlays
 * 
 * @example
 *