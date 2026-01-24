/**
 * VStepper Module
 * 
 * Provides a stepper component and its sub-components for creating
 * step-by-step workflows and multi-step forms.
 */

import type { FunctionalComponentOptions } from 'vue';
import type { VNode } from 'vue';

/**
 * Props for VStepper component
 */
export interface VStepperProps {
  /** Current active step value */
  value?: number | string;
  /** Enable vertical layout */
  vertical?: boolean;
  /** Enable alternative label style */
  altLabels?: boolean;
  /** Make stepper non-linear (allow jumping between steps) */
  nonLinear?: boolean;
  /** Make stepper flat (remove elevation) */
  flat?: boolean;
  /** Custom CSS classes */
  class?: string | string[] | Record<string, boolean>;
  /** Inline styles */
  style?: string | Partial<CSSStyleDeclaration>;
}

/**
 * VStepper Component
 * 
 * Main container component for creating multi-step interfaces.
 * Manages step navigation and state.
 */
export declare class VStepper {
  constructor();
  $props: VStepperProps;
  /** Emitted when step changes */
  $emit(event: 'input', value: number | string): this;
  $emit(event: 'change', value: number | string): this;
}

/**
 * Props for VStepperStep component
 */
export interface VStepperStepProps {
  /** Step identifier */
  step: number | string;
  /** Completed state */
  complete?: boolean;
  /** Show completion icon */
  completeIcon?: string;
  /** Show edit icon when complete */
  editable?: boolean;
  /** Edit icon name */
  editIcon?: string;
  /** Show error state */
  error?: boolean;
  /** Error icon name */
  errorIcon?: string;
  /** Step color */
  color?: string;
  /** Rule validation functions */
  rules?: Array<(value: unknown) => boolean | string>;
}

/**
 * VStepperStep Component
 * 
 * Represents an individual step in the stepper.
 * Displays step number, label, and status icons.
 */
export declare class VStepperStep {
  constructor();
  $props: VStepperStepProps;
  /** Slot for step label */
  $slots: {
    default?: VNode[];
  };
}

/**
 * Props for VStepperContent component
 */
export interface VStepperContentProps {
  /** Associated step identifier */
  step: number | string;
}

/**
 * VStepperContent Component
 * 
 * Container for the content of each step.
 * Only visible when its corresponding step is active.
 */
export declare class VStepperContent {
  constructor();
  $props: VStepperContentProps;
  /** Slot for step content */
  $slots: {
    default?: VNode[];
  };
}

/**
 * VStepperHeader Component
 * 
 * Functional component that wraps stepper step headers.
 * Renders with class "v-stepper__header".
 */
export declare const VStepperHeader: FunctionalComponentOptions<
  Record<string, unknown>,
  Record<string, unknown>
>;

/**
 * VStepperItems Component
 * 
 * Functional component that wraps stepper content items.
 * Renders with class "v-stepper__items".
 */
export declare const VStepperItems: FunctionalComponentOptions<
  Record<string, unknown>,
  Record<string, unknown>
>;

/**
 * Default export containing all sub-components
 * 
 * Used for Vuetify's component registration system.
 */
declare const _default: {
  readonly $_vuetify_subcomponents: {
    readonly VStepper: typeof VStepper;
    readonly VStepperContent: typeof VStepperContent;
    readonly VStepperStep: typeof VStepperStep;
    readonly VStepperHeader: typeof VStepperHeader;
    readonly VStepperItems: typeof VStepperItems;
  };
};

export default _default;