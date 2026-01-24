/**
 * HSApp Gizmo Extension Module
 * Extends the base Gizmo class to provide composite gizmo functionality with child gizmo management
 */

/**
 * Extended Gizmo class that supports adding child gizmos
 * @extends HSApp.View.Base.Gizmo
 */
declare class ExtendedGizmo extends HSApp.View.Base.Gizmo {
  /**
   * Creates an instance of ExtendedGizmo
   * @param element - The DOM element or element selector
   * @param config - Configuration object for the gizmo
   * @param options - Additional options for gizmo initialization
   * @param childOptions - Options specifically for the child gizmo component
   */
  constructor(
    element: HTMLElement | string,
    config: GizmoConfig,
    options: GizmoOptions,
    childOptions: ChildGizmoOptions
  );

  /**
   * Adds a child gizmo component to this gizmo instance
   * @param childGizmo - The child gizmo instance to be added
   * @returns The current gizmo instance for method chaining
   */
  addChildGizmo(childGizmo: HSApp.View.Base.Gizmo): this;
}

/**
 * Configuration interface for Gizmo instances
 */
interface GizmoConfig {
  [key: string]: unknown;
}

/**
 * Options interface for Gizmo initialization
 */
interface GizmoOptions {
  [key: string]: unknown;
}

/**
 * Options interface for child Gizmo components
 */
interface ChildGizmoOptions {
  [key: string]: unknown;
}

/**
 * HSApp namespace declaration
 */
declare namespace HSApp {
  namespace View {
    namespace Base {
      /**
       * Base Gizmo class
       */
      class Gizmo {
        constructor(element: HTMLElement | string, config: GizmoConfig, options: GizmoOptions);
      }
    }
  }
}

export default ExtendedGizmo;