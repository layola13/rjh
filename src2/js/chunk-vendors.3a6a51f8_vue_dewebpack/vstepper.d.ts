/**
 * VStepper Module
 * 
 * A stepper component for guiding users through multi-step processes.
 * Exports all stepper-related components and their type definitions.
 */

/**
 * Props for the main VStepper component
 */
export interface VStepperProps {
  /** Current active step (v-model) */
  value?: number | string;
  /** Enable vertical layout */
  vertical?: boolean;
  /** Enable alternative label layout */
  altLabels?: boolean;
  /** Make stepper non-linear (allow jumping between steps) */
  nonLinear?: boolean;
  /** Enable flat styling (no elevation) */
  flat?: boolean;
  /** Component color theme */
  color?: string;
  /** Component dark theme */
  dark?: boolean;
  /** Component light theme */
  light?: boolean;
  /** Component elevation (0-24) */
  elevation?: number | string;
  /** Custom CSS classes */
  class?: string | string[] | Record<string, boolean>;
  /** Inline styles */
  style?: string | Record<string, string | number>;
}

/**
 * Main VStepper component
 * 
 * Container component for multi-step workflows. Manages step state and navigation.
 */
export declare const VStepper: {
  new (): {
    $props: VStepperProps;
    $slots: {
      /** Default slot for stepper content */
      default?: () => VNode[];
    };
    $emit: {
      /** Emitted when active step changes */
      (event: 'input', value: number | string): void;
      /** Emitted when step changes */
      (event: 'change', value: number | string): void;
    };
  };
};

/**
 * Props for VStepperContent component
 */
export interface VStepperContentProps {
  /** Step identifier (matches parent step) */
  step: number | string;
  /** Custom CSS classes */
  class?: string | string[] | Record<string, boolean>;
  /** Inline styles */
  style?: string | Record<string, string | number>;
}

/**
 * VStepperContent component
 * 
 * Container for the content of an individual step.
 * Content is shown/hidden based on active step.
 */
export declare const VStepperContent: {
  new (): {
    $props: VStepperContentProps;
    $slots: {
      /** Content to display when step is active */
      default?: () => VNode[];
    };
  };
};

/**
 * Props for VStepperStep component
 */
export interface VStepperStepProps {
  /** Step number or identifier */
  step: number | string;
  /** Display text for the step */
  label?: string;
  /** Enable complete state styling */
  complete?: boolean;
  /** Custom complete icon */
  completeIcon?: string;
  /** Enable editable state (clickable when non-linear) */
  editable?: boolean;
  /** Edit icon for editable steps */
  editIcon?: string;
  /** Enable error state styling */
  error?: boolean;
  /** Error icon */
  errorIcon?: string;
  /** Display rules/validation messages */
  rules?: Array<(value: unknown) => boolean | string>;
  /** Step color theme */
  color?: string;
  /** Custom CSS classes */
  class?: string | string[] | Record<string, boolean>;
  /** Inline styles */
  style?: string | Record<string, string | number>;
}

/**
 * VStepperStep component
 * 
 * Individual step header with icon, label, and state indicators.
 * Displays step number, completion status, and validation state.
 */
export declare const VStepperStep: {
  new (): {
    $props: VStepperStepProps;
    $slots: {
      /** Custom step icon/content */
      default?: () => VNode[];
    };
    $emit: {
      /** Emitted when step is clicked */
      (event: 'click', step: number | string): void;
    };
  };
};

/**
 * VStepperHeader component
 * 
 * Functional component that renders the stepper header container.
 * Wraps VStepperStep components with proper styling and dividers.
 * 
 * @example
 * <VStepperHeader>
 *   <VStepperStep :step="1">Step 1</VStepperStep>
 *   <VStepperStep :step="2">Step 2</VStepperStep>
 * </VStepperHeader>
 */
export declare const VStepperHeader: {
  functional: true;
  render(h: CreateElement, context: RenderContext): VNode;
};

/**
 * VStepperItems component
 * 
 * Functional component that renders the stepper items container.
 * Wraps VStepperContent components with proper styling.
 * 
 * @example
 * <VStepperItems>
 *   <VStepperContent :step="1">Content 1</VStepperContent>
 *   <VStepperContent :step="2">Content 2</VStepperContent>
 * </VStepperItems>
 */
export declare const VStepperItems: {
  functional: true;
  render(h: CreateElement, context: RenderContext): VNode;
};

/**
 * Default export containing all stepper subcomponents
 * 
 * Provides Vue plugin installation with $_vuetify_subcomponents metadata
 * for automatic component registration.
 */
declare const _default: {
  /** Internal Vuetify metadata for subcomponent registration */
  $_vuetify_subcomponents: {
    VStepper: typeof VStepper;
    VStepperContent: typeof VStepperContent;
    VStepperStep: typeof VStepperStep;
    VStepperHeader: typeof VStepperHeader;
    VStepperItems: typeof VStepperItems;
  };
};

export default _default;

/**
 * Type helper for VStepper instance
 */
export type VStepperInstance = InstanceType<typeof VStepper>;

/**
 * Type helper for VStepperContent instance
 */
export type VStepperContentInstance = InstanceType<typeof VStepperContent>;

/**
 * Type helper for VStepperStep instance
 */
export type VStepperStepInstance = InstanceType<typeof VStepperStep>;

// Vue type augmentation imports
import { VNode, CreateElement, RenderContext } from 'vue';