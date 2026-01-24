/**
 * VChipGroup Component Type Definitions
 * A component for grouping chip elements with slide functionality
 */

import type { VueConstructor } from 'vue';
import type { BaseSlideGroup } from '../VSlideGroup/VSlideGroup';
import type Colorable from '../../mixins/colorable';

/**
 * Props interface for VChipGroup component
 */
export interface VChipGroupProps {
  /** Display chips in a column layout instead of row */
  column?: boolean;
  /** Color theme for the chip group */
  color?: string;
}

/**
 * Computed properties interface for VChipGroup
 */
export interface VChipGroupComputed {
  /** CSS classes for the component */
  classes: Record<string, boolean>;
}

/**
 * Methods interface for VChipGroup
 */
export interface VChipGroupMethods {
  /**
   * Generate component data with color styling
   * @returns Component data object with applied text color
   */
  genData(): Record<string, unknown>;
}

/**
 * Provide/Inject interface for child chip components
 */
export interface VChipGroupProvide {
  /** Reference to the parent chip group instance */
  chipGroup: VChipGroupInstance;
}

/**
 * VChipGroup component instance type
 * Extends BaseSlideGroup with Colorable mixin functionality
 */
export interface VChipGroupInstance extends InstanceType<typeof BaseSlideGroup>, InstanceType<typeof Colorable> {
  /** Component name identifier */
  name: 'v-chip-group';
  
  /** Props */
  column: boolean;
  color?: string;
  
  /** Computed properties */
  classes: Record<string, boolean>;
  
  /** Methods */
  genData(): Record<string, unknown>;
  
  /** Lifecycle - provide data to children */
  provide(): VChipGroupProvide;
  
  /** Internal state */
  scrollOffset: number;
  
  /** Utility methods from BaseSlideGroup */
  onResize(): void;
  $nextTick(callback: () => void): void;
  
  /** Colorable mixin method */
  setTextColor(color: string | undefined, data: Record<string, unknown>): Record<string, unknown>;
}

/**
 * VChipGroup component constructor
 * A wrapper around BaseSlideGroup with column layout support and colorable functionality
 */
declare const VChipGroup: VueConstructor<VChipGroupInstance>;

export default VChipGroup;