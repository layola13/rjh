/**
 * Vuetify Application Property Module
 * 
 * Handles the unregistration of application properties from the Vuetify application instance.
 * This is typically used internally by Vuetify components during their lifecycle cleanup.
 * 
 * @module applicationProperty
 */

/**
 * Unregisters a component's application property from the Vuetify application registry.
 * 
 * This method is called during component destruction to clean up any registered
 * application-level properties (such as layout measurements, overlays, etc.) that
 * were previously registered by the component.
 * 
 * @param e - The first parameter (context/event - type unclear from snippet)
 * @param t - The property key or identifier to unregister from the application
 * 
 * @remarks
 * - This function accesses `this.$vuetify.application.unregister` which is part of Vuetify's internal API
 * - `this._uid` is the Vue component's unique identifier
 * - Typically called in component `beforeDestroy` or `unmounted` lifecycle hooks
 * 
 * @internal
 */
declare function unregisterApplicationProperty(e: unknown, t: string | number): void;

/**
 * Vuetify application interface with registration management
 */
interface VuetifyApplication {
  /**
   * Unregisters a component property from the application registry
   * @param uid - The unique component identifier
   * @param propertyKey - The property key to unregister
   */
  unregister(uid: number, propertyKey: string | number): void;
}

/**
 * Extended Vue component instance with Vuetify integration
 */
interface VuetifyComponentInstance {
  /** Vue component unique identifier */
  readonly _uid: number;
  
  /** Vuetify instance attached to the component */
  $vuetify: {
    /** Application-level property registry */
    application: VuetifyApplication;
  };
}