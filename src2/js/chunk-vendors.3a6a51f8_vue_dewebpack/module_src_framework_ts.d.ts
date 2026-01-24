/**
 * Framework core module
 * @module framework
 */

import { install } from './install';
import { 
  Presets, 
  Application, 
  Breakpoint, 
  Goto, 
  Icons, 
  Lang, 
  Theme 
} from './services/index';

/**
 * User configuration options for the framework
 */
export interface PresetOptions {
  /** Enable right-to-left text direction */
  rtl?: boolean;
  [key: string]: unknown;
}

/**
 * Framework instance properties
 */
export interface FrameworkInstance {
  /** Indicates if the framework is currently hydrating */
  isHydrating: boolean;
  /** Right-to-left text direction flag */
  rtl?: boolean;
  [key: string]: unknown;
}

/**
 * Service constructor interface
 */
export interface ServiceConstructor {
  new (preset: PresetOptions, context: Framework): Service;
  /** Unique property name for this service */
  property: string;
}

/**
 * Base service interface
 */
export interface Service {
  /** Reference to the framework instance */
  framework?: FrameworkInstance;
  /**
   * Initialize the service
   * @param element - Target element or selector
   * @param options - Additional initialization options
   */
  init(element: Element | string, options?: Record<string, unknown>): void;
}

/**
 * Framework configuration
 */
export interface FrameworkConfig {
  /** Suppress all framework warnings */
  silent: boolean;
}

/**
 * Main Framework class
 * Provides a plugin architecture for managing UI framework services
 */
export default class Framework {
  /** Install method for Vue plugin integration */
  static install: typeof install;
  
  /** Flag indicating if framework has been installed */
  static installed: boolean;
  
  /** Current framework version */
  static version: string;
  
  /** Global framework configuration */
  static config: FrameworkConfig;

  /** Framework instance containing all registered services */
  readonly framework: FrameworkInstance;
  
  /** List of installed service property names */
  readonly installed: string[];
  
  /** Merged preset configuration */
  readonly preset: PresetOptions;
  
  /** User-provided preset options */
  readonly userPreset: PresetOptions;

  /**
   * Create a new Framework instance
   * @param options - User configuration options
   */
  constructor(options?: PresetOptions);

  /**
   * Initialize all installed services
   * @param element - Target element or selector for initialization
   * @param options - Additional options passed to service init methods
   */
  init(element: Element | string, options?: Record<string, unknown>): void;

  /**
   * Register and instantiate a service
   * @param service - Service constructor to register
   */
  use(service: ServiceConstructor): void;
}