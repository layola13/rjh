/**
 * Dependent Mixin
 * 
 * A Vue mixin that provides functionality for managing dependent components
 * that should be closed when their parent becomes inactive.
 */

import Vue from 'vue';

/**
 * Reference elements that can be present in a component using this mixin
 */
interface DependentRefs {
  /** Optional content element reference */
  content?: HTMLElement;
}

/**
 * Component instance that implements the dependent mixin
 */
interface DependentComponent extends Vue {
  /** Whether this component is currently active/open */
  isActive: boolean;
  /** Whether this component is a dependent (child) component */
  isDependent: boolean;
  /** Whether to automatically close dependent children when this component closes */
  closeDependents: boolean;
  /** Overlay component reference (if present) */
  overlay?: Vue & { $el: HTMLElement };
  /** Component references */
  $refs: DependentRefs;
  
  /**
   * Get all open dependent child components
   * @returns Array of active dependent components
   */
  getOpenDependents(): DependentComponent[];
  
  /**
   * Get all clickable elements from open dependent children
   * @returns Array of HTML elements
   */
  getOpenDependentElements(): HTMLElement[];
  
  /**
   * Get all clickable elements associated with this component and its dependents
   * @returns Array of HTML elements including main element, content, overlay, and children
   */
  getClickableDependentElements(): HTMLElement[];
}

/**
 * Dependent mixin data structure
 */
interface DependentData {
  /** Whether to automatically close dependent children when this component closes */
  closeDependents: boolean;
  /** Whether this component is currently active/open */
  isActive: boolean;
  /** Whether this component is a dependent (child) component */
  isDependent: boolean;
}

/**
 * Dependent mixin definition
 * 
 * Provides hierarchical component management where parent components
 * can automatically close their dependent children when deactivated.
 */
declare const DependentMixin: Vue.VueConstructor<DependentComponent> & {
  name: 'dependent';
  
  /**
   * Initialize component data
   * @returns Default data values
   */
  data(this: Vue): DependentData;
  
  watch: {
    /**
     * Watch for changes to isActive state
     * When component becomes inactive, close all open dependent children
     * @param isActive - New active state
     */
    isActive(this: DependentComponent, isActive: boolean): void;
  };
  
  methods: {
    /**
     * Recursively find all open dependent child components
     * @returns Array of active dependent components
     */
    getOpenDependents(this: DependentComponent): DependentComponent[];
    
    /**
     * Get all clickable HTML elements from open dependent children
     * @returns Flattened array of clickable elements from all dependents
     */
    getOpenDependentElements(this: DependentComponent): HTMLElement[];
    
    /**
     * Get all clickable elements for this component and its dependents
     * Includes: main element, content ref, overlay element, and all dependent elements
     * @returns Array of all clickable HTML elements
     */
    getClickableDependentElements(this: DependentComponent): HTMLElement[];
  };
};

export default DependentMixin;