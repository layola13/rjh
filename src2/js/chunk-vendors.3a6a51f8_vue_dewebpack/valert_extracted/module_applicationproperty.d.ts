/**
 * Vuetify application property module
 * Handles registration and unregistration of components in Vuetify's application layout system
 */

/**
 * Vuetify application service interface
 * Manages component registration for application layout (app bar, navigation drawer, footer, etc.)
 */
interface VuetifyApplication {
  /**
   * Register a component with the application layout system
   * @param uid - Unique identifier for the component instance
   * @param propertyName - Name of the application property (e.g., 'bar', 'top', 'left', 'right', 'footer')
   * @param size - Size in pixels that the component occupies
   */
  register(uid: number, propertyName: string, size: number): void;

  /**
   * Unregister a component from the application layout system
   * @param uid - Unique identifier for the component instance
   * @param propertyName - Name of the application property to unregister
   */
  unregister(uid: number, propertyName: string): void;
}

/**
 * Vuetify instance interface
 */
interface Vuetify {
  /** Application layout management service */
  application: VuetifyApplication;
}

/**
 * Vue component instance with Vuetify integration
 */
interface VuetifyComponentInstance {
  /** Vuetify instance */
  readonly $vuetify: Vuetify;
  
  /** Unique identifier for this component instance */
  readonly _uid: number;
}

/**
 * Unregisters a component from Vuetify's application layout system
 * Typically called during component destruction/unmount
 * 
 * @param this - Vue component instance with Vuetify
 * @param event - Event parameter (unused in this implementation)
 * @param propertyName - Application property name to unregister (e.g., 'bar', 'top', 'left')
 */
declare function unregisterApplicationProperty(
  this: VuetifyComponentInstance,
  event: unknown,
  propertyName: string
): void;