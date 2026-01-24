import VIcon from '../VIcon';
import Colorable from '../../mixins/colorable';
import { inject as Registrable } from '../../mixins/registrable';
import Ripple from '../../directives/ripple';
import mixins from '../../util/mixins';
import { VNode, CreateElement } from 'vue';
import { PropValidator } from 'vue/types/options';

/**
 * Rule validation function type
 * @returns true if validation passes, false or error message if validation fails
 */
export type ValidationRule = () => boolean | string;

/**
 * VStepperStep component props interface
 */
export interface VStepperStepProps {
  /** Color of the step indicator when active/complete. Defaults to 'primary' */
  color?: string;
  /** Whether the step is marked as complete */
  complete?: boolean;
  /** Icon to display when step is complete. Defaults to '$complete' */
  completeIcon?: string;
  /** Whether the step can be clicked to navigate */
  editable?: boolean;
  /** Icon to display when step is editable and complete. Defaults to '$edit' */
  editIcon?: string;
  /** Icon to display when step has validation errors. Defaults to '$error' */
  errorIcon?: string;
  /** Array of validation rule functions */
  rules?: ValidationRule[];
  /** Step number or identifier */
  step: number | string;
}

/**
 * VStepperStep component data interface
 */
export interface VStepperStepData {
  /** Whether this step is currently active */
  isActive: boolean;
  /** Whether this step is inactive (not yet reached) */
  isInactive: boolean;
}

/**
 * VStepperStep component computed properties interface
 */
export interface VStepperStepComputed {
  /** CSS classes for the step element */
  classes: Record<string, boolean>;
  /** Whether the step has validation errors */
  hasError: boolean;
}

/**
 * VStepperStep component methods interface
 */
export interface VStepperStepMethods {
  /**
   * Handle click event on the step
   * @param event - The click event
   */
  click(event: MouseEvent): void;
  
  /**
   * Generate an icon VNode
   * @param icon - Icon name or configuration
   * @returns VNode for the icon
   */
  genIcon(icon: string): VNode;
  
  /**
   * Generate the label section VNode
   * @returns VNode for the label
   */
  genLabel(): VNode;
  
  /**
   * Generate the step indicator VNode
   * @returns VNode for the step indicator
   */
  genStep(): VNode;
  
  /**
   * Generate the content inside the step indicator
   * @returns Array of VNodes for step content
   */
  genStepContent(): Array<VNode | string>;
  
  /**
   * Toggle the active state of the step
   * @param stepNumber - The currently active step number
   */
  toggle(stepNumber: number | string): void;
}

/**
 * Stepper instance interface (injected from parent)
 */
export interface StepperInstance {
  /**
   * Register a step with the stepper
   * @param step - The step component instance
   */
  register(step: VStepperStepInstance): void;
  
  /**
   * Unregister a step from the stepper
   * @param step - The step component instance
   */
  unregister(step: VStepperStepInstance): void;
}

/**
 * VStepperStep component instance type
 */
export type VStepperStepInstance = VStepperStepData & 
  VStepperStepProps & 
  VStepperStepMethods & 
  VStepperStepComputed & {
    /** Injected stepper parent instance */
    stepper?: StepperInstance;
    /** Injected step click handler from parent */
    stepClick: (step: number | string) => void;
  };

/**
 * VStepperStep - Individual step component for VStepper
 * 
 * Represents a single step in a multi-step process. Can display validation state,
 * completion status, and allow navigation when editable.
 * 
 * @example
 *