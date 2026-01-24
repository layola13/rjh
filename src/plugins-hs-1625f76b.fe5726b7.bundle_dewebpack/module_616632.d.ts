/**
 * Gizmo validator implementation that always returns false
 * @module module_616632
 */

/**
 * Base validator class from HSApp framework
 */
declare class GizmoValidator {
  validate(value: unknown): boolean;
}

declare namespace HSApp {
  namespace View {
    namespace Base {
      export { GizmoValidator };
    }
  }
}

/**
 * Custom validator that always fails validation
 * Extends the base GizmoValidator class
 */
declare class CustomValidator extends HSApp.View.Base.GizmoValidator {
  /**
   * Validates the provided value
   * @param value - The value to validate
   * @returns Always returns false, indicating validation failure
   */
  validate(value: unknown): false;
}

export default CustomValidator;