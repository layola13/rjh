import { EventEmitter } from './EventEmitter';
import { Texture } from './Texture';

/**
 * Texture loader plugin for handling image resources
 */
export class TextureLoader {
  /**
   * Middleware function to load textures from image resources
   */
  static use(resource: LoaderResource, next: () => void): void {
    if (resource.data && resource.type === ResourceType.IMAGE) {
      resource.texture = Texture.fromLoader(
        resource.data,
        resource.url,
        resource.name
      );
    }
    next();
  }
}

/**
 * Resource types supported by the loader
 */
enum ResourceType {
  IMAGE = 'image'
}

/**
 * Loader plugin configuration
 */
interface LoaderPlugin {
  pre?: (resource: LoaderResource, next: () => void) => void;
  use?: (resource: LoaderResource, next: () => void) => void;
  add?: () => void;
}

/**
 * Loader resource data
 */
export interface LoaderResource {
  data: unknown;
  type: string;
  url: string;
  name: string;
  texture?: Texture;
  error?: Error;
}

/**
 * Loader options configuration
 */
interface LoaderOptions {
  baseUrl?: string;
  concurrency?: number;
}

/**
 * Base loader class for managing resource loading
 */
class BaseLoader {
  protected _baseUrl: string;
  protected _concurrency: number;

  public readonly onStart: EventEmitter;
  public readonly onProgress: EventEmitter;
  public readonly onError: EventEmitter;
  public readonly onLoad: EventEmitter;
  public readonly onComplete: EventEmitter;

  constructor(baseUrl?: string, concurrency?: number) {
    this._baseUrl = baseUrl ?? '';
    this._concurrency = concurrency ?? 10;
    
    this.onStart = new EventEmitter();
    this.onProgress = new EventEmitter();
    this.onError = new EventEmitter();
    this.onLoad = new EventEmitter();
    this.onComplete = new EventEmitter();
  }

  protected reset(): void {
    // Reset loader state
  }

  protected pre(middleware: (resource: LoaderResource, next: () => void) => void): void {
    // Add pre-processing middleware
  }

  protected use(middleware: (resource: LoaderResource, next: () => void) => void): void {
    // Add processing middleware
  }
}

/**
 * Resource loader with plugin support and event emission
 */
export class Loader extends BaseLoader {
  private static _plugins: LoaderPlugin[] = [];
  private static _shared?: Loader;
  
  protected _protected: boolean = false;

  constructor(baseUrl?: string, concurrency?: number) {
    super(baseUrl, concurrency);
    
    EventEmitter.call(this as any);

    for (const plugin of Loader._plugins) {
      if (plugin.pre) {
        this.pre(plugin.pre);
      }
      if (plugin.use) {
        this.use(plugin.use);
      }
    }

    this.onStart.add((loader: Loader) => this.emit('start', loader));
    this.onProgress.add((loader: Loader, resource: LoaderResource) => 
      this.emit('progress', loader, resource)
    );
    this.onError.add((error: Error, loader: Loader, resource: LoaderResource) => 
      this.emit('error', error, loader, resource)
    );
    this.onLoad.add((loader: Loader, resource: LoaderResource) => 
      this.emit('load', loader, resource)
    );
    this.onComplete.add((loader: Loader, resources: Record<string, LoaderResource>) => 
      this.emit('complete', loader, resources)
    );
  }

  /**
   * Get or create shared loader instance
   */
  static get shared(): Loader {
    if (!Loader._shared) {
      const loader = new Loader();
      loader._protected = true;
      Loader._shared = loader;
    }
    return Loader._shared;
  }

  /**
   * Register a loader plugin
   */
  static registerPlugin(plugin: LoaderPlugin): typeof Loader {
    Loader._plugins.push(plugin);
    if (plugin.add) {
      plugin.add();
    }
    return Loader;
  }

  /**
   * Destroy the loader and clean up resources
   */
  destroy(): void {
    if (!this._protected) {
      this.removeAllListeners();
      this.reset();
    }
  }

  emit(event: string, ...args: unknown[]): boolean {
    return false;
  }

  removeAllListeners(): void {
    // Remove all event listeners
  }
}

Object.assign(Loader.prototype, EventEmitter.prototype);

/**
 * Middleware for resource parsing
 */
const parsingMiddleware = {
  use: (resource: LoaderResource, next: () => void) => {
    next();
  }
};

Loader.registerPlugin({ use: parsingMiddleware.use });
Loader.registerPlugin(TextureLoader);

/**
 * Application loader plugin options
 */
interface AppLoaderPluginOptions {
  sharedLoader?: boolean;
}

/**
 * Application integration plugin for loader
 */
export class AppLoaderPlugin {
  static loader: Loader | null = null;

  /**
   * Initialize the loader plugin
   */
  static init(options?: AppLoaderPluginOptions): void {
    const config: AppLoaderPluginOptions = Object.assign(
      { sharedLoader: false },
      options
    );
    
    this.loader = config.sharedLoader ? Loader.shared : new Loader();
  }

  /**
   * Destroy the loader and clean up
   */
  static destroy(): void {
    if (this.loader) {
      this.loader.destroy();
      this.loader = null;
    }
  }
}

export { LoaderResource };