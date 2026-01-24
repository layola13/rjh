/**
 * Checkbox component for form controls
 * @module CheckboxComponent
 */

import BaseComponent from './BaseComponent';

/**
 * Configuration options for checkbox initialization
 */
export interface CheckboxConfig {
  /** Checkbox name attribute */
  name: string;
  /** Current checked state */
  isChecked?: boolean;
  /** Display label text */
  label?: string;
  /** Tooltip text on hover */
  tooltip?: string;
  /** Click event handler */
  onclick?: () => void;
  /** State change callback */
  onchange?: (isChecked: boolean) => void;
  /** Additional data properties */
  [key: string]: unknown;
}

/**
 * Checkbox component class extending BaseComponent
 */
export default class CheckboxComponent extends BaseComponent {
  /**
   * Component type identifier
   * @readonly
   */
  get type(): string;

  /**
   * Creates a new checkbox component instance
   * @param config - Checkbox configuration options
   * @param context - Component rendering context
   */
  constructor(config: CheckboxConfig, context?: unknown);

  /**
   * Updates the checked state of the checkbox
   * @param isChecked - New checked state
   */
  setChecked(isChecked: boolean): void;

  /**
   * Handles checkbox click interaction
   * Toggles checked state and triggers callbacks
   */
  click(): void;

  /**
   * Updates component data and triggers side effects
   * @param data - Partial data to merge with existing state
   */
  setData(data: Partial<CheckboxConfig>): void;

  /**
   * Updates component data without triggering side effects
   * @param data - Partial data to merge silently
   */
  setDataOnly(data: Partial<CheckboxConfig>): void;
}