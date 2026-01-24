/**
 * Framework core module providing the main Framework class and plugin system
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
 * Configuration options for the Framework
 */
export interface FrameworkConfig {
  /** Suppress warning and error messages */
  silent: boolean;
}

/**
 * User-provided preset configuration
 */
export interface UserPreset {
  /** Enable right-to-left layout support */
  rtl?: boolean;
  [key: string]: unknown;
}

/**
 * Internal framework state object
 */
export interface FrameworkInstance {
  /** Indicates if the framework is currently hydrating */
  isHydrating: boolean;
  /** Right-to-left layout mode */
  rtl?: boolean;
  [key: string]: unknown;
}

/**
 * Base interface for framework services/plugins
 */
export interface FrameworkService {
  /** Property name used to register this service */
  readonly property: string;
  /** Reference to the parent framework instance */
  framework?: FrameworkInstance;
  /**
   * Initialize the service
   * @param element - Target DOM element or Vue component
   * @param options - Service-specific options
   */
  init(element: unknown, options?: unknown): void;
}

/**
 * Constructor type for framework services
 */
export interface FrameworkServiceConstructor {
  new (preset: UserPreset, framework: Framework): FrameworkService;
  readonly property: string;
}

/**
 * Main Framework class providing plugin management and initialization
 */
export default class Framework {
  /** Version of the framework */
  static readonly version: string;
  
  /** Global framework configuration */
  static config: FrameworkConfig;
  
  /** Indicates if the framework has been installed as a Vue plugin */
  static installed: boolean;
  
  /** Install the framework as a Vue plugin */
  static install: typeof install;

  /** Internal framework state */
  readonly framework: FrameworkInstance;
  
  /** List of installed service property names */
  private readonly installed: string[];
  
  /** Merged preset configuration */
  readonly preset: UserPreset;
  
  /** User-provided preset configuration */
  readonly userPreset: UserPreset;

  /**
   * Create a new Framework instance
   * @param userPreset - User configuration options
   */
  constructor(userPreset?: UserPreset);

  /**
   * Initialize all installed services
   * @param element - Target element for initialization
   * @param options - Initialization options
   */
  init(element: unknown, options?: unknown): void;

  /**
   * Register and instantiate a framework service
   * @param service - Service constructor to register
   */
  use(service: FrameworkServiceConstructor): void;
}