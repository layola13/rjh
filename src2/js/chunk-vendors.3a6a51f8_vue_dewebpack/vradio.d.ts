/**
 * VRadioGroup module exports
 * Provides radio button group and individual radio button components
 */

/**
 * Radio group component for managing a collection of radio buttons
 * Handles selection state and provides a unified interface for radio options
 */
export class VRadioGroup {
  /** Internal Vuetify subcomponents registry */
  static readonly $_vuetify_subcomponents?: Record<string, unknown>;
}

/**
 * Individual radio button component
 * Must be used within a VRadioGroup component
 */
export class VRadio {
  /** Internal Vuetify subcomponents registry */
  static readonly $_vuetify_subcomponents?: Record<string, unknown>;
}

/**
 * Default export containing all radio-related subcomponents
 */
export interface VRadioGroupModule {
  /** Internal Vuetify subcomponents registry */
  readonly $_vuetify_subcomponents: {
    /** Radio group component reference */
    VRadioGroup: typeof VRadioGroup;
    /** Radio button component reference */
    VRadio: typeof VRadio;
  };
}

declare const _default: VRadioGroupModule;
export default _default;