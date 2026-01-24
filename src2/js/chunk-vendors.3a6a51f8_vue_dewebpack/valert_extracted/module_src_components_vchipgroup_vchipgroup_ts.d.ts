/**
 * VChipGroup Component Type Definitions
 * A slide group component specifically designed for organizing chips in horizontal or vertical layouts
 */

import Vue, { VNode } from 'vue';
import { BaseSlideGroup } from '../VSlideGroup/VSlideGroup';
import { Colorable } from '../../mixins/colorable';

/**
 * Computed properties for VChipGroup component
 */
interface VChipGroupComputed {
  /**
   * CSS classes applied to the chip group container
   * Combines base slide group classes with chip-specific classes
   */
  classes: Record<string, boolean>;
}

/**
 * Methods available on VChipGroup component
 */
interface VChipGroupMethods {
  /**
   * Generates data object for rendering, including color attributes
   * @returns Component data object with text color applied
   */
  genData(): Record<string, any>;
  
  /**
   * Handles resize events (inherited from BaseSlideGroup)
   */
  onResize(): void;
}

/**
 * Props for VChipGroup component
 */
interface VChipGroupProps {
  /**
   * Displays chips in a vertical column layout instead of horizontal
   * @default false
   */
  column?: boolean;
  
  /**
   * Text color for active chips (inherited from Colorable mixin)
   */
  color?: string;
  
  /**
   * Current scroll offset (inherited from BaseSlideGroup)
   */
  scrollOffset?: number;
}

/**
 * Data provided to child components via Vue's provide/inject
 */
interface VChipGroupProvide {
  /**
   * Reference to the parent chip group instance
   * Used by individual VChip components to register themselves
   */
  chipGroup: VChipGroup;
}

/**
 * VChipGroup component instance type
 * A container for grouping VChip components with slide navigation support
 */
export interface VChipGroup extends Vue, VChipGroupComputed, VChipGroupMethods {
  /** Component props */
  readonly $props: VChipGroupProps;
}

/**
 * VChipGroup component options
 * Extends BaseSlideGroup and Colorable mixin for chip organization with color theming
 */
declare const VChipGroup: {
  new (): VChipGroup;
  
  /** Component name for registration */
  name: 'v-chip-group';
  
  /** Provides chipGroup reference to descendant components */
  provide(this: VChipGroup): VChipGroupProvide;
  
  /** Component props definition */
  props: {
    column: { type: typeof Boolean };
  };
  
  /** Computed properties */
  computed: {
    classes(this: VChipGroup): Record<string, boolean>;
  };
  
  /** Watchers for reactive properties */
  watch: {
    /**
     * Watches column prop changes
     * Resets scroll offset and triggers resize when layout changes
     */
    column(this: VChipGroup, newValue: boolean): void;
  };
  
  /** Component methods */
  methods: {
    genData(this: VChipGroup): Record<string, any>;
  };
};

export default VChipGroup;