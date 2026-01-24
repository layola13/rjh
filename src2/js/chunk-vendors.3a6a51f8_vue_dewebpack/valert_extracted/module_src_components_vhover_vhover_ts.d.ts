import Vue, { VNode, VNodeData } from 'vue';
import { VueConstructor } from 'vue/types/vue';

/**
 * Scoped slot data interface for v-hover component
 * Provides hover state information to slot content
 */
interface VHoverScopedSlotData {
  /** Current hover state of the component */
  hover: boolean;
}

/**
 * Scoped slots interface for v-hover component
 */
interface VHoverScopedSlots {
  /** Default scoped slot that receives hover state */
  default?: (props: VHoverScopedSlotData) => VNode | VNode[];
}

/**
 * Props interface for v-hover component
 */
interface VHoverProps {
  /** 
   * Disables hover functionality
   * When true, mouse events will not trigger hover state changes
   * @default false
   */
  disabled: boolean;

  /**
   * Controls the hover state externally (v-model)
   * When undefined, component manages its own state internally
   * @default undefined
   */
  value: boolean | undefined;
}

/**
 * v-hover component type definition
 * Provides hover state management functionality with configurable delays
 * 
 * @remarks
 * This component uses mixins:
 * - Delayable: Provides delayed state transitions (open/close delays)
 * - Toggleable: Provides toggleable state management (isActive property)
 * 
 * @example
 *