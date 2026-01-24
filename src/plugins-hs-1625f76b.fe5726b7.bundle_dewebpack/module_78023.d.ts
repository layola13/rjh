/**
 * Module: module_78023
 * Original ID: 78023
 * 
 * A custom validator class that extends HSApp.View.Base.GizmoValidator.
 * This validator always returns false for any validation attempt.
 */

declare module 'module_78023' {
  import { GizmoValidator } from 'HSApp.View.Base';

  /**
   * Custom validator implementation that always fails validation.
   * @extends GizmoValidator
   */
  export default class CustomGizmoValidator extends GizmoValidator {
    /**
     * Creates an instance of CustomGizmoValidator.
     * @param args - Constructor arguments passed to the parent class
     */
    constructor(...args: any[]);

    /**
     * Validates the provided input.
     * This implementation always returns false, effectively rejecting all inputs.
     * 
     * @param value - The value to validate
     * @returns Always returns false
     */
    validate(value: unknown): false;
  }
}

/**
 * Global namespace declaration for HSApp
 */
declare namespace HSApp {
  namespace View {
    namespace Base {
      /**
       * Base class for gizmo validators
       */
      class GizmoValidator {
        constructor(...args: any[]);
        
        /**
         * Base validation method to be overridden by subclasses
         * @param value - The value to validate
         * @returns Validation result
         */
        validate(value: unknown): boolean;
      }
    }
  }
}