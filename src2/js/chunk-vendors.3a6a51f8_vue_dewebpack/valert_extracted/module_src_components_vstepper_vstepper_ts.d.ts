/**
 * VStepper Component Type Definitions
 * A component for displaying a stepper interface with steps and content panels
 */

import Vue from 'vue';

/**
 * Stepper step child component interface
 */
interface VStepperStepComponent extends Vue {
  $options: {
    name: 'v-stepper-step';
  };
  /**
   * Toggle the visibility/active state of the step
   * @param value - The current active step value
   */
  toggle(value: number | string): void;
}

/**
 * Stepper content child component interface
 */
interface VStepperContentComponent extends Vue {
  $options: {
    name: 'v-stepper-content';
  };
  /**
   * Whether the stepper is in vertical layout mode
   */
  isVertical: boolean;
  /**
   * Toggle the visibility of the content panel
   * @param value - The current active step value
   * @param isReverse - Whether the transition direction is reversed
   */
  toggle(value: number | string, isReverse: boolean): void;
}

/**
 * Props for VStepper component
 */
interface VStepperProps {
  /**
   * Uses alternative labels layout below step buttons
   */
  altLabels?: boolean;
  
  /**
   * Allows user to select any step, not just next/previous
   */
  nonLinear?: boolean;
  
  /**
   * Displays stepper vertically
   */
  vertical?: boolean;
  
  /**
   * The currently active step (v-model)
   */
  value?: number | string;
}

/**
 * Data structure for VStepper component
 */
interface VStepperData {
  /**
   * Whether the component has been mounted and initial transition completed
   */
  isBooted: boolean;
  
  /**
   * Array of registered step child components
   */
  steps: VStepperStepComponent[];
  
  /**
   * Array of registered content child components
   */
  content: VStepperContentComponent[];
  
  /**
   * Whether the step transition is moving backwards
   */
  isReverse: boolean;
  
  /**
   * Internal tracked value for the active step
   */
  internalLazyValue: number | string;
}

/**
 * Computed properties for VStepper component
 */
interface VStepperComputed {
  /**
   * CSS classes to apply to the root element
   */
  classes: Record<string, boolean>;
  
  /**
   * Internal reactive value for active step (from proxyable mixin)
   */
  internalValue: number | string;
  
  /**
   * Theme classes (from themeable mixin)
   */
  themeClasses: Record<string, boolean>;
}

/**
 * Methods for VStepper component
 */
interface VStepperMethods {
  /**
   * Register a child step or content component
   * @param component - The child component to register
   */
  register(component: VStepperStepComponent | VStepperContentComponent): void;
  
  /**
   * Unregister a child step or content component
   * @param component - The child component to unregister
   */
  unregister(component: VStepperStepComponent | VStepperContentComponent): void;
  
  /**
   * Handle click event on a step
   * @param stepValue - The value of the clicked step
   */
  stepClick(stepValue: number | string): void;
  
  /**
   * Update the view state of all steps and content panels
   */
  updateView(): void;
}

/**
 * Provide/inject context for child components
 */
interface VStepperProvide {
  /**
   * Function to handle step clicks
   */
  stepClick: (stepValue: number | string) => void;
  
  /**
   * Whether the stepper is in vertical mode
   */
  isVertical: boolean;
}

/**
 * VStepper Component
 * 
 * A stepper component that displays a series of logical and numbered steps.
 * Can be displayed vertically or horizontally with various layout options.
 * 
 * @example
 *