import Vue from 'vue';
import { VueConstructor } from 'vue/types/vue';

/**
 * Applicationable mixin factory
 * Creates a mixin that integrates components with Vuetify's application layout system
 * 
 * @param property - The application property name (e.g., 'top', 'bottom', 'left', 'right')
 * @param watchedProperties - Array of component properties to watch for updates
 * @returns A Vue mixin constructor with application integration capabilities
 */
export default function applicationable<T extends Vue>(
  property: string,
  watchedProperties: string[] = []
): VueConstructor<T>;

/**
 * Applicationable Mixin Interface
 * Provides integration with Vuetify's application layout system
 */
export interface ApplicationableMixin extends Vue {
  /**
   * Whether the component should be registered with the application layout
   * When true, reserves space in the application layout grid
   */
  app: boolean;

  /**
   * The application property name this component registers with
   * @readonly
   */
  readonly applicationProperty: string;

  /**
   * Registers or updates the component with the application layout system
   * Called automatically when app is true or watched properties change
   */
  callUpdate(): void;

  /**
   * Unregisters the component from the application layout system
   * @param force - Force removal even if app prop is false
   */
  removeApplication(force?: boolean): void;

  /**
   * Calculates the size/dimension value to register with the application
   * Should be overridden by implementing components
   * @returns The pixel value to reserve in the application layout (default: 0)
   */
  updateApplication(): number;
}

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * Vuetify application layout service
     */
    $vuetify: {
      application: {
        /**
         * Register a component with the application layout
         * @param uid - Unique component identifier
         * @param property - Layout property name
         * @param value - Size value in pixels
         */
        register(uid: number, property: string, value: number): void;

        /**
         * Unregister a component from the application layout
         * @param uid - Unique component identifier
         * @param property - Layout property name
         */
        unregister(uid: number, property: string): void;
      };
    };

    /**
     * Unique component instance identifier
     */
    _uid: number;
  }
}