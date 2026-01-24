/**
 * VExpansionPanelHeader Component Type Definitions
 * Expansion panel header component with icon, ripple effect and toggle functionality
 */

import { VNode } from 'vue';
import { PropType } from 'vue';

/**
 * Ripple directive configuration
 */
export interface RippleOptions {
  /** Ripple center position */
  center?: boolean;
  /** Ripple CSS class */
  class?: string;
}

/**
 * Expansion panel injection interface
 */
export interface ExpansionPanelInjection {
  /** Whether the panel is currently active/expanded */
  isActive: boolean;
  /** Whether the panel is disabled */
  isDisabled: boolean;
  /** Whether the panel is in readonly mode */
  isReadonly: boolean;
  /** Register header component */
  registerHeader(header: VExpansionPanelHeader): void;
  /** Unregister header component */
  unregisterHeader(): void;
}

/**
 * Default slot scope properties
 */
export interface DefaultSlotScope {
  /** Whether the expansion panel is open */
  open: boolean;
}

/**
 * Component data interface
 */
interface ComponentData {
  /** Tracks whether mouse button is currently pressed down */
  hasMousedown: boolean;
}

/**
 * VExpansionPanelHeader Component
 * Clickable header for expansion panels with animated icon and optional ripple effect
 */
export default interface VExpansionPanelHeader extends Vue {
  // Props
  /** Disable rotation animation of the expand icon */
  disableIconRotate: boolean;
  
  /** Icon to display for expand/collapse action
   * @default "$expand"
   */
  expandIcon: string;
  
  /** Hide the action icon area */
  hideActions: boolean;
  
  /** Enable ripple effect on click
   * Can be boolean or ripple configuration object
   * @default false
   */
  ripple: boolean | RippleOptions;
  
  /** Background color (from colorable mixin) */
  color?: string;

  // Data
  $data: ComponentData;

  // Computed Properties
  /** CSS classes for the header element */
  readonly classes: {
    'v-expansion-panel-header--active': boolean;
    'v-expansion-panel-header--mousedown': boolean;
  };
  
  /** Whether the parent expansion panel is active */
  readonly isActive: boolean;
  
  /** Whether the parent expansion panel is disabled */
  readonly isDisabled: boolean;
  
  /** Whether the parent expansion panel is readonly */
  readonly isReadonly: boolean;

  // Injected
  /** Parent expansion panel instance */
  expansionPanel: ExpansionPanelInjection;

  // Methods
  /**
   * Handle click event on header
   * @param event - Native click event
   */
  onClick(event: MouseEvent): void;
  
  /**
   * Generate the icon element with fade transition
   * @returns VNode for the icon container
   */
  genIcon(): VNode;
  
  /**
   * Render function
   * @param createElement - Vue render function
   * @returns Rendered VNode
   */
  render(createElement: typeof Vue.prototype.$createElement): VNode;
  
  /**
   * Set background color (from colorable mixin)
   * @param color - Color value
   * @param data - VNode data object
   * @returns Modified VNode data with color styles
   */
  setBackgroundColor(color: string | undefined, data: object): object;

  // Lifecycle Hooks
  /** Register this header with parent panel on creation */
  created(): void;
  
  /** Unregister this header from parent panel before destruction */
  beforeDestroy(): void;

  // Slots
  $scopedSlots: {
    /** Default slot content with open state
     * @param scope - Slot scope with open state
     */
    default?: (scope: DefaultSlotScope) => VNode[];
    
    /** Custom actions slot to replace default expand icon */
    actions?: () => VNode[];
  };

  // Events
  $emit(event: 'click', payload: MouseEvent): this;
}

/**
 * Component options for VExpansionPanelHeader
 */
export const VExpansionPanelHeaderOptions: {
  name: 'v-expansion-panel-header';
  directives: {
    ripple: any;
  };
  props: {
    disableIconRotate: PropType<boolean>;
    expandIcon: PropType<string>;
    hideActions: PropType<boolean>;
    ripple: PropType<boolean | RippleOptions>;
  };
};