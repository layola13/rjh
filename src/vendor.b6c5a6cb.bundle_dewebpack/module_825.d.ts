/**
 * Application plugin interface
 */
interface IApplicationPlugin {
  /**
   * Initialize the plugin with the application instance and options
   * @param options - Application configuration options
   */
  init(this: Application, options: IApplicationOptions): void;

  /**
   * Cleanup and destroy the plugin
   */
  destroy(this: Application): void;
}

/**
 * Application configuration options
 */
interface IApplicationOptions {
  /**
   * Force canvas renderer instead of WebGL
   * @default false
   */
  forceCanvas?: boolean;

  /**
   * Element to resize the application to
   */
  resizeTo?: Window | HTMLElement | null;

  /**
   * Additional renderer options
   */
  [key: string]: unknown;
}

/**
 * Main Application class for managing the renderer and stage
 */
export declare class Application {
  /**
   * The renderer instance (WebGL or Canvas)
   */
  renderer: IRenderer;

  /**
   * The root display container
   */
  stage: Container;

  /**
   * Application configuration options
   */
  private _options: IApplicationOptions | null;

  /**
   * Element to resize the application to
   */
  private _resizeTo: Window | HTMLElement | null;

  /**
   * Resize handler function
   */
  private resize: (() => void) | null;

  /**
   * Registered application plugins
   */
  private static _plugins: IApplicationPlugin[];

  /**
   * Create a new Application instance
   * @param options - Configuration options
   */
  constructor(options?: IApplicationOptions);

  /**
   * Register a plugin with the Application class
   * @param plugin - Plugin to register
   */
  static registerPlugin(plugin: IApplicationPlugin): void;

  /**
   * Render the stage using the renderer
   */
  render(): void;

  /**
   * The canvas view element
   */
  get view(): HTMLCanvasElement;

  /**
   * The screen rectangle representing the canvas dimensions
   */
  get screen(): Rectangle;

  /**
   * Element to resize the application to
   */
  get resizeTo(): Window | HTMLElement | null;
  set resizeTo(value: Window | HTMLElement | null);

  /**
   * Destroy the application and cleanup resources
   * @param removeView - Remove the canvas view from the DOM
   * @param stageOptions - Options for destroying the stage
   */
  destroy(removeView?: boolean, stageOptions?: boolean | IDestroyOptions): void;
}

/**
 * Auto-detect and create the appropriate renderer
 */
interface IRenderer {
  view: HTMLCanvasElement;
  screen: Rectangle;
  render(container: Container): void;
  resize(width: number, height: number): void;
  destroy(removeView?: boolean): void;
}

/**
 * Display container interface
 */
interface Container {
  destroy(options?: boolean | IDestroyOptions): void;
}

/**
 * Rectangle interface representing screen dimensions
 */
interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Options for destroying display objects
 */
interface IDestroyOptions {
  children?: boolean;
  texture?: boolean;
  baseTexture?: boolean;
}