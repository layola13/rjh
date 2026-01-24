import Vue from 'vue';
import { VueConstructor } from 'vue';

/**
 * Application property type - represents which edge of the application layout this component occupies
 * @example 'top', 'bottom', 'left', 'right'
 */
export type ApplicationProperty = string;

/**
 * Applicationable mixin options
 */
export interface ApplicationableOptions {
  /** The application property name that this component will register with */
  applicationProperty: ApplicationProperty;
  /** List of property names to watch for updates */
  watchedProperties?: string[];
}

/**
 * Applicationable mixin props
 */
export interface ApplicationableProps {
  /**
   * Designates the component as part of the application layout.
   * When true, the component registers itself with Vuetify's application service
   * to reserve space in the application layout.
   */
  app: boolean;
}

/**
 * Applicationable mixin computed properties
 */
export interface ApplicationableComputed {
  /**
   * Returns the application property name for this component
   * @returns The property name used to register with the application service
   */
  applicationProperty: ApplicationProperty;
}

/**
 * Applicationable mixin methods
 */
export interface ApplicationableMethods {
  /**
   * Calls the update method to register/update the component's space in the application layout
   * Only executes if the app prop is true
   */
  callUpdate(): void;

  /**
   * Removes this component's registration from the application service
   * @param force - If true, removes registration regardless of app prop value
   */
  removeApplication(force?: boolean): void;

  /**
   * Calculates and returns the size this component occupies in the application layout
   * Should be overridden by implementing components to return actual dimensions
   * @returns The size in pixels (width or height depending on position)
   * @default 0
   */
  updateApplication(): number;
}

/**
 * Applicationable mixin type
 */
export type Applicationable = Vue & 
  ApplicationableProps & 
  ApplicationableComputed & 
  ApplicationableMethods;

/**
 * Factory function that creates the Applicationable mixin
 * 
 * This mixin enables components to participate in Vuetify's application layout system.
 * Components using this mixin can reserve space at the edges of the viewport (top, bottom, left, right)
 * and automatically coordinate with other application-level components.
 * 
 * @param applicationProperty - The name of the application edge this component occupies
 * @param watchedProperties - Array of property names to watch for layout updates (default: [])
 * @returns A Vue mixin constructor that can be used with Vue.extend()
 * 
 * @example
 *